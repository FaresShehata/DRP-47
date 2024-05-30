<template>
  <div class="app">
    <h2>Search Societies</h2>
    <!-- <ul class="societies-list"> -->
    <div class="scrollable-container">
      <div class="scrollable-header">University Societies</div>
      <div class="scrollable-list">
        <ul v-for="society in societies" :key="society.id">
          <li class="society-item">
            <RouterLink :to='`/societies/${society.name}/events`'>{{ society.name }}</RouterLink>
          </li>
        </ul>
      </div>
    </div>

    <NavBar></NavBar>
  </div>
</template>

<script setup>
import NavBar from "../components/NavBar.vue"
import { ref, onMounted } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from '@/firebase';

const societies = ref([])


onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, "societies"))
  const dbsocieties = []

  querySnapshot.forEach(doc =>
    dbsocieties.push({
      id: doc.id,
      name: doc.data().name
  }))
  
  dbsocieties.sort((a, b) => a.name < b.name ? -1 : 1)
  
  societies.value = dbsocieties
})


// societies.value = societies.value;

</script>


<style>
.scrollable-container {
  width: 70%;
  max-width: 800px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  margin: 20px auto;
  /* Centering the container */
}

.scrollable-header {
  background-color: #808080;
  color: white;
  padding: 10px;
  text-align: center;
  font-size: 24px;
}

.scrollable-list {
  height: 500px;
  overflow-y: auto;
  padding: 20px;
}

.scrollable-list ul {
  list-style: none;
  padding: 0;
}

.scrollable-list li {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.scrollable-list li:last-child {
  border-bottom: none;
}
</style>