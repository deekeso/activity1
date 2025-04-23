/**
 * Logout Functionality
 *
 * Clears the authentication state and redirecting to the home page.
 *
 * @returns {object} - Function to log out the user.
 */

import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/useAuthStore";

export function useLogout() {
  const router = useRouter();
  const authStore = useAuthStore();

  const logout = () => {
    authStore.logout();
    router.push("/").then(() => {
      router.go(0);
    });
  };

  return { logout };
}
