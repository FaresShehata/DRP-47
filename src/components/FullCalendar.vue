<!-- <template>
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
      >
        <span :class="{ 'today': isToday(day.date) }">{{ format(day.date, 'd') }}</span>
        <div v-if="day.events.length" class="events">
          <button 
            class="event" 
            v-for="event in day.events" 
            :key="event"
            :class="{ 'user-attending': event.userAttending }"
            @click="router.push(`/societies/${event.societyname}/events/${event.id}`)"
          >
            {{ event.title }}
          </button>
        </div>
      </div>
    </div>
    REMEMBER TO COMMENT THE LINE BELOW DICKHEAD
    <EventModal v-if="showModal" :date="selectedDate" @close="showModal = false" @saveEvent="addEvent"/>
  </div>
</template> -->

<!-- <script setup>
import { ref, computed, onMounted } from 'vue';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isToday, addMonths, isSameDay, isSameMonth } from 'date-fns';
// import { db, uid, goToUsers } from '@/firebase';
import {db, uid, goToUsers} from '@/firebase';
import {getDoc, doc, orderBy, collection, query, where, getDocs } from 'firebase/firestore';
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

// const selectDate = (date) => {
//   if (isSameMonth(date, currentMonth.value)) {
//     selectedDate.value = date;
//   }
// };



const fetchEvents = async () => {
  const start = startOfMonth(currentMonth.value);
  const end = endOfMonth(currentMonth.value);

  // Fetch user societies
  const userDoc = await getDoc(doc(db, "users", uid));
  const societies = userDoc.data()?.societies || [];
  const societyIDs = societies.map(s => s.id);

  if (societyIDs.length === 0) {
    events.value = {};
    return;
  }

  // Query for events in the user's societies
  const societyEventsQuery = query(
    collection(db, "events"),
    where("societyID", "in", societyIDs),
    where('dateTime', '>=', Timestamp.fromDate(start)),
    where('dateTime', '<=', Timestamp.fromDate(end)),
    orderBy("dateTime", "desc")
  );

  const societyEventsSnapshot = await getDocs(societyEventsQuery);
  const fetchedEvents = {};
  societyEventsSnapshot.forEach((doc) => {
    const data = { id: doc.id, ...doc.data() };
    if (data.dateTime && data.dateTime instanceof Timestamp) {
      const date = data.dateTime.toDate();
      const dateStr = format(date, 'yyyy-MM-dd');
      if (!fetchedEvents[dateStr]) {
        fetchedEvents[dateStr] = [];
      }
      fetchedEvents[dateStr].push(data);
    } else {
      console.warn(`Invalid date format for event: ${doc.id}`, data);
    }
  });

  // Query for events the user is attending
  const attendedEventsQuery = query(
    collection(db, 'events'),
    where('dateTime', '>=', Timestamp.fromDate(start)),
    where('dateTime', '<=', Timestamp.fromDate(end)), 
    where('attending', 'array-contains', uid)
  );

  const attendedEventsSnapshot = await getDocs(attendedEventsQuery);
  attendedEventsSnapshot.forEach((doc) => {
    const data = { id: doc.id, ...doc.data() };
    if (data.dateTime && data.dateTime instanceof Timestamp) {
      const date = data.dateTime.toDate();
      const dateStr = format(date, 'yyyy-MM-dd');
      if (!fetchedEvents[dateStr]) {
        fetchedEvents[dateStr] = [];
      }
      const existingEvent = fetchedEvents[dateStr].find(event => event.id === data.id);
      if (existingEvent) {
        existingEvent.userAttending = true; // Mark existing event as attended by the user
      } else {
        data.userAttending = true; // Mark this event as attended by the user
        fetchedEvents[dateStr].push(data);
      }
    } else {
      console.warn(`Invalid date format for event: ${doc.id}`, data);
    }
  });

  events.value = fetchedEvents;
};


onMounted(() => {
  goToUsers();
  fetchEvents();
  });



</script> -->


<!-- <style scoped>
.calendar {
  margin: auto;
  margin-top: 1rem;
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
  margin-bottom: 10px;
}

.nav-button {
  padding: 5px 10px;
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
  gap: 5px;
}

.day-header {
  padding: 5px;
  background-color: #f0f0f0;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
}

.day {
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 5px;
  background-color: #fafafa;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
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
  white-space: nowrap; /* Prevent text from wrapping */
  overflow: hidden; /* Hide overflowing text */
  text-overflow: ellipsis;
  max-width: 100px; /* Ensure a fixed width */
  box-sizing: border-box;
}

.user-attending {
  background-color: #4caf50; /* Green background for user-attended events */
  color: white; /* White text for better contrast */
}

/* Responsive Design */
@media (max-width: 600px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
  }

  .nav-button {
    width: 100%;
    margin-bottom: 5px;
  }

  .days {
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
  }

  .day, .day-header {
    padding: 5px;
    font-size: 0.8em;
  }

  .event {
    font-size: 0.7em;
  }
}

</style> -->

