<template>
  <div class="app">

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
  top: 2vh;
  margin-bottom: 20px;
  width: 60vw;
  position: relative;
}

#search-bar {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #ccc; /* Light gray border */
  border-radius: 50px; /* Rounded corners */
  background-color: #fff; /* White background */
  color: #000; /* Black text */
  outline: none; /* Remove default outline */
  font-size: 16px;
  transition: border-color 0.3s; /* Smooth transition for border color */
}


#search-bar::placeholder {
  color: #8899a6; /* Placeholder text color */
}

#search-bar:focus {
  border-color: #1da1f2; /* Border color on focus */
}

.filter-container {
  padding: 20px;
  position: relative;
  top: 3.5rem;

}

.scrollable-container {
  padding: 10px;
  width: min(80vw, 600px);
  height: calc(90vh - 15rem);
  background-color: #ffffff;
  border: 1px;
  border-color: #000;
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

