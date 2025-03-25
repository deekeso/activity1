<script setup lang="ts">
import RegisterForm from "../components/RegisterForm.vue";
</script>

<template>
  <div class="form-container">
    <RegisterForm />
    <p>
      Already have an account?
      <router-link to="/login">Log in here</router-link>
    </p>
  </div>
</template>

<style scoped>
.form-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

p {
  color: white;
  font-size: 14px;
}

a {
  color: white;
}

a:hover {
  color: rgb(167, 187, 80);
}
</style>
