import { defineStore } from "pinia";

import { useNotification } from "../composables/useNotification";
import { useLocalStorage } from "../composables/useLocalStorage";

const { successMsg } = useNotification();

interface Student {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: string;
  age: number;
  address: string;
  course: string;
}

export const useStudentsStore = defineStore("students", () => {
  const { data: students, save } = useLocalStorage<Student>("students", []);

  const addStudent = (newStudent: Student) => {
    newStudent.id = students.length
      ? Math.max(...students.map((student) => student.id)) + 1
      : 1;
    students.push(newStudent);
    save();

    successMsg({
      title: "Success",
      message: "Student Added",
      type: "success",
      duration: 2000,
    });
  };

  return { students, addStudent };
});
