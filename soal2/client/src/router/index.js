import { createRouter, createWebHistory } from 'vue-router'
import ListUser from '../views/ListUser.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import EditUser from '../views/EditUser.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/',
      name: 'home',
      component: ListUser
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/editUser/:id',
      name: 'editUser',
      component: EditUser
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.access_token
  if (to.name == 'login' && isLogin) {
    next('/')
  } else if (to.name == 'home' && !isLogin) {
    next('/login')
  } else {
    next()
  }
})

export default router
