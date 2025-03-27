<template>
  <el-form class="login-form">
    <el-form-item label="Username">
      <el-input v-model="inputUsername" autocomplete="off" />
    </el-form-item>

    <el-form-item label="Password">
      <el-input
        v-model="inputPassword"
        type="password"
        show-password
        autocomplete="off"
      />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="handleLogin">Login</el-button>
    </el-form-item>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <p>
      Don't have an account? <router-link to="/register">Sign up</router-link>
    </p>
  </el-form>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useFormStore } from "@/stores/useFormStore";

const router = useRouter();
const formStore = useFormStore();

const inputUsername = ref("");
const inputPassword = ref("");
const errorMessage = ref("");

const handleLogin = () => {
  const isValid = formStore.login(inputUsername.value, inputPassword.value);

  if (isValid) {
    alert("Login successful!");
    router.push("/index");
  } else {
    errorMessage.value = "Invalid username or password. Please try again.";
  }
};
</script>

<style scoped>
.login-form {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-form-item__label {
  font-size: 14px;
  color: #333;
  font-weight: bold;
}

.el-input__inner {
  padding: 10px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
}

.el-button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  background-color: #409eff;
  color: white;
  border: none;
}

.el-button:hover {
  background-color: #66b1ff;
}

.error {
  color: red;
  font-size: 12px;
  margin-top: 10px;
}

p {
  text-align: center;
  font-size: 14px;
  text-decoration: none;
}

router-link {
  text-decoration: none;
}

router-link:hover {
  text-decoration: none;
}
</style>
