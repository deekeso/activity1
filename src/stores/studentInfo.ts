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
  }),

  actions: {
    SignUp(user: SignUpFormUser) {
      this.users.push(user)
    },

    LogIn(UserName: string, Password: string): boolean {
      const FindUser = this.users.find(
        (user) => user.UserName == UserName && user.Password == Password,
      )
      if (FindUser) {
        this.currentUser = UserName
        return true
      }
      return false
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
