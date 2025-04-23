<script setup lang="ts">
import { editStudent } from '@/composables/useUser'
import { House, User } from '@element-plus/icons-vue'
import type { ComponentSize, FormInstance } from 'element-plus'
import { reactive, ref, watch } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { courses } from '@/constant/courses'
import { signupRules } from '@/rules/authRules'
import { ConfirmBox } from '@/composables/useConfirm'
import type { TStudent, TUpdateStudent } from '@/types/types'
import { ErrorNotification } from '@/composables/useNotification'

const props = defineProps<{
  student: TStudent
  updateDrawer: boolean
}>()

const emits = defineEmits(['handleClose'])
const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<TUpdateStudent>({
  id: props.student.id,
  firstName: props.student.firstName,
  middleInitial: props.student.middleInitial,
  lastName: props.student.lastName,

  birthDate: props.student.birthDate,
  age: props.student.age,

  address: props.student.address,
  course: props.student.course,
})

const { width } = useWindowSize()
const drawerSize = ref('')

// Show Confirm box to make sure the user really want to update the info.
const UpdateStudentConfirmBox = (formE1: FormInstance | undefined) => {
  ConfirmBox({
    title: 'Update ',
    messageContent: 'Are you sure you want to update this user?',
    callback: () => {
      editStudent(formE1)
      emits('handleClose')
    },
  })
}

// Check the width of the browser to match the size of drawer for updating new student.
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
    const monthDiff = today.getMonth() - bday.getMonth()
    const dayDiff = today.getDate() - bday.getDate()

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--
    }

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
    @close="emits('handleClose')"
    :model-value="updateDrawer"
    title="Update Student's Information"
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
      <el-form-item prop="firstName">
        <el-input
          clearable
          minlength="2"
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

      <!-- middleinitial -->
      <el-form-item prop="middleInitial">
        <el-input
          clearable
          minlength="1"
          maxlength="1"
          show-word-limit
          :formatter="
            (value: string) =>
              value
                .replace(/[^a-zA-Z ]/g, '') // Allow both uppercase and lowercase letters plus spaces
                .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
          "
          input-style="margin-left:0.5em;"
          v-model="ruleForm.middleInitial"
          size="large"
          placeholder="MIDDLE INITIAL"
          ><template #prefix>
            <el-icon size="20" class="el-icon"><User /></el-icon> </template
        ></el-input>
      </el-form-item>

      <!-- lastname -->
      <el-form-item prop="lastName">
        <el-input
          clearable
          minlength="2"
          maxlength="30"
          show-word-limit
          :formatter="
            (value: string) =>
              value
                .replace(/[^a-zA-Z ]/g, '') // Allow both uppercase and lowercase letters plus spaces
                .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
          "
          input-style="margin-left:0.5em;"
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
          minlength="2"
          maxlength="30"
          show-word-limit
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
          @click="UpdateStudentConfirmBox(ruleFormRef)"
          style="width: 100%; height: 50px"
          size="large"
        >
          <el-text class="semibold-text">Update</el-text>
        </el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style scoped>
* {
  color: black !important;
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
