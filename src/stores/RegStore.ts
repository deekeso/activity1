import { defineStore } from "pinia";

// Interface defining the structure of a User object
export interface User {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  age: number;
  pass: string;
}

// Interface defining the structure of the Registration Store's state
interface RegStoreState {
  users: User[]; // Array to store all registered users
  currentUser: User | null; // Currently logged in user or null if no one is logged in
}

// Pinia store for handling user registration and authentication
export const useRegStore = defineStore("regStore", {
  // Initial state with two demo users
  state: (): RegStoreState => ({
    users: [
      {
        id: 1,
        username: "matchaboldog",
        firstname: "Matcha",
        lastname: "Boldog",
        email: "matchaboldog@gmail.com",
        age: 25,
        pass: "matcha123@",
      },
      {
        id: 2,
        username: "peachytaba",
        firstname: "Peachy",
        lastname: "Taba",
        email: "peachytaba@gmail.com",
        age: 56,
        pass: "peachy123@",
      },
      {
        id: 3,
        username: "juan_dc300",
        firstname: "Juan",
        lastname: "Dela Cruz",
        email: "juandelacruz@gmail.com",
        age: 18,
        pass: "juan123",
      },
    ],
    currentUser: null,
  }),

  getters: {},

  // Actions for user management
  actions: {
    // Registers a new user with auto-incrementing ID
    registerUser(userData: Partial<User>): void {
      const newUser = {
        id: this.users.length + 1,
        ...userData,
      };
      this.users.push(newUser as User);
    },

    // Authenticates user and sets currentUser if credentials match
    loginUser(username: string, password: string): boolean {
      const user = this.users.find(
        (u: User) => u.username === username && u.pass === password
      );
      if (user) {
        this.currentUser = user;
        return true;
      }
      return false;
    },

    // Logs out current user by setting currentUser to null
    logoutUser(): void {
      this.currentUser = null;
    },

    // Returns the currently logged in user
    getCurrentUser(): User | null {
      return this.currentUser;
    },
  },
});
