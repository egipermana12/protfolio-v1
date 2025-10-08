import { createApp } from 'vue'
import './style.css'
import route from './route/route.ts'
import { createPinia } from "pinia";
import App from './App.vue'
import clickOutside from '@func/useClickOutside.ts'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const pinia = createPinia()

createApp(App)
	.component('QuillEditor', QuillEditor)
	.directive('click-outside', clickOutside)
	.use(route)
	.use(pinia)
	.mount('#app')

// Jalankan init session
import {useAuthStore} from '@stores/useAuthStore'
const auth = useAuthStore()
auth.initSession()