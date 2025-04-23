// src/composables/useStudentSearch.ts
import { computed, ref } from 'vue'
import type { Ref } from 'vue'
import type { Student } from '@/types/CommonModels'

export function useStudentSearch(
  students: Ref<Student[]> | Student[],
  searchQuery: Ref<string>,
  filterCourse: Ref<string> = ref('All Courses'),
): Student[] {
  return computed(() => {
    // Ensure we're working with an array of students
    const studentArray = Array.isArray(students) ? students : students.value

    return studentArray.filter((student) => {
      // Course filter
      const matchesCourse =
        filterCourse.value === 'All Courses' || student.course === filterCourse.value

      // If no search query, return based on course filter
      if (!searchQuery.value.trim()) {
        return matchesCourse
      }

      // Split search query into terms
      const searchTerms = searchQuery.value.toLowerCase().split(/\s+/)

      // Create searchable fields
      const fullNameVariations = [
        student.firstName.toLowerCase(),
        student.lastName.toLowerCase(),
        student.middleName?.toLowerCase() || '',
        `${student.firstName} ${student.lastName}`.toLowerCase(),
        `${student.firstName} ${student.middleName}`.toLowerCase(),
        `${student.firstName} ${student.middleName} ${student.lastName}`.toLowerCase(),
      ].filter(Boolean)

      const searchFields = [
        ...fullNameVariations,
        student.course.toLowerCase(),
        student.address.toLowerCase(),
        student.age.toString(),
      ]

      // Check if ALL search terms are found in ANY of the search fields
      const matchesSearch = searchTerms.every((term) =>
        searchFields.some((field) => field.includes(term)),
      )

      // Return students that match both filters
      return matchesCourse && matchesSearch
    })
  }).value // Directly return the value of the computed property
}
