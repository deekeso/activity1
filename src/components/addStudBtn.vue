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

  <el-drawer v-model="drawer" :with-header="false">
    <drawerForm />
  </el-drawer>
</template>

<script lang="ts" setup>
import drawerForm from "@/components/drawerForm.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
const drawer = ref(false);

const router = useRouter();

// REDIRECT TO LOGIN PAGE
const goHome = () => {
  router.push("/");
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
