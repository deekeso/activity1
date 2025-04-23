import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useRegStore } from "@/stores/RegStore";
import LoginPage from "@/views/LoginPage.vue";
import HomePage from "@/views/HomePage.vue";
import NotFound from "@/views/NotFound.vue";
import type { User } from "@/stores/RegStore";
import ForgotPassword from "@/views/ForgotPassword.vue";

// Router configuration with navigation guards
// Routes defined with authentication requirements
const routes: Array<RouteRecordRaw> = [
  // Default route redirects to login
  {
    path: "/",
    redirect: "/LoginPage",
  },
  // Login and Registration routes are public
  {
    path: "/LoginPage",
    name: "Login",
    component: LoginPage,
  },

  {
    path: "/ForgotPassword",
    name: "ForgotPassword",
    component: ForgotPassword,
  },

  // HomePage requires authentication
  {
    path: "/HomePage",
    name: "Home",
    component: HomePage,
    meta: { requiresAuth: true },
  },
  // Catch-all route for 404 handling
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Navigation guard to protect authenticated routes
router.beforeEach((to, from, next) => {
  const store = useRegStore();

  // Checks if route requires authentication
  if (to.meta.requiresAuth) {
    // Redirects to login if user is not authenticated
    if (!store.$state.currentUser) {
      next({ name: "Login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
