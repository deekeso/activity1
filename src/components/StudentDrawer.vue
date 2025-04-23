<template>
  <el-drawer
    v-model="localStudentDrawer"
    :with-header="true"
    :size="drawerSize"
    style="background-color: #2148c0"
    @close="closeDrawer"
  >
    <el-form ref="ruleFormRef" :model="editForm" :rules="rules" :size="formSize" status-icon>
      <div style="display: flex; justify-content: center">
        <el-image
          :src="studentImage"
          style="height: 30%; width: 50%; border-radius: 100%"
          fit="cover"
        />
      </div>

      <div style="display: flex; justify-content: center; margin-top: 10px; margin-bottom: 20px">
        <el-text
          style="color: white; font-family: bold; font-size: 24px; text-transform: uppercase"
        >
          TUPT - {{ student.id }}
        </el-text>
      </div>

      <el-row :gutter="20">
        <el-col :span="16">
          <el-text style="color: white; font-family: regular; font-size: 12px">
            * First Name
          </el-text>
          <div
            v-if="!editStudent"
            style="background-color: #264eca; padding: 15px; border-radius: 15px; height: 25px"
          >
            <el-text style="color: white; font-family: regular; font-size: 16px">
              {{ student.firstName }}
            </el-text>
          </div>

          <el-form-item prop="firstName">
            <el-input
              v-if="editStudent"
              v-model="editForm.firstName"
              class="drawer-input"
              style="width: 100%; margin-top: 5px"
              size="large"
              :prefix-icon="User"
              input-style="font-family:regular; color:white"
              @input="normalizeWhitespace"
            />
          </el-form-item>
        </el-col>

        <!-- HERE -->
        <el-col :span="8">
          <el-text style="color: white; font-family: regular; font-size: 12px">
            Middle Initial
          </el-text>
          <div
            v-if="!editStudent"
            style="background-color: #264eca; padding: 15px; border-radius: 15px; height: 25px"
          >
            <el-text
              style="color: white; font-family: regular; font-size: 16px; text-transform: uppercase"
            >
              {{ student.middleInitial === '' ? 'N/A' : student.middleInitial + '.' }}
            </el-text>
          </div>

          <el-form-item prop="middleInitial">
            <el-input
              v-if="editStudent"
              v-model="editForm.middleInitial"
              class="drawer-input"
              style="width: 100%; margin-top: 5px"
              size="large"
              :prefix-icon="User"
              input-style="font-family:regular; color:white; text-transform:uppercase"
              placeholder="M.I"
              maxlength="1"
              @keypress="preventNumberInput"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-text style="color: white; font-family: regular; font-size: 12px">
            * Last Name
          </el-text>
          <div
            v-if="!editStudent"
            style="background-color: #264eca; padding: 15px; border-radius: 15px; height: 25px"
          >
            <el-text style="color: white; font-family: regular; font-size: 16px">
              {{ student.lastName }}
            </el-text>
          </div>

          <el-form-item prop="lastName">
            <el-input
              v-if="editStudent"
              v-model="editForm.lastName"
              class="drawer-input"
              style="width: 100%; margin-top: 5px"
              size="large"
              :prefix-icon="User"
              input-style="font-family:regular; color:white"
              @input="normalizeWhitespace"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="14">
          <el-text style="color: white; font-family: regular; font-size: 12px">
            * Birth Date
          </el-text>
          <div
            v-if="!editStudent"
            style="background-color: #264eca; padding: 15px; border-radius: 15px; height: 25px"
          >
            <el-text style="color: white; font-family: regular; font-size: 16px">
              {{ formatDate(student.birthDate) }}
            </el-text>
          </div>

          <el-form-item prop="birthDate">
            <el-input
              v-if="editStudent"
              v-model="editForm.birthDate"
              type="date"
              placeholder="Birthdate"
              style="width: 100%; margin-top: 5px"
              @change="validateDate"
            />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-text style="color: white; font-family: regular; font-size: 12px"> * Age </el-text>
          <el-form-item prop="age">
            <div
              style="
                background-color: #264eca;
                padding: 15px;
                border-radius: 15px;
                width: 100%;
                height: 25px;
              "
            >
              <el-text style="color: white; font-family: regular; font-size: 16px">
                Age: {{ student.age }}
              </el-text>
            </div>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-text style="color: white; font-family: regular; font-size: 12px"> * Address</el-text>
          <div
            v-if="!editStudent"
            style="background-color: #264eca; padding: 15px; border-radius: 15px; height: 25px"
          >
            <el-text style="color: white; font-family: regular; font-size: 16px">
              {{ student.address }}
            </el-text>
          </div>

          <el-form-item prop="address">
            <el-input
              v-if="editStudent"
              v-model="editForm.address"
              class="drawer-input"
              style="width: 100%; margin-top: 5px"
              size="large"
              :prefix-icon="Location"
              input-style="font-family:regular; color:white"
              @input="normalizeWhitespace"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-text style="color: white; font-family: regular; font-size: 12px"> * Course</el-text>
          <div
            v-if="!editStudent"
            style="background-color: #264eca; padding: 15px; border-radius: 15px; height: 25px"
          >
            <el-text style="color: white; font-family: regular; font-size: 16px">
              {{ student.course }}
            </el-text>
          </div>

          <el-form-item prop="course">
            <div v-if="editStudent" style="display: flex; align-items: center; width: 100%">
              <el-icon :size="20" style="position: absolute; left: 15px">
                <Notebook />
              </el-icon>
              <el-select
                v-model="editForm.course"
                placeholder="Select student's course"
                size="large"
                style="width: 100%"
                :prefix-icon="Notebook"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  style="font-family: regular"
                />
              </el-select>
            </div>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top: 30px">
        <el-col :span="12">
          <el-button
            v-if="editStudent"
            type="success"
            @click="editStudentInfo(ruleFormRef, student.id)"
            :icon="Check"
            style="width: 100%; height: 40px"
            round
          >
            DONE
          </el-button>
          <el-button
            v-if="!editStudent"
            type="primary"
            @click="handleEditClick"
            :icon="Edit"
            style="width: 100%; height: 40px"
            round
          >
            EDIT DETAILS
          </el-button>
        </el-col>
        <el-col :span="12">
          <el-button
            @click="deleteStudentDialog = true"
            type="danger"
            :icon="Delete"
            style="width: 100%; height: 40px"
            round
          >
            DELETE
          </el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-drawer>

  <el-dialog v-model="deleteStudentDialog" title="Delete Student?" width="500" align-center>
    <el-text style="font-family: regular">
      Are you sure that you want to delete this student?
    </el-text>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="deleteStudentDialog = false">Cancel</el-button>
        <el-button type="primary" @click="deleteStudent(student.id)"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { defineProps, watch, defineEmits, onMounted, onUnmounted, ref, reactive } from 'vue'
