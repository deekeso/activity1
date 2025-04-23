<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { Avatar, Search, Plus, ArrowDownBold, User, CollectionTag } from '@element-plus/icons-vue'
import BackgroundSvgs from '@/components/BackgroundSvgs.vue'
import { useAuthStore } from '@/stores/authentication'
import { useStudentStore } from '@/stores/student'
import StudentModalForm from '@/components/StudentModalForm.vue'
import StudentCard from '@/components/StudentCard.vue'
import type { Student } from '../types/CommonModels'
import { useStudentSearch } from '@/composables/useSearchQuery'
const courses = [
  'Bachelor of Science in Information Technology',
  'Bachelor of Science in Computer Science',
  'Bachelor of Science in Tourism',
  'Bachelor of Science in Hotel and Restaurant Management',
  'Bachelor of Science in Nursing',
]
const authStore = useAuthStore()
const studentStore = useStudentStore()
const modalRef = ref<{ openDialog: (student?: Student) => void } | null>(null) // Function to open the child modal
const openChildModal = () => {
  // Call the `openDialog` method exposed by the child
  modalRef.value?.openDialog()
}

// Set the default value to "All Courses"
const filterCourse = ref('All Courses')

// Search student query
const searchStudentQuery = ref('')

// Correctly use the composable with the students ref
const filteredStudents = computed(() =>
  useStudentSearch(ref(studentStore.students), searchStudentQuery, filterCourse),
)

// Stats computed properties to show actual counts
const totalStudents = computed(() => studentStore.students.length)
const totalCourses = computed(() => courses.length)
onMounted(() => {
  studentStore.loadStudents()
})

const currentPage = ref(1)
const pageSize = ref(12)
const totalPages = computed(() => Math.ceil(filteredStudents.value.length / pageSize.value))
const paginatedStudents = computed(() => {
  const totalFilteredStudents = filteredStudents.value
  const start = (currentPage.value - 1) * pageSize.value
  const end =
    currentPage.value < totalPages.value ? start + pageSize.value : totalFilteredStudents.length

  return totalFilteredStudents.slice(start, end)
})

const handlePageChange = (page: number) => {
  currentPage.value = page
}

const handleCourseSelect = (course: string) => {
  filterCourse.value = course
  // Reset to first page when course changes
  currentPage.value = 1
}

const handleEditStudent = (student: Student) => {
  modalRef.value?.openDialog(student)
}
</script>

<template>
  <BackgroundSvgs />
  <div class="container">
    <header class="header-container">
      <h1 class="title">Student Registration System</h1>

      <div class="stats-container">
        <div class="stats">
          <el-tooltip :content="`Student Count: ${totalStudents}`" placement="bottom">
            <div class="students-count">
              <el-icon :size="20" style="margin-right: 5px"><User /></el-icon>
              <p>{{ totalStudents }}</p>
            </div>
          </el-tooltip>
        </div>
        <div class="stats">
          <el-tooltip :content="`Course Count: ${totalCourses}`" placement="bottom">
            <div class="courses-count">
              <el-icon :size="20" style="margin-right: 5px"><CollectionTag /></el-icon>
              <p>{{ totalCourses }}</p>
            </div>
          </el-tooltip>
        </div>
      </div>
    </header>

    <div class="actions-container">
      <el-input
        class="action-search"
        type="text"
        placeholder="Search..."
        :prefix-icon="Search"
        v-model="searchStudentQuery"
        clearable
      />
      <div class="filter-container">
        <el-dropdown trigger="click" class="filter-dropdown">
          <span class="el-dropdown-link">
            <span class="dropdown-text">{{ filterCourse }}</span>
            <el-icon class="dropdown-icon">
              <ArrowDownBold />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleCourseSelect('All Courses')"
                >All Courses</el-dropdown-item
              >
              <el-dropdown-item
                v-for="course in courses"
                :key="course"
                @click="handleCourseSelect(course)"
              >
                {{ course }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="add-btn-container">
        <el-button class="add-btn" type="primary" @click="openChildModal">
          <el-icon style="margin-right: 10px" :size="20">
            <Plus />
          </el-icon>
          Add New Student
        </el-button>
        <el-popconfirm
          title="Are you sure you want to logout?"
          width="200"
          placement="bottom-end"
          hide-icon
        >
          <template #reference>
            <el-button type="danger" class="add-btn">
              <el-icon style="margin-right: 10px" :size="20">
                <Avatar />
              </el-icon>
              Logout
            </el-button>
          </template>

          <template #actions="{ cancel }">
            <div style="display: flex; justify-content: center; gap: 8px">
              <el-button type="danger" size="small" @click="authStore.handleLogout">
                Confirm
              </el-button>
              <el-button size="small" @click="cancel">Cancel</el-button>
            </div>
          </template>
        </el-popconfirm>
      </div>
    </div>

    <div class="results-info" v-if="filteredStudents.length !== totalStudents">
      <p>Showing {{ filteredStudents.length }} of {{ totalStudents }} students</p>
    </div>
    <div class="content-container">
      <el-row :gutter="10" type="flex" justify="start">
        <el-col
          v-for="student in paginatedStudents"
          style="margin-top: 10px"
          :key="student.id"
          :span="6"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
          :xl="4"
        >
          <StudentCard :student="student" @edit="handleEditStudent" />
        </el-col>

        <!-- Add placeholder blocks to fill the row -->
        <el-col
          v-for="i in paginatedStudents.length % 4 === 0 ? 0 : 4 - (paginatedStudents.length % 4)"
          :key="`placeholder-${i}`"
          :span="6"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
          :xl="4"
        >
          <div class="card-placeholder"></div>
        </el-col>
      </el-row>

      <div
        style="
          width: 100%;
          display: flex;
          justify-content: center;
          margin-left: auto;
          margin-right: auto;
          margin-top: 3%;
        "
      >
        <el-pagination
          layout="prev, pager, next"
          :total="filteredStudents.length"
          :page-size="pageSize"
          :current-page="currentPage"
          @current-change="handlePageChange"
          :pager-count="5"
          :background="true"
        />
      </div>
    </div>
    <StudentModalForm ref="modalRef" />
  </div>
</template>

<style scoped>
.card-placeholder {
  height: 100%;
  /* Optional: Add some styling to make the placeholder visible or invisible as needed */
}
.container {
  max-width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow: auto;
}
.content-container {
  margin-top: 30px;
  padding: 20px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(50px) saturate(800%);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 750px;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.stats-container {
  display: flex;
}

.stats {
  margin-right: 20px;
  display: flex;
}
.students-count {
  display: flex;
  margin: 10px;
  align-items: center;
  flex-direction: row;
}

.courses-count {
  display: flex;
  margin: 10px;
  align-items: center;
  flex-direction: row;
}
.actions-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
  flex-wrap: wrap;
  gap: 16px;
}

.action-search {
  flex: 2;
  height: 40px;
  min-width: 100px;
  max-width: 400px;
}

:deep(.el-input__wrapper) {
  border-radius: 5px;
}

.filter-container {
  display: flex;
}

.filter-dropdown {
  flex: 1;
  background-color: white;
  min-height: 30px;
  border-radius: 3px;
  height: 40px;
  padding: 0 10px;
  cursor: pointer;
  min-width: 400px;
  color: var(--primary-color);
}

.el-dropdown-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 30px;
}

