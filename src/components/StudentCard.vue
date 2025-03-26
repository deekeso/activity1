<script setup lang="ts">
import {
  Calendar,
  User,
  Location,
  School,
  Edit,
  Delete,
} from "@element-plus/icons-vue";

import { useStudentsStore } from "../stores/studentsStore";

const studentsStore = useStudentsStore;

const { students, deleteStudent } = studentsStore();
</script>

<template>
  <el-row :gutter="20" class="card-container">
    <el-col
      v-for="student in students"
      :key="student.id"
      :xs="24"
      :sm="12"
      :md="8"
      :lg="6"
    >
      <el-card class="card-item" style="max-width: 480px">
        <template #header>
          <div class="card-header">
            <span
              >{{ student.firstName }} {{ student.middleName }}
              {{ student.lastName }} {{ student.id }}</span
            >
            <div>
              <el-button size="small" type="primary" :icon="Edit" />
              <el-button
                size="small"
                type="primary"
                :icon="Delete"
                @click="deleteStudent(student.id)"
              />
            </div>
            <!-- <Edit style="width: 1em; height: 1em; margin-right: 8px" /> -->
          </div>
        </template>
        <div class="card-content">
          <div class="info-item">
            <el-icon><Calendar /></el-icon>
            <span>Born: {{ student.birthDate }}</span>
          </div>
          <div class="info-item">
            <el-icon><User /></el-icon>
            <span>Age: {{ student.age }}</span>
          </div>
          <div class="info-item">
            <el-icon><Location /></el-icon>
            <span>{{ student.address }}</span>
          </div>
          <div class="info-item">
            <el-icon><School /></el-icon>
            <span>{{ student.course }}</span>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped>
.card-item {
  margin-bottom: 20px;
  border-radius: 8px;
  transition: all 0.3s;
}

.card-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}

:deep(.el-card__body) {
  padding: 10px;
}

.card-item:hover {
  transform: translateY(-5px);
}

.card-content {
  padding: 0 15px;
}

.info-item {
  display: flex;
  align-items: center;
  margin: 10px 0;
  color: #606266;
  gap: 5px;
}

.info-item .el-icon {
  margin-right: 8px;
  color: #409eff;
}
</style>
