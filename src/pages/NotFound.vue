<script setup lang="ts"></script>

<template>
	<div class="notfound_wrapper">
		<div class="text_wrapper">
			<p class="text_1">The page you are looking for can't be found</p>
			<h1 class="text_2">404</h1>
			<RouterLink to="/" rel="noopener noreferrer">Back Home</RouterLink>
		</div>
	</div>
</template>

<style scoped>
	.notfound_wrapper{
		width: 100%;
		height: 100vh;
		overflow-x: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.text_wrapper{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.text_1{
		font-size: .9rem;
		font-weight: 400;
		line-height: 1.2rem;
	}

	.text_2 {
		box-sizing: border-box;
		font-size: 8rem;
		font-weight: 700;
	}
</style>