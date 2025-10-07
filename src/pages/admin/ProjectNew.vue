<script setup lang="ts">
	import { ref } from 'vue'

	import Input from '@utils/Input.vue'
	import InputImage from '@utils/InputImage.vue'
	import QuilComponent from '@components/QuilComponent.vue'

	import {useProjectSupabase} from '../../stores/projectSupabaseStore'	

	const store = useProjectSupabase()

	const judul_project = ref('')
	const slug_project = ref('')
	const image = ref<File | null>(null)
	const desc = ref('')
	const tags = ref([])

	async function handleSubmit() {
		try{
			await store.saveProject({
		      judul_project: judul_project.value,
		      desc: desc.value,
		      tags: tags.value,
		      image: image.value || undefined,
		    })
		}catch (err) {
		    console.error(err)
		    alert('Gagal menyimpan project.')
		}
	}

</script>

<template>
	<div class="new_wrapper">
		<div class="">
			<Input label="Judul Projects" v-model="judul_project" />
		</div>
		<div class="">
			<InputImage v-model="image" />
		</div>
		<div class="quilWrapper">
			<QuilComponent v-model="desc" />
		</div>
		<div class="">
			<input type="text" v-model="tags" />
		</div>
		<button @click="handleSubmit" class="">
      		Simpan Post
    	</button>
	</div>
</template>

<style scoped>
	.new_wrapper{
		border: 1px solid var(--dark-300);
		border-radius: .4rem;
		padding: 1rem;
		position: relative;
		min-height: 100vh;
	}
</style>