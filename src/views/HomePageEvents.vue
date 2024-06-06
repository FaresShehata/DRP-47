<template>
  <div class="app">
    <h1>Recent Events</h1>
   <!-- <RouterLink to="/calendar" class="calendar-button"
    active-class="active-tab" @click="goToCalendar()"><i class="fas fa-calendar-alt"></i></RouterLink> -->
    <HomePageNav></HomePageNav>
    <div class="events-container">
      <div class="events-list" v-for="e in events" :key="e.id">
        <button @click="router.push(`/societies/${e.societyName}/events/${e.id}`)"  class="event">
          <div class="event-title">
            <h2>{{ e.title }}</h2>
            <p class="society-name">{{ e.societyName }}</p>
          </div>
          
          <div class="details">
            <span>Capacity:</span>{{ e.capacity }}<br>
            <span>Attending:</span>{{ e.attending }}<br>
            <span>Date & Time:</span>{{ e.dateTime?.toDate() }}<br>
            {{ e.description }}
          </div>
          
        </button>
      </div>
    </div>


    <NavBar></NavBar>
  </div>
</template>

<script setup>
import NavBar from "../components/NavBar.vue"
import HomePageNav from "../components/HomePageNav.vue"
import { onMounted, ref } from 'vue'
import { useRouter } from "vue-router";
import { doc, getDoc, getDocs, query, collection, where, orderBy } from "firebase/firestore";
import { db, uid } from '@/firebase';

const router = useRouter()

const events = ref([])

// const goToCalendar = () => {
//   router.push('/calendar'); }

onMounted(async () => {
  const userDoc = await getDoc(doc(db, "users", uid))
  const societies = userDoc.data().societies
  const societyIDs = societies.map(s => s.id)

  console.log(userDoc)

  const eq = query(
    collection(db, "events"),
    where("societyID", "in", societyIDs),
    orderBy("dateTime", "asc")
  )
  const equerySnapshot = await getDocs(eq);

  console.log(equerySnapshot)

  const eres = []
  equerySnapshot.forEach(doc => eres.push({ id: doc.id, ...doc.data() }))

  events.value = eres
  console.log(eres)

})



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
  width: 40px;  /* You can adjust this size */
  height: 40px; /* You can adjust this size */
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
  color : #414142;
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
</style>