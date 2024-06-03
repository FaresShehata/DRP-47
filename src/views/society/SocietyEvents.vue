<template>
  <div class="app">
    <div v-if="!id">Something Went Wrong</div>

    <div v-else>
      <h1>{{ $route.params.name }}</h1>
      <SocietyPageNav :society-name="route.params.name"></SocietyPageNav>
      <div class="events-container">
        <div class="events-list" v-for="event in events" :key="event.title">
          <button @click="router.push(`/societies/${route.params.name}/events/${event.id}`)" class="event">
            
            <h2>{{ event.title }}</h2>
            <div class="details">
              <span>Capacity:</span>{{ event.capacity }}<br>
              <span>Attending:</span>{{ event.attending }}<br>
              <span>Date & Time:</span>{{ event.dateTime?.toDate() }}<br>
            </div>
            <p>{{ event.description }}</p>
          </button>
        </div>
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
import NavBar from "../../components/NavBar.vue"
import SocietyPageNav from "../../components/SocietyPageNav.vue"
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

  if (res.length !== 1) return;

  id.value = res[0]
  // console.log(id.value)

  const eq = query(collection(db, "events"), where("societyID", "==", id.value))
  const equerySnapshot = await getDocs(eq);
  const eres = []
  equerySnapshot.forEach(doc => eres.push({ id: doc.id, ...doc.data() }))
  // console.log("eres", eres)
  events.value = eres
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
  color: black;
  border: 1px solid #ddd;
  padding: 20px;
  /* margin-bottom: 20px; */
  border-radius: 5px;
  width: min(80vw, 500px);
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