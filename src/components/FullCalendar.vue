<template>
  <div class="calendar">
    <div class="header">
      <button @click="prevMonth">Previous</button>
      <h2>{{ format(currentMonth, 'MMMM yyyy') }}</h2>
      <button @click="nextMonth">Next</button>
    </div>
    <div class="days">
      <div v-for="day in daysOfWeek" :key="day" class="day-header">{{ day }}</div>
      <div
        v-for="day in daysInMonth"
        :key="day.date"
        :class="{
          'different-month': !isSameMonth(day.date, currentMonth),
          'selected': isSameDay(day.date, selectedDate),
          'day': true
        }"
        @click="isSameMonth(day.date, currentMonth) && selectDate(day.date)"
      >
        <span :class="{ 'today': isToday(day.date) }">{{ format(day.date, 'd') }}</span>
        <div v-if="day.events.length" class="events">
          <button 
            class="event" 
            v-for="event in day.events" 
            :key="event"
            @click="router.push(`/societies/${event.societyname}/events/${event.id}`)"
          >
            {{ event.title }}
          </button>
        </div>
      </div>
    </div>
    <!-- <EventModal v-if="showModal" :date="selectedDate" @close="showModal = false" @saveEvent="addEvent"/> -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isToday, addMonths, isSameDay, isSameMonth } from 'date-fns';
import { db, goToUsers } from '@/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import {useRouter} from "vue-router";

const currentMonth = ref(new Date());
const selectedDate = ref(null);
const events = ref({});
const router = useRouter();

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const daysInMonth = computed(() => {
  const start = startOfWeek(startOfMonth(currentMonth.value));
  const end = endOfWeek(endOfMonth(currentMonth.value));

  const days = [];
  let date = start;
  while (date <= end) {
    const day = {
      date,
      events: events.value[format(date, 'yyyy-MM-dd')] || [],
    };
    days.push(day);
    date = addDays(date, 1);
  }
  return days;
});

const prevMonth = () => {
  currentMonth.value = addMonths(currentMonth.value, -1);
  fetchEvents();
};

const nextMonth = () => {
  currentMonth.value = addMonths(currentMonth.value, 1);
  fetchEvents();
};

const selectDate = (date) => {
  if (isSameMonth(date, currentMonth.value)) {
    selectedDate.value = date;
  }
};

const fetchEvents = async () => {
  goToUsers();
  const start = startOfMonth(currentMonth.value);
  const end = endOfMonth(currentMonth.value);
  const q = query(
    collection(db, 'events'),
    where('dateTime', '>=', Timestamp.fromDate(start)),
    where('dateTime', '<=', Timestamp.fromDate(end))
  );
  const querySnapshot = await getDocs(q);
  const fetchedEvents = {};
  querySnapshot.forEach((doc) => {
    const data = {id: doc.id, ...doc.data()};
    if (data.dateTime && data.dateTime instanceof Timestamp) {
      const date = data.dateTime.toDate(); // Convert Firestore timestamp to JavaScript Date object
      const dateStr = format(date, 'yyyy-MM-dd');
      if (!fetchedEvents[dateStr]) {
        fetchedEvents[dateStr] = [];
      }
      fetchedEvents[dateStr].push(data);
    } else {
      console.warn(`Invalid date format for event: ${doc.id}`, data);
    }
  });
  events.value = fetchedEvents;
};

onMounted(fetchEvents);



</script>


<style scoped>
.calendar {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-family: Arial, sans-serif;

}

.nav-button {
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.nav-button:hover {
  background-color: #0056b3;
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  font-family: Arial, sans-serif;

}

.day-header {
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
  font-family: Arial, sans-serif;

}

.day {
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 5px;
  background-color: #fafafa;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  font-family: Arial, sans-serif;

}

.day:hover {
  background-color: #e0e0e0;
  transform: scale(1.05);
}

.today {
  color: #007bff;
  font-weight: bold;
}

.different-month {
  color: #999;
  background-color: #f9f9f9;
}

.selected {
  border: 2px solid #007bff;
  background-color: #e6f7ff;
}

.events {
  margin-top: 10px;
}

.event {
  display: block;
  background-color: #ffeb3b;
  margin-top: 5px;
  padding: 2px 5px;
  border-radius: 3px;
  font-size: 0.8em;
}
</style>
