<script setup lang="ts">
import { Tools } from '@element-plus/icons-vue'
</script>

<template>
  <el-header>
    <h1>Welcome Back, Rogel!</h1>
    <el-dropdown>
      <el-button type="text" style="color: white">
        Settings<el-icon class="el-icon--right" :size="20" style="padding-left: 5px; color: white"
          ><Tools
        /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu class="dropdown-list">
          <el-dropdown-item>Dark Mode</el-dropdown-item>
          <el-dropdown-item>Logout</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-header>
</template>

<style scoped>
.el-header {
  background-color: rgb(63, 62, 62);
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 8%;
  padding-right: 8%;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
