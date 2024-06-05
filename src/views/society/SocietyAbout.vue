<template>
  <div class="app ">
    <div v-if="!id">Something Went Wrong</div>

    <div v-else>
      <h1>{{ name }}</h1>
      <SocietyPageNav :society-name="route.params.name"></SocietyPageNav>
        <div class="about">
          <h2>About</h2>
          <div class="details"> {{ about }} </div>
        </div>
    </div>

    <NavBar></NavBar>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router"
import { onMounted, ref } from 'vue'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '@/firebase';
import NavBar from "../../components/NavBar.vue"
import SocietyPageNav from "../../components/SocietyPageNav.vue"
const route = useRoute()
const router = useRouter()

const name = route.params.name

const id = ref("")
const about = ref("")

console.log(about.value)
console.log(router)

onMounted(async () => {
  const sq = query(collection(db, "societies"), where("name", "==", name))
  const squerySnapshot = await getDocs(sq);
  const sres = []
  squerySnapshot.forEach(doc => sres.push(doc.id))

  if (sres.length !== 1) return
  id.value = sres[0]

  const aq = query(collection(db, "societies"), where("name", "==", name))
  const aquerySnapshot = await getDocs(aq);
  const ares = []
  aquerySnapshot.forEach(doc => ares.push(doc.data()))
  console.log(ares)
  about.value = ares[0].about
})


</script>

<style scoped>

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
.about{
  /* top: 10rem; */
  width: 90vw;
  height: calc(100vh - 11rem);
  overflow-y: auto;
  text-align: left;
  margin-top: 2rem;
}

</style>