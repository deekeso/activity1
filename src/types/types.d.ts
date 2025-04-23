export type TAdmin = {
  id: string
  userName: string
  password: string
}

export type TSignup = {
  firstName: string
  middleInitial: string
  lastName: string

  birthDate: Date | string
  age: number | null

  address: string
  course: string
}

export type TLogin = {
  userName: string
  password: string
}

export type TStudent = {
  id: string
  firstName: string
  middleInitial: string
  lastName: string

  userName: string
  password: string

  birthDate: Date
  age: number | null

  address: string
  course: string
}

export type TUpdateStudent = {
  id: string
  firstName: string
  middleInitial: string
  lastName: string

  birthDate: Date
  age: number | null

  address: string
  course: string
}
