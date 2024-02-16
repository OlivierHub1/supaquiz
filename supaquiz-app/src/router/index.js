import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home/home.vue'
import Quiz from '../views/quiz/quiz.vue'
import Utilisateur from '../views/utilisateur/utilisateur.vue'
import Question from '../views/question/question.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/utilisateurs',
      name: 'utilisateurs',
      component: Utilisateur
    },
    {
      path: '/utilisateur/:utilisateurId',
      name: 'utilisateurDetails',
      component: Utilisateur
    },
    {
      path: '/utilisateur/:utilisateurId/quizs',
      name: 'utilisateurQuizsDetails',
      component: Quiz
    },
    {
      path: '/quizs',
      name: 'quiz',
      component: Quiz
    },
    {
      path: '/quiz/:quizId',
      name: 'quizDetails',
      component: Quiz
    },
    {
      path: '/quiz/:quizId/questions',
      name: 'quizQuestionsDetails',
      component: Question
    },
    {
      path: '/questions',
      name: 'questions',
      component: Question
    },
    {
      path: '/questions/:questionId',
      name: 'questionsDetails',
      component: Question
    }
  ]
})

export default router
