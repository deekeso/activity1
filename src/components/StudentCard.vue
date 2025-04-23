<script lang="ts" setup>
import { Edit, Delete } from '@element-plus/icons-vue'
import type { Student } from '@/types/CommonModels'
import { useStudentStore } from '@/stores/student'
import { ElMessageBox, ElMessage } from 'element-plus'
const props = defineProps<{
  student: Student
}>()

const studentStore = useStudentStore()
const emit = defineEmits(['edit'])

const editStudent = () => {
  // Emit an event to the parent to open the edit modal
  emit('edit', props.student)
}
const deleteStudent = () => {
  ElMessageBox.prompt('Please type "Confirm delete" to proceed with deletion.', 'Delete Student', {
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',
    type: 'warning',
    inputPlaceholder: 'Type "Confirm delete"',
    inputValidator: (value) => {
      if (value !== 'Confirm delete') {
        return 'You must type "Confirm delete" to proceed.'
      }
      return true
    },
  })
    .then(() => {
      // Perform the delete operation
      studentStore.deleteStudent(props.student.id)
      ElMessage({
        type: 'success',
        message: 'Student deleted successfully',
      })
    })
    .catch(() => {
      // Operation was canceled
    })
}
function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <el-card class="student-card" shadow="hover">
    <template #header>
      <div class="student-header">
        <div class="student-info">
          <h3 class="student-name">
            {{ student.firstName }}
            <template v-if="student.middleName"> {{ student.middleName }}. </template>
            {{ student.lastName }}
          </h3>
        </div>
      </div>
    </template>

    <div class="student-details">
      <p class="student-detail"><strong>Course:</strong> {{ student.course }}</p>
      <p class="student-detail"><strong>Age:</strong> {{ student.age }}</p>
      <p class="student-detail">
        <strong>Birth Date:</strong> {{ formatDate(student.birthDate.toLocaleString()) }}
      </p>
      <p class="student-detail"><strong>Address:</strong> {{ student.address }}</p>
    </div>

    <template #footer>
      <div class="student-actions">
        <el-button class="action-btn edit" @click="editStudent" type="primary" text>
          <el-icon :size="20"><Edit /></el-icon>
          <div style="margin-left: 10px">Edit</div>
        </el-button>
        <el-button class="action-btn delete" @click="deleteStudent" type="danger" text>
          <el-icon :size="20"><Delete /></el-icon>
          <div style="margin-left: 10px">Delete</div>
        </el-button>
      </div>
    </template>
  </el-card>
</template>

<style scoped>
.student-card {
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  height: 100%;
  display: flex;
  flex-direction: column;
}

:deep(.el-card__header) {
  padding: 15px;
  border-bottom: 1px solid #eee;
}

:deep(.el-card__body) {
  padding: 15px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.student-header {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.student-info {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 0.75rem;
}

.avatar-container {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #f0f0f0;
}

.student-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.student-name {
  margin: 0;
  color: var(--primary-color);
  font-size: 1.2rem;
  text-align: center;
}

.student-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
}

.student-details {
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  flex: 1;
}

.student-details p {
  margin: 0;
  line-height: 1.5;
}

.student-detail {
  min-height: 2rem; /* Ensure uniform height for each detail */
}
</style>
