<template>
  <div class="container">
    <div class="inner-container">
      <el-form ref="ruleFormRef" :model="form" :rules="rules" :size="formSize" status-icon>
        <el-row>
          <el-col :span="24">
            <el-form-item prop="username">
              <el-input
                v-model="form.username"
                class="input-container"
                size="large"
                placeholder="USERNAME"
                :prefix-icon="User"
                input-style="font-family:regular; color:white"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item prop="password">
              <el-input
                v-model="form.password"
                class="input-container"
                type="password"
                size="large"
                placeholder="PASSWORD"
                show-password
                :prefix-icon="Lock"
                input-style="font-family:regular; color:white"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <div class="login">
          <el-button size="large" class="button" @click="login(ruleFormRef)"> LOGIN </el-button>
        </div>

        <div class="forgot-password">
          <RouterLink to="/forgot-password">
            <el-text class="forgot-password-text">Forgot Password?</el-text>
          </RouterLink>
        </div>
      </el-form>
    </div>
    <div class="image-container">
      <el-image :src="vector" class="vector-image" />
      <el-image :src="circle3" class="circle3-image" />
      <el-image :src="circle2" class="circle2-image" />
      <el-image :src="circle1" class="circle1-image" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { User, Lock } from '@element-plus/icons-vue'
import vector from '../assets/vector.png'
import circle1 from '../assets/circle1.png'
import circle2 from '../assets/circle2.png'
import circle3 from '../assets/circle3.png'
import { nextTick, reactive, ref } from 'vue'
import '../styles/styles.css'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { useUserStore } from '@/stores/studentStore'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()
const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()

const ADMIN_CREDENTIALS = JSON.parse(
  localStorage.getItem('admin_credentials') || '{"username": "admin", "password": "admin123"}',
)

const form = reactive({
  username: '',
  password: '',
})

const validateCredentials = (rule: any, value: any, callback: any) => {
  if (form.username === '' || form.password === '') {
    callback(new Error('Please input your credentials'))
  } else if (
    form.username !== ADMIN_CREDENTIALS.username ||
    form.password !== ADMIN_CREDENTIALS.password
  ) {
    callback(new Error('Wrong credentials'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules>({
  username: [{ validator: validateCredentials, trigger: 'manual' }],
  password: [{ validator: validateCredentials, trigger: 'manual' }],
})

const login = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      localStorage.setItem('user', JSON.stringify(ADMIN_CREDENTIALS))
      userStore.setUser(true)
      router.push('/home').then(() => {
        nextTick(() => {
          toast.success('Logged in successfully!')
        })
      })
    } else {
      console.log('error submit!', fields)
      userStore.setUser(false)
      if (fields) {
        Object.values(fields).forEach((fieldErrors) => {
          fieldErrors.forEach((error) => toast.error(error.message))
        })
      }
    }
  })
}
</script>

<style scoped></style>
