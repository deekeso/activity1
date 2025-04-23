<template>
  <div class="container">
    <div class="inner-container">
      <!-- HERE -->
      <el-form ref="ruleFormRef" :model="form" :rules="rules" :size="formSize" status-icon>
        <el-row>
          <el-col :span="24">
            <el-form-item prop="newPassword">
              <el-input
                v-model="form.newPassword"
                type="password"
                class="input-container"
                size="large"
                show-password
                placeholder="ENTER NEW PASSWORD"
                :prefix-icon="Unlock"
                input-style="font-family:regular; color:white"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item prop="confirmPassword">
              <el-input
                v-model="form.confirmPassword"
                type="password"
                class="input-container"
                size="large"
                show-password
                placeholder="CONFIRM NEW PASSWORD"
                :prefix-icon="Lock"
                input-style="font-family:regular; color:white"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <div class="confirm">
          <el-button size="large" class="button" @click="updatePassword(ruleFormRef)">
            CONFIRM
          </el-button>
        </div>

        <!-- HERE -->
        <div class="forgot-password">
          <RouterLink to="/">
            <el-text class="forgot-password-text">Go Back</el-text>
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

<script setup lang="ts">
import vector from '../assets/vector.png'
import circle1 from '../assets/circle1.png'
import circle2 from '../assets/circle2.png'
import circle3 from '../assets/circle3.png'
import { Lock, Unlock } from '@element-plus/icons-vue'
import { nextTick, reactive, ref } from 'vue'
import { toast } from 'vue3-toastify'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const router = useRouter()

const form = reactive({
  newPassword: '',
  confirmPassword: '',
})

const rules = reactive<FormRules>({
  newPassword: [{ required: true, message: 'Please enter new password', trigger: 'change' }],
  confirmPassword: [
    { required: true, message: 'Please confirm new password', trigger: 'change' },
    {
      validator: (rule, value, callback) => {
        if (value !== form.newPassword) {
          callback(new Error('Passwords do not match'))
        } else {
          callback()
        }
      },
      trigger: 'change',
    },
  ],
})

const updatePassword = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      localStorage.setItem(
        'admin_credentials',
        JSON.stringify({ username: 'admin', password: form.newPassword }),
      )

      router.push('/').then(() => {
        nextTick(() => {
          toast.success('Password updated successfully!')
        })
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style scoped></style>
