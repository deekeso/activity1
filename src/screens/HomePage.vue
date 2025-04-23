<script setup lang="ts">
import vector from '../assets/vector.png'
import circle1 from '../assets/circle1.png'
import circle2 from '../assets/circle2.png'
import circle3 from '../assets/circle3.png'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import StudentCards from '@/components/StudentCards.vue'
import { useStudentsStore } from '@/stores/studentStore'

const studentsStore = useStudentsStore()
const students = ref(studentsStore.students)

watch(
  () => studentsStore.students,
  (newStudents) => {
    students.value = newStudents
  },
)
</script>
<template>
  <div
    style="
      height: 100vh;
      background-color: #2148c0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    "
  >
    <!-- here -->
    <el-scrollbar
      style="
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 100px;
      "
    >
      <el-row
        :gutter="20"
        style="
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
        "
      >
        <StudentCards v-for="student in students" :key="student.id" :student="student" />
      </el-row>
    </el-scrollbar>
  </div>
  <div class="image-container">
    <el-image :src="vector" class="vector-image" />
    <el-image :src="circle3" class="circle3-image" />
    <el-image :src="circle2" class="circle2-image" />
    <el-image :src="circle1" class="circle1-image" />
  </div>
</template>

<style scoped>
.images {
  position: relative;
}
</style>
