<!--
  Header.vue - Header for authenticated users

  Overview:
  * Uses useLogout to handle authentication
  
-->

<template>
  <el-row justify="start" align="middle" class="pt-1">
    <el-col
      :xs="{ span: 24, offset: 10 }"
      :sm="{ span: 7, offset: 3 }"
      :md="{ span: 12, offset: 1 }"
      :lg="{ span: 7, offset: 1 }"
      :xl="{ span: 3, offset: 0 }"
    >
      <Button
        type="default"
        size="small"
        customClass=""
        @click="showLogOutModal"
      >
        Logout
      </Button>
    </el-col>
  </el-row>

  <Modal
    v-model="logoutModalVisible"
    type="warning"
    label="Log Out?"
    desc="Are you sure you want to log out?"
    :handleButtonFunc="confirmLogOut"
    confirmButtonLabel="Log Out"
  />
</template>

<script setup>
import { ref } from "vue";
import { useLogout } from "@/composables/auth/useLogout";

const logoutModalVisible = ref(false);
const { logout: handleLogout } = useLogout();

const showLogOutModal = () => {
  logoutModalVisible.value = true;
};

const confirmLogOut = () => {
  handleLogout();
};
</script>
