<script setup lang="ts"></script>

<template>
  <div class="not-found-container">
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <router-link to="/">Go back to Home</router-link>
  </div>
</template>

<style lang="css" scoped>
h1 {
  color: var(--neutral-light);
}

p {
  color: var(--neutral-dark);
}

a {
  font-weight: 500;
  color: var(--neutral-dark);
}

.not-found-container {
  line-height: 1.8;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
