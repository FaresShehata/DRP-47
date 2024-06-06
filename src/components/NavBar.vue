<template>
  <nav>
    <RouterLink to="/announcements" class="tab-link"
    active-class="active-tab">Go to Home</RouterLink>
    
    <RouterLink to='/search' class="tab-link"
    active-class="active-tab">Search Societies</RouterLink>
    
    <RouterLink to="/my-societies" class="tab-link"
    active-class="active-tab">My Societies</RouterLink>
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

RouterLink {
  /* padding: 10px 20px; */
  font-size: 16px;
}
</style>

<script>
// NKjrJ3Y6RIjJAouNHjH7
// odsgQ1MWcM1KWxgPuo3e
</script>