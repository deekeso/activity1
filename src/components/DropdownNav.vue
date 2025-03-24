<script setup lang="ts">
import { Tools } from '@element-plus/icons-vue'
import { useDark, useToggle } from '@vueuse/core'
// import { Moon } from '@element-plus/icons-vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <el-dropdown>
    <el-button type="text" style="color: white">
      Settings<el-icon class="el-icon--right" :size="20" style="padding-left: 5px; color: white"
        ><Tools
      /></el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu class="dropdown-list">
        <el-dropdown-item @click="toggleDark">Dark Mode</el-dropdown-item>
        <el-dropdown-item>Logout</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped>
.el-button {
  background-color: transparent;
  border: none;
}

.el-button:hover {
  scale: 1.1;
  cursor: pointer;
}
</style>
