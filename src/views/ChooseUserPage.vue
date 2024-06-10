<template>
  <div id="customAlert" class="modal">
    <div class="modal-content">
      <p>Select User</p>
      <button @click="handleOption('Basic User')">Bob the Basic</button>
      <button @click="handleOption('Committee User')">Carl the Committee</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"
// import router from "../router/router.js"
import { setBasicUID, setCommUID } from "../firebase.js"
const router = useRouter()
// function showAlert() {
//   document.getElementById('customAlert').style.display = 'block';
// }

function closeAlert() {
    document.getElementById('customAlert').style.display = 'none';
}

function handleOption(option) {
    closeAlert();
    if (option === 'Basic User') {
    setBasicUID();
    } else if (option === 'Committee User') {
    setCommUID();
    }
    router.push('/announcements');
}

</script>

<style scoped>
#customAlert {
    position: relative;
    background-color: #fefefe;
    margin: 5% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 300px;
    text-align: center;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
}

</style>