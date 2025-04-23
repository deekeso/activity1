<template>
  <div class="card-container">
    <el-button type="primary" @click="openForm" class="add-btn">Add Student</el-button>
    <el-row :gutter="20" v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
      <el-col
        v-for="(student, index) in store.students"
        :key="index"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
        :xl="6"
      >
        <el-card class="student-card" shadow="hover">
          <div class="img-container">
            <img src="../assets/images/icon.jpg" alt="student-icon" class="student-icon" />
          </div>
          <div class="student-container">
            <div class="details">
              <!-- <img src="../assets/images/icon.jpg" alt="student-icon" class="icon" /> -->
              <h2>
                {{ student.firstName }}
                <span v-if="student.middleInitial">{{ student.middleInitial }}.</span>
                {{ student.lastName }}
              </h2>
              <h3>{{ student.course }}</h3>
              <p>{{ student.birthDate }} | {{ student.age }} years old</p>
              <p class="address">
                <Location style="width: 1em; height: 1em; margin-right: 0.2em" />
                {{ student.address }}
              </p>
            </div>
          </div>
          <div class="btn-container">
            <el-button @click="editStudent(student, index)">
              <el-icon><Edit class="edit-icon icon-btn" /></el-icon>
              <span>Edit</span>
            </el-button>
            <el-button type="danger" @click="confirmDelete">
              <el-icon class="edit-icon icon-btn"><Delete /></el-icon>
              <span>Delete</span>
            </el-button>

            <el-dialog v-model="deleteModal" title="Confirm Delete">
              <p>Do you want to continue?</p>

              <el-button @click="deleteModal = false">Cancel</el-button>
              <el-button
                type="danger"
                @click="
                  () => {
                    store.deleteStudent(index)
                    deleteModal = false
                  }
                "
                >Delete</el-button
              >
            </el-dialog>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <StudentForm ref="formRef" @save="saveStudent" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStudentStore } from '../stores/student'
import StudentForm from './StudentForm.vue'

const store = useStudentStore()
const formRef = ref()
const deleteModal = ref(false)
const studentToDelete = ref<number | null>(null)
const count = ref(0)
const load = () => {
  count.value += 2
}

const openForm = () => {
  formRef.value.openDrawer()
}

const editStudent = (student: any, index: number) => {
  formRef.value.openDrawer({ ...student, index })
}

const saveStudent = (student: any) => {
  if (student.index !== undefined) {
    store.updateStudent(student.index, student)
  } else {
    store.addStudent(student)
  }
}

const confirmDelete = (index: number) => {
  deleteModal.value = true
}

const deleteStudent = (index: number) => {
  if (studentToDelete.value !== null) {
    store.deleteStudent(index)
  }
}
</script>

<style>
h2 span {
  font-weight: inherit;
}
h3 {
  font-size: 0.85rem;
}
.add-btn {
  margin-bottom: 10px;
}
.card-container {
  background-color: white;
  padding: 1rem;
  border-radius: 0.2rem;
}
.el-card__body {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.details {
  flex-grow: 1;
}
.btn-container {
  margin-top: auto;
}
.infinite-list {
  height: 80vh;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}

/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: var(--white);
  border-radius: 5px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #4f78ff;
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #7d9cff;
}

.student-icon {
  height: 6rem;
  aspect-ratio: 1;
  border-radius: 100%;
}

.img-container {
  background-color: darkgray;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-block: 0.2rem;
}
.card-container {
  background-color: hsla(0, 0%, 100%, 0.123);
}
</style>
