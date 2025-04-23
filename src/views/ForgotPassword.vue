<template>
  <div class="pass-container">
    <RouterLink to="/">
      <div class="back">
        <el-icon :size="20" color="white" class="back-icon"><Back /></el-icon>
        <el-text>Back</el-text>
      </div>
    </RouterLink>

    <el-card class="pass-card">
      <h1>Forgot Password?</h1>
      <el-text class="pass-p"
        >Enter your email address and we will send you the recovery link.</el-text
      >

      <el-form class="pass-form-container" @submit.prevent="sendLink">
        <el-form-item class="item-label">
          <el-input v-model="defaultEmail" class="pass-input" type="email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="send-btn" native-type="submit">Send</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-alert
      title="Recovery link has been sent."
      type="success"
      v-if="successAlert"
      class="success-alert"
      :closable="false"
      show-icon
    >
    </el-alert>
  </div>
  <BackgroundImg></BackgroundImg>
</template>

<script setup lang="ts">
import { ElForm, ElFormItem, ElInput, ElButton, ElAlert } from 'element-plus'
import BackgroundImg from '@/components/BackgroundImg.vue'
import { ref } from 'vue'

const defaultEmail = ref('john.doe@gmail.com')
const successAlert = ref(false)

const sendLink = () => {
  successAlert.value = true

  setTimeout(() => {
    successAlert.value = false
  }, 4000)
}
</script>

<style scoped>
.pass-container {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pass-card {
  max-width: 600px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0);
  border: 20px solid white;
  z-index: 1000;
}
h1,
.pass-p {
  color: white;
}
.pass-input {
  color: black;
  height: 100%;
}
.item-label,
.pass-input {
  margin: 0;
}
.pass-form-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.send-btn {
  height: 100%;
  margin-left: 1em;
}
.success-alert {
  width: auto;
  position: absolute;
  top: 0;
  z-index: 100;

  animation: slideIn 0.5s ease, fadeOut 0.5s ease 3s forwards;
}
.back {
  position: absolute;
  top: 0;
  left: 0;
  padding: 1em;
  display: flex;
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
