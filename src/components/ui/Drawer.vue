<!--
  Drawer.vue - UI Component

  Features:
  - Accepts different body content via slots.
  - Customizable drawer appearance and behavior.

  Props:
  * v-model: Boolean      Controls the visibility of the drawer.
-->

<template>
  <el-drawer
    v-model="drawer"
    title="Student Information"
    :with-header="true"
    :close-on-click-modal="true"
    :close-on-press-escape="false"
  >
    <!-- Slot for dynamic content -->
    <slot></slot>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import eventBus from "@/event-bus";
import { useStudentStore } from "@/store/useStudentStore";

const drawer = ref(false);
const { resetStudent } = useStudentStore();

const props = defineProps({
  formRef: Object,
});

// Function: Opening the Drawer
const openDrawer = () => {
  drawer.value = true;
};

// Event listeners when mounting component
onMounted(() => {
  eventBus.on("open-drawer", openDrawer);
});

onUnmounted(() => {
  eventBus.off("open-drawer", openDrawer);
});

// Watch: Clearing validation upon closing drawer
watch(drawer, (newVal) => {
  if (!newVal) {
    resetStudent();
    console.log("Drawer closed, emitting clearFormValidation");
    eventBus.emit("clearFormValidation");
  }
});
</script>
