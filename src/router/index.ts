// Import required methods from Vue Router to create routing for the app
import { createWebHistory, createRouter } from "vue-router";

// Import views that will be linked to specific routes
import LoginView from "../views/LoginView.vue"; // Login page view
import HomeView from "../views/HomeView.vue"; // Home page view
import NotFoundPageView from "../views/NotFoundPageView.vue";

// Define the routes for the application
const routes = [
  { path: "/", name: "login", component: LoginView },
  {
    path: "/registration",
    component: HomeView,
  },
  {
    // Catch all route for 404 page
    path: "/:pathMatch(.*)",
    name: "NotFound",
    component: NotFoundPageView,
  },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
