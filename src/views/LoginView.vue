<script setup lang="ts">
import { loginRules } from '@/rules/authRules'
import { useStudentStore } from '@/stores'
import type { TLogin } from '@/types/types'
import { Hide, Lock, User, View } from '@element-plus/icons-vue'
import type { ComponentSize, FormInstance } from 'element-plus'
import { reactive, ref } from 'vue'

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<TLogin>({
  userName: '',
  password: '',
})
const showPass = ref(false)
</script>

<template>
  <div class="login">
    <el-image draggable="false" src="/BG.png" alt="bg-photo" class="bg-photo" />

    <el-form
      class="form"
      ref="ruleFormRef"
      :model="ruleForm"
      :size="formSize"
      :rules="loginRules"
      status-icon
    >
      <!-- username -->
      <el-form-item prop="userName">
        <el-input
          class="username-input"
          input-style="color:white;margin-left:0.5em;"
          v-model="ruleForm.userName"
          size="large"
          placeholder="USERNAME"
          :prefix-icon="User"
          clearable
        />
      </el-form-item>

      <!-- password -->
      <el-form-item prop="password">
        <el-input
          input-style="color:white;margin-left:0.5em;"
          v-model="ruleForm.password"
          size="large"
          :type="showPass ? 'text' : 'password'"
          placeholder="PASSWORD"
          clearable
        >
          <template #prefix>
            <el-icon class="el-input__icon"><Lock /></el-icon>
          </template>
          <template #suffix>
            <el-icon v-if="showPass" @click="showPass = !showPass" class="el-input__icon pass_icon">
              <View />
            </el-icon>
            <el-icon v-else @click="showPass = !showPass" class="el-input__icon pass_icon">
              <Hide />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>

      <!-- Buttons -->
      <el-form-item style="margin-top: 16px" label-width="0">
        <el-col :span="24">
          <el-button
            @click="useStudentStore().handleLogin(ruleFormRef)"
            style="width: 100%"
            size="large"
          >
            <el-text style="color: var(--secondary-text)" class="semibold-text">LOGIN</el-text>
          </el-button>
        </el-col>

        <el-col
          style="
            display: flex;
            align-items: center;
            justify-content: end;
            gap: 8px;
            margin-bottom: 4px;
            margin-top: 4px;
          "
          :span="24"
        >
          <el-link href="/forgot_pass" style="color: var(--primary-text)">Forgot Password?</el-link>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.login {
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1em;

  position: relative;
  background-color: var(--primary-background);

  .bg-photo {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* z-index: -1; */
  }

  .form {
    width: 700px;
    z-index: 1000;

    .pass_icon:hover {
      cursor: pointer;
      color: var(--primary-green);
      scale: 1.1;
      animation-duration: 300;
      transition: all 0.3s;
    }
  }

  .username-input .el-input__wrapper {
    background: red !important;
  }
}

::v-deep(.el-select__placeholder, .el-input__inner::placeholder) {
  color: var(--primary-text) !important;
  font-size: 16px;
}

::v-deep(.el-input__inner::placeholder) {
  color: var(--primary-text) !important;
  font-size: 16px;
}

::v-deep(.el-input__icon, .el-icon) {
  color: var(--primary-text);
  font-size: 16px;
}

@media only screen and (max-width: 480px) {
  ::v-deep(.el-input__icon) {
    display: none !important;
  }
}
</style>
