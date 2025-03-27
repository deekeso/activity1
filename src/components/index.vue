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
              <el-button type="primary" :icon="Edit" @click="editStudent(item)">
                Edit
              </el-button>
              <el-button
                type="primary"
                :icon="Delete"
                @click="deleteStudent(item)"
                style="background-color: red; color: #000"
              />
            </template>
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

    <el-dialog
      v-model="dialogFormVisible"
      title="Edit Student Information"
      width="500"
      :rule="rules"
      ref="ruleFormRef"
    >
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
    <!-- </div> -->
    <el-dialog
      v-model="dialogFormVisible"
      title="Edit Student Information"
      width="500"
    >
      <el-form
        :model="studentStore.editingStudent"
        ref="ruleFormRef"
        :rules="rules"
      >
        <el-form-item label="First Name" prop="firstName">
          <el-input v-model="studentStore.editingStudent.firstName"></el-input>
        </el-form-item>
        <el-form-item label="Middle Name" prop="middleName">
          <el-input v-model="studentStore.editingStudent.middleName"></el-input>
        </el-form-item>
        <el-form-item label="Last Name" prop="lastName">
          <el-input v-model="studentStore.editingStudent.lastName"></el-input>
        </el-form-item>

        <el-form-item label="Birth Date" prop="birthDate">
          <el-date-picker
            v-model="studentStore.editingStudent.birthDate"
            type="date"
            placeholder="Select Birth Date"
            format="MM / DD / YYYY"
            value-format="MM / DD / YYYY"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="Age" prop="age">
          <el-input v-model="studentStore.editingStudent.age"></el-input>
        </el-form-item>
        <el-form-item label="Address" prop="address">
          <el-input v-model="studentStore.editingStudent.address"></el-input>
        </el-form-item>

        <el-form-item label="Course" prop="course">
          <el-select
            v-model="studentStore.editingStudent.course"
            placeholder="Select a Course"
          >
            <el-option
              label="Bachelor of Science in Computer Science"
              value="Bachelor of Science in Computer Science"
            ></el-option>
            <el-option
              label="Bachelor of Science in Information Technology"
              value="Bachelor of Science in Information Technology"
            ></el-option>
            <el-option
              label="Bachelor of Science in Tourism Management"
              value="Bachelor of Science in Tourism Management"
            ></el-option>
            <el-option
              label="Bachelor of Science in Hotel and Restaurant Management"
              value="Bachelor of Science in Hotel and Restaurant Management"
            ></el-option>
            <el-option
              label="Bachelor of Science in Nursing"
              value="Bachelor of Science in Nursing"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="saveEditedStudent"
            >Confirm</el-button
          >
        </div>
      </template>
    </el-dialog>
  </body>
</template>

<script setup lang="ts">
import { useFormStore } from "@/stores/useFormStore";
import { onMounted, ref } from "vue";
import { type FormInstance } from "element-plus";
import { Delete, Edit } from "@element-plus/icons-vue";

const ruleFormRef = ref<FormInstance>();
const dialogFormVisible = ref(false);
const formStore = useFormStore();

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
      message: "Middle Name is required to be filled",
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

studentStore.editingStudent = ref<EditingStudent>({
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

const editStudent = (student: Student) => {
  dialogFormVisible.value = true;
  studentStore.editingStudent = { ...student };
};

const saveEditedStudent = () => {
  const index: number = studentStore.students.findIndex(
    (item: Student) => item.id === studentStore.editingStudent.id
  );

  if (index !== -1) {
    studentStore.students[index] = { ...studentStore.editingStudent };
    localStorage.setItem("students", JSON.stringify(studentStore.students));
    dialogFormVisible.value = false;
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

const deleteStudent = (student: Student) => {
  const confirmation: boolean = window.confirm("Are you SURE about that?!");

  if (confirmation) {
    studentStore.students = studentStore.students.filter(
      (item: Student) => item !== student
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
}

.cardHeader {
  background-color: aqua;
}
</style>
