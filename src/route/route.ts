import { createRouter, createWebHistory } from 'vue-router'

import Home from './../pages/Home.vue'
import About from './../pages/projects.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/projects', component: About },
]

const route = createRouter({
  history: createWebHistory(),
  routes,
})

export default route