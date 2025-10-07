<script setup lang="ts">
	import { ref, watch, onUnmounted } from 'vue'
	const props = defineProps({
		modelValue: String,
		label: String,
	});
	const emit = defineEmits(['update:modelValue']);
</script>

<template>
	<div class="input_wrapper">
		<label for="" class="label_input" v-if="label">{{label}}</label>
		<input 
			type="text" 
			:value="props.modelValue" 
			@input="emit('update:modelValue', $event.target.value)"
			class="input_text">
	</div>
</template>

<style scoped>
	.input_wrapper{
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: .1rem;
		margin: 1rem 0;
	}
	.label_input{
		font-size: .85rem;
		color: var(--dark-600);
	}
	.input_text{
		padding: .6rem;
		border-radius: .3rem;
		border: .115rem solid var(--dark-200);
		box-sizing: border-box;
		outline: none;
	}
	.input_text:focus{
		border: .115rem solid var(--dark-500) !important;
	}
</style>