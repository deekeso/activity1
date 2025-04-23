<!--
  Register.vue - View Student Information & Register Student

  Overview:
  * Register student information
  
  Features:
  * Register student information
  * Uses Card & Card Carousel components
  * Uses StudentStore for managing student data
-->

<template>
  <section
    style="height: 80vh"
    class="justify-content-center flex-column align-items-center"
  >
    <!-- Header -->
    <el-row style="width: 70%" class="pb-2">
      <el-col
        justify="start"
        :xs="{ span: 24, offset: 0 }"
        :sm="{ span: 12, offset: 6 }"
        :xl="{ span: 12 }"
        class="header-sm"
      >
        <span class="fs-1 text-primary fw-bold">Student Accounts</span>
      </el-col>
      <el-col :span="9" justify="end">
        <span class="fs-3 fw-bold text-primary"></span>
      </el-col>
    </el-row>

    <!-- Carousel -->
    <el-row justify="center" align="middle" class="w-70">
      <CardCarousel
        @edit-student="handleEditStudent"
        @delete-student="handleDeleteStudent"
      />
    </el-row>

    <el-row class="pt-1 footer-cont">
      <!-- Student Accounts -->
      <el-col
        :xs="{ span: 24 }"
        :sm="{ span: 24 }"
        :xl="{ span: 12 }"
        v-if="students.length"
      >
        <p class="fs-7 total-count d-flex justify-content-center">
          Total student registered:
          <span class="fw-bold text-primary total-count-no">
            {{ students.length }}
          </span>
        </p>
      </el-col>

      <!-- Button -->
      <el-col
        :span="students.length ? 12 : 24"
        :xs="{ span: 24 }"
        :sm="{ span: 24 }"
        :xl="{ span: 3 }"
        :class="
          students.length
            ? 'd-flex align-end pt-1 orig-state-container'
            : 'd-flex justify-content-center emp-state-container'
        "
      >
        <Button
          type="primary"
          customClass="blue-btn create-btn"
          icon="CirclePlus"
          iconPosition="left"
          iconClass="mr-1"
          @click="openDrawer"
          :class="
            students.length ? 'orig-state-create-btn' : 'empty-state-create-btn'
          "
        >
          Register Student
        </Button>
      </el-col>
    </el-row>
  </section>

  <!-- Drawer -->
  <!-- Passes different forms to the Drawer component -->
  <Drawer>
    <StudentInfoForm v-if="currentForm === 'studentForm'" />
    <CredentialsForm v-if="currentForm === 'credentialsForm'" />
  </Drawer>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import eventBus from "@/event-bus";
import { useStudentStore } from "@/store/useStudentStore";

const currentForm = ref("studentForm"); // Reactive variable for the current form
const studentStore = useStudentStore(); // Accessing the student store
const students = ref(studentStore.students); // Reactive reference to the list of students

// Function: Opening the Drawer
const openDrawer = () => {
  eventBus.emit("open-drawer");
};

// Function: Edit student information
const handleEditStudent = (studentId: number) => {
  const student = studentStore.students.find((s) => s.id === studentId);
  if (student) {
    studentStore.setStudent(student);
    openDrawer();
  }
};

// Function: Delete student information
const handleDeleteStudent = (studentId: number) => {
  const index = studentStore.students.findIndex((s) => s.id === studentId);
  if (index !== -1) {
    studentStore.deleteStudent(index);
  }
};
</script>

<style scoped>
.total-count-no {
  padding-left: 5px !important;
}
</style>
