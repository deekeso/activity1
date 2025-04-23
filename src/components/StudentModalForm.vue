<script lang="ts" setup>
import { ref, reactive, computed, onMounted, onBeforeMount } from 'vue'
import { useStudentStore } from '@/stores/student'
import { Delete } from '@element-plus/icons-vue'
import type { Student } from '@/types/CommonModels'

// Define events to emit to parent
const studentStore = useStudentStore()

// Dialog visibility state
const dialogVisible = ref(false)
// Calculate the maximum year (18 years ago from today)
const currentYear = new Date().getFullYear()
const maxYear = currentYear - 18

// Default value for the picker (maximum selectable year)

// Disable future years (years after maxYear)
const disableFutureYears = (date: Date) => {
  return date.getFullYear() > maxYear
}
// Form data initialization
const defaultFormData = (): Omit<Student, 'id'> => ({
  firstName: '',
  middleName: ''.toUpperCase(),
  lastName: '',
  birthDate: '',
  age: 0,
  address: '',
  course: '',
})

// Form data - use reactive for reactivity
const formData = reactive<Omit<Student, 'id'>>(defaultFormData())

// Selected student reference for editing mode
const selectedStudent = ref<Student | null>(null)

// Form reference for validation
const formRef = ref()

// Calculate age based on birthdate using computed
const computedAge = computed(() => {
  if (formData.birthDate) {
    const today = new Date()
    const birthDate = new Date(formData.birthDate)
    let age = today.getFullYear() - birthDate.getFullYear()
    const month = today.getMonth() - birthDate.getMonth()
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age.toString()
  }
  return ''
})
// Form validation rules
import type { FormItemRule } from 'element-plus'

