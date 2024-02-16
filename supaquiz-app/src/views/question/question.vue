<template>
    <div class="d-flex justify-content-center align-items-center" style="height: 90vh;" v-if="loading">
        <div class="spinner-border text-dark" role="status">
        </div>
      </div>
    <div class="d-flex justify-content-center align-items-center" style="height: 90vh;" v-else>
        <div v-for="question in questions" :key="question.id" class="card bg-card-dark" style="width: 18rem;">
            <img src="../../assets/img/question.png" class="card-img-top question-img bg-light" alt="question">
            <div class="card-body bg-card-dark">
                <h5 class="card-title">{{question.titre}}</h5>
            </div>
            <ul v-for="reponse in question.reponses" class="list-group list-group-flush">
                <li class="list-group-item bg-card-dark item-card">{{reponse.titre}}</li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../../lib/supabaseClient.js'
import router from "@/router";
import { useRoute } from "vue-router";

const questions = ref([])
const loading = ref(true)
const paramQuizId = useRoute().params.quizId

//Obtenir les quizs
async function getQuestions() {
    try {
        const { data } = await supabase.from('Question').select().eq('id_quiz', paramQuizId);
        questions.value = data
    } catch (error) {
        console.error('Error fetching data:', error.message)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    getQuestions()
})
</script>

<style src="./question.css"></style>