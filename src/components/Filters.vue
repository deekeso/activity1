<script setup lang="ts">
import { options } from "../constants";
// Define the custom event emitter for "change-filter"
const emit = defineEmits(["change-filter"]);

// Import Vue's ref function for reactive state
import { ref } from "vue";

// Define the selected filter value as a reactive state
const value = ref("");

// Function to emit the selected filter value to the parent component
function setFilter(value: string) {
  emit("change-filter", value);
}
</script>

<template>
  <!-- Dropdown select component -->
  <el-select
    v-model="value"
    placeholder="Select a course"
    style="width: 240px"
    @change="setFilter"
  >
    <!-- Render each filter option dynamically -->
    <el-option
      v-for="option in options"
      :key="option.value"
      :label="option.label"
      :value="option.value"
    />
  </el-select>
</template>

<style scoped>
button {
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 5px;
  background-color: #fff;
  color: #606266;
  outline: none;
}
</style>
