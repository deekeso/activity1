<script setup lang="ts">
import type { TStudent } from '@/types/types'
import { imagePhoto } from '@/constant/image'
import moment from 'moment'
import { useProperName } from '@/composables/useProperName'

const props = defineProps<{
  student: TStudent
  viewDrawer: boolean
}>()

const emits = defineEmits(['handleCloseView'])

// Check the width of the browser to match the size of drawer for updating new student.
</script>

<template>
  <el-drawer
    size="100%"
    class="view-student-drawer"
    @close="emits('handleCloseView')"
    :model-value="viewDrawer"
    title="View Student's Information"
  >
    <el-scrollbar>
      <div class="main">
        <img :src="imagePhoto" alt="imgPhoto" class="imgPhoto" />

        <el-text class="bold-text" style="font-size: 24px; text-align: center; margin-top: 8px">
          {{
            props.student?.firstName
              .split(' ')
              .map((item) => useProperName(item))
              .join(' ')
          }}
          {{
            props.student?.middleInitial.toUpperCase() &&
            props.student?.middleInitial.toUpperCase() + '.'
          }}
          {{
            props.student?.lastName
              .split(' ')
              .map((item) => useProperName(item))
              .join(' ')
          }}</el-text
        >
        <el-text class=""
          >@
          {{
            props.student?.firstName
              .split(' ')
              .map((item) => useProperName(item))
              .join(' ')
          }}
          {{
            props.student?.lastName
              .split(' ')
              .map((item) => useProperName(item))
              .join(' ')
          }}</el-text
        >
        <div class="info">
          <el-divider />
          <span class="card" style="width: 100%; display: flex; align-items: center; gap: 8px">
            <el-text :truncated="true" class="bold-text" style="font-size: 20px"
              >Fullname:
            </el-text>
            <el-text :truncated="true" style="font-size: 18px">
              {{
                props.student?.firstName
                  .split(' ')
                  .map((item) => useProperName(item))
                  .join(' ')
              }}
              {{
                props.student?.middleInitial.toUpperCase() &&
                props.student?.middleInitial.toUpperCase() + '.'
              }}
              {{
                props.student?.lastName
                  .split(' ')
                  .map((item) => useProperName(item))
                  .join(' ')
              }}</el-text
            >
          </span>

          <span class="card" style="width: 100%; display: flex; align-items: center; gap: 8px">
            <el-text class="bold-text" style="font-size: 20px">Age: </el-text>
            <el-text :truncated="true" style="font-size: 18px"
              >{{ props.student?.age }} years old</el-text
            >
          </span>
          <span class="card" style="width: 100%; display: flex; align-items: center; gap: 8px">
            <el-text class="bold-text" style="font-size: 20px">Birthday: </el-text>
            <el-text :truncated="true" style="font-size: 18px">{{
              moment(props.student?.birthDate).format('LL')
            }}</el-text>
          </span>
          <span class="card" style="width: 100%; display: flex; align-items: center; gap: 8px">
            <el-text class="bold-text" style="font-size: 20px">Course: </el-text>
            <el-text :truncated="true" style="font-size: 18px">{{ props.student?.course }}</el-text>
          </span>
          <span class="card" style="width: 100%; display: flex; align-items: center; gap: 8px">
            <el-text class="bold-text" style="font-size: 20px">Address: </el-text>
            <el-text :truncated="true" style="font-size: 18px">{{
              props.student?.address
            }}</el-text>
          </span>
        </div>
      </div>
    </el-scrollbar>
  </el-drawer>
</template>

<style scoped>
* {
  color: black !important;
}
::v-deep(.el-select__placeholder, .el-input__inner::placeholder, .el-input__icon) {
  color: var(--secondary-text);
  font-size: 16px;
}
::v-deep(.el-input__inner, .el-input__inner::placeholder, .el-input__icon) {
  /* color: var(--secondary-text); */
  font-size: 20px;
}
::v-deep(.el-input__icon) {
  color: var(--secondary-text);
  font-size: 20px;
}

.header {
  width: 100%;
  height: 80px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 1em;
  margin-bottom: 1em;
  border-bottom: 1px solid var(--primary-shadow);
}
.main {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .imgPhoto {
    width: 200px;
    height: 200px;
    border-radius: 1em;
    box-shadow: 0px 5px 5px 0px var(--primary-shadow);
  }

  .info {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 1em;
    padding: 1.5em;

    .card {
      background: var(--primary-shadow);
      padding: 1em;
      border-radius: 0.5em;
      box-shadow: 0px 5px 5px 0px var(--primary-gray);
    }
  }
}

::v-deep(.el-input__inner::placeholder) {
  color: var(--secondary-text) !important;
  font-size: 16px;

  font-family: montserrat !important;
}
</style>
