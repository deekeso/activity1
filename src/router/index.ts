import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/loginView.vue";
import RegistrationView from "@/views/RegistrationView.vue";

import IndexView from "@/views/indexView.vue";
import component from "element-plus/es/components/tree-select/src/tree-select-option.mjs";

const routes = [
  { path: "/", name: "Login", component: LoginView },
  { path: "/register", name: "Register", component: RegistrationView },
  { path: "/index", name: "Index", component: IndexView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (to.path === "/home" && !isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

export default router;
