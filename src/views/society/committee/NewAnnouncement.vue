<template>
hello
</template>

<script setup>
import { useRoute, useRouter } from "vue-router"
import { onMounted, ref } from 'vue'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, uid, goToUsers } from '@/firebase';

const route = useRoute()
const router = useRouter()

const name = route.params.name

const id = ref("")
const events = ref([])
const isCommittee = ref(false)

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
  // // console.log(id.value)

  const eq = query(collection(db, "events"), where("societyID", "==", id.value))
  const equerySnapshot = await getDocs(eq);
  const eres = []
  equerySnapshot.forEach(doc => eres.push({ id: doc.id, ...doc.data() }))
  // // console.log("eres", eres)
  events.value = eres
  console.log(events.value[0])
})


</script>

<script scoped>

</script>