import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'
import ForgotPasswordView from '@/views/ForgotPasswordView.vue'
import { useStudentStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter(to, from, next) {
        const isAuthenticated = useStudentStore().handlePersistLogin()
        if (isAuthenticated) {
          next()
        } else {
          next('/login')
        }
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      beforeEnter(to, from, next) {
        const isAuthenticated = useStudentStore().handlePersistLogin()
        if (isAuthenticated) {
          next('/')
        } else {
          next()
        }
      },
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
      beforeEnter(to, from, next) {
        const isAuthenticated = useStudentStore().handlePersistLogin()
        if (isAuthenticated) {
          next('/')
        } else {
          next()
        }
      },
    },
    {
      path: '/forgot_pass',
      name: 'Forgot password',
      component: ForgotPasswordView,
      beforeEnter(to, from, next) {
        const isAuthenticated = useStudentStore().handlePersistLogin()
        if (isAuthenticated) {
          next('/')
        } else {
          next()
        }
      },
    },
  ],
})

export default router
