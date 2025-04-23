<script setup lang="ts">
// Import RouterView from Vue Router to act as a placeholder for routed components
import { RouterView } from "vue-router";
</script>

<template>
  <div class="main-view">
    <!-- Background images to style the main view -->
    <img src="/bg-vector/Vector.png" alt="bg-vectors" class="vector8" />
    <img src="/bg-vector/Ellipse.png" alt="bg-vectors" class="ellipse1" />
    <img src="/bg-vector/Ellipse-md.png" alt="bg-vectors" class="ellipse2" />
    <img src="/bg-vector/Ellipse-lg.png" alt="bg-vectors" class="ellipse3" />

    <!-- RouterView serves as a container for components mapped to specific routes -->
    <RouterView />
  </div>
</template>

<style scoped>
.main-view {
  position: relative;

  width: 100%;
  height: auto;
  background-color: var(--primary-bg);
  z-index: 50;
}

.vector8 {
  position: absolute;
  top: 0;
  right: 0;
  width: 50rem;
}

.ellipse1 {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 20rem;
  z-index: 20;
}

.ellipse2 {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 27rem;
  z-index: 10;
}

.ellipse3 {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 35rem;
}

@media only screen and (max-width: 606px) {
  .vector8 {
    width: 40rem;
  }

  .ellipse1 {
    width: 10rem;
  }

  .ellipse2 {
    width: 17rem;
  }

  .ellipse3 {
    width: 15rem;
  }
}
</style>
