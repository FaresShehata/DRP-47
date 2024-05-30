import { createWebHistory, createRouter } from 'vue-router'
import MySocieties from '../views/MySocieties.vue'
import HomePage from '../views/HomePage.vue'
import AddPage from '../views/AddPage.vue'


const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/add',
    name: 'AddPage',
    component: AddPage
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
