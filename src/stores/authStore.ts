import { ref, type Ref } from "vue";
import { useRouter } from "vue-router";

import { defineStore } from "pinia";
import { ElLoading } from "element-plus";

import type {
  User,
  StoredUser,
  LoginCredentials,
  RegisterCredentials,
} from "../types";

import { useNotification } from "../composables/useNotification";
const { successMsg, errorMsg } = useNotification();

import { v4 as uuidv4 } from "uuid";

const loading = () => {
  const loading = ElLoading.service({
    lock: true,
    text: "Loading",
    background: "rgba(0, 0, 0, 0.7)",
  });
  setTimeout(() => {
    loading.close();
  }, 500);
};

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();

  const user: Ref<User | null> = ref(null);
  const token: Ref<string | null> = ref(null);
  const isAuthenticated: Ref<boolean> = ref(false);
  const isLoading: Ref<boolean> = ref(false);
  const error: Ref<string | null> = ref(null);

  const getUser = (): User | null => user.value;
  const isLoggedIn = (): boolean => isAuthenticated.value;
  const getError = (): string | null => error.value;

  const register = async (userData: RegisterCredentials): Promise<boolean> => {
    try {
      isLoading.value = true;
      error.value = null;

      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");

      if (storedUsers.some((u: any) => u.username === userData.username)) {
        error.value = "Username already registered";
        return false;
      }

      const newUser: StoredUser = {
        firstName: userData.firstName,
        middleName: userData.middleName,
        lastName: userData.lastName,
        username: userData.username,
        password: userData.password,
      };

      storedUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(storedUsers));

      const generatedToken: string = uuidv4();

      user.value = { username: userData.username };
      token.value = generatedToken;
      isAuthenticated.value = true;

      localStorage.setItem("token", generatedToken);
      localStorage.setItem("currentUser", JSON.stringify(user.value));

      loading();

      setTimeout(() => {
        router.push("/student-records");
        successMsg({
          title: "Success",
          message: "Registration Sucessful",
          type: "success",
          duration: 1000,
        });
      }, 1000);

      return true;
    } catch (err) {
      error.value = "Registration failed";
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      isLoading.value = true;
      error.value = null;

      const storedUsers: StoredUser[] = [
        {
          username: "testusername",
          password: "Test123456",
        },
      ];
      const foundUser = storedUsers.find(
        (u: StoredUser) =>
          u.username === credentials.username &&
          u.password === credentials.password
      );

      if (!foundUser) {
        error.value = "User not found.";
        errorMsg({
          title: "Error",
          message: error.value,
          type: "error",
          duration: 1000,
        });
        return false;
      }

      const generatedToken: string = uuidv4();

      user.value = { username: foundUser.username };
      token.value = generatedToken;
      isAuthenticated.value = true;

      localStorage.setItem("token", generatedToken);
      localStorage.setItem("currentUser", JSON.stringify(user.value));

      loading();

      setTimeout(() => {
        router.push("/student-records");
        successMsg({
          title: "Success",
          message: "Login Sucessful",
          type: "success",
          duration: 2000,
        });
      }, 1000);

      return true;
    } catch (err) {
      console.log(err);

      error.value = "Login failed";
      console.log(error.value);
      return false;
    } finally {
      isLoading.value = true;
    }
  };

  const logout = (): void => {
    loading();
    user.value = null;
    token.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");

    setTimeout(() => {
      router.push("/login");
    }, 1000);
  };

  const initializeAuth = (): void => {
    loading();
    const storedToken: string | null = localStorage.getItem("token");
    const storedUser: string | null = localStorage.getItem("currentUser");

    if (storedToken && storedUser) {
      token.value = storedToken;
      user.value = JSON.parse(storedUser) as User;
      isAuthenticated.value = true;
    }
  };

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    getUser,
    isLoggedIn,
    getError,
    register,
    login,
    logout,
    initializeAuth,
  };
});
