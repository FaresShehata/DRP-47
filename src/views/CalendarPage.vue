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
  <div id="app">
    <NavBar />
    <div class="calendar-container">
      <Calendar />
    </div>
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

#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center contents vertically */
  align-items: center;
  box-sizing: border-box;
}

.calendar-container {
  width: 100%;
  max-width: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}

@media (max-width: 600px) {
  .calendar-container {
    padding: 10px;
  }
}
</style>
