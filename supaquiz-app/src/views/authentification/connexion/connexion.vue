<template>
  <div class="container login-container">
    <div class="row justify-content-center">
      <div class="col-md-6 login-form-1">
        <h3>Connexion</h3>
        <form @submit.prevent="connexion">
          <div class="form-group my-2">
            <input v-model="email" type="text" class="form-control" placeholder="email" />
          </div>
          <div class="form-group my-2">
            <input v-model="mdp" type="password" class="form-control" placeholder="Mot de passe" />
          </div>
          <div class="form-group">
            <input type="submit" class="btnSubmit" value="Connecte-toi!" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { supabase } from '../../../lib/supabaseClient';

const email = ref('');
const mdp = ref('');

const connexion = async () => {
  try {
    const { user, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: mdp.value
    });

    if (error) {
      console.error('Erreur lors de la connexion :', error.message);
    } else {
      console.log('Connecté avec succès :', user);
      // Redirect the user to home page upon successful login
      window.location.href = '/'; // Update the path to your home page
    }
  } catch (error) {
    console.error('Erreur lors de la connexion :', error.message);
  }
};
</script>

<style src="./connexion.css"></style>
