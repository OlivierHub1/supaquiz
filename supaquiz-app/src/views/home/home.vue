<template>
  <main class="main-home">
    <div class="d-flex justify-content-center align-items-center" style="height: 90vh;">
      <section class="description container bg-dark rounded py-5">
          <h1 v-if="user" class="text-white text-center my-2">Bonjour <span class="text-danger">{{user.user.email}}</span></h1>
          <h1 v-else class="text-white text-center my-2">Bonjour</h1>
        <div class="row my-2">
          <img class="supaquiz-logo mx-auto d-block" src="../../assets/supaQuiz_logo.png" alt="">
        </div>
        <div class="row my-2">
          <p class="text-white text-wrap">SupaQuiz est une application web dynamique développée en utilisant Vue.js et
            Supabase. Son
            objectif principal est de fournir une plateforme interactive pour répondre à une variété de quiz. Grâce à son
            intégration avec Supabase, une solution de base de données et d'authentification, SupaQuiz offre une
            expérience
            utilisateur fluide et sécurisée. Les utilisateurs peuvent parcourir différents quiz, sélectionner ceux qui les
            intéressent et répondre aux questions associées pour obtenir des points.</p>
        </div>
        <div class="row my-2">
          <div class="col text-light text-center">
            <a href="https://github.com/OlivierHub1/supaquiz" target="_blank" class="btn btn-light">
              <img class="github-logo" src="../../assets/github_icon.png" alt="Github-Icon">
            </a>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '../../lib/supabaseClient';

const user = ref(null);

//Obtenir les utilisateurs
async function getUtilisateur() {
  try {
    const { data } = await supabase.auth.getUser() 
    user.value = data
    console.log(user.value.user.email)
  } catch (error) {
    console.error('Error fetching data:', error.message)
  }
}

onMounted(async () => {
  getUtilisateur()
});
</script>

<style src="./home.css"></style>
