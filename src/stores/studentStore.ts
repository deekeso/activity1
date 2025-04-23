import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref(JSON.parse(localStorage.getItem('user') || 'false'))

  const setUser = (value: boolean) => {
    user.value = value
    localStorage.setItem('user', JSON.stringify(value))
  }

  return { user, setUser }
})

export const useStudentsStore = defineStore('students', () => {
  const students = ref(JSON.parse(localStorage.getItem('students') || 'false'))

  const loadStudents = () => {
    const loadedStudents = localStorage.getItem('students')
    if (loadedStudents) {
      students.value = JSON.parse(loadedStudents)
    }
  }

  return {
    students,
    loadStudents,
  }
})
