<script setup lang="ts">
import { useProperName } from '@/composables/useProperName'
import { imagePhoto } from '@/constant/image'
import { useStudentStore } from '@/stores'
import moment from 'moment'
import { ref } from 'vue'

const showDrawer = ref(false)
const handleClose = () => {
  showDrawer.value = false
  useStudentStore().setStudent(null)
}
</script>

<template>
  <el-aside class="asideview" v-if="!useStudentStore().getStudent"></el-aside>
  <el-aside v-else class="asideview">
    <div class="header">
      <el-text class="bold-text" style="width: 100%; font-size: 20px"
        >Student's Information</el-text
      >
    </div>
    <div class="main">
      <img :src="imagePhoto" alt="imgPhoto" class="imgPhoto" />

      <el-text class="bold-text" style="font-size: 24px; text-align: center; margin-top: 8px"
        >{{
          useStudentStore()
            .student?.firstName.split(' ')
            .map((item) => useProperName(item))
            .join(' ')
        }}
        {{
          useStudentStore().student?.middleInitial.toUpperCase() &&
          useStudentStore().student?.middleInitial.toUpperCase() + '.'
        }}
        {{
          useStudentStore()
            .student?.lastName.split(' ')
            .map((item) => useProperName(item))
            .join(' ')
        }}</el-text
      >
      <el-text class=""
        >@
        {{
          useStudentStore()
            .student?.firstName.split(' ')
            .map((item) => useProperName(item))
            .join(' ')
        }}
        {{
          useStudentStore()
            .student?.lastName.split(' ')
            .map((item) => useProperName(item))
            .join(' ')
        }}</el-text
      >
      <div class="info">
        <el-divider />
        <span class="card" style="width: 100%; display: flex; align-items: center; gap: 8px">
          <el-text :truncated="true" class="bold-text" style="font-size: 20px">Fullname: </el-text>
          <el-text :truncated="true" style="font-size: 18px">
            {{
              useStudentStore()
                .student?.firstName.split(' ')
                .map((item) => useProperName(item))
                .join(' ')
            }}
            {{
              useStudentStore().student?.middleInitial.toUpperCase() &&
              useStudentStore().student?.middleInitial.toUpperCase() + '.'
            }}
            {{
              useStudentStore()
                .student?.lastName.split(' ')
                .map((item) => useProperName(item))
                .join(' ')
            }}</el-text
          >
        </span>
        <span class="card" style="width: 100%; display: flex; align-items: center; gap: 8px">
          <el-text class="bold-text" style="font-size: 20px">Age: </el-text>
          <el-text :truncated="true" style="font-size: 18px"
            >{{ useStudentStore().student?.age }} years old</el-text
          >
        </span>
        <span class="card" style="width: 100%; display: flex; align-items: center; gap: 8px">
          <el-text class="bold-text" style="font-size: 20px">Birthday: </el-text>
          <el-text :truncated="true" style="font-size: 18px">{{
            moment(useStudentStore().student?.birthDate).format('LL')
          }}</el-text>
        </span>
        <span class="card" style="width: 100%; display: flex; align-items: center; gap: 8px">
          <el-text class="bold-text" style="font-size: 20px">Course: </el-text>
          <el-text :truncated="true" style="font-size: 18px">{{
            useStudentStore().student?.course
          }}</el-text>
        </span>
        <span class="card" style="width: 100%; display: flex; align-items: center; gap: 8px">
          <el-text class="bold-text" style="font-size: 20px">Address: </el-text>
          <el-text :truncated="true" style="font-size: 18px">{{
            useStudentStore().student?.address
          }}</el-text>
        </span>
      </div>
    </div>
  </el-aside>

  <div v-if="useStudentStore().student">
    <UpdateStudent
      :student="useStudentStore().student"
      :update-drawer="showDrawer"
      @handle-close="handleClose"
    />
  </div>
</template>

<style scoped>
* {
  /* border: 1px solid red; */
  color: var(--secondary-text) !important;
}

.el-aside {
  width: 25%;
  /* max-width: 25%; */
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: white;
  border-radius: 1em;

  box-shadow: 0px 5px 5px 0px var(--primary-shadow);

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
      width: 300px;
      height: 300px;
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
  .footer {
    width: 100%;
    height: 100px;

    display: flex;
  }
}
</style>
