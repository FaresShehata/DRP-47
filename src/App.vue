<template>
  <RouterView></RouterView>
</template>

<script setup>

</script>

<style>
:root {
  --nice-blue: rgb(0, 149, 246);
  --hover-blue: #1991da;
}

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

.no-entries {
  font-size: larger;
  text-align: left;
  color: black;
  padding: 20px;
  margin: auto;
  width: min(80vw, 500px);
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
  padding: 2px 2px;
  top: 1rem;
  font-size: min(3vw, 2vh, 20px);
  left: 1vw;
  width: min(22vw, 16vh);
  height: 2rem;
  border-radius: 1rem;
  color: white;
  background-color: var(--nice-blue);
  border-style: none;
  cursor: pointer;
}
.all-button {
  background-color: #333;
}

.light-text {
  color: lightslategrey;
  font-size: 14px;
  text-align: right;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.trash-button {
  top: 0%;
  right: 0%;
  align-items: center;
  justify-content: center;
  background-color: var(--nice-blue);
  color: white;
  border: none;
  border-radius: 9999px; /* Fully rounded */
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.trash-button:hover {
  background-color: var(--hover-blue); /* Slightly darker blue on hover */
}

.confirm-dialog {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.confirm-dialog-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.confirm-dialog-content p {
  margin-bottom: 20px;
}

/*Styles for dialog box buttons */
.button-group {
  display: flex;
  gap: 10px;
}

.button-group button {
  margin: 0;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.button-group button:first-of-type {
  background-color: rgb(0, 149, 246);
  color: white;
}

.button-group button:last-of-type {
  background-color: #ddd;
}
</style>
