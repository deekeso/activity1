/**
 * Store for Student Management
 *
 * State Properties:    isAuthenticated, user
 * Actions:             Log in, Log out
 * Persist:             True
 */

import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    user: null as { username: string } | null,
  }),
  actions: {
    // ---- Log in and set authentication status ----
    login(userData: { username: string }) {
      this.isAuthenticated = true;
      this.user = userData;
    },
    // ---- Log out and reset authentication status ----
    logout() {
      this.isAuthenticated = false;
      this.user = null;
    },
  },
  persist: true,
});
