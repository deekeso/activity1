import { defineStore } from "pinia";

import { useNotification } from "../composables/useNotification";
import { useLocalStorage } from "../composables/useLocalStorage";

import { v4 as uuidv4 } from "uuid";

import { type Student } from "../types";

const { successMsg } = useNotification();

export const useStudentsStore = defineStore("students", () => {
  let { data: students, save, load } = useLocalStorage<Student>("students", []);

  const addStudent = (newStudent: Student) => {
    newStudent.id = uuidv4();
    students.push(newStudent);
    save();
    load();
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
      save();
      successMsg({
        title: "Success",
        message: "Student Deleted",
        type: "success",
        duration: 2000,
      });
    }
  };

  const updateStudent = (student: Student) => {
    const index = students.findIndex((s) => s.id === student.id);
    if (index !== -1) {
      students[index] = { ...student };
      save();
      successMsg({
        title: "Success",
        message: "Student Updated",
        type: "success",
        duration: 2000,
      });
    }
  };

  return { students, addStudent, deleteStudent, updateStudent };
});
