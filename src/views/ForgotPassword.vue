<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { Message } from '@element-plus/icons-vue'
import { RouterLink } from 'vue-router'
const formRef = ref<FormInstance | null>(null)
const loading = ref(false)

const formData = reactive({
  email: ''
})

const rules: FormRules = {
  email: [
    { required: true, message: 'Please enter your email address', trigger: 'blur' },
    { type: 'email', message: 'Please enter a valid email address', trigger: 'blur' }
  ]
}

const submitForm = () => {
  if (!formRef.value) return
  
  formRef.value.validate((valid) => {
    if (valid) {
      loading.value = true
      
      // Simulate API call
      setTimeout(() => {
        ElMessage({
          type: 'success',
          message: 'Reset link has been sent to your email address'
        })
        loading.value = false
      }, 1500)
    }
  })
}
</script>
<template>
  <div class="forgot-password-container">
    <div class="background-designs">
      <svg class="wave-top" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
        <path fill="#ffffff" fill-opacity="0.1" d="M0,192L48,176C96,160,192,128,288,128C384,128,480,160,576,170.7C672,181,768,171,864,144C960,117,1056,75,1152,69.3C1248,64,1344,96,1392,112L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
      </svg>
      <svg class="wave-bottom" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
        <path fill="#ffffff" fill-opacity="0.1" d="M0,64L48,80C96,96,192,128,288,133.3C384,139,480,117,576,112C672,107,768,117,864,138.7C960,160,1056,192,1152,186.7C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
     
    </div>

    <div class="form-container" >
      <div class="logo-section">
        <div class="lock-svg">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 14.5V16.5M7 10.5V8.5C7 5.73858 9.23858 3.5 12 3.5C14.7614 3.5 17 5.73858 17 8.5V10.5M8.5 20.5H15.5C16.6046 20.5 17.5 19.6046 17.5 18.5V12.5C17.5 11.3954 16.6046 10.5 15.5 10.5H8.5C7.39543 10.5 6.5 11.3954 6.5 12.5V18.5C6.5 19.6046 7.39543 20.5 8.5 20.5Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h1>Forgot Password</h1>
      </div>
      <p class="description">
        Enter your email address and we'll send you a link to reset your password.
      </p>
      <el-form 
        :model="formData" 
        :rules="rules" 
        ref="formRef" 
        class="forgot-form"
      >
        <el-form-item prop="email">
          <el-input 
            v-model="formData.email" 
            placeholder="Email address"
            :prefix-icon="Message"
           
          >
          </el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button 
            @click="submitForm" 
            :loading="loading" 
            class="submit-btn" 
            size="large"
          >
            Send Reset Link
          </el-button>
        </el-form-item>
      </el-form>
      
      <div class="back-to-login">
        <RouterLink to="/" class="back-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Back to Login
        </RouterLink>
      </div>
    </div>
    
  
  </div>
</template>



<style scoped>
.forgot-password-container {
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #244bc5;
  position: relative;
  overflow: hidden;
  justify-content: center;
  align-items: center;
}

/* Background design elements */
.background-designs {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.wave-top, .wave-bottom {
  position: absolute;
  left: 0;
  width: 100%;
  height: auto;
}

.wave-top {
  top: 0;
}

.wave-bottom {
  bottom: 0;
}

.circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
}

.circle-1 {
  width: 300px;
  height: 300px;
  top: -100px;
  right: -50px;
}

.circle-2 {
  width: 200px;
  height: 200px;
  bottom: 100px;
  left: -50px;
}

.circle-3 {
  width: 150px;
  height: 150px;
  top: 40%;
  left: 30%;
  background: rgba(255, 255, 255, 0.05);
}

.form-container {
  width: 90%;
  max-width: 450px;
  padding: 3rem;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  background-color: rgba(42, 87, 223, 0.6);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.logo-section {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.lock-svg {
  margin-right: 1rem;
}

h1 {
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
  color: white;
}

.description {
  margin-bottom: 2rem;
  font-size: 1rem;
  opacity: 0.9;
}

.forgot-form {
  margin-bottom: 2rem;
  min-height: 140px;
}

/* Deep selectors for Element Plus components */
:deep(.el-form-item) {
  position: relative;
  margin-bottom: 1rem;
}

:deep(.el-form-item:has(.el-input)) {
  margin-bottom: 2.5rem;
}

:deep(.el-form-item__error) {
  font-size: 0.95rem;
  margin-top: 0.5rem;
  margin-left: 0.2rem;
  font-weight: 500;
  color: #ff6b6b;
  position: absolute;
  height: 1.5rem;
  overflow: visible;
}

:deep(.el-input__prefix) {
  color: var(--primary-color);
}

:deep(.el-input__wrapper) {
  background-color: white;
  padding: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

:deep(.el-button--primary) {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

:deep(.el-button--primary:hover) {
  background-color: var(--secondary-color);
  border-color: var(--secondary-color);
}

/* Button and navigation styles */
.submit-btn {
  width: 100%;
  background-color: white;
  border-color: var(--primary-color);
  color: var(--primary-color);
  font-weight: 600;
  height: 48px;
  border-radius: 4px;
  transition: all 0.3s ease;
  position: relative;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.back-to-login {
  margin-top: 1rem;
}

.back-link {
  display: flex;
  align-items: center;
  color: white;
  text-decoration: none;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.back-link:hover {
  opacity: 1;
}

.back-link svg {
  margin-right: 0.5rem;
}

/* Responsive styles */
@media (max-width: 1024px) {
  .form-container {
    padding: 2.5rem;
    width: 85%;
  }
}

@media (max-width: 768px) {
  .forgot-password-container {
    flex-direction: column;
  }
  
  .form-container {
    width: 90%;
    padding: 2rem;
    min-height: auto;
  }
  
  .illustration, .circle-3 {
    display: none;
  }
}

@media (max-width: 480px) {
  .form-container {
    padding: 1.5rem;
    width: 95%;
  }
  
  h1 {
    font-size: 1.75rem;
  }
  
  .description {
    font-size: 0.9rem;
  }
  
  .logo-section {
    margin-bottom: 1rem;
  }
  
  .lock-svg svg {
    width: 50px;
    height: 50px;
  }
  
  :deep(.el-form-item) {
    margin-bottom: 1.8rem;
  }
  
  :deep(.el-form-item.is-error) {
    margin-bottom: 2.5rem;
  }
  
  .forgot-form {
    min-height: 120px;
  }
}
</style>
