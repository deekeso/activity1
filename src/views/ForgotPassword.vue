<template>
  <el-row justify="center" align="middle" style="height: 80vh">
    <el-col
      :xs="{ span: 15 }"
      :sm="{ span: 15 }"
      :md="{ span: 10 }"
      :lg="{ span: 5 }"
      :xl="{ span: 5 }"
    >
      <!-- Icon -->
      <el-row justify="center" align="middle" class="mb-1">
        <img
          src="@/assets/img/errors/404-error.png"
          alt="No data"
          class="no-data-image"
        />

        <div>
          <p class="fs-7">
            <Button
              customClass="back-btn"
              icon="ArrowLeftBold"
              iconPosition="left"
              iconClass="mr-1"
              @click="goToLogin"
            >
              Back to Log In
            </Button>
          </p>
        </div>
      </el-row>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/useAuthStore";

const router = useRouter();
const authStore = useAuthStore();

const goToLogin = () => {
  router.push("/");
};
</script>
