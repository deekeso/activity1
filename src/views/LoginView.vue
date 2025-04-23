<script lang="ts" setup>
import { Lock, User } from '@element-plus/icons-vue'
import wave from '../assets/images/Vector.png'
import { onMounted, ref } from 'vue'
import circle1 from '../assets/images/Ellipse.png'
import circle2 from '../assets/images/Ellipse-1.png'
import circle3 from '../assets/images/Ellipse-2.png'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/authentication'

const authStore = useAuthStore()
const formRef = ref(null)

onMounted(() => {
  authStore.formRef = formRef.value
})

// reset the input fields when the user logged in successfully
</script>
<template>
  <div class="page-container">
    <div class="form-container">
      <el-form
        ref="formRef"
        :model="authStore.formModel"
        :rules="authStore.rules"
        @submit.prevent="authStore.handleSubmit"
      >
        <el-form-item prop="username" class="input-container">
          <el-input
            class="input"
            placeholder="USERNAME"
            :prefix-icon="User"
            v-model="authStore.formModel.username"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" class="input-container">
          <el-input
            class="input"
            placeholder="PASSWORD"
            :prefix-icon="Lock"
            v-model="authStore.formModel.password"
            type="password"
            show-password
            clearable
          ></el-input>
        </el-form-item>
        <div class="forgot-password-container">
          <el-button type="primary" native-type="submit" class="button-login">Login</el-button>
          <RouterLink to="/forgot-password" class="forgot-password-text"
            >Forgot password?</RouterLink
          >
        </div>
      </el-form>
    </div>
    <div class="background-elements">
      <el-image :src="wave" class="wave-image" />
      <el-image :src="circle1" class="circle-image circle1" />
      <el-image :src="circle3" class="circle-image circle3" />
      <el-image :src="circle2" class="circle-image circle2" />
    </div>
  </div>
</template>
<style scoped>
.page-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  z-index: 2;
  position: relative;
  width: 100%;
  max-width: 450px;
  padding: 0 20px;
}

.input-container {
  width: 100%;
  max-width: 350px;
}

.input {
  height: 45px;
  width: 100%;
  color: white;
  font-weight: 300;
  margin-bottom: 5px;
  margin-top: 5px;
}

.forgot-password-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 350px;
  margin-top: 30px;
}

.forgot-password-text {
  color: white;
  margin-top: 15px;
  align-self: flex-end;
  font-size: 18px;
  cursor: pointer;
}

/* Background Elements */
.background-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.wave-image {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  object-fit: cover;
}

.circle-image {
  position: absolute;
  bottom: 0;
  left: 0;
}

.circle1 {
  z-index: -3;
}
.circle2 {
  z-index: -2;
}
.circle3 {
  z-index: -1;
}

/* Element Plus Overrides */
:deep(.el-input__inner::placeholder),
:deep(.el-input__inner) {
  color: white;
  font-size: 15px;
}
:deep(.el-input__icon) {
  color: white !important;
  font-size: 20px;
}

:deep(.el-input__wrapper) {
  background-color: transparent !important;
  box-sizing: border-box;
}
:deep(.el-input__prefix) {
  color: white;
  background-color: transparent !important;
  margin-right: 5px;
}

:deep(.el-input__wrapper) {
  transition:
    box-shadow 0.3s,
    border-color 0.3s !important;
  width: 400px;
  margin-right: 5px;
}

:deep(.el-input__suffix) {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 13px;
  color: white;
  font-size: 20px;
}

:deep(.el-input__suffix-inner) {
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.el-button) {
  font-weight: bold;
  font-size: 19px;
  margin-bottom: 20px;
  width: 100%;
  height: 45px;
  background-color: white;
  color: #2148c0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

:deep(.el-input__wrapper),
:deep(.el-button) {
  touch-action: manipulation;
}

:deep(.el-form-item) {
  margin-bottom: 20px;
  position: relative;
}

:deep(.el-form-item__error) {
  font-size: 0.95rem;
  font-weight: 500;
  color: #ff6b6b;
  position: absolute; /* Position absolutely */
  bottom: 0; /* Position at bottom of form item */
  left: 0.5rem;
  margin: 0; /* Remove margins that cause shifts */
  height: auto; /* Let it adjust to content */
}

/* Media Queries - Consolidated */
@media (max-width: 768px) {
  .input-container,
  .forgot-password-container {
    width: 90%;
    max-width: 300px;
  }

  .input {
    font-size: 16px;
  }

  :deep(.el-input__wrapper) {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .wave-image {
    right: -80%;
    max-width: 200%;
  }

  .form-container {
    padding: 0 15px;
    max-width: 320px;
  }

  .input {
    height: 40px;
    font-size: 14px;
  }

  .input-container,
  .forgot-password-container {
    max-width: 280px;
  }

  .forgot-password-text {
    font-size: 12px;
  }

  :deep(.el-button) {
    font-size: 16px;
    height: 40px;
  }
}

@media (max-width: 320px) {
  .wave-image {
    right: -150%;
  }

  .form-container {
    padding: 0 8px;
    max-width: 280px;
  }

  .input-container,
  .forgot-password-container {
    max-width: 250px;
  }

  .input {
    height: 36px;
    font-size: 13px;
  }

  .forgot-password-text {
    font-size: 12px;
  }

  :deep(.el-icon) {
    color: white !important;
  }

  :deep(.el-button) {
    font-size: 14px;
    height: 36px;
  }
}

@media (max-height: 600px) {
  .input-container {
    margin-bottom: 10px;
  }

  .forgot-password-container {
    margin-top: 5px;
  }

  :deep(.el-button) {
    margin-bottom: 10px;
  }
}
</style>
