import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import LobbiesView from '../views/LobbiesView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },

  {
    path: '/lobbies',
    name: 'lobbies',
    component: LobbiesView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
