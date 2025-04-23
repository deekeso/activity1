import type { TLogin, TSignup } from '@/types/types'
import type { FormRules } from 'element-plus'
import { reactive } from 'vue'

export const loginRules = reactive<FormRules<TLogin>>({
  userName: [
    { required: true, message: 'Please input valid user name!', trigger: 'change' },
    { min: 5, max: 50, message: 'Length should be 10 to 50', trigger: 'change' },
  ],
  password: [
    { required: true, message: 'Please input valid password!', trigger: 'change' },
    { min: 5, max: 50, message: 'Length should be 10 to 50', trigger: 'change' },
  ],
})

export const signupRules = reactive<FormRules<TSignup>>({
  firstName: [
    { required: true, message: 'Please input valid first name!', trigger: 'change' },
    { min: 3, max: 50, message: 'Length should be 1 to 50', trigger: 'change' },
  ],
  lastName: [
    { required: true, message: 'Please input valid last name!', trigger: 'change' },
    { min: 2, max: 50, message: 'Length should be 1 to 50', trigger: 'change' },
  ],
  birthDate: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a birthdate',
      trigger: 'change',
    },
  ],
  age: [{ required: true, message: 'Please input a valid age!', trigger: 'change' }],
  address: [
    { required: true, message: 'Required!', trigger: 'change' },
    { min: 2, max: 200, message: 'Length should be 1 to 200', trigger: 'change' },
  ],
  course: [
    { required: true, message: 'Required!', trigger: 'change' },
    { min: 2, max: 200, message: 'Length should be 1 to 200', trigger: 'change' },
  ],
})
