import { defineStore } from 'pinia'

export interface SignUpFormUser {
  Id: string // Add unique ID for each user
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
    // SignUp(user: SignUpFormUser) {
    //   this.users.push(user)
    // },

    AddUser(user: SignUpFormUser) {
      user.Id = `${Date.now()}` // Generate a unique ID (timestamp-based)
      console.log('Generated User Id:', user.Id) // Log the assigned ID
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
      const index = this.users.findIndex((user) => user.Id === studentData.Id)
      console.log('Searching for Id:', studentData.Id)
      console.log(
        'Available Ids:',
        this.users.map((user) => user.Id),
      )
      if (index !== -1) {
        console.log(`Updating User at Index ${index}`)
        this.users[index] = { ...this.users[index], ...studentData } // Merge new data
      } else {
        console.warn(`User with Id ${studentData.Id} not found`)
      }
    },

    deleteStudent(id: string) {
      this.users = this.users.filter((user) => user.Id !== id)
    },

    logout() {
      this.currentUser = null
    },
  },

  persist: {
    storage: localStorage,
  },
})
