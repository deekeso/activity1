import { createRouter, createWebHistory } from 'vue-router'
import DisplayStudentInformation from '@/components/DisplayStudentInformation.vue'
import LogIn from '@/components/LogIn.vue'
import SignUp from '@/components/SignUp.vue'

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
  ],
})

export default router
