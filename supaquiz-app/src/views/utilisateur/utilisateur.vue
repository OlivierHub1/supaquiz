<template>
  <div class="">
    <div class="container d-flex justify-content-center">
      <div class="input-group my-3 w-50">
        <input type="text" class="form-control" placeholder="Search Utilisateur" aria-label="Rechercher un utilisateur"
          aria-describedby="basic-addon2">
        <div class="input-group-append">
          <button class="btn btn-dark" type="button">Search</button>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center align-items-center" style="height: 80vh;" v-if="loading">
      <div class="spinner-border text-dark" role="status">
      </div>
    </div>
    <table class="table table-dark" v-else-if="utilisateurs[0] != null">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Avatar</th>
          <th scope="col">Pseudo</th>
          <th scope="col">Nom</th>
          <th scope="col">Prénom</th>
          <th scope="col">Point</th>
        </tr>
      </thead>
      <tbody>
        <tr class="utilisateurs" v-for="utilisateur in utilisateurs" :key="utilisateur.id"
          @click="goToUtilisateurQuizs(utilisateur.id)">
          <th scope="row">{{ 0 }}</th>
          <td><img class="rounded-circle utilisateurs-img" :alt="'Image de ' + utilisateur.nom"
              :src="utilisateur.avatar" /></td>
          <td>{{ utilisateur.pseudo }}</td>
          <td>{{ utilisateur.nom }}</td>
          <td>{{ utilisateur.prenom }}</td>
          <td>{{ utilisateur.points }}</td>
        </tr>
      </tbody>
    </table>
    <div class="container d-flex justify-content-center align-items-center" style="height: 80vh;" v-else>
      <div class="row bg-dark rounded d-felx align-items-center">
        <p class="text-danger text-center my-2">
          Vous n'avez pas accès aux données
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../../lib/supabaseClient.js'
import router from "@/router";

const utilisateurs = ref([])
const loading = ref(true)

// Fonction qui permet d'aller dans une page qui contient les quizs
const goToUtilisateurQuizs = (utilisateurId) => {
  router.push({ name: 'utilisateurQuizsDetails', params: { utilisateurId } })
}

//Obtenir les utilisateurs
async function getUtilisateurs() {
  try {
    const { data } = await supabase.from('Utilisateur').select()
    utilisateurs.value = data
    console.log(utilisateurs[0] != null)
  } catch (error) {
    console.error('Error fetching data:', error.message)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getUtilisateurs()
})
</script>

<style src="./utilisateur.css"></style>
