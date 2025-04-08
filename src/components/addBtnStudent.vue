<script setup lang="ts">
import { ref } from 'vue'
import { User, HomeFilled } from '@element-plus/icons-vue'
// import { useRouter } from 'vue-router'
import { useStudentStore } from '@/stores/PiniaStore'
import { ElNotification, ElLoading } from 'element-plus'
import { useStudentDrawer } from '@/composables/useStudentDrawer'

// const router = useRouter()
const firstName = ref('')
const middleInitial = ref('')
const lastName = ref('')
const address = ref('')
const birthDate = ref('')
const studentID = ref('')
const Age = ref('')
const course = ref('')

const studentStore = useStudentStore()

const { closeDrawerAdding } = useStudentDrawer()

//Function to get the real age automatically
const getAge = () => {
  const birthDateValue = new Date(birthDate.value)
  const today = new Date()

  let age = today.getFullYear() - birthDateValue.getFullYear()
  if (
    today.getMonth() < birthDateValue.getMonth() ||
    (today.getMonth() === birthDateValue.getMonth() && today.getDate() < birthDateValue.getDate())
  ) {
    age--
  }
  // Age.value = String(age)
  return age
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

const isUnderage = (age: number): boolean => age <= 17
const AddStudent = () => {
  const age = getAge()
  //Check if the inputs value is null or dont have value
  if (
    !firstName.value ||
    !lastName.value ||
    !address.value ||
    !birthDate.value ||
    !course.value ||
    isUnderage(age)
  ) {
    //if yes load the screen and the error notification
    loadingScreen()
    setTimeout(() => {
      if (
        !firstName.value ||
        !lastName.value ||
        !address.value ||
        !birthDate.value ||
        !course.value
      ) {
        errorNotification()
      }

      if (isUnderage(age)) {
        errorNotification2()
      }
    }, 3000)
  } else {
    //Else load the loading screen
    loadingScreen()
    //get the value of all inputs
    const newStudent = {
      firstName: firstName.value,
      middleName: middleInitial.value,
      lastName: lastName.value,
      address: address.value,
      birthDate: birthDate.value,
      age: getAge(),
      studentId: 0,
      course: course.value,
    }
    //Render the success notification
    setTimeout(() => {
      successNotification()
    }, 3000)
    //Store the inputs data in the Store
    setTimeout(() => {
      studentStore.registerStudent(newStudent)
    }, 3000)
    //Then close the drawer
    closeDrawerAdding()
    //Remove or clear the input fields
    firstName.value = ''
    middleInitial.value = ''
    lastName.value = ''
    address.value = ''
    birthDate.value = ''
    Age.value = ''
    course.value = ''
  }
}

//Function for Success Notification
const successNotification = () => {
  ElNotification({
    title: 'Adding Success',
    message: 'You have successfully added student',
    type: 'success',
  })
}

//Function for Error Notification
const errorNotification = () => {
  ElNotification({
    title: 'Missing Input Fields',
    message: 'Please fill the missing input fields',
    type: 'error',
  })
}

const errorNotification2 = () => {
  ElNotification({
    title: 'Under Age',
    message: 'It should 18 years old above',
    type: 'error',
  })
}

//Loading Sceen Aniamtion
const loadingScreen = () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Adding...',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  setTimeout(() => {
    loading.close()
  }, 3000)
}

//Drawer default value
const drawer = ref(false)

const disabledDate = (date: Date) => {
  return date.getTime() > Date.now()
}
</script>

<template>
  <div class="addBtn-container">
    <el-button @click="drawer = true" class="addBtn">Add Student</el-button>

    <el-dialog value="btt" title="Add Student" max-width="500" min-width="400"> </el-dialog>

    <el-drawer
      @close="closeDrawerAdding"
      size="40%"
      v-model="drawer"
      direction="rtl"
      title="Add Student"
    >
      <el-form @submit.prevent="AddStudent">
        <el-form-item class="form-item">
          <el-input
            type="hidden"
            v-model="studentID"
            placeholder="Student ID"
            disabled
            :prefix-icon="User"
          />
        </el-form-item>
        <el-form-item>
          <el-input clearable v-model="firstName" placeholder="First Name" :prefix-icon="User">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            clearable
            v-model="middleInitial"
            placeholder="Middle Name (Optional)"
            :prefix-icon="User"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            clearable
            v-model="lastName"
            placeholder="Last Name"
            :prefix-icon="User"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            clearable
            v-model="address"
            placeholder="Address"
            :prefix-icon="HomeFilled"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="birthDate"
            type="date"
            placeholder="BIRTHDATE ( MM / DD / YYYY )"
            clearable
            format="YYYY-MM-DD"
            class="date-picker"
            :disabled-date="disabledDate"
            :style="{ width: '100%', height: '45px' }"
          >
            <template #prefix>
              <el-icon size="large">
                <Calendar />
              </el-icon>
            </template>
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-input v-model="Age" placeholder="Age" :value="`Age: ${getAge()}`" disabled></el-input>
        </el-form-item>
        <el-form-item>
          <!-- <el-input clearable v-model="course" placeholder="Course"></el-input> -->
          <el-select
            v-model="course"
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
          <el-button @click="AddStudent" class="addBtnStudent">Add Student</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<style scoped>
.addBtn {
  width: 110px;
  height: 35px;
  background-color: green;
  color: white;
}

.addBtn:hover {
  background-color: rgb(63, 62, 62);
  cursor: pointer;
}

.addBtn-container {
  display: flex;
  justify-content: right;
  margin-top: 20px;
  padding-right: 30px;
}

.el-input {
  height: 45px;
}

.el-input__inner {
  padding-left: 20px;
}

.addBtnStudent {
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
