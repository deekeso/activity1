/**
 * Logic for CRUD operations
 *
 * @param {Student[]} students - Array of student objects.
 * @param {Student} student - Student object to be managed.
 * @param {number} nextId - Next available ID for new students.
 * @returns {object} - CRUD functions: createStudent, readStudents, updateStudent, deleteStudent.
 */

import { Student } from "@/interface/Students";

export const useStudentCrud = () => {
  // ---- Adds a new student to the list ----
  const createStudent = (
    students: Student[],
    student: Student,
    nextId: number
  ) => {
    student.id = nextId;
    students.push(student);
  };

  // ---- Retrieves the list of students --
  const readStudents = (students: Student[]) => {
    return students;
  };

  // ---- Updates an existing student in the list --
  const updateStudent = (
    students: Student[],
    index: number,
    updatedStudent: Student
  ) => {
    students[index] = updatedStudent;
  };

  // ---- Removes a student from the list --
  const deleteStudent = (students: Student[], index: number) => {
    students.splice(index, 1);
  };

  return {
    createStudent,
    readStudents,
    updateStudent,
    deleteStudent,
  };
};
