<template>
  <div class="dialogContainer">
    <el-dialog
      :model-value="isProfileDialogOpen"
      title="Profile Information"
      width="500"
      :before-close="handleProfileDialogClose"
    >
      <el-form :model="form">
        <el-form-item label="Username">
          <span>{{ form.UserName }}</span>
        </el-form-item>
        <el-form-item label="First Name">
          <span>{{ form.FirstName }}</span>
        </el-form-item>
        <el-form-item label="Middle Name">
          <span>{{ form.MiddleName }}</span>
        </el-form-item>
        <el-form-item label="Last Name">
          <span>{{ form.LastName }}</span>
        </el-form-item>
        <el-form-item label="Birthday">
          <span>{{ form.Birthday }}</span>
        </el-form-item>
        <el-form-item label="Age">
          <span>{{ form.Age }}</span>
        </el-form-item>
        <el-form-item label="Address">
          <span>{{ form.Address }}</span>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="handleProfileDialogClose">Close</el-button>
          <el-button @click="handleLogout">Log Out</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { InputStoreUser } from '@/stores/studentInfo'
import { defineEmits, defineProps, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  isProfileDialogOpen: Boolean,
})

const emits = defineEmits(['closerProfileDialog'])

const inputStore = InputStoreUser()

const form = reactive({
  UserName: '',
  FirstName: '',
  MiddleName: '',
  LastName: '',
  Birthday: '',
  Age: '',
  Address: '',
})

const handleProfileDialogClose = () => {
  emits('closerProfileDialog')
}

// Watch for changes in the dialog open state and update the form with the current user's data
watch(
  () => props.isProfileDialogOpen,
  (newVal) => {
    if (newVal && inputStore.currentUser) {
      const currentUser = inputStore.users.find((user) => user.UserName === inputStore.currentUser)
      if (currentUser) {
        form.UserName = currentUser.UserName
        form.FirstName = currentUser.FirstName
        form.MiddleName = currentUser.MiddleName
        form.LastName = currentUser.LastName
        form.Birthday = currentUser.Birthday
        form.Age = currentUser.Age
        form.Address = currentUser.Address
      }
    }
  },
  { immediate: true },
)

const router = useRouter()

const handleLogout = () => {
  localStorage.removeItem('currentUser')
  router.push('/')
}
</script>

<style scoped>
:deep(.el-dialog) {
  border: 2px solid red;
}

:deep(.el-dialog__body) {
  height: 50vh;
  width: auto;
}
</style>
