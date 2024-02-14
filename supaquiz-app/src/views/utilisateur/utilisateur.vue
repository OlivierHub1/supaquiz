
<template>
  <div class="container d-flex justify-content-center">
    <div class="input-group my-3 w-50">
      <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Rechercher un utilisateur"
        aria-describedby="basic-addon2">
      <div class="input-group-append">
        <button class="btn btn-dark" type="button">Button</button>
      </div>
    </div>
  </div>
  <table class="table table-striped table-dark">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Avatar</th>
        <th scope="col">Nom</th>
        <th scope="col">Prénom</th>
        <th scope="col">Point</th>
      </tr>
    </thead>
    <div class="container d-flex justify-content-center" v-if="loading">
      <div class="spinner-border text-dark" role="status">
      </div>
    </div>
    <tbody v-else>
      <!---->
      <tr v-for="utilisateur in utilisateurs" :key="utilisateur.id">
        <th scope="row">{{ utilisateur.id }}</th>
        <td><img class="rounded-circle" :alt="'Image de ' + utilisateur.nom" :src="utilisateur.avatar" /></td>
        <td>{{ utilisateur.nom }}</td>
        <td>{{ utilisateur.prenom }}</td>
        <td>{{ utilisateur.points }}</td>
      </tr>
      <!---->
    </tbody>
  </table>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../../lib/supabaseClient.js'

const utilisateurs = ref([])
const loading = ref(true)

async function getUtilisateur() {
  try {
    const { data } = await supabase.from('Utilisateur').select()
    utilisateurs.value = data
  } catch (error) {
    console.error('Error fetching data:', error.message)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getUtilisateur()
})
</script>

<style src="./utilisateur.css"></style>
