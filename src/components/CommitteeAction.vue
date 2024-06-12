<template>
  <div id="container" ref="container">
    <button id="committee-action" @click="toggleOptions">
      <p id="plus" v-if="!isEdit">+</p>
      <i v-else id="edit" class="fa-solid fa-pen-to-square"></i>
    </button>
    <div id="options" v-if="showOptions">
      <RouterLink :to="`/societies/${societyName}/new-announcement`" class="option">New Announcement</RouterLink>
      <RouterLink :to="`/societies/${societyName}/new-event`" class="option">New Event</RouterLink>
      <RouterLink :to="`/societies/${societyName}/edit-about`" class="option">Edit About</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, defineProps } from 'vue'

const props = defineProps({id: String, societyName: String, isEdit: Boolean})

props.id

const showOptions = ref(false)
const container = ref(null)

const toggleOptions = () => {
  showOptions.value = !showOptions.value
}

const handleClickOutside = (event) => {
  if (container.value && !container.value.contains(event.target)) {
    showOptions.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
#container {
  position: absolute;
  bottom: 6rem;
  right: 2vw;
  z-index: 100;
}

#plus {
  all: unset;
}

#edit {
  font-size: 1.2rem;
}

#committee-action {
  all: unset;
  background-color: var(--nice-blue);
  color: white;
  width: 3rem;
  font-size: 2rem;
  aspect-ratio: 1;
  border-radius: 50%;
  cursor: pointer;
  display: grid;
  place-items: center;
}

#committee-action:hover {
  background-color: #76d5f5;
}

#options {
  position: absolute;
  bottom: 4rem; /* Adjust this value as needed to position the options correctly */
  right: 0;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.option {
  all: unset;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.option:hover {
  background-color: #f0f0f0;
}
</style>
