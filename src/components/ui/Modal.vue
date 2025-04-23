<!--
  Modal.vue - UI Component

  Features:
  - Accepts different body content via slots.
  - Displays dynamic content based on props.
  - Provides customizable dialog appearance and behavior.

  Props:
  * type: String                  Type of the dialog (check, warning, delete).
  * label: String                 Title of the dialog.
  * desc: String                  Description text of the dialog.
  * handleButtonFunc: Function    Function to handle the confirm button click.
  * confirmButtonLabel: String    Label for the confirm button.
  * modelValue: Boolean           Controls the visibility of the dialog.
-->
<template>
  <el-dialog
    v-model="dialogVisible"
    width="500"
    align-center
    :class="dialogClass"
  >
    <!-- Title & Body -->
    <section class="d-flex flex-column align-items-center">
      <img :src="imageSrc" />
      <h1 :class="titleClass">{{ label }}</h1>
      <span>{{ desc }}</span>
    </section>

    <!-- Footer -->
    <template #footer>
      <div class="dialog-footer d-flex justify-content-center">
        <el-button @click="closeDialog">Cancel</el-button>
        <el-button :type="buttonType" @click="handleConfirm">
          {{ confirmButtonLabel }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, computed, watch } from "vue";

// Component props
const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value: string) =>
      ["check", "warning", "delete"].includes(value),
  },
  label: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  handleButtonFunc: {
    type: Function,
    required: true,
  },
  confirmButtonLabel: {
    type: String,
    default: "Confirm",
  },
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);
const dialogVisible = ref(props.modelValue);

// Watch: modelValue prop and update dialog visibility
watch(
  () => props.modelValue,
  (newVal) => {
    dialogVisible.value = newVal;
  }
);

// Computed property: Dialog CSS class based on type
const dialogClass = computed(() => {
  return {
    "dialog-check": props.type === "check",
    "dialog-warning": props.type === "warning",
    "dialog-delete": props.type === "delete",
  };
});

// Computed property: Image based on type
const imageSrc = computed(() => {
  switch (props.type) {
    case "check":
      return "src/assets/img/actions/check.png";
    case "warning":
      return "src/assets/img/actions/warning.png";
    case "delete":
      return "src/assets/img/actions/delete.png";
    default:
      return "";
  }
});

// Computed property: Title CSS based on type
const titleClass = computed(() => {
  switch (props.type) {
    case "check":
      return "text-success";
    case "warning":
      return "text-warning";
    case "delete":
      return "text-danger";
    default:
      return "";
  }
});

// Computed property: Button type based on type
const buttonType = computed(() => {
  switch (props.type) {
    case "check":
      return "success";
    case "warning":
      return "warning";
    case "delete":
      return "danger";
    default:
      return "";
  }
});

// Function: Confirm button click
const handleConfirm = () => {
  props.handleButtonFunc();
  closeDialog();
};

// Function: Closing dialog
const closeDialog = () => {
  dialogVisible.value = false;
  emit("update:modelValue", false);
};
</script>
