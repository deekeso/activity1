<template>
  <div class="forgot-pass">
    <h3>Forgot Password</h3>
    <el-form>
      <el-form-item> </el-form-item>
      <el-form-item>
        <el-input
          class="username-input"
          input-style="color:white;margin-left:0.5em;"
          size="large"
          placeholder="New Password"
          :prefix-icon="Lock"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-input
          class="username-input"
          input-style="color:white;margin-left:0.5em;"
          size="large"
          placeholder="Confirm New Password"
          :prefix-icon="Lock"
          clearable
        />
      </el-form-item>

      <el-form-item style="margin-top: 16px" label-width="0">
        <el-col :span="24">
          <el-button style="width: 100%" size="large">
            <el-text
              style="font-size: 16px; color: var(--secondary-text)"
              class="semibold-text"
              >Update</el-text
            >
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
          <el-link href="/" style="color: var(--primary-text)"
            >Back to login?</el-link
          >
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { Lock } from "@element-plus/icons-vue";
</script>

<style scoped>
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

.forgot-pass {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  color: #fff;
}

::v-deep(.el-input__wrapper) {
  background-color: #2148c0;
}

::v-deep(.el-input__inner) {
  border-radius: 8px;
  padding: 20px;
  color: white;
}

::v-deep(.el-input__inner::placeholder) {
  color: #ccc;
  font-size: 14px;
}

.icon-placeholder {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: rgb(255, 255, 255);
  pointer-events: none;
}

.el-button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background-color: #ffffff;
  color: #2148c0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: none;
  font-weight: 600;
}

.el-button:hover {
  background-color: #57a3eb;
  color: #fff;
}
</style>
