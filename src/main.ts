import { createApp } from 'vue'
import './style.css'
import route from './route/route.ts'
import { createPinia } from "pinia";
import App from './App.vue'
import clickOutside from '@func/useClickOutside.ts'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

createApp(App)
	.component('QuillEditor', QuillEditor)
	.directive('click-outside', clickOutside)
	.use(route)
	.use(createPinia())
	.mount('#app')
