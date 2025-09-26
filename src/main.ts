import { createApp } from 'vue'
import './style.css'
import route from './route/route.ts'
import App from './App.vue'

createApp(App).use(route).mount('#app')
