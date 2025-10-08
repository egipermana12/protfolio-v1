<script setup lang="ts">
	import { ref } from 'vue'
	import { useRouter } from 'vue-router'
	import {useAuthStore} from '@stores/useAuthStore'

	const email = ref('')
	const password = ref('')
	const auth = useAuthStore()
	const router = useRouter()

	//handle login
	async function handleLogin(){
		try{
			await auth.login(email.value, password.value)
    		router.push('/admin')
		}catch(err: any) {
		    alert(err.message || 'Login gagal')
		}
	}
</script>

<template>
	<div class="login_wrapper">
		<div class="card_login">
			<h4 class="login_text">LOGIN</h4>
			<p class="login_des">Silahkan login</p>
			<input v-model="email" type="email" placeholder="Email" class="input_text" />
		    <input v-model="password" type="password" placeholder="Password" class="input_text" />
		    <button v-if="auth.loading" disabled class="btn_login">Processing</button>
		    <button v-else @click="handleLogin" class="btn_login">Login</button>
		</div>
	</div>
</template>

<style scoped>
	.login_wrapper{
		width: 100%;
		height: 100vh;
		overflow-x: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.card_login{
		padding: .8rem 2rem;
		border: .5px solid var(--text);
		border-radius: .2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 28rem;
	}

	.login_des{
		font-size: .9rem;
		color: var(--text-secondary);
	}

	.input_text{
		padding: .6rem;
		border-radius: .3rem;
		border: .115rem solid var(--dark-200);
		box-sizing: border-box;
		outline: none;
		width: 100%;
		margin-bottom: 1.2rem;
	}
	.input_text:focus{
		border: .115rem solid var(--dark-500) !important;
	}

	.btn_login{
		outline: none;
		box-sizing: border-box;
		background: var(--accent);
		padding: 1rem 1.5rem;
		width: 100%;
		cursor: pointer;
		border: none;
		color: var(--text);
		font-size: .9rem;
        font-weight: 500;
        border-radius: .3rem;
        text-transform: uppercase;
	}

	.btn_login:hover{
		background: #2563eb;
	}

</style>