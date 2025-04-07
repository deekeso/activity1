<template>
  <body>
    <el-form class="login-form">
      <el-form-item>
        <el-input
          v-model="inputUsername"
          placeholder="  USERNAME"
          autocomplete="off"
        /><el-icon class="icon-placeholder"><User /> </el-icon>
      </el-form-item>

      <el-form-item>
        <el-input
          v-model="inputPassword"
          type="password"
          placeholder="  PASSWORD"
          show-password
          autocomplete="off"
        /><el-icon class="icon-placeholder"><Lock /> </el-icon>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleLogin">Login</el-button>
      </el-form-item>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

      <p class="forgot-password">
        <router-link to="/forgot-password" class="forgot-password-link">
          Forgot Password?
        </router-link>
      </p>
    </el-form>
  </body>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useFormStore } from "@/stores/useFormStore";
import { saveDefaultUser } from "@/constants/userDefault";
import { ElNotification } from "element-plus";

const router = useRouter();
const formStore = useFormStore();

const inputUsername = ref("");
const inputPassword = ref("");
const errorMessage = ref("");

function handleFields(fields: string[]): boolean {
  return fields.some((field) => field.trim() === "");
}

const handleLogin = () => {
  const fields = [inputUsername.value, inputPassword.value];

  // Validate fields before attempting to login
  if (handleFields(fields)) {
    ElNotification({
      title: "ERROR",
      message: "Please input all the fields.",
      type: "error",
    });
    return;
  }

  // Attempt login only if fields are valid
  const isValid = formStore.login(inputUsername.value, inputPassword.value);

  if (isValid) {
    ElNotification({
      title: "Success",
      message: "Login Successful!",
      type: "success",
    });
    router.push("/index");
  } else {
    ElNotification({
      title: "ERROR",
      message: "Invalid username or password.",
      type: "error",
    });
  }
};

onMounted(() => {
  saveDefaultUser();
  formStore.logout();
});
</script>

<style scoped>
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

.login-form {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  color: #fff;
}

::v-deep(.el-input__wrapper) {
  background-color: #2148c0;
}

::v-deep(.el-input__inner) {
  border-radius: 8px;
  padding: 20px;
  color: white;
}

::v-deep(.el-input__inner::placeholder) {
  color: #ccc;
  font-size: 14px;
}

.icon-placeholder {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: rgb(255, 255, 255);
  pointer-events: none;
}

.el-button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background-color: #ffffff;
  color: #2148c0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: none;
  font-weight: 600;
}

.el-button:hover {
  background-color: #57a3eb;
  color: #fff;
}

.error {
  color: red;
  font-size: 12px;
  margin-top: 10px;
}

.forgot-password {
  text-align: right;
}

.forgot-password-link {
  color: white;
  text-decoration: none;
}

.forgot-password-link:hover {
  text-decoration: underline;
}
</style>
