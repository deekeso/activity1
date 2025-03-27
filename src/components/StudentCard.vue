<script setup lang="ts">
import { ref, reactive, watch, computed } from "vue";
import { ElMessageBox } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";

import type { Student } from "../types";

import {
  Calendar,
  User,
  Location,
  School,
  Edit,
  Delete,
} from "@element-plus/icons-vue";

import { useStudentsStore } from "../stores/studentsStore";

const studentsStore = useStudentsStore;

const { students, updateStudent, deleteStudent } = studentsStore();

let studentForm = reactive({
  id: "",
  firstName: "",
  middleName: "",
  lastName: "",
  birthDate: "",
  age: 0,
  address: "",
  course: "",
});

const dialog = ref(false);

const editStudent = (newStudent: Student) => {
  dialog.value = true;
  studentForm = newStudent;
};

const formLabelWidth = "120px";

let timer;

const loading = ref(false);

const ruleFormRef = ref<FormInstance>();

const age = computed(() => {
  if (!studentForm.birthDate) return 0;

  const birth = new Date(studentForm.birthDate);

  if (isNaN(birth.getTime())) return 0;

  const today = new Date();
  const diff = today.getFullYear() - birth.getFullYear();

  return today.getMonth() < birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())
    ? diff - 1
    : diff;
});

watch(
  age,
  (newAge) => {
    studentForm.age = newAge;
  },
  { immediate: true }
);

const rules = reactive<FormRules>({
  firstName: [
    { required: true, message: "Please input first name", trigger: "blur" },
    { min: 3, max: 50, message: "Length should be 3 to 50", trigger: "blur" },
  ],
  middleName: [
    { required: true, message: "Please input last name", trigger: "blur" },
    { min: 3, max: 50, message: "Length should be 3 to 50", trigger: "blur" },
  ],
  lastName: [
    { required: true, message: "Please input first name", trigger: "blur" },
    { min: 3, max: 50, message: "Length should be 3 to 50", trigger: "blur" },
  ],
  birthDate: [
    {
      type: "date",
      required: true,
      message: "Please pick a date",
      trigger: "change",
    },
  ],
  address: [
    { required: true, message: "Please input address", trigger: "blur" },
    { min: 3, max: 50, message: "Length should be 3 to 5", trigger: "blur" },
  ],
  course: [
    {
      required: true,
      message: "Please select course",
      trigger: "change",
    },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      loading.value = true;

      setTimeout(() => {
        loading.value = false;
        dialog.value = false;
        updateStudent(studentForm);
      }, 400);
    } else {
      console.log("error submit!", fields);
    }
  });
};

const handleClose = (done: any) => {
  if (loading.value) {
    return;
  }
  ElMessageBox.confirm("Do you want to submit?")
    .then(() => {
      loading.value = true;
      timer = setTimeout(() => {
        submitForm(ruleFormRef.value);
        done();
        setTimeout(() => {
          loading.value = false;
        }, 400);
      }, 2000);
    })
    .catch(() => {});
};

const cancelForm = (formEl: FormInstance | undefined) => {
  dialog.value = false;

  if (!formEl) return;
  formEl.resetFields();
};
</script>

<template>
  <el-row :gutter="20" class="card-container">
    <el-col
      v-for="student in students"
      :key="student.id"
      :xs="24"
      :sm="12"
      :md="8"
      :lg="6"
    >
      <el-card class="card-item" style="max-width: 480px">
        <template #header>
          <div class="card-header">
            <span
              >{{ student.firstName }} {{ student.middleName }}
              {{ student.lastName }}
            </span>
            <div>
              <el-button
                size="small"
                type="primary"
                :icon="Edit"
                @click="editStudent(student)"
              />
              <el-button
                size="small"
                type="primary"
                :icon="Delete"
                @click="deleteStudent(student.id)"
              />
            </div>
          </div>
        </template>
        <div class="card-content">
          <div class="info-item">
            <el-icon><Calendar /></el-icon>
            <span>Born: {{ student.birthDate }}</span>
          </div>
          <div class="info-item">
            <el-icon><User /></el-icon>
            <span>Age: {{ student.age }}</span>
          </div>
          <div class="info-item">
            <el-icon><Location /></el-icon>
            <span>{{ student.address }}</span>
          </div>
          <div class="info-item">
            <el-icon><School /></el-icon>
            <span>{{ student.course }}</span>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-drawer
      v-model="dialog"
      title="Student Form"
      :before-close="handleClose"
      direction="ltr"
      class="demo-drawer"
      :style="{ 'min-width': '300px' }"
    >
      <div class="demo-drawer__content">
        <el-form :rules="rules" ref="ruleFormRef" :model="studentForm">
          <el-form-item
            prop="firstName"
            label="First Name"
            :label-width="formLabelWidth"
          >
            <el-input v-model="studentForm.firstName" autocomplete="off" />
          </el-form-item>
          <el-form-item
            prop="middleName"
            label="Middle Name"
            :label-width="formLabelWidth"
          >
            <el-input v-model="studentForm.middleName" autocomplete="off" />
          </el-form-item>
          <el-form-item
            prop="lastName"
            label="Last Name"
            :label-width="formLabelWidth"
          >
            <el-input v-model="studentForm.lastName" autocomplete="off" />
          </el-form-item>
          <el-form-item
            prop="birthDate"
            label="Birthday"
            :label-width="formLabelWidth"
          >
            <el-date-picker
              v-model="studentForm.birthDate"
              type="date"
              placeholder="Pick a Date"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
          <el-form-item prop="age" label="Age" :label-width="formLabelWidth">
            <el-input disabled v-model="studentForm.age" />
          </el-form-item>
          <el-form-item
            prop="address"
            label="Address"
            :label-width="formLabelWidth"
          >
            <el-input v-model="studentForm.address" autocomplete="off" />
          </el-form-item>
          <el-form-item
            prop="course"
            label="Course"
            :label-width="formLabelWidth"
          >
            <el-select
              v-model="studentForm.course"
              placeholder="Please select course"
            >
              <el-option
                label="Bachelor of Science in Information and Technology"
                value="BSIT"
              />
              <el-option
                label="Bachelor of Science in Computer Science"
                value="BSCS"
              />
              <el-option
                label="Bachelor of Science in Hotel and Restaurant Management"
                value="BSHRM"
              />
              <el-option label="Bachelor of Science in Nursing" value="BSN" />
            </el-select>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm(ruleFormRef)">Cancel</el-button>
          <el-button
            type="primary"
            :loading="loading"
            @click="submitForm(ruleFormRef)"
          >
            {{ loading ? "Submitting ..." : "Submit" }}
          </el-button>
        </div>
      </div>
    </el-drawer>
  </el-row>
</template>

<style scoped>
.card-item {
  margin-bottom: 20px;
  border-radius: 8px;
  transition: all 0.3s;
}

.card-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}

:deep(.el-card__body) {
  padding: 10px;
}

.card-item:hover {
  transform: translateY(-5px);
}

.card-content {
  padding: 0 15px;
}

.info-item {
  display: flex;
  align-items: center;
  margin: 10px 0;
  color: #606266;
  gap: 5px;
}

.info-item .el-icon {
  margin-right: 8px;
  color: #409eff;
}
</style>
