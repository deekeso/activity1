import { defineStore } from 'pinia'

export interface SignUpFormUser {
  UserName: string
  FirstName: string
  MiddleName: string
  LastName: string
  Birthday: string
  Age: string
  Address: string
  Course: string
  Password?: string
  ConfirmPassword?: string
}

export const InputStoreUser = defineStore('user', {
  state: () => ({
    users: [] as SignUpFormUser[],
    currentUser: null as string | null,
    isLoggedIn: false,
  }),

  actions: {
    SignUp(user: SignUpFormUser) {
      this.users.push(user)
    },

    LogIn(Username: string, Password: string): boolean {
      const constantUsername = 'admin'
      const constantPassword = 'admin123'

      if (Username === constantUsername && Password === constantPassword) {
        this.isLoggedIn = true
        return true // Successful login
      } else {
        return false // Failed login
      }
    },

    getAllUser() {
      return this.users
    },

    updateStudentInfo(studentData: SignUpFormUser) {
      const index = this.users.findIndex((user) => user.UserName == studentData.UserName)
      if (index !== -1) {
        this.users[index] = studentData
      }
    },

    deleteStudent(index: number) {
      this.users.splice(index, 1)
    },

    logout() {
      this.currentUser = null
    },
  },

  persist: {
    storage: localStorage,
  },
})
