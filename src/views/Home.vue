<!-- src/views/Home.vue -->
<template>
  <div class="landing-container">
    <!-- Header Section -->
    <el-row justify="space-between" align="middle" class="header">
      <el-col :xs="12" :sm="8" :md="6">
        <h1 class="title">Home</h1>
      </el-col>
      <el-col :xs="12" :sm="8" :md="6" class="login-link">
        <router-link to="/login">
          <el-button type="primary" round>Login</el-button>
        </router-link>
      </el-col>
    </el-row>

    <!-- Hero Section -->
    <el-row justify="center" align="middle" class="hero">
      <el-col :xs="20" :sm="16" :md="12" class="text-center">
        <el-text tag="h2" class="hero-title"> Student Registration </el-text>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ElRow, ElCol, ElButton, ElText } from "element-plus";
</script>

<style scoped>
.landing-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #e0f7fa 0%, #80deea 100%);
  padding: 20px;
}

.header {
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  margin-bottom: 40px;
}

.title {
  font-size: 2rem;
  color: #409eff;
  margin: 0;
}

.login-link {
  text-align: right;
}

/* Hero Section */
.hero {
  min-height: 60vh;
  display: flex;
  align-items: center;
}

.text-center {
  text-align: center;
}

.hero-title {
  font-size: 2.5rem;
  color: #262626;
  margin-bottom: 20px;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #606266;
}

@media (max-width: 768px) {
  .title {
    font-size: 1.5rem;
  }

  .hero-title {
    font-size: 1.8rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .login-link {
    text-align: center;
    margin-top: 10px;
  }
}

@media (max-width: 480px) {
  .header {
    padding: 10px;
  }

  .title {
    font-size: 1.2rem;
  }

  .hero-title {
    font-size: 1.5rem;
  }

  .hero-subtitle {
    font-size: 0.9rem;
  }
}
</style>
