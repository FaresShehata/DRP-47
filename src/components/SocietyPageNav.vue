<template>
  <nav>
    <RouterLink :to="`/societies/${societyName}/announcements`">Announcements</RouterLink>
    <RouterLink :to="`/societies/${societyName}/events`">Events</RouterLink>
    <RouterLink :to="`/societies/${societyName}/about`">About</RouterLink>
  </nav>
</template>


<style scoped>
nav {
  background-color: #e9ecef;
  padding: 1em;
  display: flex;
  justify-content: space-around;
  top: 5rem;
  width: 100vw;
  position: fixed;
  /* margin: 0; */
}

RouterLink {
  /* padding: 10px 20px; */
  font-size: 16px;
}
</style>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({societyName: String})

console.log(props?.societyName)

</script>