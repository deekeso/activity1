<script setup lang="ts">
// Import Vue composition API methods and other required dependencies
import { reactive, ref } from "vue"; // Provides reactivity and state management
import { Lock, User } from "@element-plus/icons-vue"; // Importing icons for the input fields
import { RouterLink } from "vue-router"; // Provides navigation links between routes
import { useRouter } from "vue-router"; // Enables programmatic navigation
import type { FormInstance } from "element-plus"; // Typing for the form instance
import type { LoginForm } from "../interface/Admin";
import { loginRules } from "../constants";
import { ElMessage } from "element-plus";

// Reference to the form instance for validation
const formRef = ref<FormInstance>(); // Form state for validation

// Initialize Vue Router for programmatic navigation
const router = useRouter();

// Reactive object to store form input values
const loginForm = reactive<LoginForm>({
  username: "",
  password: "",
});

const defaultAccount = reactive<LoginForm>({
  username: "admin",
  password: "admin",
});

// Function to handle login action
const handleLogin = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      if (
        loginForm.username === defaultAccount.username &&
        loginForm.password === defaultAccount.password
      ) {
        ElMessage({
          message: "Login Successfully!!",
          type: "success",
          plain: true,
        }); // Log success message
        router.push("/registration");
      } else {
        alert("Invalid username or password! Please try again."); // Show alert
      }
    } else {
      console.log("Validation failed!"); // Log validation failure
    }
  });
};
</script>

<template>
  <div class="login-view">
    <el-form :model="loginForm" :rules="loginRules" ref="formRef">
      <!-- Top Part -->
      <!-- Cart Icon Here -->

      <!-- Middle Part -->
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          style="width: 100%"
          size="large"
          placeholder="USERNAME"
          :prefix-icon="User"
          class="custom-input"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          style="width: 100%"
          size="large"
          type="password"
          show-password
          prop="password"
          placeholder="PASSWORD"
          :prefix-icon="Lock"
          class="custom-input"
        />
      </el-form-item>

      <!-- Bottom Part -->
      <div class="submit-container">
        <el-button :plain="true" size="large" @click="handleLogin"
          >LOGIN</el-button
        >
        <div class="link-container">
          <RouterLink to="/forgot-password">Forgot Password?</RouterLink>
        </div>
      </div>
    </el-form>
  </div>
</template>

<style scoped>
.login-view {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100vh;
}

form {
  display: flex;
  justify-content: center;
  flex-direction: column;

  width: 350px;
  height: 398px;
}

.input-group,
.submit-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 2rem;
  z-index: 100;
}

.link-container {
  display: flex;
  justify-content: end;
  align-items: center;
}

.link-container a {
  font-size: 12px;
  color: var(--neutral-light);
  font-weight: 500;
  text-decoration: none;
}

.el-button {
  color: var(--primary-bg) !important;
  font-weight: 700 !important;
}

:deep(.el-input__inner) {
  color: var(--neutral-light);
}

@media only screen and (max-width: 606px) {
  .link-container a {
    font-size: 10px;
  }
}
</style>
