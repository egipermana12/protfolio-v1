import { createApp } from 'vue'
import './style.css'
import route from './route/route.ts'
import { createPinia } from "pinia";
import App from './App.vue'
import clickOutside from '@func/useClickOutside.ts'

createApp(App)
	.directive('click-outside', clickOutside)
	.use(route)
	.use(createPinia())
	.mount('#app')