const formRules = {
  firstName: [
    { required: true, message: 'Please input first name', trigger: 'blur' },
    {
      validator: (_rule: FormItemRule, value: string, callback: (error?: Error) => void) => {
        if (!value || !value.trim()) {
          callback(new Error('Input cannot be empty or spaces only'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
    { min: 2, max: 50, message: 'Length should be 2 to 50 characters', trigger: 'blur' },
  ],
  middleName: [
    { required: false, message: 'Please input middle name', trigger: 'blur' },
    {
      validator: (_rule: FormItemRule, value: string, callback: (error?: Error) => void) => {
        if (value && !value.trim()) {
          callback(new Error('Input cannot be empty or spaces only'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
    { min: 1, max: 1, message: 'Length should be 1 character only', trigger: 'blur' },
  ],
  lastName: [
    { required: true, message: 'Please input last name', trigger: 'blur' },
    {
      validator: (_rule: FormItemRule, value: string, callback: (error?: Error) => void) => {
        if (!value || !value.trim()) {
          callback(new Error('Input cannot be empty or spaces only'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
    { min: 2, max: 50, message: 'Length should be 2 to 50 characters', trigger: 'blur' },
  ],
  birthDate: [{ required: true, message: 'Please select birth date', trigger: 'change' }],
  address: [
    { required: true, message: 'Please input address', trigger: 'blur' },
    {
      validator: (_rule: FormItemRule, value: string, callback: (error?: Error) => void) => {
        if (!value || !value.trim()) {
          callback(new Error('Your Address cannot be empty or spaces only'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
    { min: 5, max: 100, message: 'Length should be 5 to 100 characters', trigger: 'blur' },
  ],
  course: [{ required: true, message: 'Please select a course', trigger: 'change' }],
}

const confirmationDialogVisible = ref(false)
const confirmationAction = ref<'add' | 'update'>('add')
const confirmationDetails = ref<Omit<Student, 'id'> | null>(null)

// Save student to store
function saveStudent(studentData: Omit<Student, 'id'>) {
  if (selectedStudent.value) {
    // Update existing student
    studentStore.updateStudent({
      ...studentData,
      id: selectedStudent.value.id,
    })
  } else {
    // Add new student
    studentStore.addStudent(studentData)
  }
  closeDialog()
} // Modify the saveForm method to show confirmation dialog
const saveForm = async () => {
  if (!formRef.value) return

  try {
    const valid = await formRef.value.validate()
    if (valid) {
      const studentData = {
        firstName: formData.firstName
          ? formData.firstName.charAt(0).toUpperCase() + formData.firstName.slice(1)
          : '',
        middleName: formData.middleName ? formData.middleName.charAt(0).toUpperCase() : '',
        lastName: formData.lastName
          ? formData.lastName.charAt(0).toUpperCase() + formData.lastName.slice(1)
          : '',
        birthDate: formData.birthDate,
        age: parseInt(computedAge.value) || 0,
        address: formData.address,
        course: formData.course,
      }

      // Determine if it's an add or update action
      confirmationAction.value = selectedStudent.value ? 'update' : 'add'
      confirmationDetails.value = studentData
      confirmationDialogVisible.value = true
    }
  } catch (error) {
    console.log('Form validation failed', error)
  }
}
// Confirm save/update action
const confirmAction = () => {
  if (confirmationDetails.value) {
    saveStudent(confirmationDetails.value)
    confirmationDialogVisible.value = false
  }
}

// Cancel action
const cancelConfirmation = () => {
  confirmationDialogVisible.value = false
}
// Reset form
const resetForm = () => {
  if (!formRef.value) return
  formRef.value.resetFields()
  Object.assign(formData, defaultFormData())

  // Don't reset selectedStudent if in edit mode
  if (!isEditMode.value) {
    selectedStudent.value = null
  }
}

// Close dialog and reset form
const handleClose = () => {
  dialogVisible.value = false
  resetForm()
}
const isEditMode = ref(false)

// Method to open dialog - called by parent via ref
const openDialog = (student: Student | null = null) => {
  if (student) {
    selectedStudent.value = student
    isEditMode.value = true // Set edit mode flag
    Object.assign(formData, {
      firstName: student.firstName,
      middleName: student.middleName,
      lastName: student.lastName,
      birthDate: student.birthDate,
      age: student.age,
      address: student.address,
      course: student.course,
    })
  } else {
    isEditMode.value = false // Set to add mode
    resetForm()
  }

  dialogVisible.value = true
}

// Method to close dialog - called by parent via ref
const closeDialog = () => {
  dialogVisible.value = false
  isEditMode.value = false
  resetForm()
  selectedStudent.value = null
}

// Expose methods to parent
defineExpose({
  openDialog,
  closeDialog,
})

const drawerSize = ref('100%')

const setDrawerSize = () => {
  const screenWidth = window.innerWidth
  // Adjust size based on screen width
  drawerSize.value = screenWidth >= 1180 ? '40%' : '100%'
}

onMounted(() => {
  // Emit event to parent when dialog visibility changes
  setDrawerSize() // Set the size initially
  window.addEventListener('resize', setDrawerSize)
})

onBeforeMount(() => {
  window.removeEventListener('resize', setDrawerSize) // Clean up the event listener
})

const allowOnlyAlphabets = (event: KeyboardEvent) => {
  // allow space
  if (event.key === ' ') return
  const char = event.key
  // If the character is not a letter, prevent it
  if (!/^[a-zA-Z]+$/.test(char)) {
    event.preventDefault()
  }
}

const disableAllInput = (event: KeyboardEvent): void => {
  // Prevent all input, no exceptions
  event.preventDefault()
}
</script>

<template>
  <el-drawer
    v-model="dialogVisible"
    direction="rtl"
    :size="drawerSize"
    @close="handleClose"
    class="student-form-drawer"
  >
    <template #header>
      <div class="drawer-header">
        <h3>{{ isEditMode ? 'Edit Student' : 'Add New Student' }}</h3>
      </div>
    </template>
    <!-- Form component -->
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="120px"
      label-position="top"
    >
      <el-row :gutter="30">
        <el-col :span="12">
          <el-form-item label="First Name" prop="firstName">
            <el-input v-model="formData.firstName" placeholder="" @keypress="allowOnlyAlphabets" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Middle Initial" prop="middleName">
            <el-input
              v-model="formData.middleName"
              placeholder=""
              maxlength="1"
              @input="formData.middleName = formData.middleName.toUpperCase()"
              @keypress="allowOnlyAlphabets"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="12">
          <el-form-item label="Last Name" prop="lastName">
            <el-input v-model="formData.lastName" placeholder="" @keypress="allowOnlyAlphabets" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Birth Date" prop="birthDate">
            <el-date-picker
              v-model="formData.birthDate"
              type="date"
              placeholder="Select a date"
              style="width: 100%"
              :disabled-date="disableFutureYears"
              @keydown="disableAllInput"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="12">
          <el-form-item label="Age" prop="age">
            <el-text class="form-text">{{ computedAge }}</el-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Course" prop="course">
            <el-select v-model="formData.course" placeholder="">
              <el-option
                label="Bachelor of Science in Information Technology"
                value="Bachelor of Science in Information Technology"
              />
              <el-option
                label="Bachelor of Science in Computer Science"
                value="Bachelor of Science in Computer Science"
              />
              <el-option
                label="Bachelor of Science in Tourism"
                value="Bachelor of Science in Tourism"
              />
              <el-option
                label="Bachelor of Science in Hotel and Restaurant Management"
                value="Bachelor of Science in Hotel and Restaurant Management"
              />
              <el-option
                label="Bachelor of Science in Nursing"
                value="Bachelor of Science in Nursing"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="Address" prop="address">
        <el-input
          v-model="formData.address"
          :autosize="{ minRows: 2, maxRows: 4 }"
          type="textarea"
          placeholder="Please input"
          show-word-limit
          maxlength="100"
        />
      </el-form-item>

      <!-- Dialog footer with action buttons -->
      <div class="dialog-footer">
        <el-button type="info" @click="resetForm">
          <el-icon
            :size="18"
            style="display: flex; align-items: center; justify-content: center; right: 5px"
            ><Delete
          /></el-icon>
          Clear
        </el-button>
        <el-button @click="handleClose">Cancel</el-button>
        <el-button type="primary" @click="saveForm">Save</el-button>
      </div>
    </el-form>
  </el-drawer>
  <el-dialog
    v-model="confirmationDialogVisible"
    :title="confirmationAction === 'add' ? 'Confirm Add Student' : 'Confirm Update Student'"
    width="500px"
  >
    <div class="confirmation-content">
      <h3>Student Details Confirmation</h3>
      <div class="detail-row">
        <strong>Action:</strong>
        {{ confirmationAction === 'add' ? 'Add New Student' : 'Update Existing Student' }}
      </div>
      <div class="detail-row">
        <strong>Name:</strong>
        {{ formData.firstName }} {{ formData.middleName }} {{ formData.lastName }}
      </div>
      <div class="detail-row">
        <strong>Birth Date:</strong>
        {{ new Date(formData.birthDate).toLocaleDateString() }}
      </div>
      <div class="detail-row">
        <strong>Age:</strong>
        {{ computedAge }}
      </div>
      <div class="detail-row">
        <strong>Course:</strong>
        {{ formData.course }}
      </div>
      <div class="detail-row">
        <strong>Address:</strong>
        {{ formData.address }}
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancelConfirmation">Cancel</el-button>
        <el-button type="primary" @click="confirmAction">
          Confirm {{ confirmationAction === 'add' ? 'Add' : 'Update' }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.confirmation-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.detail-row {
  display: flex;
  gap: 10px;
}

.detail-row strong {
  min-width: 120px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
.drawer-header {
  font-size: 25px;
  color: var(--primary-color);
}
:deep(.el-form-item__label) {
  font-weight: bold;
}
.form-text {
  font-size: 14px;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  width: 100%;
  justify-content: flex-start;
  display: flex;
  align-items: center;
  padding-left: 10px;
  height: 32px;
}
:deep(.student-form-drawer) {
  height: auto;
}
</style>
