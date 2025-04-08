<script setup lang="ts">
import { ref, watch } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useStudentStore } from '@/stores/PiniaStore'
import { ElNotification } from 'element-plus'

const router = useRouter()

const username = ref('')
const password = ref('')
const isLoading = ref(false)

const accountStore = useStudentStore()

//Watch the isAuthenticated state
watch(
  () => accountStore.isAuhthenticated,
  (isAuthenticated) => {
    if (isAuthenticated) {
      // Stop loading
      isLoading.value = false

      // Navigate to the student list page
      router.push({ name: 'studentlist' })

      // Show success notification
      successNotification()
    } else if (!isAuthenticated && isLoading.value) {
      // Stop loading if login fails
      isLoading.value = false
      errorNotification()
    }
  },
)

//Router: Register Page
const goToRegister = () => {
  router.push({ name: 'register' })
}

const goToForgotPass = () => {
  router.push({ name: 'forgotpassword' })
}

//Function for login button
const login = () => {
  if (!username.value || !password.value) {
    errorNotification('Please fill in both username and password.')
    return
  }

  // Start loading
  isLoading.value = true

  // Simulate a delay for the login process
  setTimeout(() => {
    const loginSuccess = accountStore.login(username.value, password.value)
    if (loginSuccess) {
      successNotification()
      router.push({ name: 'studentlist' })
    } else {
      errorNotification('Invalid username or password.')
    }
    isLoading.value = false
  }, 1000)
}

//Function for Success Notification
const successNotification = () => {
  ElNotification({
    title: 'Login Success',
    message: 'You have successfully logged in',
    type: 'success',
    duration: 2000,
  })
}

//Function for Error Notification
const errorNotification = (
  message = 'Login failed. Please check your credentials and try again.',
) => {
  ElNotification({
    title: 'Error',
    message,
    type: 'error',
  })
}

//Function for Loading Screen
// const loadingScreen = () => {
//   const loading = ElLoading.service({
//     lock: true,
//     text: 'Loggin in...',
//     background: 'rgba(0, 0, 0, 0.7)',
//   })
//   setTimeout(() => {
//     loading.close()
//   }, 3000)
// }
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
            @click="login"
            type="primary"
            :loading="isLoading"
            size="large"
            style="font-size: medium; font-weight: bold"
            >Login</el-button
          >
        </el-form-item>
        <div class="link-container">
          <el-link @click="goToForgotPass" type="primary" href="#">Forgot password?</el-link>
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
