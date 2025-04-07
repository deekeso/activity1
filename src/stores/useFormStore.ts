import { defineStore } from "pinia";
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";

// Define interfaces for Student and EditingStudent
interface Student {
  id: string | number;
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: string;
  age: number;
  address: string;
  course: string;
}

interface EditingStudent extends Student {}

export const useFormStore = defineStore("formStore", () => {
  const firstName = ref("");
  const middleName = ref("");
  const lastName = ref("");
  const birthDate = ref("");
  const age = ref(0);
  const address = ref("");
  const course = ref("");
  const username = ref("");
  const email = ref("");
  const password = ref("");
  const isAuthenticated = ref(false);

  // Properly type the students array
  const students = ref<Student[]>([]);

  // Properly initialize and type editingStudent
  const editingStudent = ref<EditingStudent>({
    id: "",
    firstName: "",
    middleName: "",
    lastName: "",
    birthDate: "",
    age: 0,
    address: "",
    course: "",
  });

  // Load user data from localStorage
  const loadStoredData = () => {
    const studentsData = localStorage.getItem("students");
    if (!studentsData) return;

    students.value = JSON.parse(studentsData);
  };

  const saveToLocalStorage = () => {
    const newUser: Student = {
      id: uuidv4(),
      firstName: firstName.value,
      middleName: middleName.value,
      lastName: lastName.value,
      birthDate: birthDate.value,
      age: age.value,
      address: address.value,
      course: course.value,
    };
    try {
      const studentsData = localStorage.getItem("students");
      const updatedData = studentsData
        ? [...JSON.parse(studentsData), newUser] // Add new student to the array
        : [newUser]; // Initialize with the first student if none exist

      localStorage.setItem("students", JSON.stringify(updatedData)); // Save back to localStorage
    } catch (error) {
      console.error("Failed to save student data to localStorage:", error);
    }
  };

  // Login function
  const login = (inputUsername: string, inputPassword: string) => {
    const storedData = JSON.parse(localStorage.getItem("students") || "[]");

    const userExists = storedData.some(
      (user: { username: string; password: string }) =>
        user.username === inputUsername && user.password === inputPassword
    );

    if (userExists) {
      isAuthenticated.value = true;
      localStorage.setItem("isAuthenticated", "true");
      return true;
    } else {
      return false;
    }
  };

  // Logout function
  const logout = () => {
    isAuthenticated.value = false;
    localStorage.removeItem("isAuthenticated");
  };

  return {
    firstName,
    middleName,
    lastName,
    birthDate,
    age,
    address,
    course,
    username,
    email,
    password,
    isAuthenticated,
    loadStoredData,
    saveToLocalStorage,
    login,
    logout,
    students,
    editingStudent,
  };
});
