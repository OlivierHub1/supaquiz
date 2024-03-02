<template>
    <div class="container login-container">
      <div class="row justify-content-center">
        <div class="col-md-6 login-form-1">
          <h3>Inscription</h3>
          <form>
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
  </script>

  <style src="./inscription.css"></style>
  