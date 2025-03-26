<script setup lang="ts">
import StudentCard from "../components/StudentCard.vue";
import StudentForm from "../components/StudentForm.vue";

import { useAuthStore } from "../stores/authStore";

const useAuth = useAuthStore;

const { logout, getUser } = useAuth();
</script>

<template>
  <el-menu class="el-menu" mode="horizontal" :ellipsis="false">
    <el-text class="mx-1" size="large">
      Welcome
      <span class="username">{{ getUser()?.username.toUpperCase() }}</span
      >!
    </el-text>
    <div class="flex-grow" />
    <el-menu-item>
      <el-button @click="logout" type="primary" round>Logout</el-button>
    </el-menu-item>
  </el-menu>
  <StudentForm />
  <StudentCard />
</template>

<style scoped>
.el-menu {
  padding-inline: 20px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.flex-grow {
  flex-grow: 1;
}

.username {
  color: rgb(13, 112, 224);
}

.card-container {
  padding: 10px;
}

:deep(.el-menu-item):hover {
  background-color: transparent !important;
}
</style>
