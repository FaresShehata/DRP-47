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
            <span>Attending:</span>{{ event.attending }}<br>
            <span>Date & Time:</span>{{ event.dateTime.toDate() }}<br>
          </div>
          <p>{{ event.description }}</p>
          <button class="attend-button" :class="attending ? 'attending' : 'not-attending'" @click="addAttendee()">
            {{ attending ? "I am no longer attending" : "I will attend" }}
          </button>
        </div>
      </div>
    </div>
    <NavBar></NavBar>
  </div>
</template>

<script setup>

import { useRoute } from "vue-router"
import { onMounted, ref } from 'vue'
import { collection, onSnapshot, query, where, /* setDoc, */ doc, runTransaction } from "firebase/firestore";
import { db } from '@/firebase';
import NavBar from "../../components/NavBar.vue"
const route = useRoute()

// const name = route.params.name
const eventid = route.params.eventid

const event = ref(null)
const attending = ref(false)

async function addAttendee() {
  const eventRef = doc(db, "events", eventid)

  try {
    await runTransaction(db, async (transaction) => {
      const doc = await transaction.get(eventRef);
      if (!doc.exists()) {
        throw "Document does not exist!";
      }

      const oldAttending = doc.data().attending
      let newAttending = oldAttending

      if (attending.value) {
        newAttending -= 1
        attending.value = false
      } else {
        if (oldAttending < doc.data().capacity) {
          newAttending += 1
          attending.value = true
        }
      }

      transaction.update(eventRef, { attending: newAttending });
    });
    console.log("Transaction successfully committed!");

  } catch (e) {
    console.log("Transaction failed: ", e);
  }

  // console.log(eventRef)
  // if (attending.value) {
  //   event.value.attending -= 1
  //   attending.value = false
  // } else {
  //   if (event.value.attending < event.value.capacity) {
  //     event.value.attending += 1
  //     attending.value = true
  //   }
  // }
  // setDoc(eventRef, event.value)
  // console.log("ysa")
}

onMounted(async () => {

  const q = query(collection(db, "events"), where("__name__", "==", eventid))
  onSnapshot(q, (querySnapshot) => {
    const res = []
    querySnapshot.forEach(doc => res.push(doc.data()))

    if (res.length == 0) return;

    event.value = res[0]

    // console.log(res)
  }
  );
})

</script>

<style scoped>
.single-event {
  border: 1px solid #ddd;
  padding: 10px;
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
  background-color: #fa4c4c;
  color: rgb(86, 86, 86);
}

.not-attending {
  background-color: #4CAF50;
  color: white;
}

.attending:hover {
  background-color: #f6aca6;
}

.not-attending:hover {
  background-color: #45a049;
}
</style>