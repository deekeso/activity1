<script setup lang="ts">
// Import required Vue composition API methods and types
import { reactive, ref } from "vue";
import type { FormInstance, FormProps } from "element-plus";
import { useAdminStore } from "../store/adminStore.ts";
import { useRouter } from "vue-router";
import { signupRules } from "../constants/index.ts";

// Define a form reference for validation
const formRef = ref<FormInstance>(); // Form state for validation

// Define the label position for form fields
const labelPosition = ref<FormProps["labelPosition"]>("top"); // label position state

// Access the Admin store
const adminStore = useAdminStore();

// Initialize Vue Router
const router = useRouter(); // Enables navigation between routes/pages

// Reactive object to store form input values
const form = reactive({
  name: "", // Holds the Name input
  username: "", // Holds the Username input
  password: "", // Holds the Password input
});

// Handle form submission with validation
const onSubmit = async () => {
  try {
    const isValid = await formRef.value?.validate(); // Validates the form fields
    if (isValid) {
      // If valid, create a new admin in the Admin Store
      adminStore.createAdmin({
        id: Math.floor(Math.random() * 10000), // Generate a random ID for the admin
        ...form, // Spread operator to include all form fields
      }),
        console.log(adminStore.admins); // Logs the list of admins in the console

      // Reset form fields after successful submission
      Object.keys(form).forEach((key) => {
        form[key as keyof typeof form] =
          typeof form[key as keyof typeof form] === "number" ? "0" : ""; // Assign "0" as a string
      });
      alert("Account Created Successfully"); // Display success alert
      router.push("/"); // Redirect to login page
    }
  } catch (error) {
    console.error("Error during form submission:", error); // Log any errors during submission
  }
};
</script>

<template>
  <div class="signup-view">
    <el-form
      ref="formRef"
      :rules="signupRules"
      :model="form"
      :label-position="labelPosition"
      label-width="auto"
      class="signup-form"
      @submit.prevent="onSubmit"
    >
      <el-form-item label="Name" prop="name" class="el-label">
        <el-input
          v-model="form.name"
          placeholder="Enter your Name"
          class="el-input"
        />
      </el-form-item>

      <el-form-item label="Username" prop="username" class="el-label">
        <el-input
          v-model="form.username"
          placeholder="Enter your Username"
          class="el-input"
        />
      </el-form-item>

      <el-form-item label="Password" prop="password" class="el-label">
        <el-input
          v-model="form.password"
          placeholder="Enter your Password"
          show-password
          class="el-input"
        />
      </el-form-item>

      <el-form-item class="btn-group">
        <div class="btn-group">
          <el-button type="primary" @click="onSubmit"
            >Create new Admin</el-button
          >
          <RouterLink to="/">Already have an account? Login!</RouterLink>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.signup-view {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100vh;
  z-index: 100;
}

.signup-form {
  width: 450px !important;
  color: var(--neutral-light) !important;
}

.el-label {
  --el-text-color-regular: var(--neutral-light);
}

.el-input {
  --el-text-color-regular: var(--neutral-light);
}

.btn-group {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.btn-group a {
  color: var(--neutral-light);
  text-decoration: none;
  font-style: italic;
}
</style>
