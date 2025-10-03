<script setup lang="ts">
	import {ref} from 'vue'
	import Sidebar from '@components/Sidebar.vue';

	const isSidebarOpen = ref(true);
	const toggleSidebar = () => {
        isSidebarOpen.value = !isSidebarOpen.value;
    };

</script>

<template>
	<div class="container_admin">
		<Sidebar v-model:toggleStatus="isSidebarOpen"/>
		<div class="main_content" :class="{'main_content_active' : isSidebarOpen}">
			<nav class="nav_toggle">
				<button id="sidebar-toggle-button" @click= "toggleSidebar">
					<svg data-slot="icon" class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="currentcolor"><path d="M13.25 2.5c.69 0 1.25.56 1.25 1.25v8.5c0 .69-.56 1.25-1.25 1.25H7.5V15h5.75A2.75 2.75 0 0 0 16 12.25v-8.5A2.75 2.75 0 0 0 13.25 1H7.5v1.5zM5.75 1a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-3A2.75 2.75 0 0 1 0 12.25v-8.5A2.75 2.75 0 0 1 2.75 1z"></path></svg>
				</button>
			</nav>
			<div class="content_utama">
				<RouterView />
			</div>
		</div>
	</div>
</template>

<style scoped>
	.container_admin{
		position: relative;
		width: 100%;
		min-height: 100vh;
		display: grid;
  		grid-template-columns: 1fr;
		background: oklch(98.5% 0.002 247.839);
		overflow-x: hidden;
		color: black;
	}
	.main_content{
		overflow-y: auto;
		margin-left: 1rem;
		color: oklch(13% 0.028 261.692);
		transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.nav_toggle{
		padding-left: 1rem;
		padding-right: 1rem;
		padding-top: 1.2rem;
		padding-bottom: 1.2rem;
	}

	.content_utama{
		padding-left: 2rem;
		padding-right: 2rem;
	}

	@media (min-width: 1024px) {
		.main_content_active{
			margin-left: 16rem;
		}
	}
</style>