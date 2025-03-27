<template>
  <h1 style="margin-top: 20px; margin-bottom: 30px">Student Information</h1>
  <div class="buttonContainer">
    <el-button type="primary" @click="openDrawer">Add Student</el-button>
    <el-button type="primary" @click="openProfileDialog">Check my Profile</el-button>
  </div>
  <div class="student-grid">
    <el-card v-for="student in filteredStudentList" :key="student.UserName" class="student-card">
      <div class="student-info">
        <div class="avatar-section">
          <el-avatar :size="64" :icon="UserFilled" />
        </div>
        <div class="student-details">
          <div class="name-section">
            <h3>@{{ student.UserName }}</h3>
            <p class="username">{{ student.FirstName }} {{ student.LastName }}</p>
          </div>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">Birthday: </span>
              <span class="value">{{ formatDate(student.Birthday) }}</span>
            </div>
            <div class="info-item">
              <span class="label">Age: </span>
              <span class="value">{{ student.Age }}</span>
            </div>
            <div class="info-item full-width">
              <span class="label">Address: </span>
              <span class="value">{{ student.Address }}</span>
            </div>
            <div class="info-item full-width">
              <span class="label">Course: </span>
              <span class="value">{{ student.Course }}</span>
            </div>
          </div>
        </div>
      </div>
      <el-row>
        <el-col :span="12">
          <el-button
            type="primary"
            text
            :icon="Edit"
            @click="openProfileDrawer(student)"
            style="width: 100%"
          />
        </el-col>
        <el-col :span="12">
          <el-button
            type="danger"
            text
            :icon="Delete"
            @click="deleteStudent(student.UserName)"
            style="width: 100%"
          />
        </el-col>
      </el-row>
    </el-card>
  </div>
  <!-- </el-col> -->
  <!-- </el-row> -->

  <DrawerVuer :isOpen="isDrawerOpen" @closeDrawer="handleCloseDrawer" />
  <OpenProfileDrawer
    :isOpenProfileDrawer="isProfileDrawerOpen"
    :selectedStudent="selectedStudent"
    @ProfilecloseDrawer="handleProfileCloseDrawer"
  ></OpenProfileDrawer>
  <MyProfileDialog
    :isProfileDialogOpen="isDialogOpen"
    @closerProfileDialog="handleDialogCloser"
  ></MyProfileDialog>
</template>

<script setup lang="ts">
import { InputStoreUser } from '@/stores/studentInfo'
import { computed, ref } from 'vue'
import DrawerVuer from './DraweVuer.vue'
import MyProfileDialog from './MyProfileDialog.vue'
import OpenProfileDrawer from './OpenProfileDrawer.vue'
import { Delete, Edit, UserFilled } from '@element-plus/icons-vue'

const inputStore = InputStoreUser()

const studentList = computed(() => inputStore.getAllUser())

const filteredStudentList = computed(() => {
  return studentList.value.filter((student) => student.UserName !== inputStore.currentUser)
})

const isDrawerOpen = ref(false)
const isProfileDrawerOpen = ref(false)
const isDialogOpen = ref(false)
const selectedStudent = ref(null)

const openDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value
  console.log('Open Drawer:', isDrawerOpen.value)
}

const openProfileDrawer = (student) => {
  selectedStudent.value = student
  isProfileDrawerOpen.value = true
  console.log('Open Profile Drawer:', isProfileDrawerOpen.value)
}

const openProfileDialog = () => {
  isDialogOpen.value = !isDialogOpen.value
  console.log('Close Drawer:', isDialogOpen.value)
}

const handleCloseDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value
  console.log('Close Drawer:', isDrawerOpen.value)
}

const handleProfileCloseDrawer = () => {
  isProfileDrawerOpen.value = !isProfileDrawerOpen.value
  console.log('Close Drawer:', isProfileDrawerOpen.value)
}

const handleDialogCloser = () => {
  isDialogOpen.value = !isDialogOpen.value
  console.log('Close Drawer:', isDialogOpen.value)
}

const deleteStudent = (userName: string) => {
  const index = inputStore.users.findIndex((user) => user.UserName === userName)
  if (index !== -1) {
    inputStore.deleteStudent(index)
  }
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>

<style scoped>
h3 {
  text-align: center;
}
.buttonContainer {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.card-content {
  text-align: center;
}

.username {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #303133;
}

.username {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #303133;
  display: inline-block; /* Ensures the text behaves like a block element */
  width: 100%; /* Ensures the container doesn't stretch beyond its space */
  white-space: nowrap; /* Prevents the text from wrapping to the next line */
  overflow: hidden; /* Ensures excess text is hidden */
  text-overflow: ellipsis; /* Adds the ellipsis at the end of the text */
  max-width: 200px; /* You can adjust this width depending on your layout */
}

.address {
  font-size: 1rem;
  color: #606266;
}

.student-container {
  max-width: 1600px;
  margin: 2rem auto;
  padding: 0 2rem;
}

.student-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-top: 40px;
}

.student-card {
  background: white;
  border-radius: 8px;
  transition: all 0.3s ease;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  max-width: 300px;
}

.student-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.student-info {
  padding: 1rem;
}
.avatar-section,
.student-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: left;
}

.username {
  text-align: center;
}

@media (max-width: 1400px) {
  .student-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 1024px) {
  .student-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .student-grid {
    grid-template-columns: 1fr;
  }
  .student-card {
    max-width: 100%;
  }
}
</style>
