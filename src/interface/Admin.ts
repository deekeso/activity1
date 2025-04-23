export interface Admin {
  id: string | number;
  name: string;
  username: string;
  password: string;
}

export interface AdminSignup {
  id: string;
  name: string;
  username: string;
  password: string;
}

export interface LoginForm {
  username: string;
  password: string;
}
