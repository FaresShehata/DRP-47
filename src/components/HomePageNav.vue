<template>
  <nav>
    <RouterLink :to="`/announcements`">Announcements</RouterLink>
    <RouterLink :to="`/events`">Events</RouterLink>
  </nav>
</template>

<style scoped>
nav {
  background-color: #e9ecef;
  left: -1rem;
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  top: 5rem;
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


