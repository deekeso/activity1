<template>
  <div class="my-background">
    <div class="header">
      <div class="header-container">
        <h1>Student Management System</h1>
        <div class="welcome-message">
          Welcome, {{ currentUser?.firstname }} {{ currentUser?.lastname }}!
        </div>
        <div class="header-actions">
          <el-button type="primary" @click="showDrawer = true">
            Add Student
          </el-button>
          <el-button type="danger" @click="handleLogout"> Logout </el-button>
        </div>
      </div>
    </div>

    <div class="content-container">
      <div
        v-for="course in Object.values(COURSES)"
        :key="course"
        class="course-section"
      >
        <div class="course-header">
          <h2 class="course-title">{{ course }}</h2>
          <div class="student-count">
            Students: {{ getStudentsByCourse(course).length }}
          </div>
        </div>
        <div class="student-grid">
          <StudentCard
            v-for="student in getStudentsByCourse(course)"
            :key="student.id"
            :student="student"
            @edit="handleEdit"
            @delete="handleDelete"
          />
          <div
            v-if="getStudentsByCourse(course).length === 0"
            class="no-students"
          >
            No students enrolled in this course
          </div>
        </div>
      </div>
    </div>

    <el-drawer
      v-model="showDrawer"
      :title="selectedStudent ? 'Edit Student' : 'Add New Student'"
      direction="rtl"
      size="350px"
      :before-close="closeDrawer"
    >
      <StudentForm
        :student="selectedStudent"
        :show-drawer="showDrawer"
        @submit="handleSubmit"
      />
    </el-drawer>

    <!-- Add the logout confirmation dialog -->
    <el-dialog v-model="showLogoutDialog" title="Confirm Logout" width="30%">
      <span>Are you sure you want to log out?</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showLogoutDialog = false">Cancel</el-button>
          <el-button type="danger" @click="confirmLogout">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useRegStore } from "@/stores/RegStore";
import { useStudentStore, COURSES } from "@/stores/StudentStore";
import StudentCard from "@/components/StudentCard.vue";
import StudentForm from "@/components/StudentForm.vue";
import { ElMessage } from "element-plus";

const router = useRouter();
const regStore = useRegStore();
const studentStore = useStudentStore();

const showDrawer = ref(false);
const selectedStudent = ref(null);
const showLogoutDialog = ref(false);

const currentUser = computed(() => regStore.currentUser);

const getStudentsByCourse = (course: string) => {
  return studentStore.students.filter((student) => student.course === course);
};

const handleSubmit = (formData) => {
  if (selectedStudent.value) {
    studentStore.updateStudent(selectedStudent.value.id, formData);
    ElMessage.success("Student updated successfully");
  } else {
    studentStore.addStudent(formData);
    ElMessage.success("Student added successfully");
  }
  closeDrawer();
};

const handleEdit = (student) => {
  selectedStudent.value = { ...student };
  showDrawer.value = true;
};

const handleDelete = (studentId) => {
  studentStore.deleteStudent(studentId);
  ElMessage.success("Student deleted successfully");
};

const handleLogout = () => {
  showLogoutDialog.value = true;
};

const confirmLogout = () => {
  regStore.logoutUser();
  router.push("/LoginPage");
};

const closeDrawer = () => {
  showDrawer.value = false;
  setTimeout(() => {
    selectedStudent.value = null;
  }, 300);
};
</script>

<style scoped>
.my-background {
  background-color: #2148c0;
  background-image: url("../assets/bg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 20px 40px 20px;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(33, 72, 192, 0.95);
  backdrop-filter: blur(10px);
  padding: 20px;
  gap: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.header-container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

.header h1 {
  margin: 0;
  color: white;
  font-size: 32px;
  text-align: center;
}

.welcome-message {
  color: white;
  font-size: 18px;
  margin: 10px 0;
  text-align: center;
}

.header-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.course-section {
  margin-bottom: 40px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.course-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
}

.course-title {
  color: white;
  font-size: 24px;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  display: inline-block;
  text-align: center;
  margin: 0;
}

.student-count {
  color: white;
  font-size: 18px;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  display: inline-block;
}

.student-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  width: 100%;
}

@media (max-width: 1400px) {
  .student-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 1200px) {
  .student-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  .student-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .student-grid {
    grid-template-columns: 1fr;
  }
}

.no-students {
  color: white;
  font-size: 18px;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  display: inline-block;
  text-align: center;
  margin: 0 auto;
  grid-column: 1 / -1;
}

:deep(.el-drawer__header) {
  margin-bottom: 0;
  padding: 20px;
  background: #2148c0;
  color: white;
}

:deep(.el-drawer__body) {
  padding: 0;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  width: 100%;
}

.dialog-footer .el-button {
  flex: 1;
  margin: 0;
}

@media (max-width: 768px) {
  :deep(.el-dialog) {
    width: 95% !important;
    margin: 10px auto !important;
  }

  :deep(.el-dialog__body) {
    padding: 15px !important;
  }

  :deep(.el-dialog__footer) {
    padding: 10px 15px 15px !important;
  }
}

@media (max-width: 480px) {
  :deep(.el-dialog__header) {
    padding: 15px !important;
  }

  :deep(.el-dialog__title) {
    font-size: 16px !important;
  }

  .dialog-footer {
    flex-direction: column-reverse;
    gap: 8px;
  }

  .dialog-footer .el-button {
    width: 100%;
    margin: 0;
  }
}
</style>
