import { createRouter, createWebHistory } from 'vue-router'

import {useAuthStore} from '@stores/useAuthStore'

import Home from './../pages/Home.vue'
const routes = [
  { path: '/', component: Home },
  { path: '/projects', component: () => import('./../pages/projects.vue') },
  { path: '/admin', 
    component: () => import('./../pages/Admin.vue'),
    children: [
      // Route default untuk /admin: mengarahkan ke /admin/dashboard
      {
        path: '',
        redirect: {name: 'admin-dashboard'}
      },
      {
        path: 'dashboard',
        name: 'admin-dashboard',
        component: () => import('./../pages/admin/Dashboard.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'project',
        component: () => import('./../pages/admin/Project.vue'),
        meta: { requiresAuth: true },
        children: [
          {
            path: '',
            redirect: {name: 'project-table'}
          },
          {
            path: 'list',
            name: 'project-table',
            component: () => import('./../pages/admin/ProjectTable.vue'),
            meta: { requiresAuth: true },
          },
          {
            path: 'new',
            component: () => import('./../pages/admin/ProjectNew.vue'),
            meta: { requiresAuth: true },
          },
          {
            path: 'edit/:uuid/:slug',
            component: () => import('./../pages/admin/ProjectEdit.vue'),
            meta: { requiresAuth: true },
          },
        ]
      },
    ]
  },
  {
    path: '/login',
    component: () => import('./../pages/Login.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('./../pages/NotFound.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () => import('./../pages/NotFound.vue'),
  },
  {
    path: '/project/:uuid/:slug',
    name: 'ProjectDetail',
    component: () => import('./../pages/ProjectDetail.vue'),
  },
]


const route = createRouter({
  linkActiveClass: 'active',
  history: createWebHistory(),
  routes,
})

route.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()

  // Pastikan user sudah di-fetch dari Supabase
  if (!auth.user) {
    await auth.fetchUser()
  }

  // Cek apakah route butuh login
  if (to.meta.requiresAuth && !auth.user) {
    return next('/login')
  }

  // Jika user login dan mau ke /login, arahkan ke admin (opsional)
  if (to.path === '/login' && auth.user) {
    return next('/admin')
  }

  next()
})


export default route