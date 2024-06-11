<template>
  <div class="app">
    <CommitteeAction v-if="isCommittee" :id="id" :society-name="name"></CommitteeAction>
    <h1>{{ $route.params.name }}</h1>
    <JoinSociety :id="id" :society-name="name"></JoinSociety>
    <SocietyPageNav :society-name="route.params.name"></SocietyPageNav>
    <div class="events-container">
      <div class="no-events" v-if="events.length == 0">Nothing here yet...</div>
      <div class="events-list" v-for="event in events" :key="event.title">
        <button @click="router.push(`/societies/${route.params.name}/events/${event.id}`)" class="event">
          <h2>{{ event.title }}</h2>
          <div class="details">
            <span>Capacity:</span>{{ event.capacity }}<br>
            <span>Attending:</span>{{ event.attending.length }}<br>
            <span>Date & Time:</span>{{ formatDate(event.dateTime?.toDate()) }}<br>
          </div>
          <p>{{ event.description }}</p>

          <div class="register-container">
            <div v-if="event.attending.includes(uid)" class="attending-indicator">🦕 Registered to this event </div>
            <div class="register"></div>
          </div>

        </button>
      </div>
    </div>
    <NavBar></NavBar>
  </div>
</template>

<script setup>
import { formatDate } from "@/main.js"
import { useRoute, useRouter } from "vue-router"
import { onMounted, ref } from 'vue'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, uid, goToUsers } from '@/firebase';
import NavBar from "../../components/NavBar.vue"
import SocietyPageNav from "../../components/SocietyPageNav.vue"
import JoinSociety from "../../components/JoinSociety.vue"
import CommitteeAction from "../../components/CommitteeAction.vue"

const route = useRoute()
const router = useRouter()

const name = route.params.name

const id = ref("")
const events = ref([])
const isCommittee = ref(false)

onMounted(async () => {
  goToUsers()

  const sq = query(collection(db, "societies"), where("name", "==", name))
  const squerySnapshot = await getDocs(sq);
  const res = []
  squerySnapshot.forEach(doc => res.push({id: doc.id, ...doc.data()}))

  if (res.length !== 1) {
    router.push("/invalidPage")
    return
  }

  const data = res[0]
  id.value = data.id
  isCommittee.value = data.committee && data.committee.includes(uid)
  // // console.log(id.value)

  const eq = query(collection(db, "events"), where("societyID", "==", id.value))
  const equerySnapshot = await getDocs(eq);
  const eres = []
  equerySnapshot.forEach(doc => eres.push({ id: doc.id, ...doc.data() }))
  // // console.log("eres", eres)
  events.value = eres
  console.log(events.value[0])
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

.event:hover {
  background-color: #f9f9f9;
  border-color: #bbb;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
  margin-bottom: 1rem;
}

.no-events {
  font-size: larger;
  text-align: left;
  color: black;
  padding: 20px;
  margin: auto;
  width: min(80vw, 500px);
}

.events-container {
  /* top: 10rem; */
  width: 100vw;
  height: calc(100vh - 12.6rem);
  border: 1px solid #ccc;
  overflow-y: auto;
  margin-top: 1rem;
  position: relative;
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