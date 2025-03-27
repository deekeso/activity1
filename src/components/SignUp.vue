<template>
  <div class="formContainer">
    <h1>Create Account</h1>
    <el-form ref="SignUpFormRef" :model="signUpForm" :rules="SignUpFormRules" class="signUpForm">
      <el-form-item prop="UserName">
        <el-input
          v-model="signUpForm.UserName"
          placeholder="Username"
          class="grid-content"
          style="width: 100%"
        ></el-input>
      </el-form-item>

      <el-row :gutter="15">
        <el-col :span="24">
          <el-form-item prop="FirstName">
            <el-input v-model="signUpForm.FirstName" placeholder="Firstname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="MiddleName">
            <el-input v-model="signUpForm.MiddleName" placeholder="Middle Name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="LastName">
            <el-input v-model="signUpForm.LastName" placeholder="Lastname"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item prop="Birthday">
            <el-date-picker
              v-model="signUpForm.Birthday"
              type="date"
              placeholder="Birth Date"
              style="width: 100%"
              @change="calculateAge"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="Age">
            <el-input v-model="signUpForm.Age" placeholder="Age" type="number" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item prop="Address">
        <el-input v-model="signUpForm.Address" placeholder="Address"></el-input>
      </el-form-item>

      <el-form-item prop="Course">
        <el-select v-model="signUpForm.Course" placeholder="Select Course" style="width: 100%">
          <el-option
            v-for="course in courseOptions"
            :key="course"
            :label="course"
            :value="course"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="Password">
        <el-input v-model="signUpForm.Password" type="password" placeholder="Password"></el-input>
      </el-form-item>
      <el-form-item prop="ConfirmPassword">
        <el-input
          v-model="signUpForm.ConfirmPassword"
          type="password"
          placeholder="Confirm Password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="goToDisplayStudentInformation" style="width: 100%"
          >Sign Up</el-button
        >
        <p style="color: black">Already have an account?<a @click="goToLogIn">Login</a></p>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { InputStoreUser } from '@/stores/studentInfo'
import type { FormInstance, FormRules } from 'element-plus'
// import { SignUp } from '@/stores/studentInfo'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
const inputStore = InputStoreUser()

interface SignUpForm {
  UserName: string
  FirstName: string
  MiddleName: string
  LastName: string
  Birthday: string
  Age: string
  Address: string
  Course: string
  Password?: string
  ConfirmPassword?: string
}

const SignUpFormRef = ref<FormInstance>()
const signUpForm = reactive<SignUpForm>({
  UserName: '',
  FirstName: '',
  MiddleName: '',
  LastName: '',
  Birthday: '',
  Age: '',
  Address: '',
  Course: '',
  Password: '',
  ConfirmPassword: '',
})

const courseOptions = [
  'Bachelor of Science in Information and Technology',
  'Bachelor in Computer Science',
  'Bachelor of Science in Tourism',
  'Bachelor of Science in Hotel and Restaurant Management',
  'Bachelor of Science in Nursing',
]

// console.log(signUpForm, '')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validatePassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    // Regular expressions to check for requirements
    const upperCasePattern = /[A-Z]/ // At least one uppercase letter
    const lowerCasePattern = /[a-z]/ // At least one lowercase letter
    const specialCharacterPattern = /[!@#$%^&*(),.?":{}|<>]/ // At least one special character
    const numberPattern = /\d/ // At least one number
    const minLength = 8 // Minimum length for the password

    // Check if password meets the conditions
    if (!upperCasePattern.test(value)) {
      callback(new Error('Password must contain at least one uppercase letter'))
    } else if (!lowerCasePattern.test(value)) {
      callback(new Error('Password must contain at least one lowercase letter'))
    } else if (!specialCharacterPattern.test(value)) {
      callback(new Error('Password must contain at least one special character'))
    } else if (!numberPattern.test(value)) {
      callback(new Error('Password must contain at least one number'))
    } else if (value.length < minLength) {
      callback(new Error('Password must be at least 8 characters long'))
    } else {
      // If password is valid, check ConfirmPassword field
      if (signUpForm.ConfirmPassword !== '') {
        if (!SignUpFormRef.value) return
        SignUpFormRef.value.validateField('ConfirmPassword')
      }
      callback()
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validatePassword2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Pleas inpu password again'))
  } else if (value !== signUpForm.Password) {
    callback(new Error('The password does not match'))
  } else {
    callback()
  }
}

const SignUpFormRules = reactive<FormRules<SignUpForm>>({
  UserName: [{ required: true, message: 'Please input username', trigger: 'blur' }],
  FirstName: [
    { required: true, message: 'Please input firstname', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z\s]+$/,
      message: 'Firstname cannot contain numbers or special characters',
      trigger: 'blur',
    },
  ],
  MiddleName: [
    { required: true, message: 'Please input middlename', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z\s]+$/,
      message: 'Middlename cannot contain numbers or special characters',
      trigger: 'blur',
    },
  ],
  LastName: [
    { required: true, message: 'Please input lastname', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z\s]+$/,
      message: 'Lastname cannot contain numbers or special characters',
      trigger: 'blur',
    },
  ],
  Birthday: [{ required: true, message: 'Please pick a date', trigger: 'blur' }],
  Age: [{ required: true, message: 'Please input age', trigger: 'blur' }],
  Address: [{ required: true, message: 'Please input address', trigger: 'blur' }],

  Password: [{ validator: validatePassword, trigger: 'blur' }],
  ConfirmPassword: [{ validator: validatePassword2, trigger: 'blur' }],
})

const calculateAge = () => {
  if (signUpForm.Birthday) {
    const birthDate = new Date(signUpForm.Birthday)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    signUpForm.Age = age
  }
}

const router = useRouter()

// const SignUp = Si

const goToDisplayStudentInformation = () => {
  SignUpFormRef.value?.validate((valid) => {
    if (valid) {
      inputStore.SignUp(signUpForm)
      router.push('/goToLogInForm')
    }
  })
}

const goToLogIn = () => {
  router.push('/goToLogInForm')
}
</script>

<style>
.el-input__inner {
  color: black;
}
h1 {
  color: black;
  text-align: center;
  padding: 10px;
}

.formContainer {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.el-button {
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-input ::placeholder {
  color: rgba(0, 0, 0, 0.616);
}
</style>
