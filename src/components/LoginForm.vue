<script setup lang="ts">
import { reactive, ref } from "vue";

import type { FormInstance, FormRules } from "element-plus";
import { Lock, User } from "@element-plus/icons-vue";

import { useAuthStore } from "../stores/authStore";

const useAuth = useAuthStore();

const { login } = useAuth;

const ruleFormRef = ref<FormInstance>();

const validateUsername = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the username"));
  } else {
    callback();
  }
};

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the password"));
  } else {
    callback();
  }
};

const ruleForm = reactive({
  username: "",
  password: "",
});

const rules = reactive<FormRules<typeof ruleForm>>({
  username: [{ validator: validateUsername, trigger: "blur" }],
  password: [{ validator: validatePass, trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  formEl.validate((valid) => {
    if (!valid) {
      console.log("error submit!");
      return;
    }

    login(ruleForm);
  });
};
</script>

<template>
  <el-form
    @keyup.enter="submitForm(ruleFormRef)"
    ref="ruleFormRef"
    style="max-width: 400px"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="auto"
    class="demo-ruleForm"
  >
    <div>
      <h1>Login</h1>
    </div>
    <el-form-item prop="username">
      <el-input
        :prefix-icon="User"
        v-model="ruleForm.username"
        placeholder="Username"
      />
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        :prefix-icon="Lock"
        v-model="ruleForm.password"
        type="password"
        autocomplete="off"
        placeholder="Password"
      />
    </el-form-item>
    <el-form-item>
      <el-button @click="submitForm(ruleFormRef)">Login</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
h1 {
  color: white;
}

.demo-ruleForm {
  width: 100%;
}

.demo-ruleForm > * {
  margin-inline: 10px;
}

:deep(.el-form-item__error) {
  margin-inline: 5px;
}

:deep(.el-input__wrapper) {
  background-color: transparent;
}

:deep(.el-input__inner) {
  color: white;
}

:deep(.el-button) {
  width: 100%;
}
</style>
