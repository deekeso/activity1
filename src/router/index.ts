import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        requiresAuth: false,
        redirectIfAuth: true,
      },
    },
    {
      path: '/forgot-password',
      name: 'Forgot Password',
      component: () => import('../views/ForgotPassword.vue'),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/StudentRegistration.vue'),
      meta: {
        requiresAuth: true,
      },
    },
  ],
})

// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
  // Check if user is logged in by retrieving from localStorage
  const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true'

  // If route requires authentication and user is not authenticated
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Redirect to login page
    next({ name: 'Login' })
  }
  // If user is authenticated and route has redirectIfAuth flag (like login page)
  else if (isAuthenticated && to.meta.redirectIfAuth) {
    // Redirect already logged in users to the register page
    next({ name: 'Register' })
  }
  // Otherwise proceed normally
  else {
    next()
  }
})

export default router
