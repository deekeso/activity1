<!--
  StudentInfoForm.vue - Form for Student Information

  Overview:
  - Provides a form for entering, editing and deleting student information

  Features:
  * Uses input components: TextInput, Date, and Dropdown
  * Uses DataFetcher for JSON data fetching
  * Uses the StudentStore for managing student data
-->

<template>
  <el-form ref="formRef" :model="studentStore.student" :rules="rules">
    <!-- First Name -->
    <TextInput
      v-model="studentStore.student.firstName"
      label="First Name"
      :inputProps="{ placeholder: 'First Name' }"
      icon="User"
      type="text"
      prop="firstName"
      :rules="rules.firstName"
    />

    <!-- Middle Name (optional, no validation) -->
    <TextInput
      v-model="studentStore.student.middleName"
      label="Middle Initial"
      :inputProps="{ placeholder: 'Middle Name' }"
      icon="User"
      type="text"
      prop="middleName"
      :rules="rules.middleName"
    />

    <!-- Last Name -->
    <TextInput
      v-model="studentStore.student.lastName"
      label="Last Name"
      :inputProps="{ placeholder: 'Last Name' }"
      icon="User"
      type="text"
      prop="lastName"
      :rules="rules.lastName"
    />

    <!-- Birthdate -->
    <Date
      v-model="studentStore.student.birthdate"
      label="Birthdate"
      :inputProps="{ placeholder: 'Birthdate' }"
      prop="birthdate"
      :rules="rules.birthdate"
    />

    <!-- Age -->
    <TextInput
      :modelValue="displayAge"
      label="Age"
      :inputProps="{ placeholder: 'Age', disabled: true }"
      icon="Calendar"
      type="text"
      prop="age"
    />

    <!-- Address -->
    <TextInput
      v-model="studentStore.student.address"
      label="Address"
      :inputProps="{ placeholder: 'Address' }"
      icon="Location"
      type="text"
      prop="address"
      :rules="rules.address"
    />

    <!-- Course -->
    <Dropdown
      label="Course"
      v-model="studentStore.student.course"
      :options="options?.degreePrograms || []"
      prop="course"
      :rules="rules.course"
    />

    <section class="w-100 align-end">
      <Button customClass="blue-btn w-50" @click="showSaveModal"> Save </Button>
    </section>

    <!-- Confirmation Modal -->
    <Modal
      v-model="saveModalVisible"
      type="check"
      label="Confirm Save"
      :desc="modalDescription"
      :handleButtonFunc="confirmSave"
      confirmButtonLabel="Save"
    />
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed, onMounted, onUnmounted } from "vue";
import { useDataFetcher } from "@/composables/data/useDataFetcher";
import { useStudentStore } from "@/store/useStudentStore";
import { ElMessage, FormRules, FormInstance } from "element-plus";

import eventBus from "@/event-bus";

const form = ref(null); // Your form reference

// Isolated update of age
const studentStore = useStudentStore();
const calculatedAge = computed(() => {
  const today = new Date();
  const birthDate = new Date(studentStore.student.birthdate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
});

// Update the store whenever calculatedAge changes
watch(calculatedAge, (newAge) => {
  studentStore.student.age = newAge;
});

const displayAge = computed(() => {
  const age = Number(studentStore.student.age);
  return isNaN(age) || age === null || age === undefined || age === 0
    ? "Age"
    : age;
});

// Fetch constants of Course
const { data: options } = useDataFetcher<{ degreePrograms: string[] }>(
  "src/data/courses.json"
);

// Reactive variables for modal visibility and description
const saveModalVisible = ref(false);
const modalDescription = ref("");
const formRef = ref<FormInstance>();

// Function: Clearing Validation
const clearValidation = () => {
  // console.log("clearFormValidation event received");
  // console.log("formRef value:", formRef.value);
  setTimeout(() => {
    if (formRef.value) {
      console.log("Attempting to clear validation");
      formRef.value.clearValidate();
    } else {
      console.log("formRef is null or undefined");
    }
  }, 100);
};

onMounted(() => {
  // console.log("Setting up clearFormValidation listener");
  eventBus.on("clearFormValidation", clearValidation);
});

onUnmounted(() => {
  eventBus.off("clearFormValidation", clearValidation);
});

// Validations
const rules = reactive<FormRules>({
  firstName: [
    {
      required: true,
      message: "Please input First Name",
      trigger: "blur",
    },
    {
      min: 2,
      max: 50,
      message: "First Name length should be between 2 and 50 characters",
      trigger: "blur",
    },
  ],
  middleName: [
    {
      validator: (rule, value, callback) => {
        if (value && !/^[A-Z]$/.test(value)) {
          callback(new Error("Middle Initial must be one uppercase letter"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
  lastName: [
    {
      required: true,
      message: "Please input Last Name",
      trigger: "blur",
    },
    {
      min: 2,
      max: 50,
      message: "Last Name length should be between 2 and 50 characters",
      trigger: "blur",
    },
  ],
  birthdate: [
    {
      required: true,
      message: "Please select Birthdate",
      trigger: "change",
    },
    {
      validator: (rule, value, callback) => {
        if (!value) {
          callback(new Error("Birthdate is required"));
        }
        const birthDate = new Date(value);
        const today = new Date();
        const minAge = new Date(
          today.getFullYear() - 15,
          today.getMonth(),
          today.getDate()
        );
        const maxAge = new Date(
          today.getFullYear() - 100,
          today.getMonth(),
          today.getDate()
        );

        if (birthDate > today) {
          callback(new Error("Birthdate cannot be in the future"));
        } else if (birthDate > minAge) {
          callback(new Error("You must be at least 15 years old"));
        } else if (birthDate < maxAge) {
          callback(new Error("Birthdate seems invalid"));
        } else {
          callback();
        }
      },
      trigger: "change",
    },
  ],
  age: [
    {
      required: true,
    },
  ],
  address: [
    {
      required: true,
      message: "Please input Address",
      trigger: "blur",
    },
    {
      min: 5,
      max: 200,
      message: "Address length should be between 5 and 200 characters",
      trigger: "blur",
    },
  ],
  course: [
    {
      required: true,
      message: "Please select a Course",
      trigger: "change",
    },
  ],
});

// Function: Show save confirmation modal
const showSaveModal = async () => {
  // Validate the form before showing modal
  if (!formRef.value) return;

  try {
    await formRef.value.validate();

    if (studentStore.student.id) {
      modalDescription.value =
        "Are you sure you want to update this student's information?";
    } else {
      modalDescription.value = "Are you sure you want to create a new student?";
    }
    saveModalVisible.value = true;
  } catch (error) {
    ElMessage({
      message: "Please correct the form errors",
      type: "error",
    });
  }
};

// Function: Confirm and save the student information
const confirmSave = () => {
  if (studentStore.student.id) {
    // Update existing student
    const index = studentStore.students.findIndex(
      (s) => s.id === studentStore.student.id
    );
    if (index !== -1) {
      studentStore.updateStudent(index, studentStore.student);
      ElMessage({
        message: "Changes saved successfully",
        type: "success",
      });
    }
  } else {
    // Create new student
    studentStore.createStudent(studentStore.student);
    ElMessage({
      message: "Account created successfully",
      type: "success",
    });
  }

  setTimeout(() => {
    clearValidation();
  }, 100);
};
</script>
