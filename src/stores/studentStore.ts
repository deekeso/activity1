import { defineStore } from 'pinia'
import type { Student } from '@/types'

type StateShape = {
  studentList: Student[]
  counterID: number
}

export const useStudentStore = defineStore('StudentStore', {
  state: (): StateShape => ({
    studentList: [],
    counterID: 0,
  }),
  getters: {
    numberOfStudents(state) {
      return state.studentList.length
    },
  },
  actions: {
    generateID() {
      this.counterID++
      return this.counterID
    },
    registerStudent(payload: Student) {
      payload.studentId = this.generateID()
      this.studentList.push(payload)
    },
  },
})
