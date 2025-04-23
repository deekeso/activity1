<template>
  <el-card class="student-card">
    <template #header>
      <div class="card-header">
        <h3>
          {{ student.firstName }}
          {{
            student.middleInitial
              ? `${student.middleInitial.toUpperCase()}.`
              : ""
          }}
          {{ student.lastName }}
        </h3>

        <div class="header-actions">
          <el-button type="primary" @click="$emit('edit', student)" circle>
            <el-icon><Edit /></el-icon>
          </el-button>
          <el-button type="danger" @click="handleDelete" circle>
            <el-icon><Delete /></el-icon>
          </el-button>
        </div>
      </div>
    </template>

    <div class="student-info">
      <p><strong>Birth Date:</strong> {{ formatDate(student.birthDate) }}</p>
      <p><strong>Age:</strong> {{ student.age }}</p>
      <p class="address-info">
        <strong>Address:</strong>
        <span>{{ student.address }}</span>
      </p>
      <p><strong>Course:</strong> {{ student.course }}</p>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { Edit, Delete } from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";

const props = defineProps({
  student: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["edit", "delete"]);

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};

const handleDelete = () => {
  ElMessageBox.confirm(
    "Are you sure you want to delete this student?",
    "Warning",
    {
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      type: "warning",
    }
  )
    .then(() => {
      emit("delete", props.student.id);
    })
    .catch(() => {});
};
</script>

<style scoped>
.student-card {
  background: rgba(255, 255, 255, 0.1) !important;
  border: none !important;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.student-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2) !important;
  background: rgba(255, 255, 255, 0.15) !important;
}

:deep(.el-card__header) {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0;
}

.card-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 15px 20px;
}

.card-header h3 {
  margin: 0;
  color: white;
  font-size: 18px;
  text-align: center;
  width: 100%;
  word-break: break-word;
}

.header-actions {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.student-info {
  display: grid;
  gap: 12px;
  padding: 20px;
  text-align: center;
  flex-grow: 1;
}

.student-info p {
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.student-info strong {
  color: white;
  margin: 0;
}

.student-info .address-info {
  word-break: break-word;
  max-width: 100%;
  overflow-wrap: break-word;
}

:deep(.el-button--primary) {
  background-color: #2148c0;
  border-color: #2148c0;
}

:deep(.el-button--primary:hover) {
  background-color: #1a3a9c;
  border-color: #1a3a9c;
}

:deep(.el-card__body) {
  padding: 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
</style>
