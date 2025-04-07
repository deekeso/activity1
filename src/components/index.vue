<template>
  <body>
    <el-row :gutter="100">
      <el-col
        v-for="item in studentStore.students"
        :span="6"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
      >
        <div class="cardContainer">
          <el-card :key="item">
            <template #header>
              <!-- EDIT BUTTON ON CARD -->
              <el-button type="primary" :icon="Edit" @click="editStudent(item)">
                Edit
              </el-button>
              <!-- DELETE BUTTON ON CARD -->
              <el-button
                type="primary"
                :icon="Delete"
                @click="deleteStudent(item)"
                style="background-color: red; color: #000"
              />
            </template>

            <!-- CARD CONTAINER BLOCK -->
            <div class="card-header">
              <span><h2>Student Information</h2></span>

              <p><b>First Name:</b> {{ item.firstName }}</p>
              <p><b>Middle Name:</b> {{ item.middleName }}</p>
              <p><b>Last Name:</b> {{ item.lastName }}</p>
              <p><b>Birth Date:</b> {{ item.birthDate }}</p>
              <p><b>Age:</b> {{ item.age }}</p>
              <p><b>Address:</b> {{ item.address }}</p>
              <p><b>Course:</b> {{ item.course }}</p>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>

    <el-drawer
      v-model="drawerFormVisible"
      title="Edit Student Information"
      width="500"
      :rule="rules"
      ref="ruleFormRef"
      direction="rtl"
      :style="{ 'min-width': '400px' }"
    >
      <el-form
        :model="studentStore.editingStudent"
        ref="ruleFormRef"
        :rules="rules"
      >
        <el-form-item label="First Name" prop="firstName">
          <el-input
            v-model="studentStore.editingStudent.firstName"
            @input="removeWhitespace('firstName')"
            @blur="cleanInputOnBlur('firstName')"
          ></el-input>
        </el-form-item>
        <el-form-item label="Middle Initial" prop="middleName">
          <el-input
            v-model="studentStore.editingStudent.middleName"
            maxlength="1"
            @input="validateMiddleInitial"
          ></el-input>
        </el-form-item>
        <el-form-item label="Last Name" prop="lastName">
          <el-input
            v-model="studentStore.editingStudent.lastName"
            @input="removeWhitespace('lastName')"
            @blur="cleanInputOnBlur('lastName')"
          ></el-input>
        </el-form-item>

        <el-form-item label="Birth Date" prop="birthDate">
          <el-date-picker
            v-model="studentStore.editingStudent.birthDate"
            type="date"
            placeholder="Select Birth Date"
            format="MM / DD / YYYY"
            value-format="MM / DD / YYYY"
            :editable="false"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="Age" prop="age">
          <el-input
            v-model="studentStore.editingStudent.age"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="Address" prop="address">
          <el-input
            v-model="studentStore.editingStudent.address"
            @input="removeWhitespace('address')"
            @blur="cleanInputOnBlur('address')"
          ></el-input>
        </el-form-item>

        <el-form-item label="Course" prop="course">
          <el-select
            v-model="studentStore.editingStudent.course"
            placeholder="Select a course"
          >
            <el-option
              v-for="course in courseOptions"
              :key="course"
              :label="course"
              :value="course"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <!-- Edit Actions -->

      <template #footer>
        <div class="drawer-footer">
          <el-button @click="drawerFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="saveEditedStudent"
            >Confirm</el-button
          >
        </div>
      </template>
    </el-drawer>
  </body>
</template>

<script setup lang="ts">
import { useFormStore } from "@/stores/useFormStore";
import { onMounted, ref, watch, reactive } from "vue";
import { type FormInstance, ElNotification } from "element-plus";
import { Delete, Edit } from "@element-plus/icons-vue";
import { courseOptions } from "@/constants/courses";

const ruleFormRef = ref<FormInstance>();
const drawerFormVisible = ref(false);

const rules = {
  firstName: [
    {
      required: true,
      message: "First Name is required to be filled",
      trigger: "blur",
    },
  ],
  middleName: [
    {
      required: true,
      message: "Middle Initial is required to be filled",
      trigger: "blur",
    },
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

const studentStore = useFormStore();

interface EditingStudent {
  id: string | number;
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: string;
  age: number;
  address: string;
  course: string;
}

studentStore.editingStudent = reactive<EditingStudent>({
  id: "",
  firstName: "",
  middleName: "",
  lastName: "",
  birthDate: "",
  age: 0,
  address: "",
  course: "",
});

onMounted(() => {
  studentStore.loadStoredData();
});

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

// EDIT STUDENT INFORMATION FUNCTION

const editStudent = (student: Student) => {
  drawerFormVisible.value = true;
  studentStore.editingStudent = { ...student };
};

// SAVE STUDENT INFORMATION THAT WAS EDITED

const saveEditedStudent = () => {
  const index: number = studentStore.students.findIndex(
    (item: Student) => item.id === studentStore.editingStudent.id
  );

  if (index !== -1) {
    studentStore.students[index] = { ...studentStore.editingStudent };
    localStorage.setItem("students", JSON.stringify(studentStore.students));
    drawerFormVisible.value = false;
  } else {
    console.error("Student not found. Unable to save edit.");
  }
};

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

watch(
  () => studentStore.editingStudent.birthDate,
  (newBirthDate) => {
    if (newBirthDate) {
      const birthDate = new Date(newBirthDate);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      if (age < 18) {
        studentStore.editingStudent.birthDate = "";
        ElNotification({
          title: "ERROR",
          message: "Age must be 18 years or older.",
          type: "error",
        });
      } else {
        studentStore.editingStudent.age = age;
      }
    } else {
      studentStore.editingStudent.age = 0;
    }
  }
);

const validateMiddleInitial = () => {
  if (!/^[A-Z]?$/.test(studentStore.editingStudent.middleName)) {
    studentStore.editingStudent.middleName =
      studentStore.editingStudent.middleName.slice(0, -1);
  }
};

// REMOVE EXCESS WHITESPACE FUNCTION FOR THE INPUT FIELDS
const removeWhitespace = (field: keyof EditingStudent) => {
  if (typeof studentStore.editingStudent[field] === "string") {
    studentStore.editingStudent[field] = (
      studentStore.editingStudent[field] as string
    ).replace(/\s{2,}/g, " ");
  }
};

const cleanInputOnBlur = (field: keyof EditingStudent) => {
  if (typeof studentStore.editingStudent[field] === "string") {
    studentStore.editingStudent[field] = (
      studentStore.editingStudent[field] as string
    ).trim();
  }
};

// DELETE STUDENTS INFORMATION

const deleteStudent = (student: Student) => {
  const confirmation: boolean = window.confirm("Are you SURE about that?!");

  if (confirmation) {
    studentStore.students = studentStore.students.filter(
      (item: Student) => item.id !== student.id
    );

    localStorage.setItem("students", JSON.stringify(studentStore.students));
  }
};
</script>

<style>
.el-card {
  border-radius: 15px;
  width: 100%;
}

.cardContainer {
  margin: 10px;
  padding: 20px;
}

.cardHeader {
  background-color: aqua;
}
</style>
