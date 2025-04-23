<template>
  <el-drawer v-model="visible" :title="isEditing ? 'Edit Student' : 'Add Student'" size="50%">
    <el-form ref="formRef" :model="student" :rules="rules" label-width="120px">
      <el-row :gutter="10" class="row-height">
        <el-col :xs:="24" :md="9">
          <el-form-item label="First Name" prop="firstName">
            <el-input v-model="student.firstName" />
          </el-form-item>
        </el-col>

        <el-col :xs="24" :md="6">
          <el-form-item label="Middle Initial" prop="middleInitial">
            <el-input
              v-model="student.middleInitial"
              maxlength="1"
              @input="filterText('middleInitial')"
              class="form-input"
            />
          </el-form-item>
        </el-col>

        <el-col :xs:="24" :md="9">
          <el-form-item label="Last Name" prop="lastName">
            <el-input v-model="student.lastName" class="form-input" />
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12">
          <el-form-item
            label="Birth Date"
            prop="birthDate"
            :rules="[{ validator: validateBirthDate, trigger: 'change' }]"
          >
            <el-date-picker
              v-model="student.birthDate"
              format="MM-DD-YYYY"
              value-format="MM-DD-YYYY"
              type="date"
              @change="calculateAge"
              :editable="false"
            />
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12">
          <el-form-item
            label="Age"
            prop="age"
            :rules="[{ validator: validateAge, trigger: 'blur' }]"
          >
            <el-input v-model="student.age" disabled />
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="Address" prop="address" required>
        <el-input v-model="student.address" class="form-input" />
      </el-form-item>

      <el-form-item label="Course" prop="course" required>
        <el-select v-model="student.course" class="form-input">
          <el-option
            v-for="item in courses"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
          <el-option label="Bachelor in Computer Science" value="Bachelor in Computer Science" />
        </el-select>
      </el-form-item>

      <el-button type="primary" @click="confirmSubmit" class="save-btn">Save</el-button>
    </el-form>
  </el-drawer>

  <!-- Confirmation Modal -->
  <el-dialog v-model="confirmVisible" title="Confirm Submission">
    <el-descriptions :column="1" border>
      <el-descriptions-item label="First Name">{{ student.firstName }}</el-descriptions-item>
      <el-descriptions-item label="Middle Initial">{{
        student.middleInitial || 'N/A'
      }}</el-descriptions-item>
      <el-descriptions-item label="Last Name">{{ student.lastName }}</el-descriptions-item>
      <el-descriptions-item label="Birth Date">{{ student.birthDate }}</el-descriptions-item>
      <el-descriptions-item label="Age">{{ student.age }}</el-descriptions-item>
      <el-descriptions-item label="Address">{{ student.address }}</el-descriptions-item>
      <el-descriptions-item label="Course">{{ student.course }}</el-descriptions-item>
    </el-descriptions>
    <div style="margin-top: 20px; text-align: right">
      <el-button type="danger" @click="confirmVisible = false">Cancel</el-button>
      <el-button type="primary" @click="submitForm">Confirm</el-button>
    </div>
  </el-dialog>

  <el-alert v-if="isDuplicate" type="error" title="Entry is a duplicate record" />
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import { dayjs, ElMessage, ElNotification } from 'element-plus'
import { useStudentStore } from '../stores/student'
// const props = defineProps<{ studentData?: any }>()
const emit = defineEmits(['save'])
const visible = ref(false)
const confirmVisible = ref(false)
const isEditing = ref(false)
const formRef = ref(null)
const store = useStudentStore()
const student = ref({
  firstName: '',
  middleInitial: '',
  lastName: '',
  birthDate: '',
  age: 0,
  address: '',
  course: '',
})
const isDuplicate = ref(false)

// **Validation Rules**
const validateWhiteSpace = (rule: any, value: string, callback: any) => {
  if (!value || value.trim() === '') {
    callback(new Error('This field is required'))
  } else {
    callback()
  }
}

