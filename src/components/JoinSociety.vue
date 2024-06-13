<template>
  <button v-if="isCommittee" class="join admin"> Committee </button>
  <button v-else-if="!joined" class="join" @click="join()">Join</button>
  <button v-else class="join leave" @click="leave()">Leave</button>
</template>

<script setup>
import { defineProps, ref, onMounted, watch } from "vue"
import { db, uid } from '@/firebase';
import { doc, getDoc, runTransaction } from "firebase/firestore";
const props = defineProps({ id: String, societyName: String, isCommittee: Boolean })


// const joined = computed(async () => {
//   const userDoc = await getDoc(doce(db, "users", uid))
//   return userDoc.data().societies.filter(s => s.id == props.id).length > 0
// 

const joined = ref(false)
// eslint-disable-next-line
watch(() => props.id, async (newID, _) => {
  const userDoc = await getDoc(doc(db, "users", uid))
  joined.value = userDoc.data().societies.filter(s => s.id == newID).length > 0
});

onMounted(async () => {
  const userDoc = await getDoc(doc(db, "users", uid))
  console.log(props.id)
  // // console.log(userDoc.data().name)
  joined.value = userDoc.data().societies.filter(s => s.id == props.id).length > 0
})

async function join() {
  joined.value = true

  try {
    await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(doc(db, "users", uid));
      if (!userDoc.exists()) {
        throw "Document does not exist!";
      }

      const newSocieties = []
      for (let s of userDoc.data().societies) {
        if (s.id !== props.id) newSocieties.push(s)
      }
      newSocieties.push({ id: props.id, name: props.societyName })

      transaction.update(doc(db, "users", uid), { societies: newSocieties });
    });
    // // console.log("Transaction successfully committed!");

  } catch (e) {
    // // console.log("Transaction failed: ", e);
  }
}

async function leave() {
  joined.value = false

  try {
    await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(doc(db, "users", uid));
      if (!userDoc.exists()) {
        throw "Document does not exist!";
      }

      const newSocieties = []
      for (let s of userDoc.data().societies) {
        if (s.id !== props.id) newSocieties.push(s)
      }

      transaction.update(doc(db, "users", uid), { societies: newSocieties });
    });
    // // console.log("Transaction successfully committed!");

  } catch (e) {
    // // console.log("Transaction failed: ", e);
  }
}

</script>

<style scoped>
.join {
  all: unset;
  position: absolute;
  top: 1rem;
  right: 1vw;
  width: min(22vw, 16vh);
  height: 2rem;
  border-radius: 1rem;
  color: white;
  background-color: var(--nice-blue);
  border-style: none;
  cursor: pointer;
  font-size: min(3vw, 2vh, 20px);
}

.leave {
  background-color: #363636;
}

.admin {
  cursor:auto;
  width: 6rem;
}
</style>