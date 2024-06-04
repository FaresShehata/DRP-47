<template>
  <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to='/search'>Search Societies</RouterLink>
    <RouterLink to="/my-societies">My Societies</RouterLink>
    <!-- <button @click="navigateTo('AddPage')">AddPage</button>
    <button @click="navigateTo('MySocieties')">My Societies</button> -->
  </nav>
</template>


<style scoped>
nav {
  background-color: #e9ecef;
  padding: 1em;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 10px;
  bottom: 0;
  width: 100vw;
  position: fixed;
  margin: 0;
}

RouterLink {
  /* padding: 10px 20px; */
  font-size: 16px;
}
</style>

<script>

</script>