<script setup lang="ts">
import { reactive, ref, computed, watch } from "vue";

import { ElMessageBox } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";

import { useStudentsStore } from "../stores/studentsStore";

const studentStore = useStudentsStore();

const formLabelWidth = "120px";

let timer;

const dialog = ref(false);
const loading = ref(false);

const ruleFormRef = ref<FormInstance>();

const studentForm = reactive({
  id: "",
  firstName: "",
  middleName: "",
  lastName: "",
  birthDate: "",
  age: 0,
  address: "",
  course: "",
});

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
        studentStore.addStudent(studentForm);
        formEl.resetFields();
      }, 400);
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
</script>

<template>
  <el-button
    :style="{ 'margin-left': '10px' }"
    type="primary"
    @click="dialog = true"
    >Add Student</el-button
  >
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
</template>

<style scoped>
:deep(.el-input__wrapper) {
  width: 0 !important;
}
</style>
