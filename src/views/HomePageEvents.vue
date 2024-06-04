<template>
  <div class="app">
    <div v-if="false">Something Went Wrong</div>

    <div v-else>
      <h1>Recent Events</h1>
      <HomePageNav></HomePageNav>
      <div class="events-container">
        <div class="events-list" v-for="e in events" :key="e.id">
          <div class="event">
            <h2>{{ e.title }}</h2>
            <div class="details">
              <span>Capacity:</span>{{ e.capacity }}<br>
              <span>Attending:</span>{{ e.attending }}<br>
              <span>Date & Time:</span>{{ e.dateTime?.toDate() }}<br>
              {{ e.description}}
            </div>
          </div>
        </div>
      </div>
    </div>

    <NavBar></NavBar>
  </div>
</template>

<script setup>
import NavBar from "../components/NavBar.vue"
import HomePageNav from "../components/HomePageNav.vue"
import { onMounted, ref } from 'vue'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, uid } from '@/firebase';

const events = ref([])

onMounted(async () => {
  // const userDoc = await getDoc(doc(db, "users", uid))

  const aq = query(collection(db, "events"), where("members", "array-contains", uid))
  const aquerySnapshot = await getDocs(aq);

  const ares = []
  aquerySnapshot.forEach(doc => ares.push({ id: doc.id, ...doc.data() }))
  // console.log("eres", eres)
  console.log(ares)
  events.value = ares


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
  text-decoration: none;
  text-align: left;
  color: black;
  border: 1px solid #ddd;
  padding: 20px;
  margin: auto;
  /* margin-bottom: 20px; */
  border-radius: 5px;
  width: min(80vw, 500px);
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
  height: calc(100vh - 11rem);
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