<template>
    <div class="container login-container">
      <div class="row justify-content-center">
        <div class="col-md-6 login-form-1">
          <h3>Quiz</h3>
          <form @submit.prevent="modifierQuiz">
            <div class="form-group my-2">
              <input v-model="titre" type="text" class="form-control" placeholder="Titre" />
            </div>
            <div class="form-group my-2">
              <input v-model="description" type="text" class="form-control" placeholder="Description" />
            </div>
            <div class="form-group">
              <input type="submit" class="btnSubmit" value="Modifier" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { supabase } from '../../../../lib/supabaseClient.js';
  
  const route = useRoute();
  const router = useRouter();
  
  const titre = ref('');
  const description = ref('');
  
  // Récupérer les informations du quiz à partir de l'ID passé en paramètre dans l'URL
  onMounted(async () => {
    const quizId = route.params.quizId;
    const quiz = await getQuizById(quizId);
    if (quiz) {
      titre.value = quiz.titre;
      description.value = quiz.description;
    }
  });
  
  // Fonction pour récupérer les informations du quiz par son ID
  async function getQuizById(quizId) {
    try {
      const { data, error } = await supabase
        .from('Quiz')
        .select()
        .eq('id', quizId)
        .single();
  
      if (error) {
        throw error;
      }
  
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération du quiz:', error.message);
      throw error;
    }
  }
  
  // Fonction pour modifier le quiz
  async function modifierQuiz() {
    try {
      const quizId = route.params.quizId;
      await supabase
        .from('Quiz')
        .update({
          titre: titre.value,
          description: description.value,
        })
        .eq('id', quizId);
  
      // Rediriger vers la page des quizs après la modification
      router.push('/quizs');
    } catch (error) {
      console.error('Erreur lors de la modification du quiz:', error.message);
      throw error;
    }
  }
  </script>
  
  <style src="./modifierQuiz.css"></style>
  