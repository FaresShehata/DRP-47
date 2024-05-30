<template>
  <div class="app">
    <div v-if="!id">Somehting Went Wrong</div>

    <div v-else>
      <h1>Upcoming Events</h1>
      <div v-for="event in events" :key="event.title">
        <button
          @click="router.push(`/societies/${route.params.name}/events/${event.id}`)"
          class="event"
        >
        <!-- <div class = "event"> -->
          <h2>{{ event.title }}</h2>
          <div class="details">
            <span>Capacity:</span>{{ event.capacity }}<br>
            <span>Attending:</span>{{ event.attending }}<br>
            <span>Date & Time:</span>{{ event.dateTime.toDate() }}<br>
          </div>
          <p>{{ event.description }}</p>
        </button>
      <!-- </div> -->
      </div>
    </div>

    <NavBar></NavBar>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router"
import { onMounted, ref } from 'vue'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '@/firebase';
import NavBar from "../components/NavBar.vue"
const route = useRoute()
const router = useRouter()

const name = route.params.name

const id = ref("")
const events = ref([])

onMounted(async () => {
  const sq = query(collection(db, "societies"), where("name", "==", name))
  const squerySnapshot = await getDocs(sq);
  const res = []
  squerySnapshot.forEach(doc => res.push(doc.id))

  if (res.length == 0) return;

  id.value = res[0]
  console.log(id.value)

  const eq = query(collection(db, "events"), where("societyID", "==", id.value))
  const equerySnapshot = await getDocs(eq);
  const eres = []
  equerySnapshot.forEach(doc => eres.push({id: doc.id, ...doc.data()}))
  console.log("eres", eres)
  events.value = eres
})

</script>



<style>
body {
  font-family: Arial, sans-serif;
  margin: 20px;
}

.event {
  all: unset;
  text-decoration: none;
  color: black;
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  cursor: pointer;
}

.event h2 {
  margin-top: 0;
}

.event .details {
  margin-bottom: 10px;
}

.event .details span {
  display: inline-block;
  min-width: 100px;
  font-weight: bold;
}
</style>