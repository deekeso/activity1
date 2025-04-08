<script setup lang="ts">
import { ref, reactive } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import type { RuleForm, Account } from '@/types/types'
import { ElNotification } from 'element-plus'
import { ElLoading } from 'element-plus'
import { useStudentStore } from '@/stores/PiniaStore'

const router = useRouter()
const accountStore = useStudentStore()

const ruleFormRef = ref<FormInstance>()
const ruleForm = ref<RuleForm>({
  email: '',
  firstName: '',
  middleName: '',
  lastName: '',
  password: '',
  username: '',
})

//Validator Messages
const rules = reactive<FormRules<RuleForm>>({
  email: [
    { required: true, message: 'Please input email', trigger: 'blur' },
    { type: 'email', message: 'Please input correct email', trigger: ['blur', 'change'] },
  ],
  firstName: [{ required: true, message: 'Please input first name', trigger: 'blur' }],
  middleName: [{ required: true, message: 'Please input middle name', trigger: 'blur' }],
  lastName: [{ required: true, message: 'Please input last name', trigger: 'blur' }],
  password: [{ required: true, message: 'Please input password', trigger: 'blur' }],
  username: [{ required: true, message: 'Please input username', trigger: 'blur' }],
})

//Function for Submitting Form
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      LoadingScreen()
      //Get the value of all inputs
      const newAccount: Account = {
        email: ruleForm.value.email,
        firstName: ruleForm.value.firstName,
        middleName: ruleForm.value.middleName,
        lastName: ruleForm.value.lastName,
        password: ruleForm.value.password,
        username: ruleForm.value.username,
      }
      //Store the inputs data in the pinia
      accountStore.registerAccount(newAccount)
      //Clear the input fields
      ruleForm.value.email = ''
      ruleForm.value.firstName = ''
      ruleForm.value.middleName = ''
      ruleForm.value.lastName = ''
      ruleForm.value.username = ''
      ruleForm.value.password = ''
      setTimeout(() => {
        //Render the success notification
        successNotication()
        //Route: Home or Login Page
        router.push({ name: 'home' })
      }, 3000)
    } else {
      //Else render the Error Notification
      errorNotification()
    }
  })
}

//Success Notification Function
const successNotication = () => {
  ElNotification({
    title: 'Register Success',
    message: 'You have successfully registered',
    type: 'success',
  })
}

//Error Notification Function
const errorNotification = () => {
  ElNotification({
    title: 'Error',
    type: 'error',
  })
}

//Loading Screen
const LoadingScreen = () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Registering...',
    background: 'rgba(0, 0 , 0, 0.7)',
  })
  setTimeout(() => {
    loading.close()
  }, 3000)
}

//Router: Login Page
const goToLogin = () => {
  router.push({ name: 'home' })
}
</script>

<template>
  <main>
    <el-form @submit.prevent ref="ruleFormRef" :model="ruleForm" :rules="rules">
      <el-form-item prop="firstName">
        <el-input type="hidden" />
        <el-input
          v-model="ruleForm.firstName"
          placeholder="FIRST NAME"
          clearable
          :prefix-icon="User"
        ></el-input>
      </el-form-item>
      <el-form-item prop="middleName">
        <el-input
          v-model="ruleForm.middleName"
          placeholder="MIDDLE NAME"
          clearable
          :prefix-icon="User"
        ></el-input>
      </el-form-item>
      <el-form-item prop="lastName">
        <el-input
          v-model="ruleForm.lastName"
          placeholder="LAST NAME"
          clearable
          :prefix-icon="User"
        ></el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input
          v-model="ruleForm.email"
          placeholder="EMAIL"
          clearable
          :prefix-icon="User"
        ></el-input>
      </el-form-item>
      <el-form-item prop="username">
        <el-input
          v-model="ruleForm.username"
          placeholder="USERNAME"
          clearable
          :prefix-icon="User"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="ruleForm.password"
          placeholder="PASSWORD"
          :prefix-icon="Lock"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item>
        <button
          @click="submitForm(ruleFormRef)"
          class="el-button"
          size="large"
          style="font-size: medium; font-weight: bold"
        >
          Register
        </button>
      </el-form-item>
      <el-link @click="goToLogin" class="custom-link" :underline="false">
        Already have an account?
      </el-link>
    </el-form>
  </main>
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

.form-row {
  display: flex;
  gap: 20px;
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
  max-width: 600px;
}

.btnLogin-container {
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding-top: 20px;
}

.btnLogin-container .el-button {
  width: 100%;
  height: 45px;
  color: #409eff;
  background-color: #ffffff;
  border: none;
}

.el-button {
  width: 100%;
  width: 100%;
  height: 45px;
  color: #409eff;
  background-color: #ffffff;
  border: none;
}

.el-button:hover {
  background-color: #409eff;
  color: #ffffff;
}

.btnLogin-container .el-button:hover {
  background-color: #409eff;
  color: #ffffff;
}

.el-input,
.date-picker {
  width: 100%;
  height: 45px;
  font-size: 16px;
  border: none;
  color: rgb(255, 255, 255);
}

.el-form-item {
  width: 100%;
}

.link-container {
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: space-between;
}

.el-link.custom-link {
  font-size: 12px;
  font-weight: medium;
  color: #ffffff;
}

.el-link.custom-link:hover {
  color: #409eff;
}
</style>
