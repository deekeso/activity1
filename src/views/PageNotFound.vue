<template>
  <div class="not-found-container">
    <el-row justify="center" align="middle" class="full-height">
      <el-col :span="12" class="text-center">
        <h1 class="error-code">404</h1>
        <el-text class="message" size="large">
          Oops! The page you're looking for doesn't exist.
        </el-text>
        <el-button
          type="primary"
          round
          size="large"
          @click="goHome"
          class="return-button"
        >
          Back to Home
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const goHome = () => {
  router.push("/");
};
</script>

<style scoped>
.not-found-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.full-height {
  height: 100vh;
}

.text-center {
  text-align: center;
}

.error-code {
  font-size: 60px;
  font-weight: bold;
  color: #409eff;
  margin: 0;
  line-height: 1;
}

.message {
  color: #606266;
  margin: 20px 0;
  display: block;
}

.return-button {
  margin-top: 20px;
}

@media screen and (min-width: 120px) {
  .error-code {
    font-size: 60px;
  }
}
</style>
