<template>
  <div class="app">
    <h1>Recent Events</h1>
    <HomePageNav></HomePageNav>
    <div class="events-container">
      <div class="events-list" v-for="e in events" :key="e.id">
        <button @click="router.push(`/societies/${e.societyName}/events/${e.id}`)"  class="event">
          <h2>{{ e.title }}: {{ e.societyName }}</h2>
          
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
h1 {
  height: 5rem;
  background-color: white;
  margin: 0;
  padding: 1rem;

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