<template>
  <div class="calendar">
    <div class="header">
      <button @click="prevMonth" class="nav-button">Previous</button>
      <h2>{{ format(currentMonth, 'MMMM yyyy') }}</h2>
      <button @click="nextMonth" class="nav-button">Next</button>
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
      >
        <span :class="{ 'today': isToday(day.date) }">{{ format(day.date, 'd') }}</span>
        <div v-if="day.events.length" class="events">
          <button 
            class="event" 
            v-for="event in day.events" 
            :key="event.id"
            :class="{ 'user-attending': event.userAttending }"
            @click="router.push(`/societies/${event.societyname}/events/${event.id}`)"
          >
            {{ event.title }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isToday, addMonths, isSameDay, isSameMonth } from 'date-fns';
import { db, uid, goToUsers } from '@/firebase';
import { getDoc, doc, orderBy, collection, query, where, getDocs } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import { useRouter } from "vue-router";

const currentMonth = ref(new Date());
const selectedDate = ref(null);
const events = ref({});
const router = useRouter();

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const daysInMonth = computed(() => {
  const start = startOfWeek(startOfMonth(currentMonth.value));
  const end = endOfWeek(addDays(start, 41)); // 42 days for 6 weeks

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

const fetchEvents = async () => {
  const start = startOfMonth(currentMonth.value);
  const end = endOfMonth(currentMonth.value);

  // Fetch user societies
  const userDoc = await getDoc(doc(db, "users", uid));
  const societies = userDoc.data()?.societies || [];
  const societyIDs = societies.map(s => s.id);

  if (societyIDs.length === 0) {
    events.value = {};
    return;
  }

  // Query for events in the user's societies
  const societyEventsQuery = query(
    collection(db, "events"),
    where("societyID", "in", societyIDs),
    where('dateTime', '>=', Timestamp.fromDate(start)),
    where('dateTime', '<=', Timestamp.fromDate(end)),
    orderBy("dateTime", "desc")
  );

  const societyEventsSnapshot = await getDocs(societyEventsQuery);
  const fetchedEvents = {};
  societyEventsSnapshot.forEach((doc) => {
    const data = { id: doc.id, ...doc.data() };
    if (data.dateTime && data.dateTime instanceof Timestamp) {
      const date = data.dateTime.toDate();
      const dateStr = format(date, 'yyyy-MM-dd');
      if (!fetchedEvents[dateStr]) {
        fetchedEvents[dateStr] = [];
      }
      fetchedEvents[dateStr].push(data);
    } else {
      console.warn(`Invalid date format for event: ${doc.id}`, data);
    }
  });

  // Query for events the user is attending
  const attendedEventsQuery = query(
    collection(db, 'events'),
    where('dateTime', '>=', Timestamp.fromDate(start)),
    where('dateTime', '<=', Timestamp.fromDate(end)), 
    where('attending', 'array-contains', uid)
  );

  const attendedEventsSnapshot = await getDocs(attendedEventsQuery);
  attendedEventsSnapshot.forEach((doc) => {
    const data = { id: doc.id, ...doc.data() };
    if (data.dateTime && data.dateTime instanceof Timestamp) {
      const date = data.dateTime.toDate();
      const dateStr = format(date, 'yyyy-MM-dd');
      if (!fetchedEvents[dateStr]) {
        fetchedEvents[dateStr] = [];
      }
      const existingEvent = fetchedEvents[dateStr].find(event => event.id === data.id);
      if (existingEvent) {
        existingEvent.userAttending = true; // Mark existing event as attended by the user
      } else {
        data.userAttending = true; // Mark this event as attended by the user
        fetchedEvents[dateStr].push(data);
      }
    } else {
      console.warn(`Invalid date format for event: ${doc.id}`, data);
    }
  });

  events.value = fetchedEvents;
};

onMounted(() => {
  goToUsers();
  fetchEvents();
});
</script>

<style scoped>
.calendar {
  margin: auto;
  margin-top: 1rem;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  width: 90vw; /* Adjust the width to fit within the viewport */
  max-width: 1200px; /* Maximum width for larger screens */
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.nav-button {
  padding: 5px 10px;
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
  height: 70vh;
  display: grid;
  grid-template-columns: repeat(7, 1fr); /* Create 7 equal columns */
  grid-template-rows: repeat(6, 1fr); /* Create 6 equal rows */
  gap: 5px;
}

.day-header {
  padding: 5px;
  background-color: #f0f0f0;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
}

.day {
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 5px;
  background-color: #fafafa;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-x: hidden;
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
  margin-top: auto; /* Push events to the bottom of the day cell */
}

.event {
  display: block;
  background-color: #ffeb3b;
  margin-top: 5px;
  padding: 2px 5px;
  border-radius: 3px;
  font-size: 0.8em;
  white-space: nowrap; /* Prevent text from wrapping */
  overflow: hidden; /* Hide overflowing text */
  text-overflow: ellipsis;
  max-width: 100%; /* Ensure it fits within the day cell */
  box-sizing: border-box; /* Include padding and border in the element's total width */
}

.user-attending {
  background-color: #4caf50; /* Green background for user-attended events */
  color: white; /* White text for better contrast */
}

/* Responsive Design */
@media (max-width: 600px) {
  .calendar {
    width: 100vw; /* Use the full viewport width on small screens */
    padding: 5px;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
  }

  .nav-button {
    width: 100%;
    margin-bottom: 5px;
  }

  .days {
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
  }

  .day, .day-header {
    padding: 5px;
    font-size: 0.8em;
  }

  .event {
    font-size: 0.7em;
  }
}
</style>
