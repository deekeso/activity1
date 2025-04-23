import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { TAdmin, TStudent } from '@/types/types'
import type { FormInstance } from 'element-plus'
import { ErrorNotification, SuccessNotification } from '@/composables/useNotification'

export const useStudentStore = defineStore('studentStore', () => {
  // * STATES
  const router = useRouter()
  const user = ref<TAdmin | null>(null)
  const userToken = ref<string | null>(null)
  const student = ref<TStudent | null>(null)
  const students = ref<TStudent[]>([])
  const fetchStudentsLoading = ref(false)
  const searchLoading = ref(false)

  // * GETTERS
  const getUser = computed(() => user.value)
  const getToken = computed(() => userToken.value)
  const getStudent = computed(() => student.value)
  const getStudents = computed(() => students.value)
  const getFetchLoading = computed(() => fetchStudentsLoading.value)
  const getSearchLoading = computed(() => searchLoading.value)
  const getTotalStudents = computed(() => getStudents.value.length)

  // * SETTERS
  const setStudents = (allStudent: TStudent[]) => {
    students.value = allStudent
  }
  const setUser = (newUser: TAdmin | null) => {
    user.value = newUser
  }
  const setStudent = (newUser: TStudent | null) => {
    if (!newUser) return
    student.value = newUser
  }
  const setToken = (newToken: string | null) => {
    userToken.value = newToken
  }
  const setLoading = (loading: boolean) => {
    fetchStudentsLoading.value = loading
  }
  const setSearchLoading = (loading: boolean) => {
    searchLoading.value = loading
  }
  const deleteStudent = () => {
    student.value = null
  }

  // * ACTIONS
  const handleLogin = async (formE1: FormInstance | undefined) => {
    if (!formE1) return
    await formE1.validate((valid, fields) => {
      if (valid) {
        const formData = formE1.$props.model

        if (!formData) return

        // const students = localStorage.getItem('students')
        // // If there's no students in local storage, send error
        // if (!students) {
        //   return ErrorNotification({
        //     messageContent: 'Students not found!',`
        //   })
        // }

        // // Find user trying to log in  via username
        // const foundUser: TStudent = JSON.parse(students).find(
        //   (item: TStudent) => item.userName === formData.userName,
        // )

        // // If user not  found, send error
        // if (!foundUser) {
        //   return ErrorNotification({
        //     messageContent: 'User not found!',
        //   })
        // }
        if (formData.userName === 'admin' && formData.password !== 'admin') {
          ErrorNotification({
            messageContent: 'Incorrect password!',
          })
          return
        }
        if (formData.userName !== 'admin' && formData.password === 'admin') {
          ErrorNotification({
            messageContent: 'User not found!',
          })
          return
        }

        if (formData.userName === 'admin' && formData.password === 'admin') {
          const adminId = String(Math.random() * 10)
          // Set the token and user data in pinia state
          useStudentStore().setToken(adminId)
          useStudentStore().setUser({
            id: adminId,
            userName: formData.userName,
            password: formData.password,
          })

          // saves the admin id to token in local storage and server  for persistent login
          localStorage.setItem('token', JSON.stringify(adminId))
          localStorage.setItem(
            'admin',
            JSON.stringify({
              id: adminId,
              userName: formData.userName,
              password: formData.password,
            }),
          )
          router.push('/')
          SuccessNotification({
            messageContent: 'Logged in successfully!',
          })
        } else {
          return ErrorNotification({
            messageContent: 'User not found!',
          })
        }
      } else {
        ErrorNotification({
          messageContent: 'Failed to log in!',
        })
        console.log('error submit!', fields)
      }
    })
  }
  const handleSignup = async (formE1: FormInstance | undefined) => {
    if (!formE1) return
    await formE1.validate((valid, fields) => {
      if (valid) {
        const formData = {
          id: (Math.random() * 10).toString(),
          firstName: formE1.$props.model?.firstName,
          middleName: formE1.$props.model?.middleName,
          lastName: formE1.$props.model?.lastName,
          userName: formE1.$props.model?.userName,
          password: formE1.$props.model?.password,
          age: formE1.$props.model?.age,
          birthDate: formE1.$props.model?.birthDate,
          address: formE1.$props.model?.address,
          course: formE1.$props.model?.course,
        }
        if (!formData) return

        // get students in local storage
        const localStorageStudent = localStorage.getItem('students')

        // if there's no students, add the new student
        if (!localStorageStudent) {
          user.value = formData
          const updatedStudents = JSON.stringify([formData])
          localStorage.setItem('students', updatedStudents)
          SuccessNotification({
            messageContent: 'Account created successfully',
          })
          router.push('/login')
          return
        }

        // if the student already exists, return error
        const foundUser = JSON.parse(localStorageStudent).find(
          (item: TStudent) => item.userName === formData.userName,
        )
        if (foundUser) {
          ErrorNotification({
            messageContent: 'User alreary exists!',
          })
          return
        }

        // if new student and does not exists in local storage, add the new student
        user.value = formData
        const updatedStudents = JSON.stringify([...JSON.parse(localStorageStudent), formData])
        localStorage.setItem('students', updatedStudents)
        SuccessNotification({
          messageContent: 'Account created successfully',
        })
        router.push('/login')
      } else {
        ErrorNotification({
          messageContent: 'Failed to create account!',
        })
        console.log('error submit!', fields)
      }
    })
  }
  const handlePersistLogin = () => {
    const token = localStorage.getItem('token')

    // If there's no token in local storage, redirect to /login page
    if (!token) {
      console.log('not persist')
      return false
    }

    // Get all the students in local storage
    const admin = localStorage.getItem('admin')
    if (!admin) {
      console.log('not persist')
      return false
    }

    useStudentStore().setUser(JSON.parse(admin))
    user.value = JSON.parse(admin)
    userToken.value = JSON.parse(admin).id
    console.log('persist')
    return true
  }
  const handleLogout = () => {
    user.value = null
    students.value = []
    userToken.value = null
    student.value = null

    localStorage.removeItem('token')
    localStorage.removeItem('admin')
    router.push('/login')
  }

  return {
    // states
    user,
    userToken,
    student,
    students,
    fetchStudentsLoading,
    searchLoading,

    // getters
    getUser,
    getToken,
    getStudent,
    getStudents,
    getFetchLoading,
    getSearchLoading,
    getTotalStudents,

    // setters
    setStudent,
    setStudents,
    setUser,
    setToken,
    setLoading,
    setSearchLoading,
    deleteStudent,

    // actions
    handleLogin,
    handleSignup,
    handleLogout,
    handlePersistLogin,
  }
})
