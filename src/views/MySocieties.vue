<template>
  <div class="app">
    <h2>{{userName.endsWith("s") ? userName + "'" : userName + "'s"}} Societies</h2>
    <div class="scrollable-container">
      <div class="scrollable-list">
        <ul>
          <li v-for="society in userSocieties" :key="society.id" class="society-item">
            <RouterLink class="society-entry" :to="`/societies/${society.name}/events`">
              <div>{{ society.name }}</div>
            </RouterLink>
          </li>
        </ul>
        <p v-if="userSocieties.length === 0">You aren't part of any societies</p>
      </div>
    </div>
    
    <NavBar></NavBar>
  </div>
</template>

<script setup>
import NavBar from "../components/NavBar.vue"

import { ref, onMounted } from "vue";
import { getDoc, doc } from "firebase/firestore";
import { db, uid, userName, goToUsers } from "@/firebase";
// const mySocieties = computed(() => {
//   return 

// })

const userSocieties = ref([]);

onMounted(async () => {
  goToUsers()
  const userDoc = await getDoc(doc(db, "users", uid))
  const societies = userDoc.data().societies
  userSocieties.value = societies.sort((a, b) => b.name < a.name ? 1 : -1)
  // console.log(societies)
  // const societyIDs = societies.map(s => s.id)
  
  // try {
  //   const userDoc = await getDoc(doc(db, "users", uid));
  //   if (userDoc.exists()) {
  //     const userData = userDoc.data();
  //     userSocieties.value = userData.societies ? userData.societies.sort() : [];
  //   } else {
  //     // console.log("No such document!");
  //   }
  // } catch (error) {
  //   console.error("Error fetching user document:", error);
  // }
});

</script>

<style scoped>

.search-container {
  margin-bottom: 20px;
}

.filter-container {
  margin: 20px 0;
}

.scrollable-container {
  width: min(80vw, 600px);
  height: calc(90vh - 10rem);
  background-color: #ffffff;
  border: 5;
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
  border-radius: 8px;
  overflow: fix;
  margin: 20px auto;
}

.scrollable-list {
  height: 100%;
  overflow-y: auto;
  padding: 20px;
}

.scrollable-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.scrollable-list li {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  transition: background-color 0.3s;
}

.scrollable-list li:last-child {
  border-bottom: none;
}

.scrollable-list li:hover {
  background-color: #f1f1f1;
}

.scrollable-list a {
  text-decoration: none;
  color: #401b5c;
  font-size: 18px;
}

.scrollable-list a:hover {
  text-decoration: underline;
}

.society-entry {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

</style>