<script setup lang="ts">
import type { TStudent } from '@/types/types'
import { MoreFilled } from '@element-plus/icons-vue'
import { ref } from 'vue'
import UpdateStudent from './UpdateStudent.vue'
import ViewStudent from './ViewStudent.vue'
import { useStudentStore } from '@/stores'
import { deleteStudent } from '@/composables/useUser'
import { imagePhoto } from '@/constant/image'
import { ConfirmBox } from '@/composables/useConfirm'
import { useProperName } from '@/composables/useProperName'

const props = defineProps<{
  student: TStudent
}>()
const updateDrawer = ref(false)
const viewDrawer = ref(false)

const handleClose = () => {
  updateDrawer.value = false
  useStudentStore().setStudent(null)
}

const handleOpen = () => {
  updateDrawer.value = true
  useStudentStore().setStudent(props.student)
}

const handleView = () => {
  viewDrawer.value = !viewDrawer.value
}

// Show Confirm box to make sure the user really want to delete the info.
const DeleteStudentConfirmBox = (id: string) => {
  ConfirmBox({
    title: 'Delete ',
    messageContent: 'Are you sure you want to delete user?',
    callback: () => deleteStudent(id),
  })
}
</script>

<template>
  <div
    :style="student.id === useStudentStore().student?.id && 'border:1px solid #2148c0;'"
    class="card"
    @click="useStudentStore().setStudent(props.student)"
  >
    <div class="header">
      <el-text size="small" style="width: 100%; font-size: 14px"
        >@ {{ useProperName(student.lastName) }}</el-text
      >

      <el-dropdown class="" trigger="click">
        <span class="el-dropdown-link student-card-dropdown">
          <el-icon class="more" :size="20"><MoreFilled /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item class="view-student" @click="handleView"
              ><el-text>View</el-text></el-dropdown-item
            >
            <el-dropdown-item @click="handleOpen"><el-text>Edit</el-text></el-dropdown-item>
            <el-dropdown-item @click="DeleteStudentConfirmBox(student.id)"
              ><el-text>Delete</el-text></el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="img">
      <img draggable="false" :src="imagePhoto" alt="imgPhoto" class="imgPhoto" />
    </div>
    <div class="info">
      <el-text :truncated="true" class="bold-text" style="width: 100%; font-size: 18px">
        {{
          student.firstName
            .split(' ')
            .map((item) => useProperName(item))
            .join(' ')
        }}
        {{ student?.middleInitial.toUpperCase() && student?.middleInitial.toUpperCase() + '.' }}
        {{
          student.lastName
            .split(' ')
            .map((item) => useProperName(item))
            .join(' ')
        }}</el-text
      >
      <el-text
        :truncated="true"
        :line-clamp="2"
        size="small"
        style="width: 100%; font-size: 14px"
        >{{ student.course }}</el-text
      >
    </div>
  </div>

  <ViewStudent :student :view-drawer="viewDrawer" @handle-close-view="handleView" />
  <UpdateStudent :student :update-drawer="updateDrawer" @handle-close="handleClose" />
</template>

<style scoped>
* {
  /* border: 1px solid red; */
  color: var(--secondary-text) !important;
}

.card {
  background: var(--primary-text);
  padding: 1em;
  border-radius: 0.5em;

  border: 1px solid var(--primary-border);
  box-shadow: 0px 5px 5px 0px var(--primary-shadow);

  width: 300px;
  height: 400px;
  max-width: 300px;
  max-height: 400px;
  /* height: fit-content; */

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .header {
    width: 100%;
    height: max-content;

    margin-bottom: 8px;

    display: flex;
    align-items: center;
    justify-content: end;

    .more {
      rotate: 90deg;
    }

    .more:hover {
      scale: 1.1;
      animation-duration: 500s;
      transition: all 0.5s;
      cursor: pointer;
    }
  }

  .img {
    width: 100%;
    height: 100%;
    .imgPhoto {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 4px;
    }
  }

  .info {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-top: 8px;
  }
}

@media only screen and (min-device-width: 1366px) {
  :deep(.view-student) {
    display: none;
  }
}
</style>
