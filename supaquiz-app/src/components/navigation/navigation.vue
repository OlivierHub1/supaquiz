<template>
    <header>
      <nav class="navbar navbar-expand-lg ">
        <div class="container-fluid">
          <img class="mx-2" src="../../assets/supaQuiz_logo.png" alt="SupaQuiz_logo">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll"
                  aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarScroll">
            <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
              <li class="nav-item">
                <RouterLink class=" nav-link mx-2" to="/">Home</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class=" nav-link mx-2" to="/utilisateurs">Utilisateur</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class=" nav-link mx-2" to="/quizs">Quiz</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class=" nav-link mx-2" to="/questions">Question</RouterLink>
              </li>
            </ul>
            <div class="d-flex">
              <RouterLink class="btn btn-outline-warning mx-2" to="/connexion">Login</RouterLink>
              <button class="btn btn-outline-light" @click="logout">Log out</button>
            </div>
          </div>
        </div>
      </nav>
    </header>
    <RouterView />
  </template>
  
  <script setup lang="ts">
  import { RouterLink, RouterView } from "vue-router";
  import { supabase } from '../../lib/supabaseClient';
  
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Erreur lors de la déconnexion :', error.message);
      } else {
        console.log('Déconnecté avec succès');
        window.location.reload()
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error.message);
    }
  };
  </script>
  
  <style src="./navigation.css"></style>
  