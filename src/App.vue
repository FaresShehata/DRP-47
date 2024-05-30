<template>
    <!-- <header>
      <h1>{{ currentSection }}</h1>
    </header> -->
    <main>
      <router-view></router-view>
    </main>

</template>

<script>

</script>

<style>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
  text-align: center;
}
header {
  background-color: #f8f9fa;
  padding: 1em;
}
main {
  flex-grow: 1;
}
/* nav {
  background-color: #e9ecef;
  padding: 1em;
  display: flex;
  justify-content: space-around;
} */

</style>
