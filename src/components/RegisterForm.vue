<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { User, Lock } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { RuleForm, Account } from '@/types'
import { useAccountStore } from '@/stores/accountStore'
import { ElNotification } from 'element-plus'
import { ElLoading } from 'element-plus'

const router = useRouter()

const accountStore = useAccountStore()

const ruleFormRef = ref<FormInstance>()
const ruleForm = ref<RuleForm>({
  email: '',
  firstName: '',
  middleName: '',
  lastName: '',
  password: '',
  username: ''
})

const rules = reactive<FormRules<RuleForm>>({
  email: [
    { required: true, message: 'Please input email', trigger: 'blur' },
    { type: 'email', message: 'Please input correct email', trigger: ['blur', 'change'] }
  ],
  firstName: [
    { required: true, message: 'Please input first name', trigger: 'blur' }
  ],
  middleName: [
    { required: true, message: 'Please input middle name', trigger: 'blur' }
  ],
  lastName: [
    { required: true, message: 'Please input last name', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Please input password', trigger: 'blur' }
  ],
  username: [
    { required: true, message: 'Please input username', trigger: 'blur' }
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit')
      const newAccount: Account = {
        email: ruleForm.value.email,
        firstName: ruleForm.value.firstName,
        middleName: ruleForm.value.middleName,
        lastName: ruleForm.value.lastName,
        password: ruleForm.value.password,
        username: ruleForm.value.username
      }
      accountStore.registerAccount(newAccount)
      ruleForm.value.email = ''
      ruleForm.value.firstName = ''
      ruleForm.value.middleName = ''
      ruleForm.value.lastName = ''
      ruleForm.value.password = ''
      ruleForm.value.username = ''
      openFullScreen2()
      setTimeout(() => {
        successNotication()
      }, 3000)
    } else {
      console.log('error submit', fields)
      errorNotification()
    }
  })
}

const successNotication = () => {
  ElNotification({
    title: 'Register Success',
    message: 'You have successfully registered',
    type: 'success',
  })
}

const errorNotification = () => {
  ElNotification({
    title: 'Error',
    // message: 'This is an error message',
    type: 'error',
  })
}

const openFullScreen2 = () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Registering...',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  setTimeout(() => {
    loading.close()
  }, 3000)
}

const goToLogin = () => {
  router.push({ name: 'home' })
}

onMounted(() => {
  console.log('Register Page Mounted')
})
</script>

<template>
  <main>
    <el-form @submit.prevent ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules">
      <el-form-item prop="firstName">
        <el-input type="hidden" />
        <el-input v-model="ruleForm.firstName" placeholder="FIRST NAME" clearable>
          <template #prefix>
            <el-icon size="large">
              <User />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="middleName">
        <el-input v-model="ruleForm.middleName" placeholder="MIDDLE NAME" clearable>
          <template #prefix>
            <el-icon size="large">
              <User />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="lastName">
        <el-input v-model="ruleForm.lastName" placeholder="LAST NAME" clearable>
          <template #prefix>
            <el-icon size="large">
              <User />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input v-model="ruleForm.email" placeholder="EMAIL" clearable>
          <template #prefix>
            <el-icon size="large">
              <User />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="username">
        <el-input v-model="ruleForm.username" placeholder="USERNAME" clearable>
          <template #prefix>
            <el-icon size="large">
              <User />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="ruleForm.password" placeholder="PASSWORD" show-password>
          <template #prefix>
            <el-icon size="large">
              <Lock />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item class="btnLogin-container">
        <button @click="submitForm(ruleFormRef)" class="el-button" size="large"
          style="font-size: large; font-weight: bold;">Register</button>
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
  color: #FFFFFF;
  background-color: #409EFF;
  border: none;
}

.btnLogin-container .el-button:hover {
  background-color: #ffffff;
  color: #409EFF;
}

.el-input,
.date-picker {
  width: 100%;
  height: 45px;
  font-size: 16px;
  border: none;
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
  color: #FFFFFF;
}

.el-link.custom-link:hover {
  color: #409EFF;
}

:deep(.el-input__inner)::placeholder {
  color: #6e6b6b;
}

.el-input {
  background-color: red;
}
</style>
