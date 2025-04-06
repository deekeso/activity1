<script setup lang="ts">
import { ref, watch } from 'vue'
import { User, HomeFilled } from '@element-plus/icons-vue'

const firstName = ref('')
const middleName = ref('')
const lastName = ref('')
const address = ref('')
const course = ref('')
const birthdate = ref('')
const age = ref('')

const drawer = ref(false)

// Function to calculate age based on birthdate
const calculateAge = (birthdate: string) => {
  if (!birthdate) return ''
  const today = new Date()
  const birthDate = new Date(birthdate)
  let calculatedAge = today.getFullYear() - birthDate.getFullYear()
  const monthDifference = today.getMonth() - birthDate.getMonth()
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    calculatedAge--
  }
  return calculatedAge
}

// Watch the birthdate and update the age automatically
watch(birthdate, (newBirthdate) => {
  age.value = String(calculateAge(newBirthdate))
})
</script>

<template>
  <div class="addBtn-container">
    <el-button @click="drawer = true" class="addBtn">Add Student</el-button>

    <el-drawer size="60%" v-model="drawer" title="Add Student">
      <el-form>
        <el-form-item class="form-item">
          <el-input placeholder="Student ID" disabled :prefix-icon="User" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="firstName" placeholder="First Name" :prefix-icon="User"> </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="middleName" placeholder="Middle Name" :prefix-icon="User"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="lastName" placeholder="Last Name" :prefix-icon="User"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="address" placeholder="Address" :prefix-icon="HomeFilled"></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="birthdate"
            type="date"
            placeholder="BIRTHDATE ( MM / DD / YYYY )"
            clearable
            class="date-picker"
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
          <el-input v-model="age" placeholder="Age" disabled></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="course" placeholder="Course"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button class="addBtnStudent">Add Student</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<style scoped>
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
</style>