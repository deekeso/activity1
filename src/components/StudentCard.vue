<script setup lang="ts">
import { useStudentStore } from '@/stores/PiniaStore'
import { Edit, Delete, User, HomeFilled } from '@element-plus/icons-vue'
import { useStudentDrawer } from '@/composables/useStudentDrawer'
import type { Student } from '@/types/types'
import { ElNotification, ElLoading, ElMessageBox } from 'element-plus'
import { watch, markRaw } from 'vue'

const studentStore = useStudentStore()
const {
  isDrawerOpen,
  selectedStudent: selectedAccount,
  openDrawer,
  closeDrawer,
} = useStudentDrawer()

// Watch for birthdate changes and calculate it
watch(
  () => selectedAccount.value?.birthDate,
  (newBirthDate) => {
    if (newBirthDate) {
      const birthDateValue = new Date(newBirthDate)
      const today = new Date()

      let calculatedAge = today.getFullYear() - birthDateValue.getFullYear()
      if (
        today.getMonth() < birthDateValue.getMonth() ||
        (today.getMonth() === birthDateValue.getMonth() &&
          today.getDate() < birthDateValue.getDate())
      ) {
        calculatedAge--
      }

      if (selectedAccount.value) {
        selectedAccount.value.age = calculatedAge
      }
    }
  },
)

// Function to handle student updates
const handleUpdate = () => {
  const age = selectedAccount.value?.age
  const FirstName = selectedAccount.value?.firstName
  const LastName = selectedAccount.value?.lastName
  const MiddleName = selectedAccount.value?.middleName
  const Address = selectedAccount.value?.address
  // const LastName = selectedAccount.value?.lastName
  ElMessageBox.confirm('Are you sure you want to update it?', 'Updating Student', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    icon: markRaw(Edit),
  }).then(() => {
    if (Number(age) <= 17) {
      ElNotification({
        title: 'Age Limit',
        message: 'It should 18 years old above',
        type: 'error',
        duration: 2000,
      })
    } else if (FirstName === '' || LastName === '' || MiddleName === '') {
      ElNotification({
        title: 'Warning',
        message: 'The name inputs are required',
        type: 'error',
        duration: 2000,
      })
    } else if (Address === '') {
      ElNotification({
        title: 'Warning',
        message: 'Address is required',
        type: 'error',
        duration: 2000,
      })
    } else {
      LoadingScreenUpdate()
      setTimeout(() => {
        if (selectedAccount.value) {
          //Store the updated student
          studentStore.updateStudent(selectedAccount.value as Student)
          //Success Notification
          successNotication()
          //Close the Drawer
          closeDrawer()
        }
      }, 3000)
    }
  })
}

const deleteStudent = (studentId: number) => {
  ElMessageBox.confirm('Are you sure you want to delete it?', 'Deleting Student', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    icon: markRaw(Delete),
  }).then(() => {
    LoadingScreenDelete()
    setTimeout(() => {
      //Delete the student using the StudentID
      studentStore.deleteStudent(studentId)
    }, 1000)
  })
}
//Select Course Options
const options = [
  {
    value: 'BSIT',
    label: 'BSIT',
  },
  {
    value: 'BSCS',
    label: 'BSCS',
  },
  {
    value: 'BS NURSING',
    label: 'BS NURSING',
  },
  {
    value: 'BS TOURISM',
    label: 'BS TOURISM',
  },
  {
    value: 'BSHM',
    label: 'BSHM',
  },
]

const successNotication = () => {
  ElNotification({
    title: 'Updated Success',
    message: 'You have successfully update',
    type: 'success',
    duration: 2000,
  })
}

const LoadingScreenDelete = () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Deleting...',
    background: 'rgba(0, 0 , 0, 0.7)',
  })
  setTimeout(() => {
    loading.close()
  }, 1000)
}

//Loading Screen
const LoadingScreenUpdate = () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Updating...',
    background: 'rgba(0, 0 , 0, 0.7)',
  })
  setTimeout(() => {
    loading.close()
  }, 3000)
}

const disabledDate = (date: Date) => {
  return date.getTime() > Date.now()
}
</script>

<template>
  <div>
    <el-row>
      <el-col
        v-for="student in studentStore.studentList"
        :key="student.studentId"
        :gutter="20"
        style="padding-top: 40px"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
      >
        <el-card style="width: 300px; max-width: 310px; height: 300px; max-height: 310px">
          <template #header>
            <div>
              <el-button type="warning" :icon="Edit" @click="openDrawer(student)" />
              <el-button @click="deleteStudent(student.studentId)" type="danger" :icon="Delete" />
            </div>
          </template>
          <div class="text-container">
            <p>Student ID: {{ student.studentId }}</p>
            <p>Name: {{ student.firstName }} {{ student.middleName }} {{ student.lastName }}</p>
            <p>Course: {{ student.course }}</p>
            <p>Address: {{ student.address }}</p>
            <p>Birthdate: {{ student.birthDate }}</p>
            <p>Age: {{ student.age }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-drawer
      v-model="isDrawerOpen"
      @close="closeDrawer"
      size="40%"
      direction="rtl"
      title="Update Student"
    >
      <el-form v-if="selectedAccount">
        <el-form-item class="form-item">
          <el-input type="hidden" placeholder="Student ID" disabled :prefix-icon="User" />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="selectedAccount.studentId"
            clearable
            placeholder="Student ID"
            :prefix-icon="User"
            disabled
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="selectedAccount.firstName"
            clearable
            placeholder="First Name"
            :prefix-icon="User"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="selectedAccount.middleName"
            clearable
            placeholder="Middle Name"
            :prefix-icon="User"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="selectedAccount.lastName"
            clearable
            placeholder="Last Name"
            :prefix-icon="User"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="selectedAccount.address"
            clearable
            placeholder="Address"
            :prefix-icon="HomeFilled"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="selectedAccount.birthDate"
            type="date"
            placeholder="BIRTHDATE ( MM / DD / YYYY )"
            clearable
            format="YYYY-MM-DD"
            class="date-picker"
            :style="{ width: '100%', height: '45px' }"
            :disabled-date="disabledDate"
          >
            <template #prefix>
              <el-icon size="large">
                <Calendar />
              </el-icon>
            </template>
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-input v-model="selectedAccount.age" placeholder="Age" disabled></el-input>
        </el-form-item>
        <el-form-item>
          <!-- <el-input clearable v-model="course" placeholder="Course"></el-input> -->
          <el-select
            v-model="selectedAccount.course"
            placeholder="Course"
            size="large"
            style="width: 100%; height: 45px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button @click="handleUpdate" class="addBtnStudent">Save</el-button>
          <!-- <el-button @click="closeDrawer" class="cancelBtn">Cancel</el-button> -->
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<style scoped>
.el-card {
  /* margin-right: 40px; */
  margin-bottom: 40px;
}

.el-col {
  display: flex;
  justify-content: space-evenly;
}

.text-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  text-align: start;
}

.el-input {
  height: 45px;
}

.el-input__inner {
  padding-left: 20px;
}

.addBtnStudent,
.cancelBtn {
  width: 100%;
  height: 45px;
  background: green;
  color: white;
}

.addBtnStudent:hover {
  background-color: rgb(36, 168, 36);
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
