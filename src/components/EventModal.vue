<template>
  <div class="modal">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <h2>Add Event for {{ format(date, 'MMMM d, yyyy') }}</h2>
      <input v-model="event" placeholder="Event name" />
      <button @click="saveEvent">Save</button>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns';

export default {
  props: ['date'],
  data() {
    return {
      event: '',
    };
  },
  methods: {
    format,
    saveEvent() {
      this.$emit('saveEvent', this.event);
      this.event = '';
    },
  },
};
</script>

<style scoped>
<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 1.2em;
}

h2 {
  margin-bottom: 20px;
}

input {
  width: 80%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}
</style>
