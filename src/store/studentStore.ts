import { defineStore } from "pinia";
import type { Student } from "../interface/Student";

// Create a Pinia store named "studentStore"
export const useStudentStore = defineStore("studentStore", {
  // State holds the reactive data of the store
  state: () => ({
    students: [] as Student[],
  }),
  // Getters provide computed properties to derive data from the state
  getters: {
    // Get the total number of students
    studentCount: (state) => {
      return state.students.length;
    },

    // Count students enrolled in BSIT (Bachelor of Science in Information Technology)
    bsitCount: (state) =>
      state.students.reduce((count: number, student: Student) => {
        return student.course.toLowerCase() ===
          "bachelor of science in information technology"
          ? count + 1
          : count;
      }, 0),

    // Get the list of students enrolled in BSIT
    bsit: (state) => {
      return state.students.filter(
        (s) =>
          s.course.toLocaleLowerCase() ===
          "bachelor of science in information technology"
      );
    },

    // Get the list of students enrolled in BSCS (Bachelor of Science in Computer Science)
    bscs: (state) => {
      return state.students.filter(
        (s) =>
          s.course.toLocaleLowerCase() ===
          "bachelor of science in computer science"
      );
    },

    // Get the list of students enrolled in Tourism
    tourism: (state) => {
      return state.students.filter(
        (s) => s.course.toLocaleLowerCase() === "bachelor of science in tourism"
      );
    },

    // Get the list of students enrolled in HRM (Hotel and Restaurant Management)
    hrm: (state) => {
      return state.students.filter(
        (s) =>
          s.course.toLocaleLowerCase() ===
          "bachelor of science in hotel and restaurant management"
      );
    },

    // Get the list of students enrolled in Nursing
    nursing: (state) => {
      return state.students.filter(
        (s) => s.course.toLocaleLowerCase() === "bachelor of science in nursing"
      );
    },
  },

  // Actions define methods to modify the state or perform tasks
  actions: {
    // Retrieve student data from localStorage
    getStudent() {
      const data = localStorage.getItem("students");
      this.students = data ? JSON.parse(data) : []; // Parse data or initialize as an empty array
    },

    // Add a new student to the store and localStorage
    addStudent(student: Student) {
      // Retrieve the existing array from localStorage
      const existingData = localStorage.getItem("students");
      const students = existingData ? JSON.parse(existingData) : []; // Parse or initialize as empty array

      // Append the new student to the array
      students.unshift(student);

      // Save the updated array back to localStorage
      localStorage.setItem("students", JSON.stringify(students));

      // Update the local state
      this.students = students;
    },

    // Delete a student from the store and localStorage by ID
    deleteStudent(id: string) {
      this.students = this.students.filter((t) => {
        return t.id !== id;
      });

      // Update localStorage with the new state of students
      localStorage.setItem("students", JSON.stringify(this.students));
    },

    // Update an existing student's details in the store and localStorage
    updateStudent(updatedStudent: Student) {
      const index = this.students.findIndex((s) => s.id === updatedStudent.id);
      if (index !== -1) {
        // Update the student object
        this.students[index] = { ...this.students[index], ...updatedStudent };

        // Save to localStorage
        try {
          localStorage.setItem("students", JSON.stringify(this.students));
        } catch (error) {
          console.error("Failed to save students to localStorage", error);
        }
      }
    },
  },
});
