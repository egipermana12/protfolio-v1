import { createMemoryHistory, createRouter } from 'vue-router'

import Home from './../pages/Home.vue'
import About from './../pages/projects.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/projects', component: About },
]

const route = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default route