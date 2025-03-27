<template>
  <el-row>
    <el-col :xs="24">
      <el-drawer
        :model-value="isOpen"
        :before-close="handleClose"
        direction="rtl"
        class="demo-drawer"
        :size="drawerSize"
      >
        <div class="demo-drawer__content">
          <el-row>
            <el-col>
              <h1 :span="24">Add Student</h1>
            </el-col>
          </el-row>

          <el-form ref="AddStudentFormRef" :model="addStudentForm" :rules="AddStudentFormRules">
            <el-row>
              <el-col>
                <el-form-item prop="UserName">
                  <el-input v-model="addStudentForm.UserName" placeholder="Username"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col>
                <el-form-item prop="FirstName">
                  <el-input v-model="addStudentForm.FirstName" placeholder="Firstname"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="10">
              <el-col :span="12">
                <el-form-item prop="MiddleName">
                  <el-input v-model="addStudentForm.MiddleName" placeholder="Middlename"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="LastName">
                  <el-input v-model="addStudentForm.LastName" placeholder="Lastname"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item prop="Birthday">
                  <el-date-picker
                    v-model="addStudentForm.Birthday"
                    type="date"
                    placeholder="Birth Date"
                    style="width: 100%"
                    @change="calculateAge"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="Age">
                  <el-input
                    v-model="addStudentForm.Age"
                    placeholder="Age"
                    type="number"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col>
                <el-form-item prop="Address">
                  <el-input v-model="addStudentForm.Address" placeholder="Address"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item prop="Course">
              <el-select
                v-model="addStudentForm.Course"
                placeholder="Select Course"
                style="width: 100%"
              >
                <el-option
                  v-for="course in courseOptions"
                  :key="course"
                  :label="course"
                  :value="course"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-button type="primary" @click="handleSubmit">Submit</el-button>
              </el-col>
              <el-col :span="12">
                <el-button @click="handleClose">Cancel</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-drawer>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { InputStoreUser } from '@/stores/studentInfo'
import { useWindowSize } from '@vueuse/core'
import type { FormInstance, FormRules } from 'element-plus'
import { defineEmits, defineProps, reactive, ref, watch } from 'vue'

interface AddStudentForm {
  UserName: string
  FirstName: string
  MiddleName: string
  LastName: string
  Birthday: string | Date
  Age: string
  Address: string
  Course: string
}

const AddStudentFormRef = ref<FormInstance>()

// Calculate age based on the birthday
const calculateAge = () => {
  if (addStudentForm.Birthday) {
    const birthDate = new Date(addStudentForm.Birthday)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    addStudentForm.Age = age.toString()

    // Validate that the age is at least 3 years
    if (age < 3) {
      AddStudentFormRules.Age = [
        { required: true, message: 'Age must be at least 3 years old', trigger: 'blur' },
      ]
    }
  }
}

const courseOptions = [
  'Bachelor of Science in Information and Technology',
  'Bachelor in Computer Science',
  'Bachelor of Science in Tourism',
  'Bachelor of Science in Hotel and Restaurant Management',
  'Bachelor of Science in Nursing',
]

const addStudentForm = reactive<AddStudentForm>({
  UserName: '',
  FirstName: '',
  MiddleName: '',
  LastName: '',
  Birthday: '',
  Age: '',
  Address: '',
  Course: '',
})

const AddStudentFormRules = reactive<FormRules<AddStudentForm>>({
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
})

const { width } = useWindowSize()
const drawerSize = ref()

watch(width, (newWidth) => {
  drawerSize.value = newWidth <= 768 ? '100%' : '30%'
})

defineProps({
  isOpen: Boolean,
})

const emits = defineEmits(['closeDrawer'])

const inputStore = InputStoreUser()

const handleClose = () => {
  emits('closeDrawer')
}

const handleSubmit = () => {
  AddStudentFormRef.value?.validate((valid) => {
    if (valid) {
      inputStore.SignUp(addStudentForm)
      handleClose()
    }
  })
}
</script>

<style scoped>
:deep(.el-input__inner) {
  color: black;
}

.buttonContainer {
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.el-button) {
  width: 100%;
}
</style>
