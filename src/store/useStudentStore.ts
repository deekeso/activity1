/**
 * Store for Student Management
 *
 * State Properties:    Single student, List of students, ID
 * Actions:             CRUD (Create, Read, Update, Delete) operations
 *                      Uses useCrud composable for the logic
 * Persist:             True
 */

import { defineStore } from "pinia";
import { Student } from "@/interface/Students";
import { useStudentCrud } from "@/composables/crud/useCrud";

export const useStudentStore = defineStore("student", {
  state: () => ({
    student: {
      firstName: "",
      middleName: "",
      lastName: "",
      birthdate: "",
      address: "",
      course: "",
      age: 0,
    } as Student, // Single student object with default values
    students: [] as Student[], // Array for multiple students
    nextId: 1, // Counter for the next student ID
  }),
  actions: {
    // ---- Log in and set authentication status ----
    setStudent(student: Student) {
      this.student = { ...student };
    },

    // ---- Creating new student ----
    createStudent(student: Student) {
      const crud = useStudentCrud();
      crud.createStudent(this.students, student, this.nextId++);
      this.resetStudent();
    },

    // ---- Read all students ----
    readStudents() {
      const crud = useStudentCrud();
      return crud.readStudents(this.students);
    },

    // ---- Update existing student information----
    updateStudent(index: number, updatedStudent: Student) {
      const crud = useStudentCrud();
      crud.updateStudent(this.students, index, updatedStudent);
      this.resetStudent();
    },

    // ---- Deleting student from list ----
    deleteStudent(index: number) {
      const crud = useStudentCrud();
      crud.deleteStudent(this.students, index);
    },

    // ---- Reset student object to default values ----
    resetStudent() {
      this.student = {
        firstName: "",
        middleName: "",
        lastName: "",
        birthdate: "",
        address: "",
        course: "",
        age: 0,
      };
    },
  },
  persist: true,
});
