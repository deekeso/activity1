<template>
  <el-row>
    <el-col :xs="24">
      <el-drawer
        :model-value="isOpenProfileDrawer"
        :before-close="handleCloseProfileDrawer"
        direction="rtl"
        class="demo-drawer"
        :size="drawerSize"
      >
        <div class="demo-drawer__content">
          <el-row>
            <el-col>
              <h1 :span="24">Edit Profile</h1>
            </el-col>
          </el-row>

          <el-form ref="AddStudentFormRef" :model="form" :rules="Rules">
            <!-- <el-row>
              <el-col>
                <el-form-item prop="UserName">
                  <el-input v-model="form.UserName" placeholder="Username" disabled></el-input>
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
          </el-form>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-button type="primary" @click="handleSubmit">Submit</el-button>
            </el-col>
            <el-col :span="12">
              <el-button @click="handleCloseProfileDrawer">Cancel</el-button>
            </el-col>
          </el-row>
        </div>
      </el-drawer>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { InputStoreUser } from '@/stores/studentInfo'
import { useWindowSize } from '@vueuse/core'
import type { FormInstance } from 'element-plus'
import { defineEmits, defineProps, nextTick, reactive, ref, watch } from 'vue'
import { Profileform } from './composables/global'
import type { StudentAddForm } from '@/types/types'
import { courseOptions } from './composables/global'

import { RulesOfTheForm } from './composables/global'

const Rules = reactive(RulesOfTheForm)

const StudentAddForm = {}
const form = Profileform

const AddStudentFormRef = ref<FormInstance>()

const { width } = useWindowSize()
const drawerSize = ref()

const disableFutureDates = (date: Date) => {
  return date.getTime() > Date.now()
}

watch(width, (newWidth) => {
  drawerSize.value = newWidth <= 768 ? '100%' : '30%'
})

const props = defineProps({
  isOpenProfileDrawer: Boolean,
  selectedStudent: Object as () => StudentAddForm,
})

const emits = defineEmits(['ProfilecloseDrawer'])

const inputStore = InputStoreUser()

const handleCloseProfileDrawer = () => {
  emits('ProfilecloseDrawer')
}

//validate age
const calculateAge = () => {
  if (form.Birthday) {
    const birthDate = new Date(form.Birthday)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    if (age < 1) {
      form.Age = ''
      Rules.Age = [
        { required: true, message: 'Age must be at least 1 years old', trigger: 'change' },
      ]
      AddStudentFormRef.value?.validateField('Age') // Trigger validation for the Age field
    } else {
      form.Age = age.toString()
    }
  }
}
const handleSubmit = () => {
  AddStudentFormRef.value?.validate((valid) => {
    if (valid) {
      const confirmation = confirm(
        'Click Ok if you want to proceed with updating the student information?',
      ) // Ask for confirmation
      if (confirmation) {
        console.log('Validated Form Data:', form)
        alert('Successfully updated student information')
        if (!form.Id) {
          console.error('Form Id is missing!')
          return
        }
        inputStore.updateStudentInfo(form)
        console.log('Updated Users:', inputStore.getAllUser()) // Log updated users
        handleCloseProfileDrawer()
        nextTick()
        resetForm()
      } else {
        console.log('Update action canceled by the user.')
        alert('Update canceled.')
      }
    } else {
      console.log('Validation failed')
    }
  })
  nextTick()
  resetForm()
}

const resetForm = () => {
  Object.keys(form).forEach((key) => {
    form[key] = '' // Clear all fields
  })
}

// Watch for changes in the selected student and update the form with the selected student's data
watch(
  () => props.selectedStudent,
  (newVal) => {
    if (newVal) {
      form.Id = newVal.Id // Ensure Id is properly assigned
      form.UserName = newVal.UserName
      form.FirstName = newVal.FirstName
      form.MiddleName = newVal.MiddleName
      form.LastName = newVal.LastName
      form.Birthday = newVal.Birthday
      form.Age = newVal.Age
      form.Address = newVal.Address
    }
  },
  { immediate: true },
)
</script>

<style scoped>
.buttonContainer {
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.el-button) {
  width: 100%;
}

:deep(.el-input__inner::placeholder) {
  color: black;
}

:deep(.el-select__placeholder) {
  color: black;
}
</style>
