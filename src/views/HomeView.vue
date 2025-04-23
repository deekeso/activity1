<script setup lang="ts">
import AsideView from '@/components/Home/AsideView.vue'
import MainView from '@/components/Home/MainView.vue'
import { getStudents } from '@/composables/useUser'
import { imagePhoto } from '@/constant/image'
import { useStudentStore } from '@/stores'
import { onMounted } from 'vue'

onMounted(() => {
  getStudents()
})
</script>

<template>
  <div class="home">
    <el-image draggable="false" src="/BG.png" alt="bg-photo" class="bg-photo" />

    <el-container style="gap: 1em">
      <el-header class="header-view">
        <el-text size="large" class="bold-text header-view-title" style="font-size: 20px"
          >Welcome, {{ useStudentStore().getUser?.userName }} !</el-text
        >

        <!-- Header user dropdown for logout -->
        <el-dropdown trigger="click">
          <div class="el-dropdown-link" style="display: flex; align-items: center; gap: 1em">
            <img :src="imagePhoto" alt="imgPhoto" class="imgPhoto" />
            <span class="header-view-info" style="display: flex; flex-direction: column">
              <el-text class="bold-text" style="width: 100%">{{
                useStudentStore().getUser?.userName
              }}</el-text>
              <el-text size="small" style="width: 100%; font-size: 12px"
                >@ {{ useStudentStore().getUser?.userName }}</el-text
              >
            </span>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="useStudentStore().handleLogout"
                ><el-text>Logout</el-text></el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>

      <el-container
        class="home-main-view"
        style="gap: 1em; overflow: hidden; max-height: calc(100vh-80px)"
      >
        <AsideView />
        <MainView />
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
* {
  /* border: 1px solid red; */
  color: var(--secondary-text) !important;
}

.home {
  width: 100%;
  height: 100vh;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2em;

  position: relative;
  background-color: var(--primary-background);

  .bg-photo {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* z-index: -1; */
  }

  .el-container {
    z-index: 1000;

    width: 100%;
    height: 100%;
  }
  .el-header {
    width: 100%;
    height: 80px;

    padding: 1em;
    background: white;
    border-radius: 1em;
    box-shadow: 0px 5px 5px 0px var(--primary-shadow);

    display: flex;
    align-items: center;
    justify-content: space-between;

    .imgPhoto {
      width: 50px;
      height: 50px;
      border-radius: 150px;
    }

    .el-dropdown-link {
      border-radius: 1em;
      padding: 0.5em 1em;
    }
    .el-dropdown-link:hover {
      cursor: pointer;
      background: var(--primary-shadow);
    }
  }
}
</style>
