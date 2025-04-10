<template>
  <el-header class="nav-bar">
    <div class="nav-links">
      <el-button type="success" plain @click="drawer = true">
        Add New Student
      </el-button>
      <el-button type="danger" plain @click="goHome">Logout</el-button>
    </div>
  </el-header>

  <hr />

  <el-drawer
    v-model="drawer"
    :with-header="false"
    :style="{ 'min-width': '400px' }"
    @closeDrawer="drawer = false"
  >
    <drawerForm @closeDrawer="drawer = false" />
  </el-drawer>
</template>

<script lang="ts" setup>
import drawerForm from "@/components/drawerForm.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ElNotification } from "element-plus";
import { useFormStore } from "@/stores/useFormStore";

const formStore = useFormStore();
const drawer = ref(false);
const router = useRouter();

// REDIRECT TO LOGIN PAGE
const goHome = () => {
  const confirmation: boolean = window.confirm(
    "Are you sure you want to log out?"
  );
  if (!confirmation) return; // If the user cancels, do nothing
  formStore.logout(); // Reset authentication state
  ElNotification({
    title: "Logged Out",
    message: "You have successfully logged out.",
    type: "info",
  });
  router.push("/"); // Redirect to the login page
};
</script>

<style scoped>
.nav-bar {
  height: 60px;
}

.el-button {
  padding: 10px;

  border-radius: 4px;
}

.el-button:hover {
  color: white;
  font-weight: 600;
}

.addBtn:hover {
  background-color: white;
  color: black;
}
</style>
