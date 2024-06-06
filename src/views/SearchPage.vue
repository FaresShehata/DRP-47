<template>
  <div class="app">
    <h2>Search Societies</h2>
    <div class="search-container">
      <input type="text" id="search-bar" v-model="searchTerm" placeholder="Search societies">
    </div>
    <div class="filter-container">
      <label for="category">Filter by Category:</label>
      <select id="category" v-model="selectedCategory" @change="filterSocieties">
        <option value="">All Categories</option>
        <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
      </select>
    </div>
    <div class="scrollable-container">
      <!-- <div class="scrollable-header">University Societies</div> -->
      <div class="scrollable-list">
        <ul>
          <li v-for="society in filteredSocieties" :key="society.id" class="society-item">
            <RouterLink class="society-entry" :to="`/societies/${society.name}/events`">
              <div>{{ society.name }}</div>
              <div>{{ society.category }}</div>
            </RouterLink>
          </li>
        </ul>
        <p v-if="filteredSocieties.length === 0 && searchTerm !== ''">No results found for "{{ searchTerm }}"</p>
      </div>
    </div>
    <NavBar></NavBar>
  </div>
</template>


<script setup>
import NavBar from "../components/NavBar.vue";
import { ref, onMounted, computed } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

const societies = ref([]);
const categories = ref([]);
const selectedCategory = ref("");
const searchTerm = ref("");

const filteredSocieties = computed(() => {
  // Combine search and category filtering
  return societies.value.filter((society) => {
    const nameMatch = society.name.toLowerCase().startsWith(searchTerm.value.toLowerCase());
    const categoryMatch = selectedCategory.value === "" || society.category === selectedCategory.value;
    return nameMatch && categoryMatch;
  });
});

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, "societies"));
  const dbSocieties = [];
  const dbCategories = new Set();

  querySnapshot.forEach((doc) => {
    const societyData = doc.data();
    dbSocieties.push({
      id: doc.id,
      name: societyData.name,
      category: societyData.category,
    });
    dbCategories.add(societyData.category);
  });

  dbSocieties.sort((a, b) => (a.name < b.name ? -1 : 1));

  societies.value = dbSocieties;
  // societies.value = Array(50).fill({id: "test", name:"test", category:"asdgyu"});
  categories.value = Array.from(dbCategories).sort();
});

</script>


<style scoped>

.search-container {
  margin-bottom: 20px;
  width: 60vw
}

.filter-container {
  margin: 20px 0;
}

.scrollable-container {
  width: min(80vw, 600px);
  height: calc(90vh - 15rem);
  background-color: #ffffff;
  border: 5;
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
  border-radius: 8px;
  overflow: fix;
  margin: 20px auto;
}

/* .scrollable-header {
  width: 90vw;
  background-color: #e777e4;
  color: white;
  padding: 15px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  border-radius: 8px 8px 0 0;

} */

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

