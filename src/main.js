import { createApp } from 'vue'
import router from './router/router.js'
import App from './App.vue'
// import { toRaw } from 'vue';

createApp(App)
  .use(router)
  .mount('#app')

const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
}

function formatDate(date) {
  return date?.toLocaleString("en-UK", options)
}


function filterByRegistered(events, uid) {
  return events.value.filter((e) => e.attending.includes(uid))
}
export {formatDate, filterByRegistered}