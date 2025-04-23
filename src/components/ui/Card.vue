<!--
  Card.vue - UI Component

  Features:
  - Displays student information in a card format.
  - Provides edit and delete actions for each student.
  - Shows a confirmation modal before deleting a student.
  - Uses Student interface to define the props
-->

<template>
  <el-card style="max-width: 470px">
    <template #header>
      <!-- Header -->
      <div class="card-header">
        <el-row align="middle">
          <!-- Full Name Container -->
          <el-col :xs="{ span: 10 }" :sm="{ span: 10 }" :xl="{ span: 19 }">
            <span class="fs-3 fw-bold text-primary full-name">
              {{ fullName }}</span
            >
          </el-col>

          <!-- Actions Container -->
          <el-col
            align="end"
            :xs="{ span: 14 }"
            :sm="{ span: 14 }"
            :xl="{ span: 5 }"
          >
            <!-- Edit Button -->
            <el-tooltip content="Edit" placement="top">
              <el-icon
                class="hover-opacity-50 fs-4 text-info mr-1 pe-auto"
                @click="editStudent"
                ><Edit />
              </el-icon>
            </el-tooltip>
            <!-- Delete Button -->
            <el-tooltip content="Delete" placement="top">
              <el-icon
                class="hover-opacity-50 fs-4 text-danger pe-auto"
                @click="showDeleteModal"
                ><Delete />
              </el-icon>
            </el-tooltip>
          </el-col>
        </el-row>
      </div>
    </template>

    <!-- Birthdate -->
    <el-row justify="start" align="middle">
      <el-icon class="hover-opacity-50 fs-4 text-primary mr-1"
        ><Calendar />
      </el-icon>
      {{ formattedBirthdate }}
    </el-row>

    <!-- Age -->
    <el-row justify="start" align="middle" class="pt-1">
      <el-icon class="hover-opacity-50 fs-4 text-primary mr-1"
        ><User />
      </el-icon>
      {{ age }} years old
    </el-row>

    <!-- Address -->
    <section class="pt-1 icon-text-wrapper ellipsis-row">
      <el-icon class="hover-opacity-50 fs-4 text-primary icon mr-1">
        <Location />
      </el-icon>
      <span class="ellipsis-text">{{ props.address }}</span>
    </section>

    <!-- Course -->
    <section class="pt-1 ellipsis-row">
      <el-icon class="hover-opacity-50 fs-4 text-primary mr-1"
        ><School />
      </el-icon>
      <span class="ellipsis-text">{{ props.course }}</span>
    </section>

    <!-- Confirmation Modal -->
    <Modal
      v-model="deleteModalVisible"
      type="delete"
      label="Confirm Deletion"
      desc="Are you sure you want to delete this student?"
      :handleButtonFunc="confirmDelete"
      confirmButtonLabel="Delete"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useInfoFormatter } from "@/composables/format/useInfoFormatter";
import { Student } from "@/interface/Students";
import { useStudentStore } from "@/store/useStudentStore";
import { defineEmits } from "vue";

const studentStore = useStudentStore();

// Define props and emits for the component
const props = defineProps<Student>();
const emit = defineEmits(["edit-student", "delete-student"]);

// Use the infoFormatter to format student details
const { fullName, formattedBirthdate, age } = useInfoFormatter(props);

// Flag for visibility toggling
const deleteModalVisible = ref(false);

// Emit event: Edit the student
const editStudent = () => {
  emit("edit-student", props.id);
};

// Emit event: Confirm the deletion of the student
const confirmDelete = () => {
  emit("delete-student", props.id);
};

// Function: Shows delete modal
const showDeleteModal = () => {
  deleteModalVisible.value = true;
};
</script>
