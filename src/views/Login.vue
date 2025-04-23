<template>
  <el-row justify="center" align="middle" style="height: 80vh">
    <el-col
      :xs="{ span: 15 }"
      :sm="{ span: 15 }"
      :md="{ span: 10 }"
      :lg="{ span: 5 }"
      :xl="{ span: 5 }"
    >
      <!-- Icon -->
      <el-row justify="center" align="middle" class="mb-1">
        <el-icon class="fs__icon-1 icon__circled--opaque text-light">
          <ShoppingBag />
        </el-icon>
      </el-row>

      <!-- Login Form -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        @submit.prevent="handleLogin"
      >
        <!-- Username Field -->
        <el-form-item prop="username">
          <TextInput
            v-model="loginForm.username"
            :inputProps="{ placeholder: 'USERNAME' }"
            icon="User"
            type="text"
          />
        </el-form-item>

        <!-- Password Field -->
        <el-form-item prop="password">
          <TextInput
            v-model="loginForm.password"
            :inputProps="{ placeholder: 'PASSWORD', 'show-password': true }"
            icon="Lock"
            type="password"
          />
        </el-form-item>

        <el-row justify="end">
          <router-link to="/forgot-pass">
            <el-link underline class="text-white">Forgot Password?</el-link>
          </router-link>
        </el-row>

        <!-- Submit Button -->
        <el-form-item>
          <Button
            type="primary"
            :handleClick="submitForm"
            customClass="box-shadow w-full"
          >
            LOG IN
          </Button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/useAuthStore";
import { useDataFetcher } from "@/composables/data/useDataFetcher";
import { User } from "@/interface/User";
import { ElMessage, ElForm } from "element-plus";
import type { FormRules, FormInstance } from "element-plus";

const router = useRouter();
const authStore = useAuthStore();
const loginFormRef = ref<FormInstance>();

// Reactive form data
const loginForm = reactive({
  username: "",
  password: "",
});

// Validation rules
const loginRules: FormRules = {
  username: [
    {
      required: true,
      message: "Username is required",
      trigger: "blur",
    },
    {
      min: 3,
      max: 50,
      message: "Username must be between 3 and 50 characters",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "Password is required",
      trigger: "blur",
    },
    {
      min: 6,
      message: "Password must be at least 6 characters",
      trigger: "blur",
    },
  ],
};

// Fetch user data
const { data: students } = useDataFetcher<User[]>("public/data/users.json");

// Form submission method
const submitForm = async () => {
  // Validate the entire form
  if (!loginFormRef.value) return;

  await loginFormRef.value.validate(async (valid) => {
    if (valid) {
      await handleLogin();
    } else {
      ElMessage({
        message: "Please correct the errors in the form",
        type: "error",
      });
    }
  });
};

// Login logic
async function handleLogin() {
  if (!students.value) {
    ElMessage({
      message: "Students data not loaded",
      type: "error",
    });
    return;
  }

  const match = students.value.find(
    (student) =>
      student.username === loginForm.username &&
      student.password === loginForm.password
  );

  if (match) {
    authStore.login({ username: loginForm.username });
    ElMessage({
      message: "Login successful",
      type: "success",
    });
    await router.push("/register");
  } else {
    ElMessage({
      showClose: true,
      duration: 0,
      message: "Incorrect credentials",
      type: "error",
    });
  }
}
</script>

<style scoped>
.el-input__icon {
  color: var(--primary-white);
}

.el-form-item__error {
  color: #f56c6c !important;
  font-size: 12px;
  padding-top: 4px;
  position: absolute;
  left: 0;
  bottom: -20px;
  background: rgba(245, 108, 108, 0.1);
  border-radius: 4px;
  padding: 4px 8px;
  margin-top: 4px;
  transition: all 0.3s;
}

.el-link .el-icon--right.el-icon {
  vertical-align: text-bottom;
}
</style>
