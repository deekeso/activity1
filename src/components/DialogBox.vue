<script setup lang="ts">
// Define events that this component emits
const emit = defineEmits(["update:modelValue", "confirm"]);
// "update:modelValue" - Emitted when the dialog is closed
// "confirm" - Emitted when the confirmation action is triggered

// Define props passed to this component
const { modelValue, title } = defineProps(["modelValue", "title"]);
// "modelValue" - Controls the dialog's visibility (true/false)
// "title" - Defines the title displayed in the dialog

// Function to close the dialog
const closeDialog = () => {
  emit("update:modelValue", false); // Emit "update:modelValue" event to set dialog visibility to false
};

// Function to handle the submission/confirmation action
const onSubmit = () => {
  emit("confirm"); // Emit "confirm" event to notify the parent of the confirmation action
};
</script>

<template>
  <!-- Element Plus dialog component -->
  <el-dialog
    :model-value="modelValue"
    :modal="true"
    align-center
    width="500"
    @close="closeDialog"
  >
    <span>{{ title }}</span>

    <!-- Footer slot for dialog buttons -->
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeDialog">Cancel</el-button>
        <el-button type="primary" @click="onSubmit"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped></style>
