import type { FormRules } from "element-plus";
import { reactive } from "vue";

// Options for dropdown filter
export const options = [
  { value: "all", label: "All Courses" },
  {
    value: "bachelor of science in computer science",
    label: "Bachelor of Science in Computer Science",
  },
  {
    value: "bachelor of science in tourism",
    label: "Bachelor of Science in Tourism",
  },
  {
    value: "bachelor of science in hotel and restaurant management",
    label: "Bachelor of Science in Hotel and Restaurant Management",
  },
  {
    value: "bachelor of science in information technology",
    label: "Bachelor of Science in Information Technology",
  },
  {
    value: "bachelor of science in nursing",
    label: "Bachelor of Science in Nursing",
  },
];

// Reactive object to manage form validation rules
export const registrationRules = reactive<FormRules>({
  firstName: [
    { required: true, message: "First name is required", trigger: "blur" },
  ],
  lastName: [
    { required: true, message: "Last name is required", trigger: "blur" },
  ],
  birthDate: [
    { required: true, message: "Birth date is required", trigger: "blur" },
  ],
  age: [{ required: true, message: "Age is required", trigger: "blur" }],
  address: [
    { required: true, message: "Address is required", trigger: "blur" },
  ],
  course: [
    { required: true, message: "Please select a course", trigger: "blur" },
  ],
});

export const loginRules = reactive<FormRules>({
  username: [
    { required: true, message: "Username is required", trigger: "blur" },
  ],
  password: [
    { required: true, message: "Password is required", trigger: "blur" },
  ],
});

export const signupRules = reactive<FormRules>({
  name: [
    { required: true, message: "First name is required", trigger: "blur" },
  ],
  username: [
    { required: true, message: "Middle name is required", trigger: "blur" },
  ],
  password: [
    { required: true, message: "Last name is required", trigger: "blur" },
  ],
});
