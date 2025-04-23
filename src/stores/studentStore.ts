import { defineStore } from "pinia"

// Use Data(Variables) - students array in state
// Apply Iterations to Data - COURSES object used for iteration
export const COURSES = {
    BSIT: "Bachelor of Science in Information and Technology",
    BSCS: "Bachelor in Computer Science",
    BST: "Bachelor of Science in Tourism",
    BSHRM: "Bachelor of Science in Hotel and Restaurant Management",
    BSN: "Bachelor of Science in Nursing"
} as const

// Interface defining the structure of a Student record
interface Student {
    id: number;
    firstName: string;
    middleInitial: string;
    lastName: string;
    birthDate: string;
    age: string;
    address: string;
    course: string;
}

// Interface defining the structure of the Student Store's state
interface StudentStoreState {
    students: Student[]; // Array to store all student records
}

// Pinia store for managing student records
export const useStudentStore = defineStore('studentStore', {
    // Initial state with empty students array
    state: (): StudentStoreState => ({
        students: []
    }),
    
    getters: {},

    // Actions for student CRUD operations
    actions: {
        // Adds a new student with auto-incrementing ID
        addStudent(studentData: Partial<Student>): void {
            const newStudent = {
                id: this.students.length + 1,
                ...studentData
            }
            this.students.push(newStudent as Student)
        },

        // Updates an existing student's information
        updateStudent(studentId: number, updatedData: Partial<Student>): void {
            const index = this.students.findIndex((student: Student) => student.id === studentId)
            if (index !== -1) {
                this.students[index] = { ...this.students[index], ...updatedData }
            }
        },

        // Removes a student from the records
        deleteStudent(studentId: number): void {
            const index = this.students.findIndex((student: Student) => student.id === studentId)
            if (index !== -1) {
                this.students.splice(index, 1)
            }
        }
    }
}) 