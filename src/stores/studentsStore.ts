import { defineStore } from "pinia";

import { useNotification } from "../composables/useNotification";
import { useLocalStorage } from "../composables/useLocalStorage";

import { v4 as uuidv4 } from "uuid";

import { type Student } from "../types";

const { successMsg } = useNotification();

export const useStudentsStore = defineStore("students", () => {
  let { data: students, save } = useLocalStorage<Student>("students", []);

  const addStudent = (newStudent: Student) => {
    newStudent.id = uuidv4();
    students.push(newStudent);
    save();

    successMsg({
      title: "Success",
      message: "Student Added",
      type: "success",
      duration: 2000,
    });
  };

  const deleteStudent = (id: string) => {
    const index = students.findIndex((student) => student.id === id);

    if (index !== -1) {
      students.splice(index, 1);
      successMsg({
        title: "Success",
        message: "Student Deleted",
        type: "success",
        duration: 2000,
      });
      save();
    }
  };

  const updateStudent = (student: Student) => {
    const index = students.findIndex((s) => s.id === student.id);
    if (index !== -1) {
      students[index] = student;
      successMsg({
        title: "Success",
        message: "Student Updated",
        type: "success",
        duration: 2000,
      });
      save();
    }
  };

  return { students, addStudent, deleteStudent, updateStudent };
});
