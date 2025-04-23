<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Responsive design variables
const windowWidth = ref(window.innerWidth)
const windowHeight = ref(window.innerHeight)

// Update dimensions on resize
const handleResize = () => {
  windowWidth.value = window.innerWidth
  windowHeight.value = window.innerHeight
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="background-container">
    <!-- Main SVG Background -->
    <svg
      class="background-svg"
      xmlns="http://www.w3.org/2000/svg"
      :width="windowWidth"
      :height="windowHeight"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      style="pointer-events: none"
    >
      <!-- Gradient definitions -->
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="var(--primary-color)" />
          <stop offset="100%" stop-color="#ffffff" />
        </linearGradient>
        <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#3370c5" />
          <stop offset="100%" stop-color="#e6f0ff" />
        </linearGradient>
      </defs>

      <!-- Background base -->
      <rect width="100%" height="100%" fill="var(--primary-color)" />

      <!-- Abstract shapes -->
      <path
        d="M0,500 Q360,600 720,500 Q1080,400 1440,500 L1440,900 L0,900 Z"
        fill="url(#grad1)"
        opacity="0.1"
      />

      <!-- Bottom wave -->
      <path
        d="M0,900 L0,700 Q360,800 720,700 Q1080,600 1440,700 L1440,900 Z"
        fill="#3370c5"
        opacity="0.3"
      />

      <!-- Circles -->
      <circle cx="1240" cy="250" r="120" fill="#5b8dd9" opacity="0.05" />

      <!-- Small dots for texture -->
      <g opacity="0.1">
        <circle cx="300" cy="300" r="4" fill="#1a4b8c" />
        <circle cx="320" cy="320" r="3" fill="#1a4b8c" />
        <circle cx="340" cy="290" r="2" fill="#1a4b8c" />
        <circle cx="1100" cy="200" r="4" fill="#1a4b8c" />
        <circle cx="1120" cy="220" r="3" fill="#1a4b8c" />
        <circle cx="1140" cy="190" r="2" fill="#1a4b8c" />
        <circle cx="600" cy="700" r="4" fill="#1a4b8c" />
        <circle cx="620" cy="720" r="3" fill="#1a4b8c" />
        <circle cx="640" cy="690" r="2" fill="#1a4b8c" />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  pointer-events: none; /* Makes background non-interactive */
}

.background-svg {
  width: 100%;
  height: 100%;
  pointer-events: none; /* Reinforces non-interactive behavior */
}

@media (max-width: 768px) {
  /* Adjustments for mobile devices */
  .background-svg {
    /* Scale to ensure visibility of key elements on smaller screens */
    transform: scale(1.2);
    transform-origin: center;
  }
}
</style>
