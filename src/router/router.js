import { createWebHistory, createRouter } from 'vue-router'
import MySocieties from '../views/MySocieties.vue'
import HomePage from '../views/HomePage.vue'
import SearchPage from '../views/SearchPage.vue'


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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
