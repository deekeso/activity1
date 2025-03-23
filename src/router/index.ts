import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/LoginPage.vue'
import RegisterView from '@/views/RegisterPage.vue'
import StudentList from '@/views/StudentListPage.vue'

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
      component: RegisterView,
    },
    {
      path: '/studentlist',
      name: 'studentlist',
      component: StudentList
    },
  ],
})

export default router
