<script setup lang="ts">
// Import Vue utilities and the Student store
import { computed, ref, watch } from "vue";
import { useStudentStore } from "../store/studentStore";
// Composable to formate date
import { useDateFormater } from "../composables/useDateFormater";
import { useAgeCalculator } from "../composables/useAgeCalculator";
import { registrationRules } from "../constants";
import DialogBox from "./DialogBox.vue";
import type { FormInstance } from "element-plus";

// Access the Student store
const studentStore = useStudentStore();

// Props passed to the component for the student object
const { student } = defineProps(["student"]);

const formattedBirthDate = useDateFormater(student.birthDate);

const formRef = ref<FormInstance>(); // Form state for validation

// Reactive state to manage drawer visibility and edited student details
const drawerVisible = ref(false);
const editedStudent = ref({ ...student });
const dialogVisible = ref(false);
const dialogVisibleUpdate = ref(false);

// Function to show the drawer and reset edited student details
const showDrawer = () => {
  editedStudent.value = { ...student }; // Reset editedStudent to the current student details
  drawerVisible.value = true;
};

// Function to update the student details
const updateStudent = async () => {
  try {
    const isValid = await formRef.value?.validate();
    if (isValid) {
      await studentStore.updateStudent({ ...editedStudent.value }); // Spread to ensure reactivity
      dialogVisibleUpdate.value = false; // Show the update confirmation dialog
    }
  } catch (error) {
    console.error("Error during form submission:", error);
  }
};

const birthDateComputed = computed(() => editedStudent.value.birthDate);

// Use the composable
const { ageRef } = useAgeCalculator(birthDateComputed);

// Sync age from the composable to the form
watch(ageRef, (newAge) => {
  editedStudent.value.age = newAge;
});

// Function to confirm the deletion of a student
const confirmDeletion = () => {
  studentStore.deleteStudent(student.id); // Calls the deleteStudent method from the student store with the student's ID
  dialogVisible.value = false; // Closes the confirmation dialog after the student is deleted
};

const toggleDialogBox = async () => {
  const isValid = await formRef.value?.validate(); // Validate form fields before opening the dialog
  if (isValid) {
    dialogVisibleUpdate.value = true; // Show the dialog box if validation passes
  }
};

// Function to handle the delete action and show the confirmation dialog
const handleDelete = () => {
  dialogVisible.value = true; // Sets the dialog visibility to true, opening the confirmation dialog
};

// Watch for changes in the middleName field and validate input
watch(
  () => editedStudent.value.middleName,
  (newVal) => {
    editedStudent.value.middleName = newVal.replace(/[^a-zA-Z]/g, ""); // Allow only letters
  }
);

const disableDate = (date: Date) => {
  const currentDate = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(currentDate.getFullYear() - 1);

  return date > oneYearAgo || date > currentDate;
};

// Watch for changes in the First Name field and sanitize input
watch(
  () => editedStudent.value.firstName,
  (newVal) => {
    editedStudent.value.firstName = newVal
      .replace(/[0-9]/g, "") // Remove numbers
      .replace(/\s{2,}/g, " ") // Replace multiple spaces with a single space
      .trimStart(); // Remove leading spaces but allow trailing spaces
  }
);

// Watch for changes in the Last Name field and sanitize input
watch(
  () => editedStudent.value.lastName,
  (newVal) => {
    editedStudent.value.lastName = newVal
      .replace(/[0-9]/g, "") // Remove numbers
      .replace(/\s{2,}/g, " ") // Replace multiple spaces with a single space
      .trimStart(); // Remove leading spaces but allow trailing spaces
  }
);
</script>

