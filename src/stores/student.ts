import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Student } from '@/types/CommonModels'

export const useStudentStore = defineStore('student', () => {
  const students = ref<Student[]>([])

  function generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  function loadStudents() {
    const savedStudents = localStorage.getItem('students')

    if (savedStudents) {
      // Parse the saved students
      const parsedStudents = JSON.parse(savedStudents)

      // Sort students by their ID (which is based on timestamp)
      students.value = parsedStudents.sort((a: Student, b: Student) => {
        // Convert IDs back to timestamps for comparison
        const timestampA = parseInt(a.id, 36)
        const timestampB = parseInt(b.id, 36)

        // Sort in descending order (most recent first)
        return timestampB - timestampA
      })
    } else {
      saveToLocalStorage()
    }
  }

  function saveToLocalStorage() {
    localStorage.setItem('students', JSON.stringify(students.value))
  }

  function addStudent(student: Omit<Student, 'id'>) {
    const newStudent = {
      ...student,
      id: generateId(),
    }

    students.value.push(newStudent)

    // Re-sort students after adding a new one
    students.value.sort((a, b) => {
      const timestampA = parseInt(a.id, 36)
      const timestampB = parseInt(b.id, 36)
      return timestampB - timestampA
    })

    saveToLocalStorage()
  }

  function updateStudent(updatedStudent: Student) {
    const index = students.value.findIndex((s) => s.id === updatedStudent.id)
    if (index !== -1) {
      students.value[index] = updatedStudent
      saveToLocalStorage()
    }
  }

  function deleteStudent(id: string) {
    students.value = students.value.filter((student) => student.id !== id)
    saveToLocalStorage()
  }

  return {
    students,
    loadStudents,
    addStudent,
    updateStudent,
    deleteStudent,
  }
})
