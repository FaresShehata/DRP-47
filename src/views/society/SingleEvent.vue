<template>
  <div id="whatever" class="app">
    <div v-if="!event">Something Went Wrong</div>

    <div v-else>

      <h1>This Event</h1>
      <div class="single-event">
        <div class="details">
          <h2>{{ event.title }}</h2>
          <div class="details">
            <span>Capacity:</span>{{ event.capacity }}<br>
            <span>Attending:</span>{{ event.attending.length }}<br>
            <span>Date & Time:</span>{{ formatDate(event.dateTime.toDate()) }}<br>
          </div>
          <p>{{ event.description }}</p>
          <button class="attend-button" :class="attending ? 'attending' : (fullCapacity ?  'full-capacity' : 'not-attending')" @click="addAttendee()">
            {{ attending ? "I am no longer attending" : (fullCapacity ?  "The event is at full capacity" : "I will attend") }}
          </button>
        </div>
      </div>
    </div>
    <NavBar></NavBar>
  </div>
</template>

<script setup>
import { formatDate } from "@/main.js"
import { useRoute } from "vue-router"
import { onMounted, ref } from 'vue'
import { onSnapshot, /* setDoc, */ doc, runTransaction } from "firebase/firestore";
import { db, uid, goToUsers } from '@/firebase';
import NavBar from "../../components/NavBar.vue"
const route = useRoute()

// const name = route.params.name
const eventid = route.params.eventid

const event = ref(null)
const attending = ref(false)
const fullCapacity = ref(false)

async function addAttendee() {
  const eventRef = doc(db, "events", eventid)

  try {
    await runTransaction(db, async (transaction) => {
      const doc = await transaction.get(eventRef);
      if (!doc.exists()) {
        throw "Document does not exist!";
      }

      const oldAttending = doc.data().attending
      let newAttending = oldAttending.filter(id => id !== uid);

      if (attending.value) {
        attending.value = false
      } else {
        if (oldAttending.length < doc.data().capacity) {
          newAttending.push(uid)
          attending.value = true
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
  goToUsers()

  onSnapshot(doc(db, "events", eventid), (doc) => {
    const data = doc.data()
    event.value = data
    attending.value = data.attending.includes(uid)
    fullCapacity.value = data.attending.length >= data.capacity

    // // console.log(res)
  }
  );
})

</script>

<style scoped>
.single-event {
  border: 1px solid #ddd;
  padding: 20px;
  text-align: left;
  margin-bottom: 20px;
  border-radius: 5px;
  width: min(500px, 80vw);
}

.single-event .details {
  margin-bottom: 10px;
}

.single-event .details span {
  display: inline-block;
  min-width: 100px;
  font-weight: bold;
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
  background-color: #4CAF50;
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