import { createApp } from 'vue'
import router from './router/router.js'
import App from './App.vue'
import { deleteDoc, doc } from 'firebase/firestore';
import {db} from '@/firebase'
// import { toRaw } from 'vue';

createApp(App)
  .use(router)
  .mount('#app')

// const options = {
//   year: 'numeric',
//   month: 'long',
//   day: 'numeric',
//   hour: '2-digit',
//   minute: '2-digit'
// }

// function formatDate(date) {
//   console.log(date)
//   return date?.toLocaleString("en-UK", options)
// }

//Function to get the ordinal suffix for a date
function getOrdinalSuffix(day) {
  if (day > 3 && day < 21) return 'th'; // Catch-all for 11-20
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

// Function to format the date
function formatDate(date) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateString = new Intl.DateTimeFormat('en-GB', options).format(date);

  // Split the date string into parts
  const [weekday, day, month, year] = dateString.split(' ');
  
  // Get the time in 12-hour format with AM/PM
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12 || 12;

  // Construct the formatted date string
  return `${weekday} ${parseInt(day)}${getOrdinalSuffix(day)} ${month} ${year} at ${hours}:${minutes}${ampm}`;
}

function formatDateAnnoncement(date) {
  // Get the month (short), day, and year
  const monthOptions = { month: 'short' };
  const dayOptions = { day: 'numeric' };
  const yearOptions = { year: 'numeric' };

  const month = new Intl.DateTimeFormat('en-US', monthOptions).format(date);
  const day = new Intl.DateTimeFormat('en-US', dayOptions).format(date);
  const year = new Intl.DateTimeFormat('en-US', yearOptions).format(date);

  // Get the time in 12-hour format with AM/PM
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;

  // Construct the formatted date string
  return `${hours}:${minutes} ${ampm} · ${month} ${day}, ${year}`;
}

function filterByRegistered(events, uid) {
  return events.value.filter((e) => e.attending.includes(uid))
}

function deleteAnnouncement(a) {
  deleteDoc(doc(db, "announcements", a.id))
}
export {formatDate, formatDateAnnoncement, filterByRegistered, deleteAnnouncement}