const filterText = (field) => {
  // Regex to allow only alphabetic characters (A-Z, a-z)
  const regex = /[^a-zA-Z]/g
  student.value[field] = student.value[field].replace(regex, '')
}
function validateAge(rule: string, value: number, callback: any) {
  if (student.value.age < 16) {
    callback(new Error('Student must be at least 16 years old'))
  } else {
    callback()
  }
}

const validateBirthDate = (rule: string, value: string, callback: any) => {
  if (!value) {
    callback(new Error('Birth Date is required'))
  } else if (new Date(value) > new Date()) {
    callback(new Error('Birth Date cannot be in the future'))
  } else {
    callback()
  }
}

const calculateAge = () => {
  if (!student.value.birthDate) return

  const birthDate = new Date(student.value.birthDate)
  if (isNaN(birthDate.getTime())) {
    console.warn('Invalid birthDate format:', student.value.birthDate)
    return
  }

  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()

  const hasBirthdayPassed =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate())

  if (!hasBirthdayPassed) {
    age--
  }

  student.value.age = age
}

const formatDate = (date: string | Date) => {
  if (!date) return ''
  const parsedDate = new Date(date)
  if (isNaN(parsedDate.getTime())) return ''
  return dayjs(date).format('MM-DD-YYYY')
}

// **Reset Form on Open**
const openDrawer = (data?: any) => {
  isEditing.value = !!data
  student.value = data
    ? {
        ...data,
        birthDate: data.birthDate ? formatDate(data.birthDate) : '',
      }
    : {
        firstName: '',
        middleInitial: '',
        lastName: '',
        birthDate: '',
        age: 0,
        address: '',
        course: '',
      }

  if (student.value.birthDate) {
    setTimeout(() => calculateAge(), 0)
  }

  visible.value = true
}

const rules = {
  firstName: [
    { required: true, message: 'First name is required', trigger: 'blur' },
    { validator: validateWhiteSpace, message: 'First name is required', trigger: 'blur' },
  ],
  lastName: [
    { required: true, message: 'Last name is required', trigger: 'blur' },
    { validator: validateWhiteSpace, message: 'First name is required', trigger: 'blur' },
  ],
  birthDate: [{ required: true, message: 'Birth date is required', trigger: 'change' }],
  age: [{ validator: validateAge, message: 'Age must be 16 and above', trigger: 'change' }],
  address: [
    { required: true, message: 'Address is required', trigger: 'blur' },
    { validator: validateWhiteSpace, message: 'Address is required', trigger: 'blur' },
  ],
  course: [{ required: true, message: 'Course is required', trigger: 'change' }],
}

// **Confirm Before Submission**
const confirmSubmit = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      const duplicateEntry = store.students.some(
        (existing) =>
          existing.firstName === student.value.firstName &&
          existing.middleInitial === student.value.middleInitial &&
          existing.lastName === student.value.lastName &&
          existing.birthDate === student.value.birthDate
      )
      if (duplicateEntry) {
        console.log('Student is already registered')
        ElNotification({
          title: 'Duplicate Found',
          message: 'This student is already registered.',
          type: 'error',
          position: 'top-left',
        })
        return
      } else {
        confirmVisible.value = true
      }
    } else {
      return
    }
  })

  // console.log('Submitted Student Data:', {
  //   ...student.value,
  //   birthDate: formatDate(student.value.birthDate),
  // })
}
// console.log('store:', store.students)
// console.log('student:', student)

// **Submit Form**
const submitForm = () => {
  emit('save', { ...student.value })
  confirmVisible.value = false
  visible.value = false

  ElNotification({
    title: 'Success',
    message: 'Student is now registered.',
    type: 'success',
    position: 'top-right',
  })
}
defineExpose({ openDrawer })

const courses = [
  {
    value: 'Bachelor of Science in Information Technology',
    label: 'Bachelor of Science in Information Technology',
  },
  {
    value: 'Bachelor of Science in Tourism',
    label: 'Bachelor of Science in Tourism',
  },
  {
    value: 'Bachelor of Science in Hotel and Restaurant Management',
    label: 'Bachelor of Science in Hotel and Restaurant Management',
  },
  {
    value: 'Bachelor of Science in Nursing',
    label: 'Bachelor of Science in Nursing',
  },
]
</script>

<style scoped></style>
