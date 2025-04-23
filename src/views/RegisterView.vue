<template>
  <el-header>
    <h1>Registered Students</h1>
    <el-button @click="logoutModal = true" class="logout-btn">Log Out</el-button>
  </el-header>
  <div class="registration-container">
    <el-drawer v-model="drawerVisible" title="Student Registration">
      <StudentForm :studentData="selectedStudent" @save="addStudent" />
    </el-drawer>

    <div class="student-list">
      <StudentList :students="students" />
    </div>
  </div>
  <ConfirmationModal v-if="logoutModal" @logout="logout" @closeModal="closeModal" />

  <el-alert
    title="Log out successful!"
    description="You'll be redirected in few seconds."
    type="success"
    v-if="logoutAlert"
    class="success-alert"
    :closable="false"
    show-icon
  ></el-alert>
  <el-alert
    title="Duplicate found"
    description="This student is already registered."
    type="error"
    v-if="logoutAlert"
    class="duplicateError"
    :closable="false"
    show-icon
  ></el-alert>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStudentStore } from '../stores/student'
import StudentForm from '../components/StudentForm.vue'
import StudentList from '../components/StudentList.vue'
import { useRouter } from 'vue-router'
import ConfirmationModal from '../components/ConfirmationModal.vue'
// import { ElNotification } from 'element-plus'

const router = useRouter()
const store = useStudentStore()
const drawerVisible = ref(false)
const selectedStudent = ref(null)
const students = computed(() => store.students)
const logoutModal = ref(false)
const logoutAlert = ref(false)

const addStudent = (student) => {
  store.addStudent(student)
  drawerVisible.value = false
}

const closeModal = () => (logoutModal.value = false)
const logout = () => {
  logoutAlert.value = true
  setTimeout(() => {
    localStorage.removeItem('auth') // Remove authentication
    router.push('/') // Redirect to login
  }, 3000)
}
</script>

<style scoped>
.registration-container {
  padding: 20px;
}

.error-alert,
.success-alert {
  width: auto;
  position: absolute;
  top: 0;
  left: 0;
  margin-block: 50px;
  margin-inline: 20px;
  z-index: 100;

  animation: slideIn 0.5s ease, fadeOut 0.5s ease 3s forwards;
}

/* Slide-in effect */
@keyframes slideIn {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Fade-out effect */
@keyframes fadeOut {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}
</style>
