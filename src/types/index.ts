export interface User {
  username: string;
}

export interface StoredUser {
  firstName: string;
  middleName: string;
  lastName: string;
  username: string;
  password: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  firstName: string;
  middleName: string;
  lastName: string;
}

export interface Student {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: string;
  age: number;
  address: string;
  course: string;
}
