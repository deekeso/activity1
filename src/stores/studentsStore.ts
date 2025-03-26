import { defineStore } from "pinia";
import { reactive } from "vue";

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
  const students = reactive<Student[]>([
    {
      id: 1,
      firstName: "Jhon Lay",
      middleName: "Garcia",
      lastName: "Lopez",
      birthDate: "2003-08-02",
      age: 21,
      address: "08 St Joseph Pasay City",
      course: "BSIT",
    },
    {
      id: 2,
      firstName: "John",
      middleName: "Michael",
      lastName: "Doe",
      birthDate: "2000-03-15",
      age: 22,
      address: "123 Main St, Springfield",
      course: "Computer Science",
    },
    {
      id: 3,
      firstName: "Jane",
      middleName: "Elizabeth",
      lastName: "Smith",
      birthDate: "1999-08-22",
      age: 22,
      address: "456 Oak Ave, Riverside",
      course: "Engineering",
    },
    {
      id: 4,
      firstName: "Jane",
      middleName: "Elizabeth",
      lastName: "Smith",
      birthDate: "1999-08-22",
      age: 22,
      address: "456 Oak Ave, Riverside",
      course: "Engineering",
    },
  ]);

  const addStudent = (newStudent: Student) => {
    newStudent.id = students.length
      ? Math.max(...students.map((student) => student.id)) + 1
      : 1;
    students.push(newStudent);

    console.log("Saved to store", students);
  };

  return { students, addStudent };
});
