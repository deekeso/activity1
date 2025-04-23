import { getUser } from '@/composables/helpers'
import ForgotPasswordPage from '@/screens/ForgotPasswordPage.vue'
import HomePage from '@/screens/HomePage.vue'
import LoginPage from '@/screens/LoginPage.vue'
import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  { path: '/', component: LoginPage },
  { path: '/home', component: HomePage },
  { path: '/forgot-password', component: ForgotPasswordPage },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.path === '/' && getUser()) {
    next('/home')
  } else if (to.path === '/forgot-password' && getUser()) {
    next('/home')
  } else if (to.path === '/home' && !getUser()) {
    next('/')
  } else {
    next()
  }
})

export default router