import studentImage from '../assets/student.png'
import { Check, Close, Delete, Edit, Location, Notebook, User } from '@element-plus/icons-vue'
import { useStudentsStore } from '@/stores/studentStore'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
import { toast } from 'vue3-toastify'

const studentsStore = useStudentsStore()
const drawerSize = ref('30%')
const deleteStudentDialog = ref(false)
const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()

interface Student {
  id: string
  firstName: string
  middleInitial: string
  lastName: string
  birthDate: string
  age: number
  address: string
  course: string
}

const props = defineProps<{
  student: Student
  editStudent: boolean
  studentDrawer: boolean
  handleEditClick: () => void
}>()

const editForm = reactive({
  firstName: props.student.firstName,
  middleInitial: props.student.middleInitial,
  lastName: props.student.lastName,
  birthDate: props.student.birthDate,
  age: props.student.age,
  address: props.student.address,
  course: props.student.course,
})

const normalizeWhitespace = (event: Event) => {
  const input = event.target as HTMLInputElement
  input.value = input.value.replace(/\s+/g, ' ').trim()
}

const firstName = (rule: any, value: any, callback: any) => {
  const specialCharacterRegex = /[0-9!@#$%^&*(),.?":{}+~`|<>_\/\\]/
  const normalizedValue = value.replace(/\s+/g, ' ').trim()

  if (normalizedValue === '') {
    callback(new Error(`Please input student's first name`))
  } else if (specialCharacterRegex.test(normalizedValue)) {
    callback(new Error('Please input a valid first name without special characters'))
  } else {
    callback()
  }
}

// HERE
const middleInitial = (rule: any, value: any, callback: any) => {
  const specialCharacterRegex = /[0-9!@#$%^&*(),.?":{}+~`|<>_\/\\ ]/
  if (specialCharacterRegex.test(value)) {
    callback(new Error('Please input a valid middle name'))
  } else {
    callback()
  }
}

const preventNumberInput = (event: KeyboardEvent) => {
  const key = event.key
  if (/\d/.test(key)) {
    event.preventDefault()
  }
}

const lastName = (rule: any, value: any, callback: any) => {
  const specialCharacterRegex = /[0-9!@#$%^&*(),.?":{}+~`|<>_\/\\]/
  const normalizedValue = value.replace(/\s+/g, ' ').trim()

  if (value === '') {
    callback(new Error(`Please input student's last name`))
  } else if (specialCharacterRegex.test(normalizedValue)) {
    callback(new Error('Please input a valid last name without special characters'))
  } else {
    callback()
  }
}

const age = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error(`Please input student's age`))
  } else if (value < 18) {
    callback(new Error(`Student's age must be greater than 18`))
  } else {
    callback()
  }
}

