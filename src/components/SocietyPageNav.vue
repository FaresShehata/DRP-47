<template>
  <nav>
    <RouterLink :to="`/societies/${societyName}/announcements`" class="tab-link"
    active-class="active-tab">Announcements</RouterLink>
    <RouterLink :to="`/societies/${societyName}/events`" class="tab-link"
    active-class="active-tab">Events</RouterLink>
    <RouterLink :to="`/societies/${societyName}/about`" class="tab-link"
    active-class="active-tab">About</RouterLink>
  </nav>
</template>

<style scoped>
nav {
  background-color: #e9ecef;
  left: -0.7rem;
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  top: 4rem;
  width: 100vw;
  position: fixed;
  margin: 0;
}

RouterLink {
  /* padding: 10px 20px; */
  /* width: 30vw; */
  font-size: 16px;
  margin: 0;
}


</style>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({societyName: String})

// // console.log(props?.societyName)

/* 
JxiDgyZlvA4EfHASFbIn
PWN5xrxl34Tcov01RB17
utnpaoDeZzzsKrET4uui

*/
</script>

