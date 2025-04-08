<script setup lang="ts">
import { Tools } from '@element-plus/icons-vue'
import AddButton from '@/components/addBtnStudent.vue'
import StudentCard from '@/components/StudentCard.vue'
import { useStudentStore } from '@/stores/PiniaStore'
import { useRouter } from 'vue-router'
import { ElLoading, ElNotification, ElMessageBox } from 'element-plus'
import { markRaw } from 'vue'
import { SwitchButton } from '@element-plus/icons-vue'

const accountStore = useStudentStore()
const router = useRouter()

const handleLogout = () => {
  ElMessageBox.confirm('Are you sure you want to logout it?', 'Logging out', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    icon: markRaw(SwitchButton),
  }).then(() => {
    LoadingScreen()
    setTimeout(() => {
      accountStore.logout()
      router.push({ name: 'home' })
      successNotication()
    }, 2000)
  })
}

//Success Notification Function
const successNotication = () => {
  ElNotification({
    title: 'Logout Success',
    message: 'You have successfully registered',
    type: 'success',
  })
}

const LoadingScreen = () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Logging out...',
    background: 'rgba(0, 0 , 0, 0.7)',
  })
  setTimeout(() => {
    loading.close()
  }, 2000)
}
</script>

<template>
  <div class="studentList-page">
    <main>
      <el-container>
        <el-header>
          <h1>
            Welcome Back,
            {{
              accountStore.authenticatedUser
                ? `${accountStore.authenticatedUser.firstName} ${accountStore.authenticatedUser.lastName}!`
                : 'Guest'
            }}
          </h1>
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
                <el-dropdown-item>Dark Mode</el-dropdown-item>
                <el-dropdown-item @click="handleLogout">Logout</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-header>
      </el-container>
      <section class="studentList-container">
        <h1 class="title">Student List</h1>
        <AddButton />
        <StudentCard />
      </section>
    </main>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.el-header {
  background-color: rgb(63, 62, 62);
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 8%;
  padding-right: 8%;
}

.studentList-container {
  padding-left: 8%;
  padding-right: 8%;
  padding-top: 40px;
}

.title {
  text-align: center;
}

.card-container {
  padding-top: 40px;
}

.el-button {
  background-color: transparent;
  border: none;
}

.el-button:hover {
  scale: 1.1;
  cursor: pointer;
}
</style>
