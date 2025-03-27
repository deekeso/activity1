import type { FormRules } from 'element-plus'
import { reactive } from 'vue'

export const Profileform = reactive({
  UserName: '',
  FirstName: '',
  MiddleName: '',
  LastName: '',
  Birthday: '',
  Age: '',
  Address: '',
  Course: '',
})

export const RulesOfTheForm: FormRules = reactive({
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

export const courseOptions = [
  'Bachelor of Science in Information and Technology',
  'Bachelor in Computer Science',
  'Bachelor of Science in Tourism',
  'Bachelor of Science in Hotel and Restaurant Management',
  'Bachelor of Science in Nursing',
]

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
