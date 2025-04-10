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

          <el-form ref="AddStudentFormRef" :model="form" :rules="Rules">
            <!-- <el-row>
              <el-col>
                <el-form-item prop="UserName">
                  <el-input v-model="form.UserName" placeholder="Username"></el-input>
                </el-form-item>
              </el-col>
            </el-row> -->

            <el-row>
              <el-col>
                <el-form-item prop="FirstName">
                  <el-input v-model="form.FirstName" placeholder="Firstname"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="10">
              <el-col :span="12">
                <el-form-item prop="MiddleName">
                  <el-input
                    v-model="form.MiddleName"
                    placeholder="Middle Initial"
                    maxlength="1"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="LastName">
                  <el-input v-model="form.LastName" placeholder="Lastname"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item prop="Birthday">
                  <el-date-picker
                    v-model="form.Birthday"
                    type="date"
                    placeholder="Birth Date"
                    style="width: 100%"
                    :disabled-date="disableFutureDates"
                    @change="calculateAge"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="Age">
                  <el-input v-model="form.Age" placeholder="Age" type="number" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col>
                <el-form-item prop="Address">
                  <el-input v-model="form.Address" placeholder="Address"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item prop="Course">
              <el-select v-model="form.Course" placeholder="Select Course" style="width: 100%">
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
import type { FormInstance } from 'element-plus'
import { defineEmits, defineProps, reactive, ref, watch } from 'vue'
// import type { StudentAddForm } from '@/types/types'
import { RulesOfTheForm } from './composables/global'
import { Profileform } from './composables/global'

const Rules = reactive(RulesOfTheForm)

const AddStudentFormRef = ref<FormInstance>()

const disableFutureDates = (date: Date) => {
  return date.getTime() > Date.now()
}
// Calculate age based on the birthday
const calculateAge = () => {
  if (form.Birthday) {
    const birthDate = new Date(form.Birthday)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    if (age < 3) {
      form.Age = ''
      Rules.Age = [
        { required: true, message: 'Age must be at least 3 years old', trigger: 'change' },
      ]
      AddStudentFormRef.value?.validateField('Age') // Trigger validation for the Age field
    } else {
      form.Age = age.toString()
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
const form = Profileform
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
      inputStore.AddUser({ ...form, Id: `${Date.now()}` }) // Include an ID if required
      alert('Student added successfully!')

      resetForm() // Clear the form inputs
      handleClose() // Close the drawer
    }
  })
}

const resetForm = () => {
  Object.keys(form).forEach((key) => {
    form[key] = '' // Clear all fields
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

:deep(.el-select__placeholder) {
  color: var(--el-input-text-color, var(--el-text-color-regular));
}
</style>
