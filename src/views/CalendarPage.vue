<!-- <template>
  <div id="app">
    <NavBar></NavBar>
    <Calendar />

  </div>
</template>

<script setup>
import Calendar from '../components/FullCalendar.vue';
import NavBar from "../components/NavBar.vue"


</script> -->
<template>
  <div class="app">
    <NavBar />
    <Calendar />
  </div>
</template>

<script setup>
import Calendar from '../components/FullCalendar.vue';
import NavBar from "../components/NavBar.vue";
</script>

<style scoped>
body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0; /* Optional: background color for the page */
  font-family: Arial, sans-serif;
}

.calendar-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* box-sizing: border-box; */
}

/* @media (max-width: 600px) {
  .calendar-container {
    padding: 10px;
  }
} */
</style>