<template>
  <!-- Card component to display student details -->
  <el-card class="card-container" shadow="hover">
    <template #header>
      <div class="img-container">
        <img src="/public/OIP.jpg" alt="default image" />
      </div>

      <div class="card-header">
        <p class="highlights">
          {{ student.lastName }}, {{ student.firstName }}
          <span v-if="student.middleName">{{ student.middleName }} .</span>
        </p>
      </div>
    </template>

    <!-- Card body displaying student details -->
    <div class="card-body">
      <p class="highlights">
        Age: <span>{{ student.age }}</span>
      </p>
      <p class="highlights">
        Birthdate: <span>{{ formattedBirthDate }}</span>
      </p>
      <p class="highlights">
        Address: <span>{{ student.address }} </span>
      </p>
      <p class="highlights">
        Course: <span>{{ student.course }}</span>
      </p>
    </div>
    <!-- Card footer with Update and Delete buttons -->
    <template #footer>
      <div class="btn-group">
        <el-button type="primary" @click="showDrawer">Update</el-button>
        <el-button type="danger" @click="handleDelete">Delete</el-button>
      </div>
    </template>
  </el-card>

  <DialogBox
    :model-value="dialogVisible"
    title="Delete Student profile?"
    @update:modelValue="dialogVisible = false"
    @confirm="confirmDeletion"
  />

  <!-- Drawer component for editing student details -->
  <el-drawer
    v-model="drawerVisible"
    title="Update Student"
    :with-header="true"
    :size="'30%'"
  >
    <el-form
      label-position="top"
      :model="editedStudent"
      ref="formRef"
      :rules="registrationRules"
    >
      <el-form-item label="First Name" prop="firstName">
        <el-input v-model="editedStudent.firstName" />
      </el-form-item>

      <el-form-item label="Middle Name">
        <el-input v-model="editedStudent.middleName" maxlength="1" />
      </el-form-item>

      <el-form-item label="Last Name" prop="lastName">
        <el-input v-model="editedStudent.lastName" />
      </el-form-item>

      <el-form-item label="Age" prop="age">
        <el-input type="number" v-model="editedStudent.age" disabled />
      </el-form-item>

      <el-form-item label="Birthdate" prop="birthDate">
        <el-date-picker
          v-model="editedStudent.birthDate"
          type="date"
          placeholder="Select a date"
          :disabled-date="disableDate"
        />
      </el-form-item>

      <el-form-item label="Address" prop="address">
        <el-input v-model="editedStudent.address" />
      </el-form-item>

      <!-- Dropdown for Course selection -->
      <el-form-item label="Course" prop="course">
        <el-select
          v-model="editedStudent.course"
          placeholder="Select your desired course"
        >
          <el-option
            label="Bachelor of Science in Information Technology"
            value="bachelor of science in information technology"
          />
          <el-option
            label="Bachelor of Science in Computer Science"
            value="bachelor of science in computer science"
          />
          <el-option
            label="Bachelor of Science in Tourism"
            value="bachelor of science in tourism"
          />
          <el-option
            label="Bachelor of Science in Hotel and Restaurant Management"
            value="bachelor of science in hotel and restaurant management"
          />
          <el-option
            label="Bachelor of Science in Nursing"
            value="bachelor of science in nursing"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <div style="text-align: right; margin-top: 20px">
      <el-button type="primary" @click="toggleDialogBox">Save</el-button>
      <el-button @click="drawerVisible = false">Cancel</el-button>
    </div>

    <DialogBox
      :model-value="dialogVisibleUpdate"
      title="Update Student profile?"
      @update:modelValue="(val) => (dialogVisibleUpdate = val)"
      @confirm="updateStudent"
    />
  </el-drawer>
</template>

<style scoped>
.card-container {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 25rem;
  transition: transform 0.3s;
}

.card-container:hover {
  transform: translateY(-5px);
}

.img-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
}

.img-container img {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  border: none;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.card-body p,
.card-header p {
  text-transform: capitalize;
  font-weight: 500;
  font-size: 1rem;
}

.card-header p {
  text-align: center;
}

.card-body p span {
  font-weight: 400;
}

.btn-group {
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 5px;
}

.highlights {
  font-weight: 700 !important;
}

:deep(.el-select__selected-item) {
  color: #606266 !important;
}
</style>
