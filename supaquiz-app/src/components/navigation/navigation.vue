<template>
    <header>
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <img class="mx-2" src="../../assets/supaQuiz_logo.png" alt="SupaQuiz_logo">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <RouterLink class="nav-item nav-link mx-2" to="/">Home</RouterLink>
                        <RouterLink class="nav-item nav-link mx-2" to="/utilisateurs">Utilisateur</RouterLink>
                        <RouterLink class="nav-item nav-link mx-2" to="/quizs">Quiz</RouterLink>
                        <RouterLink class="nav-item nav-link mx-2" to="/questions">Question</RouterLink>
                    </div>
                </div>
            </div>
        </nav>
    </header>
    <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<style src="./navigation.css"></style>
