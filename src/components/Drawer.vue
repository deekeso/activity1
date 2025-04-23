<script setup lang="ts">
// Import Vue utilities and a reusable Form component
import { registrationRules } from "../constants";
import { computed, onMounted, onUnmounted, reactive } from "vue";
import Form from "./Form.vue";

const screenSize = reactive({
  width: window.innerWidth,
});

// Update screen size when the window is resized
const updateScreenSize = () => {
  screenSize.width = window.innerWidth;
};

// Lifecycle hook to add event listener when the component is mounted
onMounted(() => {
  window.addEventListener("resize", updateScreenSize);
});

// Lifecycle hook to remove event listener when the component is unmounted
onUnmounted(() => {
  window.removeEventListener("resize", updateScreenSize);
});

// Computed property for drawer size
const drawerSize = computed(() => (screenSize.width <= 800 ? "90%" : "30%")); // Uses responsive widths for small and large screens

// Emit event to notify the parent component of the close action
const emit = defineEmits(["handleClose"]);

// Function to emit the close event
const handleClose = () => {
  emit("handleClose"); // Sends the "close" event to the parent
};

// Props passed to the component for controlling drawer visibility and title
const { drawerVisible, title } = defineProps(["drawerVisible", "title"]);

// Reactive object to manage form data
const form = reactive({
  firstName: "",
  middleName: "",
  lastName: "",
  birthDate: "",
  age: "",
  address: "",
  course: "",
});
</script>

<template>
  <!-- Drawer component for displaying the form -->
  <el-drawer
    :model-value="drawerVisible"
    @close="handleClose"
    :size="drawerSize"
  >
    <template #header="{ titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass">{{ title }}</h4>
    </template>

    <!-- Form component for input fields with validation registrationRules -->
    <Form :form="form" :rules="registrationRules" />
  </el-drawer>
</template>

<style scoped></style>
