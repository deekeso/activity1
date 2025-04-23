<!--
  UserLayout.vue - Common Layout for User Views

  * Integrates with Vue Router to render dynamic views.
  * A main content area rendered dynamically via <router-view>.
  * Includes a reusable header section across user pages.
-->

<template>
  <div class="common-layout">
    <div class="background-containter">
      <img
        src="@/assets/img/vectors/bottom-half-circle.png"
        class="half-circle bottom"
        alt="Half Circle"
      />
      <img
        src="@/assets/img/vectors/sec-half-circle.png"
        class="half-circle second"
        alt="Half Circle"
      />
      <img
        src="@/assets/img/vectors/third-half-circle.png"
        class="half-circle third"
        alt="Half Circle"
      />
      <img src="@/assets/img/vectors/wave.png" class="wave" alt="Wave" />
    </div>

    <el-container>
      <!-- Header -->
      <el-header>
        <Header v-if="route.path === '/register'"></Header>
      </el-header>

      <!-- Main -->
      <el-main>
        <main>
          <router-view v-slot="{ Component }">
            <component :is="Component" :key="route.path" />
          </router-view>
        </main>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { watch, onUnmounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// Function: Changes style file according to the set style in router
const loadStyle = (styleFile) => {
  // Remove any existing dynamic style
  const existingStyle = document.getElementById("dynamic-style");
  if (existingStyle) {
    existingStyle.remove();
  }

  if (styleFile) {
    const link = document.createElement("link");
    link.id = "dynamic-style";
    link.rel = "stylesheet";
    link.href = `/src/assets/styles/${styleFile}`;
    document.head.appendChild(link);
  }
};

// Watch: Route changes and load the corresponding style
const stopWatch = watch(
  () => route.meta?.style,
  (newStyle) => {
    loadStyle(newStyle);
  },
  { immediate: true }
);

// Cleanup watch on component unmount
onUnmounted(() => {
  stopWatch();
});
</script>
