import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home/home.vue'
import Quiz from '../views/quiz/quiz.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: Quiz
    }
  ]
})

export default router
