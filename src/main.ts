import { createApp } from 'vue'
import './style.css'
import route from './route/route.ts'
import { createPinia } from "pinia";
import App from './App.vue'

createApp(App)
	.use(route)
	.use(createPinia())
	.mount('#app')
