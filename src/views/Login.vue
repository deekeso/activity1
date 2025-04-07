<script setup lang="ts">
import LoginForm from "../components/LoginForm.vue";
</script>

<template>
  <div class="parent-container">
    <LoginForm />
    <div class="forgot-pass-container">
      <router-link to="/forgot-pass">Forgot Password?</router-link>
    </div>
  </div>
</template>

<style scoped>
.parent-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

a {
  color: white;
  font-size: 0.8rem;
}
</style>
