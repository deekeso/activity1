<template>
  <el-form
    class="registration-form"
    ref="ruleFormRef"
    :model="formStore"
    :rules="rules"
    label-width="auto"
  >
    <h2>Sign Up</h2>
    <el-form-item label="First Name" prop="firstName">
      <el-input v-model="formStore.firstName" autocomplete="off" />
    </el-form-item>

    <el-form-item label="Middle Name" prop="middleName">
      <el-input v-model="formStore.middleName" autocomplete="off" />
    </el-form-item>

    <el-form-item label="Last Name" prop="firstName">
      <el-input v-model="formStore.lastName" autocomplete="off" />
    </el-form-item>

    <el-form-item label="Birth Date" prop="birthDate">
      <el-date-picker
        v-model="formStore.birthDate"
        type="date"
        placeholder="Select Birth Date"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"
      />
    </el-form-item>

    <el-form-item label="Age" prop="age">
      <el-input v-model.number="formStore.age" disabled />
    </el-form-item>

    <el-form-item label="Address" prop="address">
      <el-input v-model="formStore.address" />
    </el-form-item>

    <el-form-item label="Course">
      <el-select v-model="formStore.course" placeholder="Select a course">
        <el-option
          v-for="course in courseOptions"
          :key="course"
          :label="course"
          :value="course"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="Username" prop="username">
      <el-input v-model="formStore.username" autocomplete="off" />
    </el-form-item>

    <el-form-item label="Email" prop="email">
      <el-input v-model="formStore.email" type="email" autocomplete="off" />
    </el-form-item>

    <el-form-item label="Password" prop="password">
      <el-input
        v-model="formStore.password"
        type="password"
        show-password
        autocomplete="off"
      />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="registerUser">Sign Up</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { useFormStore } from "@/stores/useFormStore";
import type { FormInstance } from "element-plus";
import { useRouter } from "vue-router";
import { onMounted, ref, watch } from "vue";
import { courseOptions } from "@/constants/courses";

const router = useRouter();
const ruleFormRef = ref<FormInstance>();
const formStore = useFormStore();

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

      formStore.age = age; // Update age in Pinia store
    } else {
      formStore.age = 0;
    }
  }
);

// SUCCESSFUL REGISTER >> STORING DATA ON LOCAL STORAGE
const registerUser = () => {
  formStore.saveToLocalStorage();
  alert("Sign Up Successfully!");

  formStore.firstName = "";
  formStore.middleName = "";
  formStore.lastName = "";
  formStore.birthDate = "";
  formStore.age = 0;
  formStore.address = "";
  formStore.course = "";
  formStore.username = "";
  formStore.email = "";
  formStore.password = "";

  router.push("/");
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

h2 {
  text-align: center;
  margin-bottom: 25px;
}
</style>