const address = (rule: any, value: any, callback: any) => {
  const normalizedValue = value.replace(/\s+/g, ' ').trim()

  if (value === '') {
    callback(new Error(`Please input student's address`))
  } else {
    callback()
  }
}

const rules = reactive<FormRules>({
  firstName: [{ validator: firstName, trigger: 'change' }],
  middleInitial: [{ validator: middleInitial, trigger: 'change' }],
  lastName: [{ validator: lastName, trigger: 'change' }],
  birthDate: [
    {
      type: 'date',
      required: true,
      message: `Please input student's birth date`,
      trigger: 'change',
    },
  ],
  age: [{ validator: age, trigger: 'change' }],
  address: [{ validator: address, trigger: 'change' }],
  course: [{ required: true, message: `Please select student's course`, trigger: 'change' }],
})

const options = [
  {
    value: 'BS in Information and Technology',
    label: 'Bachelor of Science in Information and Technology',
  },
  { value: 'BS in Computer Science', label: 'Bachelor of Science in Computer Science' },
  { value: 'BS in Tourism', label: 'Bachelor of Science in Tourism' },
  {
    value: 'BS in Hotel and Restaurant Management',
    label: 'Bachelor of Science in Hotel and Restaurant Management',
  },
  { value: 'BS in Nursing', label: 'Bachelor of Science in Nursing' },
]

watch(
  () => editForm.birthDate,
  (newVal) => {
    if (newVal) {
      const birthDate = new Date(newVal)
      const today = new Date()
      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      editForm.age = age
    }
  },
)

const validateDate = () => {
  const selectedDate = new Date(editForm.birthDate)
  const today = new Date()
  if (selectedDate > today) {
    editForm.birthDate = ''
    toast.error('Future dates are not allowed.', { theme: 'colored' })
  }
}

const updateDrawerSize = () => {
  const width = window.innerWidth
  if (width < 768) {
    drawerSize.value = '100%'
  } else if (width < 992) {
    drawerSize.value = '50%'
  } else if (width < 1200) {
    drawerSize.value = '40%'
  } else {
    drawerSize.value = '30%'
  }
}

onMounted(() => {
  updateDrawerSize()
  window.addEventListener('resize', updateDrawerSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateDrawerSize)
})

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return date.toLocaleDateString('en-US', options)
}

const editStudentInfo = async (formEl: FormInstance | undefined, studentId: string) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      const studentIndex = studentsStore.students.findIndex(
        (student: any) => student.id === studentId,
      )
      if (studentIndex !== -1) {
        const originalStudent = studentsStore.students[studentIndex]
        const updatedStudent = { ...props.student, ...editForm }

        const isChanged = JSON.stringify(originalStudent) !== JSON.stringify(updatedStudent)

        if (isChanged) {
          studentsStore.students[studentIndex] = updatedStudent
          localStorage.setItem('students', JSON.stringify(studentsStore.students))
          toast.success('Student information updated successfully!', { theme: 'colored' })
        }

        props.handleEditClick()
        // closeDrawer()
      } else {
        toast.error('Student not found!', { theme: 'colored' })
      }
    }
  })
}

const deleteStudent = (studentId: string) => {
  const studentInfo = JSON.parse(localStorage.getItem('students') || '[]')
  const updatedStudentInfo = studentInfo.filter((student: any) => student.id !== studentId)
  localStorage.setItem('students', JSON.stringify(updatedStudentInfo))
  studentsStore.students = updatedStudentInfo
  toast.success('Student information deleted successfully!', { theme: 'colored' })
}

const localStudentDrawer = ref(props.studentDrawer)

watch(
  () => props.studentDrawer,
  (newVal) => {
    localStudentDrawer.value = newVal
  },
)

const emit = defineEmits(['update:studentDrawer'])

const closeDrawer = () => {
  localStudentDrawer.value = false
  emit('update:studentDrawer', false)
}
</script>

<style scoped></style>
