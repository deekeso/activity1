// GLobal student type model
export type Student = {
  id: string
  firstName: string
  middleName: string
  lastName: string
  birthDate: string | Date
  age: number
  address: string
  course: string
}
// Global SearchQuery type model
export interface StudentFilter {
  searchQuery: string
  course: string
  minAge?: number
  maxAge?: number
}

// GLobal UserModel type model
export type UserModel = {
  username: string
  password: string
}
