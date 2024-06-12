<template>
  <div class="app">
    <h1>New Announcement for {{ $route.params.name }}</h1>
    <div class="form-container">
      <form @submit.prevent="newAnnouncement">
        <div class="form-group">
          <label for="title">Title</label>
          <input
            type="text"
            id="title"
            v-model="form.title"
            required
            placeholder="Enter the title"
          />
        </div>
        <div class="form-group">
          <label for="body">Body</label>
          <textarea
            id="body"
            v-model="form.body"
            required
            placeholder="Enter the Body"
          ></textarea>
        </div>
        <button
          type="submit"
          class="submit-button"
          :class="{ loading: isLoading }"
          :disabled="isLoading"
        >
          <span v-if="!isLoading">Submit</span>
          <span v-else><i class="fas fa-spinner fa-spin"></i> Posting</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db, uid, goToUsers } from "@/firebase";

const route = useRoute();
const router = useRouter();

const name = route.params.name;

const id = ref("");
const isCommittee = ref(false);

const isLoading = ref(false)


const form = ref({
  title: "",
  body: "",
});

async function newAnnouncement() {
  isLoading.value = true

  await addDoc(collection(db, "announcements"), {
    title: form.value.title,
    body: form.value.body,
    dateTime: serverTimestamp(),
    societyID: id.value,
    societyName: name,
  });

  router.replace(`/societies/${name}/announcements`);
}

onMounted(async () => {
  goToUsers();

  const sq = query(collection(db, "societies"), where("name", "==", name));
  const squerySnapshot = await getDocs(sq);
  const res = [];
  squerySnapshot.forEach((doc) => res.push({ id: doc.id, ...doc.data() }));

  if (res.length !== 1) {
    router.push("/invalidPage");
    return;
  }

  const data = res[0];
  id.value = data.id;
  isCommittee.value = data.committee && data.committee.includes(uid);
  // // console.log(id.value)

  // // console.log("eres", eres)
});
</script>

<style scoped>
.app {
  overflow-y: auto;
  scrollbar-gutter: stable;
}

.form-container {
  width: min(600px, 90vw);
  /* margin-top: 2rem; */
  padding: 1rem 0;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin: 1.5rem 0 1.5rem 0;
  width: min(500px, 80vw);
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #333;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  font-family: Arial, sans-serif; /* Change font-family to a normal font */
  box-sizing: border-box;
}

.form-group textarea {
  resize: none; /* Allow vertical resizing */
  min-height: 300px; /* Set a minimum height for the textarea */
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}

.submit-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: rgb(0, 123, 255);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button.loading {
  background-color: grey;
  cursor: not-allowed;
}

.submit-button:disabled {
  pointer-events: none;
}

.submit-button:hover {
  background-color: #0056b3;
}

.submit-button.loading:hover {
  background-color: grey;
}
</style>
