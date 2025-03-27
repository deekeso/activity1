<template>
  <el-form
    class="registration-form"
    ref="ruleFormRef"
    :model="formStore"
    :rules="rules"
    label-width="auto"
  >
    <h1>TEST HEADER</h1>
    <el-form-item label="First Name">
      <el-input v-model="formStore.firstName" autocomplete="off" />
    </el-form-item>

    <el-form-item label="Middle Name" prop="middleName">
      <el-input v-model="formStore.middleName" autocomplete="off" />
    </el-form-item>

    <el-form-item label="Last Name">
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

    <el-form-item label="Username">
      <el-input v-model="formStore.username" autocomplete="off" />
    </el-form-item>

    <el-form-item label="Email">
      <el-input v-model="formStore.email" type="email" autocomplete="off" />
    </el-form-item>

    <el-form-item label="Password">
      <el-input
        v-model="formStore.password"
        type="password"
        show-password
        autocomplete="off"
      />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="registerUser">Add Student</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { useFormStore } from "@/stores/useFormStore";
import type { FormInstance } from "element-plus";
import { useRouter } from "vue-router";
import { onMounted, ref, watch } from "vue";
import drawerForm from "@/components/drawerForm.vue";

const drawer = ref(false);

const router = useRouter();
const ruleFormRef = ref<FormInstance>();
const formStore = useFormStore();

onMounted(() => {
  formStore.loadStoredData();
});

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

  router.push("/index");
};
</script>

<style scoped>
.el-button {
  position: relative;
  top: 70px;
  left: 12px;
  width: 150px;
  margin-left: 16px;
  background-color: brown;
}
</style>
