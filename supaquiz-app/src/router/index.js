import { createRouter, createWebHistory } from 'vue-router'
//Afiichage
import Home from '../views/home/home.vue'
import Quiz from '../views/quiz/quiz.vue'
import Utilisateur from '../views/utilisateur/utilisateur.vue'
import Question from '../views/question/question.vue'
//Option
import AjouterUtilisateur from '../views/option/ajouter/ajouterUtilisateur/ajouterUtilisateur.vue'
import AjouterQuiz from '../views/option/ajouter/ajouterQuiz/ajouterQuiz.vue'
import ModifierUilisateur from '../views/option/modifier/modifierUtilisateur/modifierUtilisateur.vue'
import ModifierQuiz from '../views/option/modifier/modifierQuiz/modifierQuiz.vue'
import ModifierQuestion from '../views/option/modifier/modifierQuestion/modifierQuestion.vue'
//Authentification
import Inscription from '../views/authentification/inscription/inscription.vue'
import Connexion from '../views/authentification/connexion/connexion.vue'
//Storage
import Storage from '../views/storage/storage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //Affichage
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
    },
    //Ajouter
    {
      path: '/ajouterUtilisateur',
      name: 'ajouterUtilisateur',
      component: AjouterUtilisateur
    },
    {
      path: '/ajouterQuiz',
      name: 'ajouterQuiz',
      component: AjouterQuiz
    },
    //Modifier
    {
      path: '/modifierUtilisateur',
      name: 'modifierUtilisateur',
      component: ModifierUilisateur
    },
    {
      path: '/modifierQuiz/:quizId',
      name: 'modifierQuiz',
      component: ModifierQuiz
    },
    {
      path: '/modifierQuestion',
      name: 'modifierQuestion',
      component: ModifierQuestion
    },
    //Authentification
    {
      path: '/inscription',
      name: 'inscription',
      component: Inscription
    },
    {
      path: '/connexion',
      name: 'connexion',
      component: Connexion
    },
    //Authentification
    {
      path: '/storage',
      name: 'storage',
      component: Storage
    }
  ]
})

export default router
