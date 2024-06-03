<template>
  <div class="app">
    <h2>Search Societies</h2>
    <div class="scrollable-container">
      <div class="scrollable-header">University Societies</div>
      <div class="scrollable-list">
        <ul>
          <li v-for="society in societies" :key="society.id" class="society-item">
            <RouterLink :to='`/societies/${society.name}/events`'>{{ society.name }}</RouterLink>
          </li>
        </ul>
      </div>
    </div>
    <NavBar></NavBar>
  </div>
</template>

<script setup>
import NavBar from "../components/NavBar.vue";
import { ref, onMounted } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from '@/firebase';

const societies = ref([]);

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, "societies"));
  const dbsocieties = [];

  querySnapshot.forEach(doc =>
    dbsocieties.push({
      id: doc.id,
      name: doc.data().name
  }));
  
  dbsocieties.sort((a, b) => a.name < b.name ? -1 : 1);
  
  societies.value = dbsocieties;
});
</script>

<style>
.app {
  text-align: center;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.scrollable-container {
  width: 90vw;
  height: min(800px, 80vh);
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  margin: 20px auto;
}

.scrollable-header {
  background-color: #e777e4;
  color: white;
  padding: 15px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  border-radius: 8px 8px 0 0;
}

.scrollable-list {
  max-height: min(800px, 80vh);
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
</style>
