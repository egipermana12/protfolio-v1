<script setup lang="ts">
	import { ref, watch, onUnmounted } from 'vue'

	const props = defineProps({
		modelValue: File, // File yang dikirim dari parent
		label: String,
		defaultPreview: String,
	});	

	const emit = defineEmits(['update:modelValue']);
	
	// Buat ref untuk input file
    const fileInputRef = ref<HTMLInputElement | null>(null)
	const preview = ref<string | null>(props.defaultPreview || null)
	
	//handel thumbnail
	const handleFileChange = async(e: Event) => {
		const target = e.target as HTMLInputElement
		const file = target.files?.[0]
		if(!file) return;

		//untuk preview
		if (preview.value) URL.revokeObjectURL(preview.value)
		preview.value = URL.createObjectURL(file)

		emit('update:modelValue', file)
	}

	// Hapus file & preview
	const removeImage = () => {
	  if (preview.value) {
	    URL.revokeObjectURL(preview.value)
	    preview.value = null
	  }

	  emit('update:modelValue', null)

	  // Kosongkan nilai input file
	  if (fileInputRef.value) {
	    fileInputRef.value.value = ''
	  }
	}

	// bersihkan memory saat component dilepas
	onUnmounted(() => {
		if (preview.value) URL.revokeObjectURL(preview.value)
	})

	// 🔹 Sinkronkan jika form di parent di-reset (modelValue jadi null)
	watch(
	  () => props.modelValue,
	  (newVal) => {
	    if (!newVal) {
	      removeImage()
	    }
	  }
	)
</script>

<template>
	<div class="image_wrapper">
		<label for="" v-if="label" class="label_input">{{label}}</label>
		<input 
			type="file" 
			accept="image/*" 
			@change="handleFileChange"
			ref="fileInputRef" 
			class="imageBtn" />
		<div class="wrapperimg_prev" v-if="preview">
			<img :src="preview" alt="preview" class="img_prev" />
			<button class="clear_image" @click="removeImage">clear</button>
		</div>
	</div>
</template>

<style scoped>
	.image_wrapper{
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

	.imageBtn{
		background: var(--dark-200);
		padding: .5rem 1.5rem;
		border-radius: .3rem;
		border: .115rem solid var(--dark-300);
	}

	.wrapperimg_prev{
		background: var(--dark-200);
		padding: .5rem;
		border-radius: .5rem;
		margin: .8rem 0;
		width: 18rem;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.img_prev{
		width: 16rem;
		height: auto;
	}

	.clear_image{
		position: absolute;
		top: 0;
		right: 0;
		background: var(--bg);
		color: var(--text);
		outline: none;
		border: none;
		padding: .5rem .9rem;
		cursor: pointer;
	}
</style>
