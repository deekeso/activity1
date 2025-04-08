<template>
  <div id="forgotpass-view">
    <main>
      <el-form>
        <el-form-item>
          <el-input
            :prefix-icon="User"
            placeholder="Enter your email"
            clearable
            v-model="email"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">Send a code</el-button>
        </el-form-item>
        <div class="link-container">
          <el-link>Didn't receive code?</el-link>
          <el-link @click="goToLogin">Back to login</el-link>
        </div>
      </el-form>
    </main>
  </div>
</template>

<script setup lang="ts">
import { User } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToLogin = () => {
  router.push({ name: 'home' })
}

const email = ref('')
</script>

<style scoped>
* {
  font-family: 'Montserrat', sans-serif;
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

.el-input {
  width: 100%;
  height: 55px;
  font-size: 16px;
  border: none;
}

.el-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 90%;
  max-width: 700px;
}

.el-button {
  width: 100%;
  height: 55px;
}

.el-link {
  color: white;
}

.link-container {
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: space-between;
}
</style>
