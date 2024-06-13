<template>
  <div class="app ">
    <CommitteeAction v-if="isCommittee" :id="id" :society-name="name" is-edit></CommitteeAction>
    <h1>{{ name }}</h1>
    <JoinSociety :id="id" :society-name="name" :is-committee="isCommittee"></JoinSociety>
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
import { db, uid, goToUsers } from '@/firebase';
import NavBar from "../../components/NavBar.vue"
import SocietyPageNav from "../../components/SocietyPageNav.vue"
import JoinSociety from "../../components/JoinSociety.vue"
import CommitteeAction from "../../components/CommitteeAction.vue"
const route = useRoute()
const router = useRouter()

const name = route.params.name

const id = ref("")
const about = ref("")
const isCommittee = ref(false)

// console.log(about.value)
// console.log(router)

onMounted(async () => {
  goToUsers()

  const sq = query(collection(db, "societies"), where("name", "==", name))
  const squerySnapshot = await getDocs(sq);
  const res = []
  squerySnapshot.forEach(doc => res.push({id: doc.id, ...doc.data()}))

  if (res.length !== 1) {
    router.push("/invalidPage")
    return
  }

  const data = res[0]
  id.value = data.id
  isCommittee.value = data.committee && data.committee.includes(uid)

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
  width: vw;
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
  overflow-x: hidden;
  width: min(600px, 90vw);
  padding: 2rem;
  height: calc(100vh - 11rem);
  overflow-y: auto;
  text-align: left;
  margin-top: 2rem;
  position: relative;
}
</style>