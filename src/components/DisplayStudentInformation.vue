<template>
  <h1 style="margin-top: 20px; margin-bottom: 30px; color: white">Student Information</h1>
  <div class="buttonContainer">
    <el-button type="primary" @click="openDrawer">Add Student</el-button>
    <el-button type="primary" @click="openProfileDialog">Check My Profile</el-button>
  </div>
  <div class="student-grid">
    <el-card v-for="student in filteredStudentList" :key="student.Id" class="student-card">
      <div class="student-info">
        <div class="avatar-section">
          <el-avatar :size="64" :icon="UserFilled" />
        </div>
        <div class="student-details">
          <div class="name-section">
            <p class="username">
              {{ student.FirstName }} {{ formattedMiddleName(student.MiddleName) }}
              {{ student.LastName }}
            </p>
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
            @click="deleteStudent(student.Id)"
            style="width: 100%"
          />
        </el-col>
      </el-row>
    </el-card>
  </div>

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

// Compute student list and filter out the current user
const studentList = computed(() => inputStore.users)
const filteredStudentList = computed(() =>
  studentList.value.filter((student) => student.Id !== inputStore.currentUser),
)

// Modal states
const isDrawerOpen = ref(false)
const isProfileDrawerOpen = ref(false)
const isDialogOpen = ref(false)
const selectedStudent = ref(null)

const formattedMiddleName = (middleName: string) => {
  return middleName ? `${middleName}.` : ''
}

// Methods for modal and user actions
const openDrawer = () => {
  isDrawerOpen.value = true
}

const openProfileDrawer = (student) => {
  selectedStudent.value = student
  isProfileDrawerOpen.value = true
}

const openProfileDialog = () => {
  isDialogOpen.value = true
}

const handleCloseDrawer = () => {
  isDrawerOpen.value = false
}

const handleProfileCloseDrawer = () => {
  isProfileDrawerOpen.value = false
}

const handleDialogCloser = () => {
  isDialogOpen.value = false
}

const deleteStudent = (studentId: string) => {
  const confirmation = confirm('Click OK if you are sure you want to delete a student')

  if (confirmation) {
    inputStore.deleteStudent(studentId)
    alert('Student deleted successfully!')
  } else {
    alert('Student deletion canceled.')
  }
}

// Utility function for formatting dates
import { formatDate } from './composables/global'
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
