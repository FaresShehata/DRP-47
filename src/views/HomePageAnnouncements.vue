<template>
  <div class="app">
    <div v-if="false">Something Went Wrong</div>

    <div v-else>
      <h1>Recent Announcements</h1>
      <HomePageNav></HomePageNav>
      <div class="announcements-container">
        <div class="announcements-list" v-for="a in announcements" :key="a.id">
          <div class="announcement">
            <h2>{{ a.title }}: {{ a.societyName }}</h2>
            <div class="details">
              <span>Date & Time:</span>{{ a.dateTime?.toDate() }}<br>
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
import NavBar from "../components/NavBar.vue"
import HomePageNav from "../components/HomePageNav.vue"
import { onMounted, ref } from 'vue'
import { doc, getDoc, getDocs, query, collection, where, orderBy } from "firebase/firestore";
import { db, uid } from '@/firebase';

const announcements = ref([])

onMounted(async () => {
  const userDoc = await getDoc(doc(db, "users", uid))
  const societies = userDoc.data().societies
  const societyIDs = societies.map(s => s.id)

  console.log(userDoc)

  const aq = query(
    collection(db, "announcements"),
    where("societyID", "in", societyIDs),
    orderBy("dateTime", "desc")
  )
  const aquerySnapshot = await getDocs(aq);

  console.log(aquerySnapshot)

  const ares = []
  aquerySnapshot.forEach(doc => ares.push({ id: doc.id, ...doc.data() }))

  announcements.value = ares
  console.log(ares)

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
  height: calc(100vh - 12.6rem);
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