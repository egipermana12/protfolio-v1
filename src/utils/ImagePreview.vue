<script setup lang="ts">
	import { ref, watch, onMounted } from 'vue'

	import {useProjectSupabase} from '@stores/projectSupabaseStore'  
	const supabaseProject = useProjectSupabase()

	const props = defineProps({
		label: String,
		defaultPreview: String,
		uuid: String
	});	

	// 1. Definisikan Emits
    const emit = defineEmits(['imageDeleted']);

	const preview = ref<string | null>(props.defaultPreview || null)

	const removeImage = async (e: Event) => {
		if(preview.value == null){
			return false;
		}
		try{
			const success = await supabaseProject.deteleThumbnail({url: preview, uuid: props.uuid})

			if(success){
				// Hapus nilai preview lokal
                preview.value = null; 
                
                // 2. Emit event setelah penghapusan berhasil
                emit('imageDeleted'); 
                console.log('Emit event imageDeleted');
			}
		}catch(error: any){
			console.log(error)
		}
	}

</script>

<template>
	<div class="image_wrapper">
		<label for="" v-if="label" class="label_input">{{label}}</label>
		<div class="wrapperimg_prev" v-if="preview">
			<img :src="preview" alt="preview" class="img_prev" />
			<button class="clear_image" @click="removeImage">Hapus</button>
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