.dropdown-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 10px;
}

.dropdown-icon {
  flex-shrink: 0;
}

.add-btn-container {
  margin-left: auto; /* Ensures the button is pushed to the end */
  display: flex;
  gap: 16px;
}

.add-btn {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  border-radius: 5px;
}
:deep(.el-input__wrapper) {
  border-radius: 5px;
}

.filter-container {
  display: flex;
}

.filter-dropdown {
  flex: 1;
  background-color: white;
  min-height: 30px;
  border-radius: 3px;
  height: 40px;
  border-radius: 5px;
  padding: 0 10px;
  cursor: pointer;
  min-width: 400px;
  color: var(--primary-color);
}

.el-dropdown-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 30px;
}

.dropdown-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 10px;
}

.dropdown-icon {
  flex-shrink: 0;
}
.add-btn-container {
  margin-left: auto; /* Pushes the container to the end */
  display: flex;
  gap: 16px; /* Space between buttons */
  align-items: center; /* Align buttons properly */
}

.add-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  border-radius: 5px;
}

.results-info {
  margin-top: 20px;
  font-size: 0.9rem;
  color: white;
}

.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 5px;
  margin-top: 20px;
  height: 100%;
}

.student-card {
  transition: transform 0.2s;
}

/* Add these styles to your CSS */
.student-card {
  display: flex;
  flex-direction: column;
  height: 100%; /* Make the card take full height of its container */
}
.card-contain-container {
  margin-top: 30px;
  padding: 20px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(50px) saturate(800%);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between; /* Keeps content and pagination spaced */
}
:deep(.el-card__body) {
  flex: 1; /* Make the body take up all available space */
  display: flex;
  flex-direction: column;
  min-height: 120px; /* Set a minimum height - adjust as needed */
}

:deep(.el-card__footer) {
  padding: 4px !important;

  margin-top: auto; /* Push the footer to the bottom */
}

.card-container > * {
  height: 300px; /* Set a consistent height for all cards - adjust as needed */
}
.no-results {
  grid-column: 1 / -1;
  text-align: center;
  padding: 40px;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-top: 20px;
}
:deep(.el-button__prefix) {
  color: white;
}

/* Media queries for responsive design */
@media (max-width: 992px) {
  .container {
    max-width: 95%;
  }

  .header-container {
    flex-direction: column;
    text-align: center;
  }

  .stats-container {
    margin-top: 16px;
    justify-content: center;
  }

  .actions-container {
    flex-direction: column;
  }

  .action-search,
  .filter-container,
  .add-btn-container {
    width: 100%;
  }

  .filter-dropdown {
    min-width: 100%;
  }

  .action-search {
    order: 1;
    max-width: 100%;
  }

  .filter-container {
    order: 2;
  }

  .add-btn-container {
    order: 3;
    margin-top: 8px;
    max-width: 100%;
  }
}

/* Small screens adjustments */
@media (max-width: 576px) {
  .container {
    padding: 10px;
    max-width: 100%;
    height: 100%;
  }

  .card-container {
    grid-template-columns: 1fr;
  }
}
</style>
