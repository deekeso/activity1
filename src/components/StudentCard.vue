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

const studentStore = useStudentsStore();

let studentForm = reactive({
  id: "",
  firstName: "",
  middleInitial: "",
  lastName: "",
  birthDate: "",
  age: 0,
  address: "",
  course: "",
});

const dialog = ref(false);

const editStudent = (newStudent: Student) => {
  dialog.value = true;
  console.log(newStudent);
  Object.assign(studentForm, JSON.parse(JSON.stringify(newStudent)));
};

const formLabelWidth = "120px";

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

const validateAge = (
  rule: any,
  value: number | "",
  callback: (error?: Error) => void
) => {
  if (value === "" || value === null) {
    callback(new Error("Please enter your age"));
    return;
  }
  if (!Number.isInteger(value)) {
    callback(new Error("Age must be a whole number"));
    return;
  }
  if (value < 18) {
    callback(new Error("Age must be greater than 18"));
    return;
  }
  callback();
};

const rules = reactive<FormRules>({
  firstName: [
    { required: true, message: "Please input first name", trigger: "blur" },
    { min: 3, max: 50, message: "Length should be 3 to 50", trigger: "blur" },
  ],
  middleInitial: [
    { required: true, message: "Please input middle initial", trigger: "blur" },
    { min: 1, max: 1, message: "only one character allowed", trigger: "blur" },
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
  age: [{ validator: validateAge, trigger: ["blur", "change"] }],
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
      ElMessageBox.confirm("Do you want to submit?")
        .then(() => {
          loading.value = true;
          setTimeout(() => {
            studentStore.updateStudent({ ...studentForm });
            setTimeout(() => {
              loading.value = false;
              dialog.value = false;
            }, 400);
          }, 1000);
        })
        .catch(() => {});
    } else {
      console.log("error submit!", fields);
    }
  });
};

const handleClose = () => {
  if (loading.value) {
    return;
  }
  dialog.value = false;
};

const cancelForm = (formEl: FormInstance | undefined) => {
  dialog.value = false;

  if (!formEl) return;
  formEl.resetFields();
};

const deleteStudent = (studentId: string) => {
  ElMessageBox.confirm("Confirm delete?")
    .then(() => {
      loading.value = true;
      setTimeout(() => {
        studentStore.deleteStudent(studentId);
        setTimeout(() => {
          loading.value = false;
          dialog.value = false;
        }, 400);
      }, 1000);
    })
    .catch(() => {});
};
</script>

<template>
  <el-row :gutter="20" class="card-container">
    <el-col
      v-for="student in studentStore.students"
      :key="student.id"
      :xs="24"
      :sm="12"
      :md="8"
      :lg="6"
    >
      <el-card class="card-item" style="max-width: 700px">
        <template #header>
          <div class="card-header">
            <span
              >{{ student.firstName }}
              {{
                student.middleInitial
                  ? `${student.middleInitial.toUpperCase()}.`
                  : ""
              }}
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
            <el-input
              v-model="studentForm.middleInitial"
              autocomplete="off"
              maxlength="1"
            />
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
            {{ loading ? "Updating ..." : "Update" }}
          </el-button>
        </div>
      </div>
    </el-drawer>
  </el-row>
</template>

<style scoped>
.card-container {
  margin-inline: 0 !important;
}
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
