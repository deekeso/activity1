import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/loginView.vue";
import IndexView from "@/views/indexView.vue";

const routes = [
  { path: "/", component: LoginView },
  {
    path: "/index",
    component: IndexView,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !isAuthenticated
  ) {
    next("/");
  } else {
    next();
  }
});

export default router;
