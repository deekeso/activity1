import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import router from '@/router'

import type { UserModel } from '@/types/CommonModels'
const dummyUser = {
  username: 'admin',
  password: 'admin123',
}

export const useAuthStore = defineStore('auth', () => {
  const formModel = reactive<UserModel>({
    username: '',
    password: '',
  })

  const resetFormModel = () => {
    formModel.username = ''
    formModel.password = ''
  }
  const formRef = ref<FormInstance | null>(null)

  const rules = reactive({
    username: [
      { required: true, message: 'Username is required', trigger: 'blur' },
      {
        required: true,
        min: 3,
        message: 'Username must be at least 3 characters',
        trigger: 'blur',
      },
    ],
    password: [
      { required: true, message: 'Password is required', trigger: 'blur' },
      {
        required: true,
        min: 6,
        message: 'Password must be at least 6 characters',
        trigger: 'blur',
      },
    ],
  })

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    if (!formRef.value) return

    try {
      await formRef.value.validate()
      if (formModel.username === dummyUser.username && formModel.password === dummyUser.password) {
        console.log('Authentication successful')
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem(
          'userData',
          JSON.stringify({
            username: formModel.username,
            password: formModel.password,
          }),
        )
        ElMessage.success('Login successful! Redirecting to registration page...')
        formModel.username = ''
        formModel.password = ''
        router.push('/register')
      } else {
        console.error('Authentication failed: Invalid username or password')
        ElMessage.error('Invalid username or password. Please try again.')
      }
    } catch (error) {
      console.error('Form validation failed:', error)
      ElMessage.error('Form validation failed. Please check your input.')
    }
  }
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userData')
    router.push('/')
  }
  return { formModel, formRef, rules, handleSubmit, resetFormModel, handleLogout }
})
