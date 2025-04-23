<script setup lang="ts">
import type { TSignup } from '@/types/types'
import type { ComponentSize, FormInstance } from 'element-plus'
import { reactive, ref } from 'vue'
import { Hide, House, Lock, User, View } from '@element-plus/icons-vue'
import { useStudentStore } from '@/stores'
import { signupRules } from '@/rules/authRules'
import { courses } from '@/constant/courses'

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<TSignup>({
  firstName: '',
  middleName: '',
  lastName: '',

  userName: '',
  password: '',

  birthDate: '',
  age: null,

  address: '',
  course: '',
})
const showPass = ref(false)
</script>
<template>
  <div class="signup">
    <el-image draggable="false" src="/BG.png" alt="bg-photo" class="bg-photo" />
    <el-form
      class="form"
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="signupRules"
      :size="formSize"
      status-icon
    >
      <!-- name -->
      <el-form-item required>
        <el-col :span="8">
          <el-form-item prop="firstName">
            <el-input
              input-style="color:white;margin-left:0.5em;"
              v-model="ruleForm.firstName"
              size="large"
              placeholder="FIRSTNAME"
              :prefix-icon="User"
            />
          </el-form-item>
        </el-col>

        <el-col style="text-align: center" :span="1">
          <span style="color: var(--primary-text)">-</span>
        </el-col>

        <el-col :span="6">
          <el-form-item prop="middleName">
            <el-input
              input-style="color:white;margin-left:0.5em;"
              v-model="ruleForm.middleName"
              size="large"
              placeholder="MIDDLENAME"
              :prefix-icon="User"
            />
          </el-form-item>
        </el-col>

        <el-col style="text-align: center" :span="1">
          <span style="color: var(--primary-text)">-</span>
        </el-col>

        <el-col :span="8">
          <el-form-item prop="lastName">
            <el-input
              input-style="color:white;margin-left:0.5em;"
              v-model="ruleForm.lastName"
              size="large"
              placeholder="LASTNAME"
              :prefix-icon="User"
            />
          </el-form-item>
        </el-col>
      </el-form-item>

      <!-- age & date -->
      <el-form-item required>
        <el-col :span="10">
          <el-form-item prop="age">
            <el-input
              type="number"
              input-style="color:white;margin-left:0.5em;"
              v-model="ruleForm.age"
              size="large"
              placeholder="AGE"
              :prefix-icon="User"
            />
          </el-form-item>
        </el-col>

        <el-col style="text-align: center" :span="1">
          <span style="color: var(--primary-text)">-</span>
        </el-col>

        <el-col :span="13">
          <el-form-item prop="birthDate">
            <el-date-picker
              class="date"
              v-model="ruleForm.birthDate"
              type="date"
              placeholder="PICK YOUR BIRTHDATE"
              style="width: 100%; height: 50px"
            />
          </el-form-item>
        </el-col>
      </el-form-item>

      <!-- username & pass -->
      <el-form-item required>
        <el-col :span="10">
          <el-form-item prop="userName">
            <el-input
              input-style="color:white;margin-left:0.5em;"
              v-model="ruleForm.userName"
              size="large"
              placeholder="USERNAME"
              :prefix-icon="User"
            />
          </el-form-item>
        </el-col>

        <el-col style="text-align: center" :span="1">
          <span style="color: var(--primary-text)">-</span>
        </el-col>

        <el-col :span="13">
          <el-form-item prop="password">
            <el-input
              input-style="color:white;margin-left:0.5em;"
              v-model="ruleForm.password"
              size="large"
              :type="showPass ? 'text' : 'password'"
              placeholder="PASSWORD"
            >
              <template #prefix>
                <el-icon class="el-input__icon"><Lock /></el-icon>
              </template>
              <template #suffix>
                <el-icon
                  v-if="showPass"
                  @click="showPass = !showPass"
                  class="el-input__icon pass_icon"
                >
                  <View />
                </el-icon>
                <el-icon v-else @click="showPass = !showPass" class="el-input__icon pass_icon">
                  <Hide />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-form-item>

      <!-- address -->
      <el-form-item prop="address">
        <el-input
          input-style="color:white;margin-left:0.5em;"
          v-model="ruleForm.address"
          size="large"
          placeholder="ADDRESS"
          :prefix-icon="House"
        />
      </el-form-item>

      <!-- courses -->
      <el-form-item prop="course">
        <el-select-v2
          :options="courses"
          input-style="margin-left:0.5em;"
          v-model="ruleForm.course"
          size="large"
          placeholder="COURSE"
        />
      </el-form-item>

      <!-- Buttons -->
      <el-form-item style="margin-top: 16px">
        <el-col :span="24">
          <el-button
            @click="useStudentStore().handleSignup(ruleFormRef)"
            style="width: 100%"
            size="large"
          >
            <el-text style="color: var(--primary-color)" class="semibold-text">SIGNUP</el-text>
          </el-button>
        </el-col>

        <el-col
          style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px; margin-top: 4px"
          :span="24"
        >
          <el-divider style="width: 100%" />
          <el-text>or</el-text>
          <el-divider style="width: 100%" />
        </el-col>

        <el-col :span="24">
          <el-button @click="$router.push('/login')" style="width: 100%" size="large">
            <el-text style="color: var(--primary-color)" class="semibold-text">LOGIN</el-text>
          </el-button>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
* {
  /* border: 1px solid red !important; */
}

.signup {
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

    .el-select__placeholder.is-transparent {
      color: var(--primary-text) !important;
      font-size: 16px;
    }
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
