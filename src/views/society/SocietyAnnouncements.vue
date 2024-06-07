<template>
  <div class="app">
    <div v-if="!id">Something Went Wrong</div>

    <div v-else>
      <h1>{{ $route.params.name }}</h1>
      <JoinSociety :id="id" :society-name="name"></JoinSociety>
      <SocietyPageNav :society-name="route.params.name"></SocietyPageNav>
      <div class="announcements-container">
        <div class="no-announcements" v-if="announcements.length == 0">Nothing here yet...</div>
        <div v-else class="announcements-list" v-for="a in announcements" :key="a.title">
          <div class="announcement">
            <h2>{{ a.title }}</h2>
            <div class="details">
              <span>Date & Time:</span>{{ formatDate(a.dateTime?.toDate()) }}<br>
              {{ a.body }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <NavBar></NavBar>
  </div>
</template>

<script setup>
import {formatDate} from "@/main.js"
import { useRoute, useRouter } from "vue-router"
import { onMounted, ref } from 'vue'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '@/firebase';
import NavBar from "../../components/NavBar.vue"
import SocietyPageNav from "../../components/SocietyPageNav.vue"
import JoinSociety from "../../components/JoinSociety.vue"
const route = useRoute()
const router = useRouter()

const name = route.params.name

const id = ref("")
const announcements = ref([])

console.log(announcements.value)
console.log(router)

onMounted(async () => {
  const sq = query(collection(db, "societies"), where("name", "==", name))
  const squerySnapshot = await getDocs(sq);
  const sres = []
  squerySnapshot.forEach(doc => sres.push(doc.id))

  if (sres.length !== 1) return
  id.value = sres[0]

  const aq = query(collection(db, "announcements"), where("societyID", "==", id.value))

  const aquerySnapshot = await getDocs(aq);
  const ares = []
  aquerySnapshot.forEach(doc => ares.push({ id: doc.id, ...doc.data() }))
  // console.log("eres", eres)
  announcements.value = ares


})

</script>

<style scoped>

h1 {
  height: 5rem;
  background-color: white;
  margin: 0;
  padding: 1rem;

}

.announcement {
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

.no-announcements {
  font-size: larger;
  text-align: left;
  color: black;
  padding: 20px;
  margin: auto;
  width: min(80vw, 500px);
}

.announcement h2 {
  margin-top: 0;
  /* text-align: left; */
}

.announcement .details {
  margin-bottom: 10px;
}

.announcement .details span {
  display: inline-block;
  min-width: 100px;
  font-weight: bold;
  margin-bottom: 1rem;
}

.announcements-container {
  /* top: 10rem; */
  width: 100vw;
  height: calc(100vh - 11rem);
  border: 1px solid #ccc;
  overflow-y: auto;
  margin-top: 1rem;
}
.announcements-list {
  /* height: 50px; */
  top: 8rem;
  padding-top: 1rem;
  overflow: auto;
  padding: 1rem;
}

</style>