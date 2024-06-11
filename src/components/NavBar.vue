<template>
  <nav>
    <RouterLink to="/announcements" class="tab-link"
    active-class="active-tab"><i class="fa-solid fa-house"></i></RouterLink>
    
    <RouterLink to='/search' class="tab-link"
    active-class="active-tab"><i class="fa-solid fa-magnifying-glass"></i></RouterLink>
    
    <RouterLink to="/my-societies" class="tab-link"
    active-class="active-tab"><i class="fa-solid fa-users"></i></RouterLink>
  </nav>
</template>

<style scoped>
nav {
  text-align: center;
  font-family: Arial, sans-serif;
  background-color: #e9ecef;
  left: -0.7rem;
  padding: 1em;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 10px;
  bottom: 0;
  width: 100vw;
  position: fixed;
  margin: 0;
}


.i {
  margin: 0;
  padding: 0;
}

</style>

<script setup>
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
// NKjrJ3Y6RIjJAouNHjH7
// odsgQ1MWcM1KWxgPuo3e
</script>