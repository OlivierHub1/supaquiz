<template>
    <div class="container login-container">
        <div class="row">
            <div class="col-md-6 login-form-1">
                <h3>Quiz</h3>
                <form @submit.prevent="submitFormQuiz">
                    <div class="form-group my-2">
                        <input v-model.trim="quizTitre" type="text" class="form-control" placeholder="Titre" />
                    </div>
                    <div class="form-group my-2">
                        <input v-model.trim="quizDescription" type="text" class="form-control" placeholder="Description" />
                    </div>
                    <div class="form-group">
                        <input type="submit" class="btnSubmit" value="Ajouter+" />
                    </div>
                </form>
            </div>
            <div class="col-md-6 login-form-2">
                <h3>Question</h3>
                <form @submit.prevent="submitFormQuestion">
                    <div class="form-group my-2">
                        <input v-model.trim="questionTitre" type="text" class="form-control" placeholder="Titre" />
                    </div>
                    <div class="form-group my-2">
                        <select v-model="selectedQuiz" class="form-control">
                            <option disabled value="">Sélectionner un Quiz</option>
                            <option v-for="quiz in quizs" :key="quiz.id" :value="quiz.id">{{ quiz.titre }}</option>
                        </select>
                    </div>
                    <div class="form-group my-2">
                        <div class="row">
                            <div class="col-4">
                                <input v-model.trim="reponses[0].titre" type="text" class="form-control"
                                    placeholder="Réponse 1" />
                            </div>
                            <div class="form-check form-switch col">
                                <input class="form-check-input" type="checkbox" id="checkbox_0">
                            </div>
                            <div class="col-4">
                                <input v-model.trim="reponses[1].titre" type="text" class="form-control"
                                    placeholder="Réponse 2" />
                            </div>
                            <div class="form-check form-switch col">
                                <input class="form-check-input" type="checkbox" id="checkbox_1">
                            </div>
                        </div>
                    </div>
                    <div class="form-group my-2">
                        <div class="row">
                            <div class="col-4">
                                <input v-model.trim="reponses[2].titre" type="text" class="form-control"
                                    placeholder="Réponse 3" />
                            </div>
                            <div class="form-check form-switch col">
                                <input class="form-check-input" type="checkbox" id="checkbox_2">
                            </div>
                            <div class="col-4">
                                <input v-model.trim="reponses[3].titre" type="text" class="form-control"
                                    placeholder="Réponse 4" />
                            </div>
                            <div class="form-check form-switch col">
                                <input class="form-check-input" type="checkbox" id="checkbox_3">
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <input type="submit" class="btnSubmit" value="Ajouter+" />
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '../../../../lib/supabaseClient.js';

// Les quizs
const quizs = ref([]);

// Données pour le formulaire Quiz
const quizTitre = ref('');
const quizDescription = ref('');

// Données pour le formulaire Question
const creation = new Date().toISOString();
const questionTitre = ref('');
const selectedQuiz = ref('');
const reponses = ref([{ titre: '', correct: false }, { titre: '', correct: false }, { titre: '', correct: false }, { titre: '', correct: false }]);

// Fonction pour insérer un enregistrement de Quiz
async function insererQuiz(titre, description) {
    try {
        const { data, error } = await supabase
            .from('Quiz')
            .insert([{ titre, description, creation, image: null, id_utilisateur: 9 }]);

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Erreur Quiz :', error.message);
        throw error;
    }
}

// Fonction pour insérer un enregistrement de Question
async function insererQuestion(titre, id_quiz, reponses) {
    try {
        const { data, error } = await supabase
            .from('Question')
            .insert([{ titre, id_quiz, reponses }]);

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Erreur Question :', error.message);
        throw error;
    }
}

// Fonction pour soumettre le formulaire Quiz
async function submitFormQuiz() {
    try {
        const data = await insererQuiz(quizTitre.value, quizDescription.value);
    } catch (error) {
    }
}

// Fonction pour soumettre le formulaire Question
async function submitFormQuestion() {
    try {
        // Pour chaque réponse, mettez à jour la propriété 'correct' en fonction de l'état de la case à cocher
        reponses.value.forEach((reponse, index) => {
            reponse.correct = document.getElementById(`checkbox_${index}`).checked;
        });

        // Formater les réponses dans le format JSON requis
        const formattedReponses = reponses.value.map(reponse => {
            return {
                titre: reponse.titre,
                correct: reponse.correct
            };
        });

        const data = await insererQuestion(questionTitre.value, selectedQuiz.value, formattedReponses);
    } catch (error) {
    }
}


//Obtenir les quizs
async function getQuizs() {
    try {
        const { data } = await supabase.from('Quiz').select();
        quizs.value = data
    } catch (error) {
        console.error('Error fetching data:', error.message)
    } finally {
        loading.value = false
    }
}

// Crochet de cycle de vie pour charger les Quiz lorsque le composant est monté
onMounted(async () => {
    getQuizs()
});
</script>

<style src="./ajouterQuiz.css"></style>