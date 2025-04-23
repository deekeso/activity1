<template>
  <div
    style="
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
      position: absolute;
      background-color: transparent;
      width: 100%;
      z-index: 100;
      top: 2%;
    "
  >
    <div>
      <el-image :src="digiplus" fit="cover" style="width: 25%; left: 20px" />
    </div>

    <div v-if="userStore.user" style="position: absolute; right: 20px">
      <el-button style="font-family: semiBold; color: #2148c0" @click="addStudent = true">
        Add Student
      </el-button>
      <el-button style="font-family: semiBold; color: #2148c0" @click="handleLogout">
        Logout
      </el-button>
    </div>
  </div>

  <el-drawer
    v-model="addStudent"
    :with-header="true"
    :size="drawerSize"
    style="background-color: #2148c0"
  >
    <div style="width: 100%; margin-top: 130px">
      <el-form ref="ruleFormRef" :model="form" :rules="rules" :size="formSize" status-icon>
        <el-row :gutter="20">
          <el-col :span="16">
            <el-form-item prop="firstName">
              <el-text style="font-family: extraLight; color: white; font-size: 12px">
                * First Name
              </el-text>
              <el-input
                v-model="form.firstName"
                class="drawer-input"
                style="width: 100%"
                placeholder="Student's First Name"
                size="large"
                :prefix-icon="User"
                input-style="font-family:regular; color:white"
                @input="normalizeWhitespace"
              />
            </el-form-item>
          </el-col>

          <!-- HERE -->
          <el-col :span="8">
            <el-form-item prop="middleInitial">
              <el-text style="font-family: extraLight; color: white; font-size: 12px">
                Middle Initial
              </el-text>
              <el-input
                v-model="form.middleInitial"
                class="drawer-input"
                style="width: 100%"
                placeholder="M.I"
                maxlength="1"
                size="large"
                :prefix-icon="User"
                input-style="font-family:regular; color:white; text-transform:uppercase"
                @keypress="preventNumberInput"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item prop="lastName">
              <el-text style="font-family: extraLight; color: white; font-size: 12px">
                * Last Name
              </el-text>
              <el-input
                v-model="form.lastName"
                class="drawer-input"
                style="width: 100%"
                placeholder="Student's last name"
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
            <el-form-item prop="birthDate">
              <el-text style="font-family: extraLight; color: white; font-size: 12px">
                * Birth Date
              </el-text>
              <el-input
                v-model="form.birthDate"
                type="date"
                placeholder="Birthdate"
                style="width: 100%"
                @change="validateDate"
              />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="age">
              <el-text style="font-family: extraLight; color: white; font-size: 12px">
                * Age
              </el-text>
              <div
                style="background-color: #264eca; padding: 10px; border-radius: 15px; width: 100%"
              >
                <el-text style="color: white; font-family: extraLight; padding: 10px">
                  Age: {{ form.age }}
                </el-text>
              </div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item prop="address">
              <el-text style="font-family: extraLight; color: white; font-size: 12px">
                * Address
              </el-text>
              <el-input
                v-model="form.address"
                style="width: 100%"
                placeholder="Enter student's address"
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
            <el-form-item prop="course">
              <el-text style="font-family: extraLight; color: white; font-size: 12px">
                * Course
              </el-text>
              <div style="display: flex; align-items: center; width: 100%">
                <el-icon :size="20" style="position: absolute; left: 15px">
                  <Notebook />
                </el-icon>
                <el-select
                  v-model="form.course"
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
        <div class="submit">
          <el-button @click="submitForm(ruleFormRef)" size="large" class="button"
            >CONFIRM</el-button
          >
        </div>
      </el-form>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import digiplus from '../assets/digiplus.png'
import { useRouter } from 'vue-router'
import { nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { toast } from 'vue3-toastify'
import { useUserStore } from '@/stores/studentStore'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
import { Location, Notebook, User } from '@element-plus/icons-vue'
import { useStudentsStore } from '@/stores/studentStore'

const studentsStore = useStudentsStore()
const router = useRouter()
const addStudent = ref(false)
const drawerSize = ref('30%')
const userStore = useUserStore()

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()

const handleLogout = () => {
  localStorage.removeItem('user')
  userStore.setUser(false)
  router.push('/').then(() => {
    nextTick(() => {
      toast.success('Logged out successfully!')
    })
  })
}

const generateRandomId = () => {
  return Math.random().toString(36).slice(2, 9)
}

const form = reactive({
  id: generateRandomId(),
  firstName: '',
  middleInitial: '',
  lastName: '',
  birthDate: '',
  age: 0,
  address: '',
  course: '',
})

const resetForm = () => {
  form.id = generateRandomId()
  form.firstName = ''
  form.middleInitial = ''
  form.lastName = ''
  form.birthDate = ''
  form.age = 0
  form.address = ''
  form.course = ''

  if (ruleFormRef.value) {
    ruleFormRef.value.resetFields()
  }
}

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
  () => form.birthDate,
  (newVal) => {
    if (newVal) {
      const birthDate = new Date(newVal)
      const today = new Date()
      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      form.age = age
    }
  },
)

const validateDate = () => {
  const selectedDate = new Date(form.birthDate)
  const today = new Date()
  if (selectedDate > today) {
    form.birthDate = ''
    toast.error('Future dates are not allowed.', { theme: 'colored' })
  }
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      const storedStudents = JSON.parse(localStorage.getItem('students') || '[]')
      storedStudents.push({ ...form })
      localStorage.setItem('students', JSON.stringify(storedStudents))
      studentsStore.students = storedStudents
      addStudent.value = false
      resetForm()
    } else {
      console.log('error submit!', fields)
    }
  })
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
</script>

<style scoped></style>
