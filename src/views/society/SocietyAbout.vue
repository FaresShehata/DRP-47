<template>
  <div class="app ">
    <h1>{{ name }}</h1>
    <JoinSociety :id="id" :society-name="name"></JoinSociety>
    <SocietyPageNav :society-name="route.params.name"></SocietyPageNav>
    <div class="about">
      <h2>About</h2>
      <div class="details"> {{ about?.description }} </div>
      <div class="no-announcements" v-if="!about">Nothing here yet...</div>
      <div class="contact-box" v-if="about?.email || about?.website">
        <h2>Contact</h2>
        <p v-if="about.email"><strong>Email:</strong> <a :href="'mailto:' + about.email">{{ about.email }}</a></p>
        <p v-if="about.website"><strong>Website:</strong> <a :href="about.website" target="_blank" rel="noopener">{{
          about.website }}</a></p>
      </div>
    </div>
    <NavBar></NavBar>
  </div>
</template>
<script setup>
import { useRoute, useRouter } from "vue-router"
import { onMounted, ref } from 'vue'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, goToUsers } from '@/firebase';
import NavBar from "../../components/NavBar.vue"
import SocietyPageNav from "../../components/SocietyPageNav.vue"
import JoinSociety from "../../components/JoinSociety.vue"
const route = useRoute()
const router = useRouter()

const name = route.params.name

const id = ref("")
const about = ref("")

// console.log(about.value)
// console.log(router)

onMounted(async () => {
  goToUsers()
  const sq = query(collection(db, "societies"), where("name", "==", name))
  const squerySnapshot = await getDocs(sq);
  const sres = []
  squerySnapshot.forEach(doc => sres.push(doc.id))

  if (sres.length !== 1) {
    router.push("/invalidPage")
    return
  }
  id.value = sres[0]

  const aq = query(collection(db, "societies"), where("name", "==", name))
  const aquerySnapshot = await getDocs(aq);
  const ares = []
  aquerySnapshot.forEach(doc => ares.push(doc.data()))
  about.value = ares[0].about
})

</script>

<style scoped>
.contact-box {
  position: relative;
  width: 90vw;
  padding: 20px;
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  transition: all 0.1s ease;
  margin: 20px auto;
  box-sizing: border-box;
}

h1 {
  height: 5rem;
  background-color: white;
  margin: 0;
  padding: 1rem;

}



.announcement .details span {
  display: inline-block;
  min-width: 100px;
  font-weight: bold;
  margin-bottom: 1rem;
}

.about {
  /* top: 10rem; */
  width: min(600px, 90vw);
  padding: 2rem;
  height: calc(100vh - 11rem);
  overflow-y: auto;
  text-align: left;
  margin-top: 2rem;
}
</style>