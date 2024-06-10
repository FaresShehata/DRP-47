<template>
  <div class="app">
    <h1>This page does not exist</h1>
    <p>Try Go To Home Again</p>
    <NavBar></NavBar>
  </div>
</template>

<script setup>
import { goToUsers } from '@/firebase';
import { onMounted } from "vue" 
import NavBar from "../components/NavBar.vue"

onMounted(() => {
  goToUsers()
})
</script>

<style scoped>
</style>