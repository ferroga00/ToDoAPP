import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { projectAuth } from '@/firebase/config'

// auth guard
const authGuard = (to: any, from: any, next: any) => {
  let user = projectAuth.currentUser;
  if (!user) {
    next({
      name: 'Welcome'
    })
  } else {
    next();
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Welcome',
    component: () => import('../views/WelcomeView.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
    beforeEnter: authGuard
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
