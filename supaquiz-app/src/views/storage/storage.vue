<template>
    <div class="my-5">
        <div class="container bg-dark rounded">
            <div class="row">
                <h1 class="text-white text-center my-3">Storage</h1>
            </div>
            <div class="row my-3 justify-content-center">
                <h1 class="text-white text-center my-3">Créer un bucket</h1>
                <form @submit.prevent="créerUnBucket" class="input-group mb-3 w-50">
                    <input v-model.trim="nomBucket" type="text" class="form-control" placeholder="nom du bucket">
                    <button class="btn btn-warning" type="submit">Créer</button>
                </form>
            </div>
            <div class="row my-3 justify-content-center">
                <h1 class="text-white text-center my-3">Ajouter un fichier</h1>
                <div class="input-group mb-3 w-50">
                    <input @change="lienDuFichier" type="file" class="form-control">
                    <button @click="ajouterUnFichier" class="btn btn-warning" type="button">Ajouter</button>
                </div>
            </div>
            <div class="row my-3 justify-content-center">
                <h1 class="text-white text-center my-3">Récuperer un fichier</h1>
                <select v-model="selectFichier" class="form-select form-select-lg mb-3 w-50 mx-5">
                    <option disabled value="">Fichiers</option>
                    <option v-for="fichier in bucket" :key="fichier.id" :value="fichier">{{ fichier.name }}</option>
                </select>
                <div class="alert alert-danger w-50 mx-5">
                    <figure class="figure">
                        <img :src="getLienFichiers(selectFichier.name)" class="figure-img img-fluid rounded" :alt="selectFichier.name">
                        <figcaption class="figure-caption"><a :href="getLienFichiers(selectFichier.name)" target="_blank">{{ selectFichier.name }}</a></figcaption>
                    </figure>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../../lib/supabaseClient.js'

const nomBucket = ref('');

const fichier = ref(null);

const bucket = ref(null);

const selectFichier = ref('');

const lienFichier = ref(null);

const lienDuFichier = (event) => {
    fichier.value = event.target.files[0];
};

// Créer un bucket
async function créerUnBucket() {
    try {
        const { data } = await supabase.storage.createBucket(nomBucket.value, {
            public: true,
        })
        return data;
    } catch (error) {
        console.error('Erreur:', error.message);
        throw error;
    }
}

// Ajouter un fichier
async function ajouterUnFichier() {
    console.log(fichier)
    const { data, error } = await supabase.storage.from('Quiz').upload('images/' + fichier.value.name, fichier.value)
    if (data) {
        console.log(data)
    }
    else {
        console.log("Pas de data")
    }
    if (error) {
        console.log("Problème avec le serveur")
    } else {
        console.log("Tout fonctionne")
    }
}

// Récuperer tout les fichiers
async function getBucketFichiers() {
    try {
        const { data } = await supabase.storage.from('Quiz').list('images/')
        bucket.value = data
        console.log(bucket.value)
    } catch (error) {
        console.error('Erreur:', error.message);
        throw error;
    }
}

// Récuperer le lien d'un fichier
function getLienFichiers(nom) {
    try {
        const { data } = supabase.storage.from('Quiz').getPublicUrl('images/' + nom)
        console.log(nom)
        console.log(data.publicUrl)
        return data.publicUrl
    } catch (error) {
        console.error('Erreur:', error.message);
        throw error;
    }
}

// Crochet de cycle de vie
onMounted(async () => {
    getBucketFichiers()
});
</script>