import { createRouter, createWebHistory } from 'vue-router'
import DisplayStudentInformation from '@/components/DisplayStudentInformation.vue'
import LogIn from '@/components/LogIn.vue'
import SignUp from '@/components/SignUp.vue'
import UpdatePassword from '@/components/UpdatePassword.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LogIn,
    },
    {
      path: '/goToDisplayStudentInformation',
      name: 'DisplayStudentInformation',
      component: DisplayStudentInformation,
    },
    {
      path: '/goToLogInForm',
      name: 'LogInForm',
      component: LogIn,
    },
    {
      path: '/goToSignUpForm',
      name: 'SignUpForm',
      component: SignUp,
    },
    {
      path: '/goToForgotPassword',
      name: 'ForgotPassword',
      component: UpdatePassword,
    },
  ],
})

export default router
