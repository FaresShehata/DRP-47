import { createWebHistory, createRouter } from 'vue-router'
import MySocieties from '../views/MySocieties.vue'
import HomePage from '../views/HomePage.vue'
import SearchPage from '../views/SearchPage.vue'
import SocietyEvents from '../views/SocietyEvents.vue'
import SingleEvent from '../views/SingleEvent.vue'


const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/search',
    name: 'Search',
    component: SearchPage
  },
  {
    path: '/my-societies',
    name: 'MySocieties',
    component: MySocieties
  },
  {
    path: '/societies/:name/events',
    name: 'Society Events',
    component: SocietyEvents
  },
  {
    path: '/societies/:name/events/:eventid',
    name: 'Single Event',
    component: SingleEvent
  },
  // default
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
