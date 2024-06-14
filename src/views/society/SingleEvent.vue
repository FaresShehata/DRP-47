<template>
  <div class="app">
    <div v-if="!event">Something Went Wrong</div>

    <div v-else>
      <h1>Event by {{ route.params.name }}</h1>
      <div class="single-event">
        <div class="header">
          <h2>{{ event.title }}</h2>
          <button v-if="isCommittee" @click="confirmDelete()" class="trash-button">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
        <div class="details">
          <span>Capacity:</span>{{ event.capacity }}<br />
          <span>Attending:</span>{{ event.attending.length }}<br />
          <span>Date & Time:</span>{{ formatDate(event.dateTime.toDate())
          }}
        </div>
        <p>{{ event.description }}</p>
        <button
          class="attend-button"
          :class="
            attending
              ? 'attending'
              : fullCapacity
              ? 'full-capacity'
              : 'not-attending'
          "
          @click="addAttendee()"
        >
          {{
            attending
              ? "I am no longer attending"
              : fullCapacity
              ? "The event is at full capacity"
              : "I will attend"
          }}
        </button>
      </div>
    </div>
    <div v-if="showConfirmDialog" class="overlay">
      <div class="confirm-dialog">
        <div class="confirm-dialog-content">
          <p>Are you sure you want to delete this event?</p>
          <div class="button-group">
            <button @click="deleteConfirmed">Yes</button>
            <button @click="closeDeleteWindow">No</button>
          </div>
        </div>
      </div>
    </div>
    <NavBar></NavBar>
  </div>
</template>

<script setup>
import { formatDate} from "@/main.js";
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { collection, query, where, getDocs, deleteDoc } from "firebase/firestore";
import {
  onSnapshot,
  /* setDoc, */ doc,
  runTransaction,
} from "firebase/firestore";
import { db, uid, goToUsers } from "@/firebase";
import NavBar from "../../components/NavBar.vue";
const route = useRoute();
const router = useRouter();

const name = route.params.name;

const eventid = route.params.eventid;
const id = ref("")

const event = ref(null);
const attending = ref(false);
const fullCapacity = ref(false);

const showConfirmDialog = ref(false)
const isCommittee = ref(false)

async function addAttendee() {
  const eventRef = doc(db, "events", eventid);

  try {
    await runTransaction(db, async (transaction) => {
      const doc = await transaction.get(eventRef);
      if (!doc.exists()) {
        throw "Document does not exist!";
      }

      const oldAttending = doc.data().attending;
      let newAttending = oldAttending.filter((id) => id !== uid);

      if (attending.value) {
        attending.value = false;
      } else {
        if (oldAttending.length < doc.data().capacity) {
          newAttending.push(uid);
          attending.value = true;
        }
      }

      transaction.update(eventRef, { attending: newAttending });
    });
    // console.log("Transaction successfully committed!");
  } catch (e) {
    // console.log("Transaction failed: ", e);
  }
}




onMounted(async () => {

  onSnapshot(doc(db, "events", eventid), (doc) => {
    goToUsers();
    const data = doc.data();
    if (data) {
      event.value = data;
      attending.value = data.attending.includes(uid);
      fullCapacity.value = data.attending.length >= data.capacity;
    } else { 
      alert("The event you were viewing no longer exists.")
      router.replace(`/societies/${name}/events`)
    }
  });
  goToUsers();

  const sq = query(collection(db, "societies"), where("name", "==", name));
  const squerySnapshot = await getDocs(sq);
  const res = [];
  squerySnapshot.forEach((doc) => res.push({ id: doc.id, ...doc.data() }));


  const data = res[0];
  id.value = data.id;
  isCommittee.value = data.committee && data.committee.includes(uid);
});

//Delete event functions

function confirmDelete() {
  showConfirmDialog.value = true
}
function deleteConfirmed() {
  deleteDoc(doc(db, "events", eventid))
  closeDeleteWindow()
  router.replace(`/societies/${name}/events`)
  
}
function closeDeleteWindow() {
  showConfirmDialog.value = false
}
</script>

<style scoped>
.single-event {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  text-align: left;
  color: black;
  border: 1px solid #ddd;
  padding: 20px;
  margin: auto;
  /* margin-bottom: 20px; */
  border-radius: 5px;
  width: min(80vw, 500px);
  max-height: 60vh;
}

.single-event > p {
  overflow-y: scroll;
  max-height: 40vh; 
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: start;
}

.single-event .details {
  margin-bottom: 10px;
}

.single-event .details span {
  display: inline-block;
  min-width: 100px;
  font-weight: bold;
  margin-bottom: 1rem;
}

.single-event h2 {
  margin-top: 0;
}

.attend-button {
  display: inline-block;
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.attending {
  background-color: grey;
  color: white;
}

.not-attending {
  background-color: #4caf50;
  color: white;
}

.not-attending:hover {
  background-color: #62ba67;
}

.full-capacity {
  background-color: grey;
  color: white;
}

.attending:hover {
  background-color: #a8a8a8;
}
</style>
