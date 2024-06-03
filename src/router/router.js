import { createWebHistory, createRouter } from 'vue-router'
import MySocieties from '../views/MySocieties.vue'
import HomePage from '../views/HomePage.vue'
import SearchPage from '../views/SearchPage.vue'
import SocietyEvents from '../views/society/SocietyEvents.vue'
import SingleEvent from '../views/society/SingleEvent.vue'
import SocietyAbout from '../views/society/SocietyAbout.vue'
import SocietyAnnouncements from '../views/society/SocietyAnnouncements.vue'


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
  {
    path: '/societies/:name/announcements',
    name: 'Announcements',
    component: SocietyAnnouncements
  },
  {
    path: '/societies/:name/about',
    name: 'About',
    component: SocietyAbout
  },
  // default
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
