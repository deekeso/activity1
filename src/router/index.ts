import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import StudentListPage from '@/views/StudentListPage.vue'
import { useStudentStore } from '@/stores/PiniaStore'
import ForgotPassword from '@/views/ForgotPasswordPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage,
    },
    {
      path: '/studentlist',
      name: 'studentlist',
      component: StudentListPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/forgotpassword',
      name: 'forgotpassword',
      component: ForgotPassword,
    },
  ],
})

router.beforeEach((to, from, next) => {
  const accountStore = useStudentStore()

  // Check if the user is authenticated
  if (to.meta.requiresAuth && !accountStore.isAuhthenticated) {
    // Redirect to login if not authenticated
    next({ name: 'home' })
  } else if (to.name === 'home' && accountStore.isAuhthenticated) {
    // Redirect to student list if already logged in and trying to access login page
    next({ name: 'studentlist' })
  } else {
    // Otherwise, allow access
    next()
  }
})

export default router
