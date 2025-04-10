import { v4 as uuidv4 } from "uuid";

export const saveDefaultUser = () => {
  const defaultUser = {
    id: "admin-id",
    firstName: "default",
    middleName: "user",
    lastName: "admin",
    birthDate: "",
    age: 0,
    address: "adminAddress",
    course: "",
    username: "admin",
    email: "admin1@sample.com",
    password: "admin123",
    isAdmin: true,
  };

  const storedData = JSON.parse(localStorage.getItem("students") || "[]");

  const adminExists = storedData.some(
    (user: { id: string }) => user.id === "admin-id"
  );

  if (!adminExists) {
    storedData.push(defaultUser);
    localStorage.setItem("students", JSON.stringify(storedData));
  }
};

// STUDENT COURSE OPTION
export const courseOptions = [
  "Bachelor of Science in Computer Science",
  "Bachelor of Science in Information Technology",
  "Bachelor of Science in Tourism Management",
  "Bachelor of Science in Hotel and Restaurant Management",
  "Bachelor of Science in Nursing",
];

// FORM RULES TO ENSURE THE USER FILL ALL THE INPUT FIELDS

export const rules = {
  firstName: [
    {
      required: true,
      message: "First Name is required to be filled",
      trigger: "blur",
    },
  ],
  middleName: [
    {
      pattern: /^[a-zA-Z]$/,
      message: "Middle Initial must be a single alphabet letter",
      trigger: "blur",
    },
  ],
  lastName: [
    {
      required: true,
      message: "Last Name is required to be filled",
      trigger: "blur",
    },
  ],
  birthDate: [
    {
      required: true,
      message: "Birth Date is required to be filled",
      trigger: "blur",
    },
  ],
  age: [
    {
      required: true,
      message: "Age is required to be filled",
      trigger: "blur",
    },
  ],
  address: [
    {
      required: true,
      message: "Address is required to be filled",
      trigger: "blur",
    },
  ],
  course: [
    {
      required: true,
      message: "Course is required to be filled",
      trigger: "blur",
    },
  ],
  username: [
    {
      required: true,
      message: "Username is required to be filled",
      trigger: "blur",
    },
  ],
  email: [
    {
      required: true,
      message: "Email is required to be filled",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "Password is required to be filled",
      trigger: "blur",
    },
  ],
  courseOptions: [
    {
      required: true,
      message: "Course is required to be filled",
      trigger: "blur",
    },
  ],
};
