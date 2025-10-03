import { createRouter, createWebHistory } from 'vue-router'

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
      },
      {
        path: 'project',
        component: () => import('./../pages/admin/Project.vue'),
      }
    ]
  }
]

const route = createRouter({
  history: createWebHistory(),
  routes,
})

export default route