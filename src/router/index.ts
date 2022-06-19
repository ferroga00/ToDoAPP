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
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: () => import('../views/TasksView.vue'),
    beforeEnter: authGuard
  },
  {
    path: '/project',
    name: 'Project',
    component: () => import('../views/ProjectsView.vue'),
    beforeEnter: authGuard
  },
  {
    path: '/projects/:projectId',
    name: 'Projects',
    component: () => import('../views/ProjectsBoardView.vue'),
    beforeEnter: authGuard
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue'),
    beforeEnter: authGuard
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
