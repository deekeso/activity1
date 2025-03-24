<script lang="ts" setup>
import AddButton from '@/components/addBtn.vue'
import { Tools } from '@element-plus/icons-vue'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  {{ isDark }}
  <div class="studentList-page">
    <main>
      <el-container>
        <el-header>
          <h1>Welcome Back, Rogel!</h1>
          <el-dropdown>
            <el-button type="text" style="color: white">
              Settings<el-icon
                class="el-icon--right"
                :size="20"
                style="padding-left: 5px; color: white"
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
        </el-header>
      </el-container>
      <h1 class="title">Student List</h1>
      <AddButton />
      <div class="card-container">
        <el-row>
          <el-col :span="6">
            <el-card>
              <p>Student ID: 1</p>
              <p>Name: Rogel R. Gerodiaz</p>
              <p>Birthdate: 06/10/2001</p>
              <p>Age: 23</p>
              <p>Address: Laspinas City</p>
              <p>Course: BSIT</p>
              <p></p>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </main>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  list-style: none;
}

.el-button {
  background-color: transparent;
  border: none;
}

.el-button:hover {
  scale: 1.1;
  cursor: pointer;
}

.el-dropdown {
  background-color: transparent;
}

.dropdown-list {
  display: flex;
  flex-direction: column;
}

ul {
  display: flex;
  gap: 20px;
}

.card-container {
  padding: 40px;
}

.title {
  text-align: center;
  margin-top: 20px;
}

.el-header {
  background-color: rgb(63, 62, 62);
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
}

.el-header ul li:hover {
  cursor: pointer;
  color: rgb(217, 233, 73);
}
</style>
