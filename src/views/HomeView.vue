<script setup lang="ts">
// Import Vue utilities and required components
import { ref } from "vue"; // Provides reactive references and state management
import Drawer from "../components/Drawer.vue"; // Drawer component for adding a new student
import StudentCard from "../components/StudentCard.vue"; // Component to display individual student information
import Filters from "../components/Filters.vue"; // Component for filtering students
import { useStudentStore } from "../store/studentStore"; // Vuex store for managing student data
import { useFilteredStudents } from "../composables/useFilteredStudents.ts"; // Custom composable for filtering students based on criteria
import { useRouter } from "vue-router";
import DialogBox from "../components/DialogBox.vue";

// Define a reactive state for the filter and drawer visibility
const filter = ref("all"); // Reactive state for selected filter, defaults to "all"
const studentStore = useStudentStore(); // Access the student store for state management
studentStore.getStudent(); // Fetch the list of students

const router = useRouter();
const dialogVisible = ref(false); // logout modal state

const { filteredStudents } = useFilteredStudents(filter);

const drawerVisible = ref(false);

// Function to handle closing the Drawer
const handleClose = () => {
  drawerVisible.value = false;
};

// Function to update the filter state dynamically
const updateFilter = (newFilter: string) => {
  filter.value = newFilter;
};

// confirm logout
const confirmLogout = () => {
  router.push("/");
};

// toggle logout modal
const handleLogout = () => {
  dialogVisible.value = true;
};
</script>

<template>
  <div class="common-layout">
    <!-- Header -->
    <header>
      <p>Student Registration</p>

      <div class="nav-util">
        <div class="filter-container">
          <Filters @change-filter="updateFilter" />
        </div>

        <el-button
          style="
            background-color: var(--cta-primary);
            color: var(--neutral-light);
            border: none;
            font-weight: 600;
          "
          @click="
            drawerVisible = true;
            console.log(drawerVisible);
          "
        >
          Add Student
        </el-button>

        <el-button type="danger" @click="handleLogout">Logout</el-button>

        <Drawer
          title="Create New Student"
          :drawerVisible="drawerVisible"
          @handle-close="handleClose"
        />
      </div>
    </header>

    <DialogBox
      :model-value="dialogVisible"
      title="Are you sure to Logout?"
      @confirm="confirmLogout"
      @update:modelValue="dialogVisible = false"
    />

    <!-- Body -->
    <div class="main-wrapper">
      <p>You have {{ studentStore.studentCount }} registered student</p>
      <div class="main">
        <StudentCard
          v-for="student in filteredStudents"
          :key="student.id"
          :student="student"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.common-layout {
  position: relative;
  z-index: 100;
  width: 100%;
  height: 100%;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: auto;
  padding: 1rem 4rem;
}

header p {
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--neutral-light);
  text-transform: uppercase;
  flex-wrap: nowrap;
}

header ul {
  list-style: none;
}

.main-wrapper {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 2rem;
  width: 100%;
  height: 100vh;
  padding: 2rem 4rem;
}

.main-wrapper p {
  color: var(--neutral-light);
  text-transform: capitalize;
  font-weight: 600;
  font-size: 1.2rem;
}

.main {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  width: 100%;
  height: 700px;
  overflow-y: auto;
  padding: 1rem;
}

.filter-container {
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.nav-util {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

@media only screen and (max-width: 1000px) {
  .main {
    grid-template-columns: repeat(3, 1fr);
    height: 700px;
  }
}

@media only screen and (max-width: 880px) {
  .main-wrapper {
    padding: 1rem;
  }

  header {
    flex-direction: column;
    gap: 1rem;
  }

  .filter-container {
    justify-content: center;
  }

  header p {
    font-size: 1rem;
  }

  .nav-util {
    justify-content: center;
    flex-wrap: wrap;
  }
}

@media only screen and (max-width: 810px) {
  .main {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media only screen and (max-width: 650px) {
  .main {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
