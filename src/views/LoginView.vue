<template>
  <div class="background">
    <el-form class="form-container">
      <el-form-item :model="loginForm">
        <el-input
          v-model="loginForm.username"
          type="input"
          placeholder="USERNAME"
          class="user-input"
          :prefix-icon="User"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="loginForm.passInput"
          type="password"
          show-password
          class="user-input"
          placeholder="PASSWORD"
          :prefix-icon="Lock"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="plain" width="100%" @click="onSubmit" class="login-btn">LOGIN</el-button>
      </el-form-item>

      <el-form-item>
        <RouterLink to="/forgot-password" class="pass-link">
          <el-text class="mx-1">Forgot Password?</el-text>
        </RouterLink>
      </el-form-item>
    </el-form>

    <el-alert
      title="Log in failed"
      type="error"
      description="Incorrect email or password."
      class="error-alert"
      :closable="false"
      v-if="errorAlert"
      show-icon
    />
    <el-alert
      title="Log in successful!"
      type="success"
      v-if="successAlert"
      class="success-alert"
      :closable="false"
      show-icon
    ></el-alert>
  </div>
  <Background></Background>
</template>

<script lang="ts" setup>
// import { ref } from 'vue'
import { reactive, ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import Background from '../components/BackgroundImg.vue'

const router = useRouter()
const loginForm = reactive({
  username: '',
  passInput: '',
})

const loginData: {
  username: string
  password: string
} = {
  username: 'root',
  password: 'root',
}

const errorAlert = ref(false)
const successAlert = ref(false)

const onSubmit = () => {
  if (loginForm.username === loginData.username && loginForm.passInput === loginData.password) {
    localStorage.setItem('auth', 'true')

    successAlert.value = true
    setTimeout(() => {
      successAlert.value = false
      router.push('/register')
    }, 2000)
  } else {
    errorAlert.value = true
    setTimeout(() => {
      errorAlert.value = false
    }, 4000)
    console.error('incorrect username or password')
  }
}
</script>

<style scoped>
.pass-link {
  text-decoration: none;
  text-align: right;
  width: 100%;
}
.error-alert,
.success-alert {
  width: auto;
  position: absolute;
  top: 0;
  left: 0;
  margin-block: 50px;
  margin-inline: 20px;
  z-index: 100;

  animation: slideIn 0.5s ease, fadeOut 0.5s ease 3s forwards;
}

/* Slide-in effect */
@keyframes slideIn {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Fade-out effect */
@keyframes fadeOut {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}
</style>
