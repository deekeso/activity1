import { defineStore } from "pinia";
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";

export const useFormStore = defineStore("formStore", () => {
  // Define user fields
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
  const isAuthenticated = ref(false); // Track login status
  const students = ref<any>([]);
  const editingStudent = ref({});

  // Load user data from localStorage
  const loadStoredData = () => {
    const studentsData = localStorage.getItem("students");
    if (!studentsData) return;
    // console.log(studentsData);

    students.value = JSON.parse(studentsData);
  };

  const saveToLocalStorage = () => {
    let existingUsers = [];
    const newUser = {
      id: uuidv4(),
      firstName: firstName.value,
      middleName: middleName.value,
      lastName: lastName.value,
      birthDate: birthDate.value,
      age: age.value,
      address: address.value,
      course: course.value,
      username: username.value,
      email: email.value,
      password: password.value,
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

  // Return all properties and methods
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
    saveToLocalStorage, // Include this function here!
    login,
    logout,
    students,
    editingStudent,
  };
});
