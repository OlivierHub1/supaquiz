<template>
  <div class="">
    <div class="container d-flex justify-content-center">
      <form class="input-group my-3 w-50" @submit.prevent="rechercherQuiz">
        <input v-model.trim="champRecherhcheQuiz" type="text" class="form-control" placeholder="Search Quiz"
          aria-label="Search Quiz" aria-describedby="basic-addon2">
        <div class="input-group-append">
          <button class="btn btn-dark" type="submit">Search</button>
        </div>
        <div class="input-group-append mx-3">
          <RouterLink class="btn btn-light" type="button" to="/ajouterQuiz">Ajouter+</RouterLink>
        </div>
      </form>
    </div>
    <div class="d-flex justify-content-center align-items-center" style="height: 80vh;" v-if="loading">
      <div class="spinner-border text-dark" role="status">
      </div>
    </div>
    <table class="table table-dark" v-else>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">titre</th>
          <th scope="col">description</th>
          <th scope="col">auteur</th>
          <th scope="col">option</th>
        </tr>
      </thead>
      <tbody>
        <tr class="quizs" v-for="quiz in quizs" :key="quiz.id">
          <td scope="row">{{ quiz.id }}</td>
          <td @click="goToQuizQuestions(quiz.id)">{{ quiz.titre }}</td>
          <td @click="goToQuizQuestions(quiz.id)">{{ quiz.description }}</td>
          <td @click="goToQuizQuestions(quiz.id)">auteur</td>
          <td>
            <RouterLink class="btn btn-success" :to="{ name: 'modifierQuiz', params: { quizId: quiz.id } }">modifier
            </RouterLink>
            | <button class="btn btn-danger" @click="supprimerQuiz(quiz.id)">supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../../lib/supabaseClient.js'
import router from "@/router";
import { useRoute } from "vue-router";

const quizs = ref([])
const loading = ref(true)
const paramUtilisateurId = useRoute().params.utilisateurId
const champRecherhcheQuiz = ref('');

// Fonction qui permet d'aller dans une page qui contient les quizs
const goToQuizQuestions = (quizId) => {
  router.push({ name: 'quizQuestionsDetails', params: { quizId } })
}

// Fonction qui permet de chercher un quiz
async function rechercherQuiz() {
  try {
    loading.value = true;
    let data = null;
    if (paramUtilisateurId == null) {
      ({ data } = await supabase.from('Quiz').select().ilike('titre', `%${champRecherhcheQuiz.value}%`));
    } else {
      ({ data } = await supabase.from('Quiz').select().eq('id_utilisateur', paramUtilisateurId).ilike('titre', `%${champRecherhcheQuiz.value}%`));
    }
    quizs.value = data;
  } catch (error) {
    console.error('Error fetching data:', error.message)
  } finally {
    loading.value = false
  }
}

//Obtenir les quizs
async function getQuizs() {
  try {
    let data = null;
    if (paramUtilisateurId == null) {
      // Obtenir tout les quizs
      ({ data } = await supabase.from('Quiz').select());
    } else {
      // Obtenir tout les quizs d'un utilisateur
      ({ data } = await supabase.from('Quiz').select().eq('id_utilisateur', paramUtilisateurId));
    }

    quizs.value = data
  } catch (error) {
    console.error('Error fetching data:', error.message)
  } finally {
    loading.value = false
  }
}

// Fonction qui permet de supprimer un quiz
async function supprimerQuiz(quizId) {
  try {
    await supabase.from('Quiz').delete().eq('id', quizId);
    // Actualiser la liste des quizs après la suppression
    getQuizs();
  } catch (error) {
    console.error('Error deleting quiz:', error.message)
  }
}

onMounted(() => {
  getQuizs()
})
</script>

<style src="./quiz.css"></style>

