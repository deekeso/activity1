import { ref } from 'vue'
import type { Student } from '@/types/types'

export const useStudentDrawer = () => {
  //Default value of the Drawer which Close or False
  const isDrawerOpen = ref(false)

  //A null value to store the selected student in edit
  const selectedStudent = ref<Student | null>(null)

  //Function for Opening Drawer
  const openDrawer = (student: Student) => {
    //Spread the value of the selected student
    selectedStudent.value = { ...student }
    //And make open the drawer
    isDrawerOpen.value = true
  }

  //Function for Closing Drawer
  const closeDrawer = () => {
    //The selected student make the value null
    selectedStudent.value = null
    //Make the value of Drawer to false
    isDrawerOpen.value = false
  }

  const openDrawerAdding = () => {
    isDrawerOpen.value = true
  }

  const closeDrawerAdding = () => {
    isDrawerOpen.value = false
  }

  return {
    isDrawerOpen,
    selectedStudent,
    openDrawer,
    closeDrawer,
    closeDrawerAdding,
    openDrawerAdding,
  }
}
