<script setup lang="ts">
import { getStudents, SearchStudents } from '@/composables/useUser'
import { useStudentStore } from '@/stores'
import { Close, Search } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
import AddStudent from '../AddStudent.vue'

const addDrawer = ref(false)

const search = ref<string>('')

watch(search, () => {
  if (search.value) {
    SearchStudents(search.value)
  } else {
    getStudents()
  }
})

const handleReset = async () => {
  try {
    search.value = ''
    await getStudents()
  } catch (e) {
    console.log(e)
  }
}

const handleCloseDrawer = () => {
  addDrawer.value = !addDrawer.value
}
</script>

<template>
  <el-main>
    <el-scrollbar>
      <div class="main-header">
        <el-input style="" v-model="search">
          <template #prefix>
            <el-icon size="25" class="el-input__icon"><Search /></el-icon>
          </template>
          <template #suffix>
            <el-icon @click="handleReset" size="25" class="el-input__icon close-icon"
              ><Close
            /></el-icon>
          </template>
        </el-input>
        <el-button
          @click="handleCloseDrawer"
          style="margin: 0; height: 45px"
          type="primary"
          size="large"
          >Add</el-button
        >
      </div>
      <div
        class="student-lists"
        v-if="useStudentStore().getSearchLoading || useStudentStore().getFetchLoading"
      >
        <el-icon size="30" class="is-loading">
          <Loading />
        </el-icon>
      </div>
      <div v-else-if="useStudentStore().getStudents.length > 0" class="student-lists">
        <StudentCard v-for="student in useStudentStore().getStudents" :student :key="student.id" />
      </div>

      <div v-else class="student-lists">
        <el-text style="color: var(--secondary-text); font-size: 20px" size="large"
          >No student records found.</el-text
        >
      </div>
    </el-scrollbar>
  </el-main>
  <AddStudent :add-drawer="addDrawer" @handle-close="handleCloseDrawer" />
</template>

<style scoped>
* {
  /* color: black !important; */
  /* border: 1px solid red; */
}

.el-main {
  background: var(--primary-text);
  border-radius: 1em;
  padding: 0;
}

.main-header {
  height: 70px;
  border-bottom: 1px solid var(--primary-border);
  box-shadow: 0 5px 5px 0 var(--primary-shadow);

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1em;
  gap: 4px;
}

.student-lists {
  width: 100%;
  height: 100%;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  gap: 1em;
  padding: 1em;
}

.close-icon:hover {
  scale: 1.1;
  cursor: pointer;
}

::v-deep(.el-input__icon, .el-icon) {
  color: var(--secondary-text);
}
</style>
