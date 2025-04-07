<template>
  <el-form
    class="registration-form"
    ref="ruleFormRef"
    :model="formStore"
    :rules="rules"
    label-width="auto"
  >
    <!-- ADD NEW STUDENT INFORMATION BLOCK -->

    <h3>Add New Student</h3>
    <el-form-item label="First Name" prop="firstName">
      <el-input
        v-model="formStore.firstName"
        autocomplete="off"
        @input="removeWhitespace('firstName')"
        @blur="cleanInputOnBlur('firstName')"
      />
    </el-form-item>

    <el-form-item label="Middle Initial" prop="middleName">
      <el-input
        v-model="formStore.middleName"
        autocomplete="off"
        maxlength="1"
        @input="validateMiddleInitial"
      />
    </el-form-item>

    <el-form-item label="Last Name" prop="lastName">
      <el-input
        v-model="formStore.lastName"
        autocomplete="off"
        @input="removeWhitespace('lastName')"
        @blur="cleanInputOnBlur('lastName')"
      />
    </el-form-item>

    <el-form-item label="Birth Date" prop="birthDate">
      <el-date-picker
        v-model="formStore.birthDate"
        type="date"
        placeholder="Select Birth Date"
        format="MM / DD / YYYY"
        value-format="MM / DD / YYYY"
      />
    </el-form-item>

    <el-form-item label="Age" prop="age">
      <el-input v-model.number="formStore.age" disabled />
    </el-form-item>

    <el-form-item label="Address" prop="address">
      <el-input
        v-model="formStore.address"
        @input="removeWhitespace('address')"
        @blur="cleanInputOnBlur('address')"
      />
    </el-form-item>

    <el-form-item label="Course" prop="course">
      <el-select v-model="formStore.course" placeholder="Select a course">
        <el-option
          v-for="course in courseOptions"
          :key="course"
          :label="course"
          :value="course"
        ></el-option>
      </el-select>
    </el-form-item>

    <!-- SUBMIT/ADD NEW STUDENT -->
    <el-form-item>
      <el-button type="primary" @click="registerUser">Add Student</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { useFormStore } from "@/stores/useFormStore";
import type { FormInstance } from "element-plus";
import { useRouter } from "vue-router";
import { onMounted, ref, watch } from "vue";
import { ElNotification } from "element-plus";
import { courseOptions } from "@/constants/courses";

const router = useRouter();
const ruleFormRef = ref<FormInstance>();
const formStore = useFormStore() as {
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: string;
  age: number;
  address: string;
  course: string;
  [key: string]: any;
};

onMounted(() => {
  formStore.loadStoredData();
});

// FORM RULES TO ENSURE THE USER FILL ALL THE INPUT FIELDS

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
      message: "Middle Initial must be a single letter",
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

// WATCH FUNCTION FOR THE AUTO COMPUTE OF AGE

watch(
  () => formStore.birthDate,
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
        formStore.birthDate = "";
        ElNotification({
          title: "ERROR",
          message: "Age must be 18 years or older.",
          type: "error",
        });
      } else {
        formStore.age = age;
      }
    } else {
      formStore.age = 0;
    }
  }
);
// VALIDATE MIDDLE INITIAL INPUT
const validateMiddleInitial = () => {
  if (!/^[A-Z]?$/.test(formStore.middleName)) {
    formStore.middleName = formStore.middleName.slice(0, -1);
  }
};

// REMOVE EXCESS WHITESPACE FUNCTION FOR THE INPUT FIELDS
const removeWhitespace = (field: keyof typeof formStore) => {
  formStore[field] = formStore[field].replace(/\s{2,}/g, " ");
};

const cleanInputOnBlur = (field: keyof typeof formStore) => {
  formStore[field] = formStore[field].trim();
};

// REGISTER/ADD NEW STUDENT INFORMATION
const registerUser = async () => {
  if (!ruleFormRef.value) return;

  try {
    await ruleFormRef.value.validate();
  } catch (error) {
    ElNotification({
      title: "ERROR",
      message: "Please input all the fields.",
      type: "error",
    });
    return;
  }

  formStore.saveToLocalStorage();
  ElNotification({
    title: "Success",
    message: "Student has been added successfully!",
    type: "success",
    duration: 4000,
  });

  // SUCCESSFUL REGISTER >> STORING DATA ON LOCAL STORAGE

  formStore.firstName = "";
  formStore.middleName = "";
  formStore.lastName = "";
  formStore.birthDate = "";
  formStore.age = 0;
  formStore.address = "";
  formStore.course = "";

  setTimeout(() => {
    window.location.reload();
  }, 2000);
};
</script>

<style scoped>
.registration-form {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
  border-radius: 25px;
  background-color: #fff;
}

.el-form-item__label {
  font-size: 14px;
  color: #333;
  font-weight: bold;
}

.el-input__inner,
.el-select__inner,
.el-date-picker__input {
  padding: 12px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  width: 100%;
}

.el-button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  background-color: #52be5b;
  color: white;
  border: none;
}

.el-button:hover {
  background-color: #ffffff;
  color: black;
  border: 1px solid;
}

.error {
  color: red;
  font-size: 12px;
  margin-top: 10px;
}

h3 {
  text-align: center;
  margin-bottom: 25px;
}
</style>
