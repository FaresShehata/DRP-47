<template>
  <div class="app">
    <h1>Edit About for {{ $route.params.name }}</h1>
    <div class="form-container">
      <form @submit.prevent="editAbout">
        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            id="description"
            v-model="form.description"
            required
            placeholder="Enter the description"
          ></textarea>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="text"
            id="email"
            v-model="form.email"
            placeholder="Enter the email (optional)"
          />
        </div>
        <div class="form-group">
          <label for="website">Website</label>
          <input
            type="text"
            id="website"
            v-model="form.website"
            placeholder="Enter the website (optional)"
          />
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
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db, uid, goToUsers } from "@/firebase";

const route = useRoute();
const router = useRouter();

const name = route.params.name;

const id = ref("");
const isCommittee = ref(false);

const isLoading = ref(false);

const form = ref({
  description: "",
  email: "",
  website: "",
});

async function editAbout() {
  isLoading.value = true;

  await updateDoc(doc(db, "societies", id.value), {
    about: form.value
  });

  router.replace(`/societies/${name}/about`);
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

  form.value = data.about;
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
  min-height: 200px; /* Set a minimum height for the textarea */
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
  background-color: var(--nice-blue);
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
  background-color: var(--hover-blue);
}

.submit-button.loading:hover {
  background-color: grey;
}
</style>
