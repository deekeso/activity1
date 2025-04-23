<!--
  Carousel.vue - UI Component

  Features:
  - Displays a carousel of cards.
  - Allows scrolling through the carousel.
  - Handles edit and delete actions for each data.

  Props:
  * students: Array<Student>      List of student objects to display.
-->

<template>
  <div class="carousel-container">
    <!-- Previous Button -->
    <button class="prev" @click="scrollLeft">
      <el-icon class="hover-opacity-50"><ArrowLeftBold /></el-icon>
    </button>
    <!-- Carousel Body -->
    <div class="carousel" ref="carousel">
      <Card
        v-for="(student, index) in students"
        :key="index"
        :id="student.id"
        :firstName="student.firstName"
        :middleName="student.middleName"
        :lastName="student.lastName"
        :birthdate="student.birthdate"
        :address="student.address"
        :course="student.course"
        @edit-student="handleEditStudent"
        @delete-student="handleDeleteStudent"
        :class="['card', { single: students.length === 1 }]"
      />
    </div>
    <!-- Previous Button -->
    <button class="next" @click="scrollRight">
      <el-icon class="hover-opacity-50"><ArrowRightBold /></el-icon>
    </button>
  </div>

  <!-- Empty State -->
  <section v-if="!students.length">
    <img
      v-if="!students.length"
      src="@/assets/img/empty-state/no-data.gif"
      alt="No data"
      class="no-data-image"
    />
    <h1 class="fw-normal text-center">No students are currently registered.</h1>
  </section>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from "vue";
import { useStudentStore } from "@/store/useStudentStore";

const studentStore = useStudentStore();
const students = ref(studentStore.students);
const carousel = ref(null);

// Function: Left scroll of the carousel
const scrollLeft = async () => {
  const carouselElement = carousel.value;
  carouselElement.scrollBy({ left: -300, behavior: "smooth" });
};

// Function: Right scroll of the carousel
const scrollRight = async () => {
  const carouselElement = carousel.value;
  carouselElement.scrollBy({ left: 300, behavior: "smooth" });
};

// Emit events: Editing and deleting students
const emit = defineEmits(["edit-student", "delete-student"]);
const handleEditStudent = (studentId) => {
  emit("edit-student", studentId);
};

const handleDeleteStudent = (studentId) => {
  emit("delete-student", studentId);
};

// Fetch students on component mount
onMounted(async () => {
  await studentStore.readStudents();
  students.value = studentStore.students;
});

// Watch: Changes in the student store and update the local students array
watch(
  () => studentStore.students,
  async (newStudents) => {
    students.value = newStudents;
  }
);
</script>

<style scoped>
.carousel-container {
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: 70vw;
  overflow: hidden;
  position: relative;
  overflow-y: hidden;
}

.carousel {
  display: flex;
  overflow-x: hidden;
  scroll-snap-type: x mandatory;
  gap: 10px;
  width: 100%;
}

.card {
  flex: 1 0 calc(33.33% - 10px);
  scroll-snap-align: start;
  transition: transform 0.3s ease;
}

.card.single {
  flex: 1 0 100%;
}

button.prev,
button.next {
  border: none;
  background-color: #fff;
  cursor: pointer;
  padding: 12px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  width: auto;
  height: auto;
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  color: #2148c0;
}

button.prev {
  left: 10px;
}

button.next {
  right: 10px;
}

.carousel-container::before,
.carousel-container::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 130px;
  pointer-events: none;
  z-index: 1;
  /* display: none; */
}

.carousel-container::before {
  left: 0;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0)
  );
}

.carousel-container::after {
  right: 0;
  background: linear-gradient(
    to left,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0)
  );
}

.carousel-container.show-overflow::before,
.carousel-container.show-overflow::after {
  display: block;
}

.el-card.is-always-shadow,
.el-card.is-hover-shadow:focus,
.el-card.is-hover-shadow:hover {
  box-shadow: none;
}
</style>
