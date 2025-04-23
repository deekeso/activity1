<script setup lang="ts">
import { addStudent } from '@/composables/useUser'
import { House, User } from '@element-plus/icons-vue'
import type { ComponentSize, FormInstance } from 'element-plus'
import { reactive, ref, watch } from 'vue'
import { useWindowSize } from '@vueuse/core'
import type { TSignup } from '@/types/types'
import { signupRules } from '@/rules/authRules'
import { courses } from '@/constant/courses'
import { ErrorNotification } from '@/composables/useNotification'

defineProps<{
  addDrawer: boolean
}>()

const emits = defineEmits(['handleClose'])

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<TSignup>({
  firstName: '',
  middleInitial: '',
  lastName: '',

  birthDate: '',
  age: null,

  address: '',
  course: '',
})

const { width } = useWindowSize()
const drawerSize = ref('')

const handleAddStudent = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  console.log('Computed Age:', ruleForm.age)

  if (
    ruleForm.firstName &&
    ruleForm.lastName &&
    ruleForm.course &&
    ruleForm.address &&
    (ruleForm.age === null || ruleForm.age < 18 || ruleForm.age > 100)
  ) {
    ErrorNotification({
      messageContent: 'Age is not valid!',
    })
    return
  }
  addStudent(formEl)
}

const handleCloseAddDrawer = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  emits('handleClose')
  formEl.resetFields()
}

// Check the width of the browser to match the size of drawer for adding new student.
watch(
  width,
  (newWidth) => {
    drawerSize.value = newWidth <= 1280 ? '100%' : '30%'
  },
  { immediate: true },
)

watch(
  () => ruleForm.birthDate,
  () => {
    if (!ruleForm.birthDate) return

    const bday = new Date(ruleForm.birthDate)
    const today = new Date()

    let age = today.getFullYear() - bday.getFullYear()

    // Instead of checking month and day separately, combine the condition
    const hasBirthdayPassed =
      today.getMonth() > bday.getMonth() ||
      (today.getMonth() === bday.getMonth() && today.getDate() >= bday.getDate())

    if (!hasBirthdayPassed) {
      age--
    }

    // Ensure validation handles exactly 18 correctly
    if (age < 18 || age > 100) {
      ErrorNotification({
        messageContent: 'Age is not valid!',
      })
    }

    ruleForm.age = age
  },
)
</script>

<template>
  <el-drawer
    class="update-student-drawer"
    :size="drawerSize"
    @close="handleCloseAddDrawer(ruleFormRef)"
    :model-value="addDrawer"
    title="Add new student"
  >
    <el-form
      class="form"
      style="max-width: 700px; min-width: auto"
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="signupRules"
      :size="formSize"
      status-icon
    >
      <!-- firstname -->
      <el-form-item prop="firstName" required>
        <el-input
          clearable
          minlength="3"
          maxlength="30"
          show-word-limit
          :formatter="
            (value: string) =>
              value
                .replace(/[^a-zA-Z ]/g, '') // Allow both uppercase and lowercase letters plus spaces
                .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
          "
          input-style="margin-left:0.5em;"
          v-model="ruleForm.firstName"
          size="large"
          placeholder="FIRST NAME"
        >
          <template #prefix>
            <el-icon size="20" class="el-icon"><User /></el-icon>
          </template>
        </el-input>
      </el-form-item>

      <!-- middle initial -->
      <el-form-item prop="middleInitial">
        <el-input
          clearable
          minlength="1"
          maxlength="1"
          show-word-limit
          :formatter="(value: string) => value.replace(/[^a-zA-Z]/g, '')"
          v-model="ruleForm.middleInitial"
          size="large"
          placeholder="MIDDLE INITIAL"
        >
          <template #prefix>
            <el-icon size="20" class="el-icon"><User /></el-icon>
          </template>
        </el-input>
      </el-form-item>

      <!-- lastname -->
      <el-form-item prop="lastName">
        <el-input
          clearable
          minlength="2"
          maxlength="30"
          show-word-limit
          input-style="margin-left:0.5em;"
          :formatter="
            (value: string) =>
              value
                .replace(/[^a-zA-Z ]/g, '') // Keep only uppercase letters and spaces
                .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
          "
          v-model="ruleForm.lastName"
          size="large"
          placeholder="LAST NAME"
        >
          <template #prefix>
            <el-icon size="20" class="el-icon"><User /></el-icon> </template
        ></el-input>
      </el-form-item>

      <!-- age -->
      <el-form-item prop="age">
        <el-input
          disabled
          type="number"
          input-style="margin-left:0.5em;"
          v-model="ruleForm.age"
          size="large"
          placeholder="AGE"
          ><template #prefix>
            <el-icon size="20" class="el-icon"><User /></el-icon> </template
        ></el-input>
      </el-form-item>

      <!-- birthdate -->
      <el-form-item prop="birthDate">
        <el-date-picker
          class="date"
          v-model="ruleForm.birthDate"
          type="date"
          placeholder="PICK YOUR BIRTHDATE"
          style="width: 100%; height: 50px"
        />
      </el-form-item>

      <!-- address -->
      <el-form-item prop="address">
        <el-input
          clearable
          minlength="30"
          maxlength="250"
          show-word-limit
          :formatter="
            (value: string) => value.replace(/\s+/g, ' ') // Replace multiple spaces with a single space
          "
          input-style="margin-left:0.5em;"
          v-model="ruleForm.address"
          size="large"
          placeholder="ADDRESS"
        >
          <template #prefix>
            <el-icon size="20" class="el-icon"><House /></el-icon>
          </template>
        </el-input>
      </el-form-item>

      <!-- courses -->
      <el-form-item prop="course">
        <el-select-v2
          :options="courses"
          input-style="margin-left:0.5em;"
          v-model="ruleForm.course"
          size="large"
          placeholder="COURSE"
        />
      </el-form-item>

      <!-- Buttons -->
      <el-form-item style="margin-top: 16px">
        <el-button
          type="primary"
          @click="handleAddStudent(ruleFormRef)"
          style="width: 100%; height: 50px"
          size="large"
        >
          <el-text class="semibold-text">Create</el-text>
        </el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style scoped>
* {
  color: var(--secondary-text) !important;
}
::v-deep(.el-select__placeholder, .el-input__inner::placeholder, .el-input__icon) {
  color: var(--secondary-text);
  font-size: 16px;
}
::v-deep(.el-input__inner, .el-input__inner::placeholder, .el-input__icon) {
  color: var(--secondary-text);
  font-size: 16px;
}
::v-deep(.el-input__icon) {
  color: var(--secondary-text);
  font-size: 20px;
}
</style>
