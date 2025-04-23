<template>
  <div class="forget-pass">
    <el-image draggable="false" src="/BG.png" alt="bg-photo" class="bg-photo" />
    <el-form>
      <el-form-item>
        <el-input
          class="username-input"
          input-style="color:white;margin-left:0.5em;"
          size="large"
          placeholder="Current Password"
          :prefix-icon="Lock"
          clearable
        />
      </el-form-item>
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
            <el-text style="font-size: 16px; color: var(--secondary-text)" class="semibold-text"
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
          <el-link href="/login" style="color: var(--primary-text)">Back to login?</el-link>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { Lock } from '@element-plus/icons-vue'
</script>

<style scoped>
.forget-pass {
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1em;

  position: relative;
  background-color: var(--primary-background);
}
.bg-photo {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* z-index: -1; */
}

.el-form {
  width: 700px;
  z-index: 1000;
}
:deep(.el-input__icon) {
  color: var(--primary-text) !important;
}

:deep(.el-input__inner::placeholder) {
  color: var(--primary-text) !important;
}
:deep(.el-button) {
  color: var(--primary-text) !important;
  height: 50px;
}
</style>
