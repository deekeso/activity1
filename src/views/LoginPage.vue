<script setup lang="ts">
import { ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useAccountStore } from '@/stores/accountStore'
import { ElNotification, ElLoading } from 'element-plus'
// import type { FormInstance, FormRules } from 'element-plus'
// import type { RuleForm } from '@/types'

const username = ref('')
const password = ref('')

// Get the router object
const router = useRouter()
const accountStore = useAccountStore()

// Function to navigate to the register page
const goToRegister = () => {
  router.push({ name: 'register' })
}

const login = () => {
  console.log('Attempting login with:', username.value, password.value)
  const loginSuccess = accountStore.login(username.value, password.value)
  if (loginSuccess) {
    setTimeout(() => {
      router.push({ name: 'studentlist' })
    }, 3000)
    openFullScreen2()
    setTimeout(() => {
      successNotification()
    }, 3000)
  } else {
    console.log('Login failed')
    openFullScreen2()
    openFullScreen2()
    setTimeout(() => {
      errorNotification()
    }, 3000)
  }
}

const successNotification = () => {
  ElNotification({
    title: 'Login Success',
    message: 'You have successfully logged in',
    type: 'success',
  })
}

const errorNotification = () => {
  ElNotification({
    title: 'Error',
    message: 'Login failed. Please check your credentials and try again.',
    type: 'error',
  })
}

const openFullScreen2 = () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Logging in...',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  setTimeout(() => {
    loading.close()
  }, 3000)
}
</script>

<template>
  <div id="login-view">
    <main>
      <el-form @submit.prevent="login">
        <el-form-item>
          <el-input
            v-model="username"
            placeholder="USERNAME"
            clearable
            class="username"
            :prefix-icon="User"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="password"
            placeholder="PASSWORD"
            show-password
            transparent
            :prefix-icon="Lock"
          >
            <Lock />
          </el-input>
        </el-form-item>
        <el-form-item class="btnLogin-container">
          <el-button
            type="primary"
            @click="login"
            size="large"
            style="font-size: medium; font-weight: bold"
            >Login</el-button
          >
        </el-form-item>
        <div class="link-container">
          <el-link type="primary" href="#">Forgot password?</el-link>
          <el-link @click="goToRegister"> Don't have an account yet? </el-link>
        </div>
      </el-form>
    </main>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Manrope:wght@200..800&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Outfit:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

* {
  font-family: 'Montserrat', sans-serif;
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

:deep(.el-input__inner::placeholder) {
  font-size: 12px;
  padding: 5px;
}

:deep(.el-input__inner) {
  color: rgb(255, 255, 255);
  font-size: 12px;
}

:deep(.el-input__wrapper) {
  background-color: transparent;
}

.el-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 90%;
  max-width: 700px;
}

.btnLogin-container .el-button {
  width: 100%;
  height: 55px;
}

.el-input {
  width: 100%;
  height: 55px;
  font-size: 16px;
  border: none;
}

.el-input__wrapper {
  background-color: transparent;
}

.btnLogin-container .el-button {
  width: 100%;
  height: 45px;
  color: #409eff;
  background-color: #ffffff;
  border: none;
}

.btnLogin-container .el-button:hover {
  background-color: #409eff;
  color: #ffffff;
}

.link-container {
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: space-between;
}

.el-link {
  font-size: 14px;
  font-weight: medium;
  color: #ffffff;
}
</style>
