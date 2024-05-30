<template>
  {{ $route.params.name }}
  <RouterLink to="/societies/jeff">jeff is here</RouterLink>
</template>

<script setup>
import { useRoute } from 'vue-router'


const route = useRoute()

console.log(route.params)

</script>