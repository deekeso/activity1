<script setup lang="ts">
import { defineProps, onMounted, onUnmounted, ref } from 'vue'
import studentImage from '../assets/student.png'
import schoolLogo from '../assets/tupt.png'
import StudentDrawer from './StudentDrawer.vue'

interface Student {
  id: string
  firstName: string
  middleInitial: string
  lastName: string
  birthDate: string
  age: number
  address: string
  course: string
}

const props = defineProps<{
  student: Student
}>()

const studentDrawer = ref(false)
const editStudent = ref(false)

const drawerSize = ref('30%')

const updateDrawerSize = () => {
  const width = window.innerWidth
  if (width < 768) {
    drawerSize.value = '100%'
  } else if (width < 992) {
    drawerSize.value = '50%'
  } else if (width < 1200) {
    drawerSize.value = '40%'
  } else {
    drawerSize.value = '30%'
  }
}

onMounted(() => {
  updateDrawerSize()
  window.addEventListener('resize', updateDrawerSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateDrawerSize)
})

const handleEditClick = () => {
  editStudent.value = !editStudent.value
}

const openDrawer = () => {
  studentDrawer.value = true
  console.log('here', studentDrawer.value)
}

const updateStudentDrawer = (newVal: boolean) => {
  studentDrawer.value = newVal
}
</script>

<template>
  <el-card class="card" @click="openDrawer">
    <el-image :src="schoolLogo" class="background-logo" fit="cover" />
    <div class="content">
      <el-row>
        <el-text
          style="
            width: 100%;
            font-family: regular;
            font-size: 7px;
            color: white;
            text-align: center;
          "
        >
          Republic of the Philippines
        </el-text>
      </el-row>

      <el-row>
        <el-text
          style="
            font-family: semiBold;
            font-size: 7px;
            color: white;
            width: 100%;
            text-align: center;
          "
        >
          TECHNOLOGICAL UNIVERSITY OF THE PHILIPPINES
        </el-text>
      </el-row>

      <el-row>
        <el-text
          style="
            width: 100%;
            font-family: regular;
            font-size: 7px;
            color: white;
            text-align: center;
          "
        >
          Taguig Campus
        </el-text>
      </el-row>

      <el-row>
        <el-text
          style="
            width: 100%;
            font-family: regular;
            font-size: 7px;
            color: white;
            text-align: center;
          "
        >
          Km. 14 East Service Road Western Bicutan Taguig City 1630
        </el-text>
      </el-row>

      <el-row>
        <el-text
          style="
            width: 100%;
            font-family: regular;
            font-size: 7px;
            color: white;
            text-align: center;
          "
        >
          Tel No. 823-2457
        </el-text>
      </el-row>

      <el-row style="margin-top: 10px; justify-content: space-between">
        <el-image :src="schoolLogo" style="width: 45%; height: 45%; margin-left: 3px" fit="cover" />
        <el-image :src="studentImage" class="student-image" fit="cover" />
        <el-text
          style="
            font-family: bold;
            position: absolute;
            bottom: -8px;
            color: black;
            text-transform: uppercase;
            font-size: 12px;
          "
          >TUPT - {{ student.id }}</el-text
        >
      </el-row>

      <el-row style="margin-top: 10px">
        <el-text
          style="
            width: 100%;
            font-family: semiBold;
            font-size: 8px;
            color: black;
            text-align: justify;
            padding-left: 1px;
            padding-right: 1px;
          "
        >
          The Technological University of the Philippines shall be a premier state university with
          recognized excellence in engineering and technology education at par with the leading
          universities in the ASEAN region
        </el-text>
      </el-row>

      <div style="background-color: #2148c0; border-radius: 10px; padding: 5px; margin-top: 20px">
        <el-row>
          <el-text
            style="
              width: 100%;
              font-family: bold;
              font-size: 12px;
              color: white;
              text-align: center;
              text-transform: uppercase;
            "
          >
            {{
              student.firstName +
              ' ' +
              (student.middleInitial === '' ? '' : student.middleInitial + '.') +
              ' ' +
              student.lastName
            }}
          </el-text>
        </el-row>

        <el-row>
          <el-text
            style="
              width: 100%;
              font-family: regular;
              font-size: 9px;
              text-align: center;
              color: white;
              padding-bottom: 3px;
            "
          >
            {{ student.course }}
          </el-text>
        </el-row>
      </div>
    </div>
  </el-card>
  <StudentDrawer
    :student="student"
    :editStudent="editStudent"
    :studentDrawer="studentDrawer"
    :handleEditClick="handleEditClick"
    @update:studentDrawer="updateStudentDrawer"
  />
</template>

<style scoped>
.card {
  max-width: 250px;
  height: 350px;
  width: 250px;
  padding: 0;
  z-index: 100;
  border-radius: 10px;
  background: linear-gradient(to bottom, #2148c0, white);
  position: relative;
  display: inline-block;
  cursor: pointer;
  margin: 20px;
}

.background-logo {
  width: 300px;
  height: 300px;
  position: absolute;
  z-index: 1;
  opacity: 0.3;
  bottom: 10%;
  right: -60%;
}

.content {
  position: relative;
  z-index: 2;
}

.student-image {
  width: 50%;
  height: auto;
}
</style>
