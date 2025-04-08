<template>
  <el-header class="nav-bar">
    <div class="nav-links">
      <el-button class="addBtn" type="primary" @click="drawer = true">
        Add New Student
      </el-button>
      <el-button class="logout" @click="goHome">Logout</el-button>
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
.addBtn {
  background-color: #52be5b;
  border-radius: 10px;
}

.addBtn:hover {
  background-color: white;
  color: black;
}
</style>
