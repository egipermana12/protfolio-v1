<script setup lang="ts">
	import { ref, watch, onUnmounted } from 'vue'

	const props = defineProps({
		modelValue: File,
		label: String,
		defaultPreview: String,
	});

	const emit = defineEmits(['update:modelValue']);

	const preview = ref(props.defaultPreview || null);
	
	//handel thumbnail
	const handleFileChange = async(e) => {
		const file = e.target.files[0]
		if(!file) return;

		//untuk preview
		preview.value = URL.createObjectURL(file)
		emit('update:modelValue', file)
	}

	// bersihkan memory saat component dilepas
	onUnmounted(() => {
		if (preview.value) URL.revokeObjectURL(preview.value)
	})
</script>

<template>
	<div class="image_wrapper">
		<label for="" v-if="label">{{label}}</label>
		<input 
			type="file" 
			accept="image/*" 
			@change="handleFileChange" 
			class="imageBtn" />
		<div class="wrapperimg_prev" v-if="preview">
			<img :src="preview" alt="preview" class="img_prev" />
		</div>
	</div>
</template>

<style scoped></style>