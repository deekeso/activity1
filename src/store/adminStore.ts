// Import defineStore from Pinia for state management
import { defineStore } from "pinia";
import type { Admin } from "../interface/Admin";

// Define the interface for an Admin object

// Create a Pinia store named "adminStore"
export const useAdminStore = defineStore("adminStore", {
  // State holds the store's reactive data
  state: () => ({
    admins: [] as Admin[], // Array to store the list of admins
  }),
  // Actions define methods to modify the state
  actions: {
    // Method to create and add a new admin
    createAdmin(admin: Admin) {
      // Retrieve existing admins from localStorage
      const existingAdmin = localStorage.getItem("admins");

      // Parse the data into a JavaScript array, or initialize an empty array if none exist
      const admins = existingAdmin ? JSON.parse(existingAdmin) : [];

      // Save the updated admins array back to localStorage
      admins.push(admin);

      this.admins = admins;

      // Update the store's state with the new list of admins
      localStorage.setItem("admins", JSON.stringify(this.admins));
    },
  },
});
