import type { courseNameList } from '@/constants'

export type CourseName = {
  name: Name
}

export type Student = {
  studentId: number
  firstName: string
  middleName: string
  lastName: string
  birthDate: string
  age: number
  address: string
  // course: CourseName
}

export type Account = {
  email: string
  password: string
  firstName: string
  middleName: string
  lastName: string
}

export type RuleForm = {
  email: string
  firstName: string
  middleName: string
  lastName: string
  password: string
}

type Name = (typeof courseNameList)[number]
