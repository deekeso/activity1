import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Student, Account } from '@/types/types'

export const useStudentStore = defineStore('StudentStore', () => {
  // State
  const studentList = ref<Student[]>([
    {
      studentId: 1001,
      firstName: 'Rogel',
      middleName: 'R',
      lastName: 'Gerodiaz',
      birthDate: '06/10/2001',
      age: 23,
      address: 'Laspinas City',
      course: 'BSIT',
    },
    {
      studentId: 1002,
      firstName: 'Rogel',
      middleName: 'R',
      lastName: 'Gerodiaz',
      birthDate: '06/10/2001',
      age: 23,
      address: 'Laspinas City',
      course: 'BSIT',
    },
    {
      studentId: 1003,
      firstName: 'Rogel',
      middleName: 'R',
      lastName: 'Gerodiaz',
      birthDate: '06/10/2001',
      age: 23,
      address: 'Laspinas City',
      course: 'BSIT',
    },
    {
      studentId: 1004,
      firstName: 'Rogel',
      middleName: 'R',
      lastName: 'Gerodiaz',
      birthDate: '06/10/2001',
      age: 23,
      address: 'Laspinas City',
      course: 'BSIT',
    },
  ])
  const counterID = ref(1114)
  const accountList = ref<Account[]>([
    {
      email: 'defaultemail@gmail.com',
      username: 'admin',
      password: 'admin123',
      firstName: 'John',
      middleName: 'A',
      lastName: 'Basco',
    },
  ])
  const authenticatedUser = ref<Account | null>(null)

  // Getters
  const numberOfStudents = computed(() => studentList.value.length)
  const numberOfAccounts = computed(() => accountList.value.length)
  const isAuhthenticated = computed(() => authenticatedUser.value !== null)

  // Actions

  //Generate Student ID
  const generateID = () => {
    //Increment the ID by 1
    counterID.value++
    return counterID.value
  }

  const registerStudent = (payload: Student) => {
    payload.studentId = generateID()
    studentList.value.push(payload)
  }

  const deleteStudent = (studentId: number) => {
    studentList.value = studentList.value.filter((student) => student.studentId !== studentId)
  }

  const updateStudent = (updatedStudent: Student) => {
    const index = studentList.value.findIndex(
      (student) => student.studentId === updatedStudent.studentId,
    )
    if (index !== -1) {
      studentList.value[index] = updatedStudent
    }
  }

  const logout = () => {
    authenticatedUser.value = null
  }

  const registerAccount = (payload: Account) => {
    accountList.value.push(payload)
  }

  const login = (username: string, password: string) => {
    //checking if the input username & password is match in the store
    const account = accountList.value.find(
      (account) => account.username === username && account.password === password,
    )
    if (account) {
      authenticatedUser.value = account
      return true
    } else {
      return false
    }
  }

  return {
    studentList,
    counterID,
    numberOfStudents,
    generateID,
    registerStudent,
    deleteStudent,
    updateStudent,
    accountList,
    registerAccount,
    login,
    numberOfAccounts,
    isAuhthenticated,
    authenticatedUser,
    logout,
  }
})
