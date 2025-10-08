<script setup lang="ts">
	import {ref, onMounted, onUnmounted} from 'vue'
	import { useRouter } from 'vue-router'
	import {useAuthStore} from '@stores/useAuthStore'

	import DetachIcon from '@icons/detach.svg'
	import OverviewIcon from '@icons/overview.svg'
	import ClipboardIcon from '@icons/clipboard.svg'

	//handle logout
	const router = useRouter()
	const auth = useAuthStore()

	async function handleLogout() {
	  await auth.logout()
	  router.push('/login') // arahkan ke login
	}

	// Definisikan breakpoint Anda di JS agar sesuai dengan CSS
    const MOBILE_BREAKPOINT = 1024; 

	const props = defineProps<{ toggleStatus: boolean }>()
	const emit = defineEmits(['update:toggleStatus']);
	
	// State untuk melacak status mobile
    const isMobile = ref(false);

    // Fungsi untuk memperbarui status mobile
    const checkMobile = () => {
        isMobile.value = window.innerWidth < MOBILE_BREAKPOINT;
    };

	const closeSidebar = () => {
		 if (props.toggleStatus && isMobile.value) {
            emit('update:toggleStatus', false);
        }
	}

	onMounted(() => {
        // Panggil saat komponen pertama kali dimuat
        checkMobile(); 
        // Tambahkan event listener untuk mendeteksi perubahan ukuran
        window.addEventListener('resize', checkMobile);
    });

    onUnmounted(() => {
        // Hapus event listener saat komponen dihancurkan
        window.removeEventListener('resize', checkMobile);
    });


	const sidebars = [
		{name: "Dashboard", icon: OverviewIcon, href: "/admin/dashboard"},
		{name: "Projects", icon: ClipboardIcon, href: "/admin/project"},
	];
</script>

<template>
	<aside class="sidebar_wrapper" :class="{'active_sidebar' : toggleStatus}" v-click-outside="closeSidebar">
		<div class="sidebar_flex">
			<div class="link_nya">
				<div class="sidebar_header">
					<span class="">
						<DetachIcon />
					</span>
					<span class="title_header">
						Admin Panel
					</span>
				</div>
				<ul>
					<li v-for="sidebar in sidebars">
						<RouterLink :to="sidebar.href" class="sidebar_links"><Component :is="sidebar.icon" class="w-6 h-6 fill-current" /> {{sidebar.name}}</RouterLink> 
					</li>
				</ul>
			</div>
			<div class="logout_wrapper">
				<button @click="handleLogout" class="btn_logout">Logout</button>
			</div>
		</div>
	</aside>
</template>

<style scoped>
	.sidebar_wrapper{
		width: 16rem;
		height: 100vh;
		padding-top: 1.5rem;
		padding-bottom: 1.5rem;
    	padding-right: 1rem;
		padding-left: 1rem;
		background: oklch(13% 0.028 261.692);
		color: oklch(92.8% 0.006 264.531);
		transform: none; 
        transition: none; 
    	position: fixed;
    	z-index: 100;
    	transform: translateX(-100%);
  		transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.sidebar_flex{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
	}

	.link_nya{
		overflow-y: auto;
	}

	.active_sidebar{
		transform: none;
	}

	.title_header{
		font-weight: 600;
		font-size: .9rem;
	}

	.sidebar_links{
		display: flex;
		align-items: center;
		gap: .9rem;
		padding-left: .5rem;
		padding-right: .5rem;
		padding-top: .6rem;
		padding-bottom: .6rem;
		font-size: .85rem;
		font-weight: 500;
		border-radius: .5rem;
	}

	.sidebar_links:hover{
		background: var(--bg-secondary);
	}

	.sidebar_links.active{
		color: var(--accent);
	}

	.logout_wrapper{
		padding-left: .5rem;
		padding-right: .5rem;
		padding-top: .6rem;
		padding-bottom: .6rem;
	}

	.btn_logout{
		outline: none;
		box-sizing: border-box;
		background: var(--accent);
		padding: .5rem .5rem;
		width: 100%;
		cursor: pointer;
		border: none;
		color: var(--text);
		font-size: .9rem;
        font-weight: 500;
        border-radius: .2rem;
        text-transform: uppercase;
	}

	.btn_logout:hover{
		background: #2563eb;
	}

	/* tablet */
    @media (max-width: 1023px) {
    	.sidebar_wrapper{
    		position: fixed;
    	}
    }
	/* desktop */
    @media (min-width: 1024px) {
    	.sidebar_wrapper{
    		top: 0;
  			left: 0;
  			position: fixed;
    	}
		.sidebar_header{
			display: flex;
			align-items: center;
			gap: 0.9rem;
			padding-top: 1rem;
			padding-bottom: 2rem;
			padding-left: .5rem;
			padding-right: .5rem;
		}
    }
</style>