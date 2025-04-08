<template>
  <section>
    <el-row>
      <el-col>
        <div class="Container">
          <h1 style="color: white">Forgot Password?</h1>
        </div>
      </el-col>
      <el-col>
        <el-form ref="ResetPasswordFormRef" :model="resetPasswordForm" :rules="LogInFormRules">
          <el-form-item prop="UserName">
            <el-input
              v-model="resetPasswordForm.NewPassword"
              placeholder="New Password"
              :prefix-icon="User"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item prop="Password">
            <el-input
              v-model="resetPasswordForm.ConfirmPassword"
              placeholder="Confirm Password"
              :prefix-icon="Lock"
              type="password"
            ></el-input>
          </el-form-item>
          <el-button type="primary" @click="handleLogIn" style="width: 100%"
            >Update Password</el-button
          >
          <a class="goToLogIn" @click="goToLogIn">Go Back to Log In</a>
        </el-form>
      </el-col>
    </el-row>
  </section>
</template>

<script setup lang="ts">
import { InputStoreUser } from '@/stores/studentInfo'
import { Lock, User } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

interface ResetPassword {
  NewPassword: string
  ConfirmPassword: string
}

const ResetPasswordFormRef = ref<FormInstance>()
const resetPasswordForm = reactive<ResetPassword>({
  NewPassword: '',
  ConfirmPassword: '',
})

const LogInFormRules = reactive<FormRules<ResetPassword>>({
  NewPassword: [{ required: true, message: 'Please input New Password', trigger: 'blur' }],
  ConfirmPassword: [{ required: true, message: 'Please Confirm Password', trigger: 'blur' }],
})

const router = useRouter()

const goToLogIn = () => {
  router.push('/goToLogInForm')
}

// const inputStore = InputStoreUser()

// const handleLogIn = () => {
//   LogInFormRef.value?.validate((valid) => {
//     if (valid) {
//       const success = inputStore.LogIn(logInForm.UserName, logInForm.Password)
//       if (success) {
//         router.push('/goToDisplayStudentInformation')
//       } else {
//         alert('Invalid username or password')
//       }
//     }
//   })
// }
</script>

<style>
body {
  height: 100%;
  width: 100%;
  background-image: url('src/assets/BackgroundImage.png');
  background-size: cover;
  background-color: #2148c0;
  color: white;
}

.forgotPassword {
  display: flex;
  align-items: end;
  justify-content: end;
  color: white;
}

.Container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2vh;
  font-size: 25px;
  color: white;
}

.el-input__wrapper,
.el-button {
  width: 300px;
  height: 45px;
  background-color: transparent;
  border: 1px;
}

.el-button {
  background-color: white;
  color: black;
  /* margin-top: 2vh; */
  width: 300px;
}

.el-input::placeholder,
.el-button::placeholder {
  font-size: 14px !important;
  font-weight: 300;
}

.el-input__inner {
  /* color: white !important; */
  font-size: 14px !important;
}

::v-deep(.el-input__inner::placeholder) {
  color: white;
}

.goToLogIn {
  display: flex;
  justify-content: end;
  color: white;
}
</style>
