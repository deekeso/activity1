<template>
  <div class="my-background">
    <div class="content-wrapper">
      <div class="left-side">
        <h1 class="brand">LOGIN</h1>
        <h2 class="subtitle">welcome</h2>
      </div>

      <div class="right-side">
        <el-card class="login-card">
          <div class="input-1">
            <el-input
              v-model="username"
              size="large"
              placeholder="USERNAME"
              type="text"
              id="username"
              name="username"
              required
              :prefix-icon="User"
            />
          </div>

          <div class="input-2">
            <el-input
              v-model="password"
              size="large"
              id="password"
              name="password"
              type="password"
              placeholder="PASSWORD"
              required
              :prefix-icon="Lock"
            />
          </div>

          <div class="btnLogin">
            <el-button type="primary" size="large" @click="handleLogin"
              >LOGIN</el-button
            >
            <div class="links-container">
              <router-link :to="{ name: 'ForgotPassword' }"
                >Forgot Password?</router-link
              >
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<!-- Login page with glass-morphism design -->
<script lang="ts" setup>
import { ref } from "vue";
import { User, Lock } from "@element-plus/icons-vue";
import { useRegStore } from "@/stores/RegStore";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

// Composables for form handling
const username = ref(""); // Username input binding
const password = ref(""); // Password input binding
const store = useRegStore();
const router = useRouter();

// Login handler that authenticates user and redirects to HomePage
const handleLogin = () => {
  if (store.loginUser(username.value, password.value)) {
    router.push("/HomePage");
  } else {
    ElMessage.error("Invalid username or password");
  }
};
</script>

<style>
.my-background {
  background-color: #2148c0;
  background-image: url("../assets/bg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.content-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 980px;
  width: 100%;
  gap: 100px;
}

.left-side {
  flex: 1;
  text-align: left;
  margin-bottom: 100px;
}

.brand {
  color: #ffffff;
  font-size: 56px;
  font-weight: bold;
  margin: 0;
  line-height: 1.1;
}

.subtitle {
  color: #ffffff;
  font-size: 24px;
  font-weight: normal;
  margin-top: 10px;
  opacity: 0.9;
}

.right-side {
  flex: 0 0 396px;
}

.login-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  padding: 20px;
  border: none;
}

.input-1,
.input-2 {
  margin-bottom: 16px;
}

.btnLogin {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.btnLogin .el-button {
  width: 100%;
  height: 48px;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
}

.links-container {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 10px;
  width: 100%;
}

.links-container p {
  margin: 0;
  color: white;
  font-size: 14px;
  cursor: pointer;
}

.btnLogin a {
  color: white;
  text-decoration: none;
  font-size: 14px;
}

:deep(.el-input__wrapper) {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

:deep(.el-input__wrapper:hover) {
  border-color: rgba(255, 255, 255, 0.3);
}

:deep(.el-input__wrapper.is-focus) {
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1);
}

:deep(.el-input__inner) {
  color: white;
}

:deep(.el-input__inner::placeholder) {
  color: rgba(255, 255, 255, 0.7);
}

@media (max-width: 900px) {
  .content-wrapper {
    flex-direction: column;
    text-align: center;
    gap: 40px;
  }

  .left-side {
    margin-bottom: 0;
  }

  .right-side {
    width: 100%;
    max-width: 396px;
  }

  .brand {
    text-align: center;
  }
}
</style>
