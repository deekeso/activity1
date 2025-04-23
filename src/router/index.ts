import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ForgotPassword from '../views/ForgotPassword.vue'

// Simulated authentication check
const isAuthenticated = () => {
  // Replace this with real authentication logic
  return localStorage.getItem('auth') === 'true'
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/forgot-password',
      name: 'forgotPassword',
      component: ForgotPassword,
    },
  ],
})

// Navigation guard for protected routes
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/login') // Redirect to login if not authenticated
  } else {
    next() // Allow access
  }
})

export default router
