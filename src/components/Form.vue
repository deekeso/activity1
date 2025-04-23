<script setup lang="ts">
// Import necessary modules and types from Vue and Element Plus
import { computed, ref, watch } from "vue";
import type { FormInstance, FormProps } from "element-plus";
import { useStudentStore } from "../store/studentStore";
import { useAgeCalculator } from "../composables/useAgeCalculator";
import DialogBox from "./DialogBox.vue";

// Element Plus Configuration
const formRef = ref<FormInstance>(); // Form state for validation
const labelPosition = ref<FormProps["labelPosition"]>("top"); // label position state
const dialogVisible = ref(false);

// Get student store in pinia
const studentStore = useStudentStore();

// Props passed to this component for form data and validation rules
const { form, rules } = defineProps(["form", "rules"]);

// Function to handle form submission with validation
const onSubmit = async () => {
  try {
    const isValid = await formRef.value?.validate();
    if (isValid) {
      // If validation passes, add a new student to the store
      studentStore.addStudent({
        id: Math.floor(Math.random() * 10000), // Generate a random ID for the new student
        ...form, // Spread the form data into the new student object
      }),
        Object.keys(form).forEach((key) => {
          form[key] = typeof form[key] === "number" ? 0 : ""; // Reset number fields to 0 and string fields to ""
        });
      dialogVisible.value = false; // Close the dialog box after successful submission
    }
  } catch (error) {
    console.error("Error during form submission:", error);
  }
};

const toggleDialogBox = async () => {
  const isValid = await formRef.value?.validate(); // Validate form fields before opening the dialog
  if (isValid) {
    dialogVisible.value = true; // Show the dialog box if validation passes
  }
};

// Computed property to watch the birth date from the form
const birthDateComputed = computed(() => form.birthDate); // Extract and reactively track the birth date field

// Use the age calculator composable to calculate age based on birth date
const { ageRef } = useAgeCalculator(birthDateComputed); // Pass the birth date to the age calculator

// Watch for changes in the computed age and update the form model
watch(ageRef, (newAge) => {
  form.age = newAge; // Sync the calculated age with the form's age field
});

// Watch for changes in the middleName field and validate input
watch(
  () => form.middleName,
  (newVal) => {
    form.middleName = newVal.replace(/[^a-zA-Z]/g, ""); // Allow only letters
  }
);

// Watch for changes in the First Name field and sanitize input
watch(
  () => form.firstName,
  (newVal) => {
    form.firstName = newVal
      .replace(/[0-9]/g, "") // Remove numbers
      .replace(/\s{2,}/g, " ") // Replace multiple spaces with a single space
      .trimStart(); // Remove leading spaces but allow trailing spaces
  }
);

// Watch for changes in the Last Name field and sanitize input
watch(
  () => form.lastName,
  (newVal) => {
    form.lastName = newVal
      .replace(/[0-9]/g, "") // Remove numbers
      .replace(/\s{2,}/g, " ") // Replace multiple spaces with a single space
      .trimStart(); // Remove leading spaces but allow trailing spaces
  }
);

const disableDate = (date: Date) => {
  const currentDate = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(currentDate.getFullYear() - 1);

  return date > oneYearAgo || date > currentDate;
};
</script>

<!-- Form Template -->
<template>
  <!-- Form component from Element Plus -->
  <el-form
    ref="formRef"
    :rules="rules"
    :label-position="labelPosition"
    :model="form"
    label-width="auto"
    @submit.prevent="onSubmit"
  >
    <!-- Input field for First Name -->
    <el-form-item label="First Name" prop="firstName">
      <el-input v-model="form.firstName" placeholder="Enter your first name" />
    </el-form-item>

    <!-- Input field for Middle Name -->
    <el-form-item label="Middle Initial" prop="middleName">
      <el-input
        v-model="form.middleName"
        placeholder="Enter your middle initial"
        maxlength="1"
      />
    </el-form-item>

    <!-- Input field for Last Name -->
    <el-form-item label="Last Name" prop="lastName">
      <el-input v-model="form.lastName" placeholder="Enter your last name" />
    </el-form-item>

    <!-- Date picker for Birth Date -->
    <el-form-item label="Birth Date" prop="birthDate">
      <el-col>
        <el-date-picker
          v-model="form.birthDate"
          type="date"
          placeholder="Select Birth Date"
          style="width: 100%"
          :disabled-date="disableDate"
        />
      </el-col>
    </el-form-item>

    <!-- Input field for Age -->
    <el-form-item label="Age" prop="age">
      <el-input v-model="form.age" placeholder="Your Age" disabled />
    </el-form-item>

    <!-- Textarea for Address -->
    <el-form-item
      label="Input Complete Address"
      prop="address"
      style="margin: 1rem 0"
    >
      <el-input
        v-model="form.address"
        style="width: 100%"
        autosize
        type="textarea"
        placeholder="Please input complete address"
      />
    </el-form-item>

    <!-- Dropdown for Course selection -->
    <el-form-item label="Course" prop="course">
      <el-select v-model="form.course" placeholder="Select your desired course">
        <el-option
          label="Bachelor of Science in Information Technology"
          value="bachelor of science in information technology"
        />
        <el-option
          label="Bachelor of Science in Computer Science"
          value="bachelor of science in computer science"
        />
        <el-option
          label="Bachelor of Science in Tourism"
          value="bachelor of science in tourism"
        />
        <el-option
          label="Bachelor of Science in Hotel and Restaurant Management"
          value="bachelor of science in hotel and restaurant management"
        />
        <el-option
          label="Bachelor of Science in Nursing"
          value="bachelor of science in nursing"
        />
      </el-select>
    </el-form-item>

    <!-- Submit button -->
    <el-form-item>
      <el-button type="primary" @click="toggleDialogBox"
        >Create new Student</el-button
      >

      <DialogBox
        :model-value="dialogVisible"
        title="Add Student profile?"
        @update:modelValue="(val) => (dialogVisible = val)"
        @confirm="onSubmit"
      />
    </el-form-item>
  </el-form>
</template>

<style scoped>
:deep(.el-textarea__inner) {
  color: #606266 !important;
}

:deep(.el-select__selected-item) {
  color: #606266 !important;
}
</style>
