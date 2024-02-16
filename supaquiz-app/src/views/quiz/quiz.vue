<template>
  <div class="">
    <div class="container d-flex justify-content-center">
      <div class="input-group my-3 w-50">
        <input type="text" class="form-control" placeholder="Search Quiz" aria-label="Rechercher un utilisateur"
          aria-describedby="basic-addon2">
        <div class="input-group-append">
          <button class="btn btn-dark" type="button">Search</button>
        </div>
      </div>
    </div>
    <table class="table table-dark">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">titre</th>
          <th scope="col">description</th>
          <th scope="col">auteur</th>
        </tr>
      </thead>
      <div class="d-flex justify-content-center align-items-center" v-if="loading">
        <div class="spinner-border text-dark" role="status">
        </div>
      </div>
      <tbody v-else>
        <tr class="quizs" v-for="quiz in quizs" :key="quiz.id" @click="goToQuizQuestions(quiz.id)">
            <th scope="row">{{ quiz.id }}</th>
            <td>{{ quiz.titre }}</td>
            <td>{{ quiz.description }}</td>
            <td>auteur</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../../lib/supabaseClient.js'
import router from "@/router";
import {useRoute} from "vue-router";

const quizs = ref([])
const loading = ref(true)
const paramUtilisateurId = useRoute().params.utilisateurId

// Fonction qui permet d'aller dans une page qui contient les quizs
const goToQuizQuestions = (quizId) => {
  router.push({ name: 'quizQuestionsDetails', params: { quizId }})
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

onMounted(() => {
  getQuizs()
})
</script>

<style src="./quiz.css"></style>
