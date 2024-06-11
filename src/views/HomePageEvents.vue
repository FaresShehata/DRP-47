<template>
  <div class="app">
    <h1>Upcoming Events</h1>
    <button @click="showFilteredEvents()" class="registered-button" v-if="seeingAll">All</button>
    <button @click="showAllEvents()" class="registered-button all-button" v-if="!seeingAll">Registered</button>
    <HomePageNav></HomePageNav>
    <div class="events-container">
      <div class="events-list" v-for="e in events" :key="e.id">
        <button @click="router.push(`/societies/${e.societyName}/events/${e.id}`)" class="event">
          <div class="event-title">
            <h2>{{ e.title }}</h2>
            <p class="society-name">{{ e.societyName }}</p>
          </div>

          <div class="details">
            <span>Capacity:</span>{{ e.capacity }}<br>
            <span>Attending:</span>{{ e.attending.length }}<br>
            <span>Date & Time:</span>{{ formatDate(e.dateTime?.toDate()) }}<br>
            <p>{{ e.description }}</p>

            <div class="register-container">
              <div v-if="e.attending.includes(uid)" class="attending-indicator">🦕 Registered to this event </div>
              <div class="register"></div>
            </div>

          </div>

        </button>
      </div>
    </div>
    <NavBar></NavBar>
  </div>
</template>

<script setup>
import { formatDate } from "@/main.js"
import NavBar from "../components/NavBar.vue"
import HomePageNav from "../components/HomePageNav.vue"
import { onMounted, ref } from 'vue'
import { useRouter } from "vue-router";
import { doc, getDoc, getDocs, query, collection, where, orderBy } from "firebase/firestore";
import { db, uid, goToUsers } from '@/firebase';
import { filterByRegistered } from "@/main.js";

const router = useRouter()
const allEvents = ref([])
const events = ref([])
const seeingAll = ref(true)
// const goToCalendar = () => {
//   router.push('/calendar'); }

onMounted(async() => { 
  goToUsers()
  const userDoc = await getDoc(doc(db, "users", uid))
  const societies = userDoc.data().societies
  const societyIDs = societies.map(s => s.id)

  // // console.log(userDoc)
  if (societyIDs.length == 0) {
    return;
  }
  const eq = query(
    collection(db, "events"),
    where("societyID", "in", societyIDs),
    orderBy("dateTime", "asc")
  )
  const equerySnapshot = await getDocs(eq);

  // console.log(equerySnapshot)

  const eres = []
  equerySnapshot.forEach(doc => eres.push({ id: doc.id, ...doc.data() }))
  allEvents.value = eres
  console.log("allEvents.value", allEvents.value)
  // filteredEvents.value = eres.filter(e => e.attending.includes(uid))
  events.value = eres
  // console.log(eres)
})

function showAllEvents() {
  events.value = allEvents.value
  seeingAll.value = true
}

function showFilteredEvents() {
  events.value = filterByRegistered(allEvents, uid)
  // events.value = filteredEvents.value
  seeingAll.value = false
}



</script>


<style scoped>
/*
h1 {
  height: 5rem;
  background-color: white;
  margin: 0;
  padding: 1rem;

} */

.calendar-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  width: 40px;
  /* You can adjust this size */
  height: 40px;
  /* You can adjust this size */
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
  margin: 10px;
  padding: 0;
}

.calendar-button:hover {
  color: #414142;
}

.event {
  all: unset;
  text-decoration: none;
  text-align: left;
  color: black;
  border: 1px solid #ddd;
  padding: 20px;
  margin: auto;
  /* margin-bottom: 20px; */
  border-radius: 5px;
  width: min(80vw, 500px);
  cursor: pointer;
}

.event:hover {
  background-color: #f9f9f9;
  border-color: #bbb;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.event h2 {
  margin-top: 0;
  /* text-align: left; */
}

.event-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.event-title * {
  margin-top: 0;
  /* font-size: 1.5rem; */
}

.society-name {
  font-size: 1.3rem;
  color: rgb(93, 93, 93);
}

.event .details {
  margin-bottom: 10px;
}

.event .details span {
  display: inline-block;
  min-width: 100px;
  font-weight: bold;
  margin-bottom: 1rem;
}

.events-container {
  /* top: 10rem; */
  width: 100vw;
  height: calc(100vh - 12.6rem);
  border: 1px solid #ccc;
  overflow-y: auto;
  margin-top: 1rem;
}

.events-list {
  /* height: 50px; */
  top: 8rem;
  padding-top: 1rem;
  overflow: auto;
  padding: 1rem;
}

.attending-indicator {
  color: green;
}

.register-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.register {
  text-align: right;
  --color: rgb(0, 183, 244);
  /* margin: 0; */
  margin-left: auto;
  padding: 0;
  width: .5rem;
  height: .5rem;
  border-top: 4px solid var(--color);
  border-right: 4px solid var(--color);
  transform: rotate(45deg);
}
</style>