/**
 * index.ts - Main Router Rendering
 *
 * Sets up the layout, unique paths, navigation guard
 * meta details and respective style files for each route.
 *
 */

import UserLayout from "@/layout/UserLayout.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useAuthStore } from "@/store/useAuthStore";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: UserLayout,
    children: [
      {
        path: "/",
        name: "Sign In",
        component: () => import("../views/Login.vue"),
        meta: { title: "Login", style: "login.css", requiresGuest: true },
      },
      {
        path: "/forgot-pass",
        name: "Forgot Password?",
        component: () => import("../views/ForgotPassword.vue"),
        meta: { title: "Login", style: "login.css", requiresGuest: true },
      },
      {
        path: "/register",
        name: "Register",
        component: () => import("../views/Register.vue"),
        meta: { title: "Register", style: "register.css", requiresAuth: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/"); // Redirect to login if not authenticated
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next("/register"); // Redirect to register if already authenticated
  } else {
    next(); // Proceed to route
  }
});

export default router;
