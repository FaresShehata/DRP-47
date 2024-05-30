<template>
  <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to='/search'>Search Societies</RouterLink>
    <RouterLink to="/my-societies">My Societies</RouterLink>
    <!-- <button @click="navigateTo('AddPage')">AddPage</button>
    <button @click="navigateTo('MySocieties')">My Societies</button> -->
  </nav>
</template>


<style>
nav {
  background-color: #e9ecef;
  padding: 1em;
  display: flex;
  justify-content: space-around;
}

RouterLink {
  padding: 10px 20px;
  font-size: 16px;
}
</style>

<script>

</script>