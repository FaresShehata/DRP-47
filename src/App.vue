<template>
  <RouterView></RouterView>
</template>

<script setup>

</script>

<style>
.app {
  text-align: center;
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  height: 100vh;
  overflow-y: hidden;
}

body {
  margin: 0;
}

.tab-link {
  /* Add your tab styling here */
  display: inline-block;
  padding: 10px 5px;
  margin-right: 10px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-decoration: none;
  color: #333;
  transition: background-color 0.2s; /* Add a smooth transition effect */
}

.active-tab {
  background-color: darkgrey;
  color: #333; /* White text color */
  font-weight: bold; /* Make the text bold */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
  transform: translateY(1px); /* Slightly push the button down */
}

h1 {
  font-size: min(7vh, 22px);
  height: 5rem;
  background-color: white;
  margin: 0;
  padding: 1rem;

}
/* nav {
  background-color: #e9ecef;
  padding: 1em;
  display: flex;
  justify-content: space-around;
} */
.registered-button {
  all: unset;
  position: absolute;
  top: 1rem;
  font-size: min(3vw, 2vh, 20px);
  left: 1vw;
  width: min(22vw, 16vh);
  height: 2rem;
  border-radius: 1rem;
  color: white;
  background-color: rgb(0, 149, 246);
  border-style: none;
  cursor: pointer;
}
.all-button {
  background-color: #333;
}
</style>
