<script setup lang="ts">
	import { ref } from 'vue'

	import Input from '@utils/Input.vue'
	import InputRadio from '@utils/InputRadio.vue'
	import InputChip from '@utils/InputChip.vue'
	import InputImage from '@utils/InputImage.vue'
	import QuilComponent from '@components/QuilComponent.vue'
	import {slugify} from '@func/useSlugify'

	import {useProjectSupabase} from '../../stores/projectSupabaseStore'	

	const store = useProjectSupabase()

	const form = ref({
		judul_project: '',
		slug_project: '',
		thumbnail: null as File | null,
		desc: '',
		status: 'draft',
		tags: [] as string[]
	});

	const statusPublish = [
	  { label: 'Draft', value: 'draft' },
	  { label: 'Publish', value: 'publish' },
	]

	const errors = ref({
		judul_project: '',
		desc: '',
		tags: '',
		thumbnail: '',
		status: ''
	})

	const validateForm = () => {
		errors.value = {judul_project: '', desc: '', tags: ''}

		if(!form.value.judul_project.trim()){
			errors.value.judul_project = 'Judul tidak boleh kosong'
		}

		if(!form.value.desc.trim()){
			errors.value.desc = 'desc tidak boleh kosong'
		}


		if(!form.value.status.trim()){
			errors.value.status = 'status tidak boleh kosong'
		}


		if(form.value.tags.length < 1){
			errors.value.tags = 'Tags tidak boleh kosong'
		}

		if(form.value.thumbnail && !form.value.thumbnail.type.startsWith('image/')){
			errors.value.desc = 'File harus berupa gambar (jpg/png/webp)'
		}

		// Jika tidak ada error, return true
		return !errors.value.judul_project && !errors.value.desc && !errors.value.thumbnail && !errors.value.tags
	}

	function resetForm() {
	  form.value.judul_project = ''
	  form.value.slug_project = ''
	  form.value.thumbnail = null
	  form.value.desc = ''
	  form.value.status = 'draft'
	  form.value.tags = [] as string[]

	  errors.value = {
	    judul_project: '',
	    desc: '',
	    tags: '',
	    thumbnail: '',
	    status: ''
	  }
	}

	async function handleSubmit() {
		if(!validateForm()){
			console.warn('belum valid')
			return		
		}

		const generatedSlug = slugify(form.value.judul_project);

		form.value.slug_project = generatedSlug;
		
		try{
			const saved = await store.saveProject({
				judul_project: form.value.judul_project,
				slug_project: form.value.slug_project,
				desc: form.value.desc,
				thumbnail: form.value.thumbnail,
				tags: form.value.tags,
				status: form.value.status
			})
			if(saved){
				alert('data berhasil disimpan')
				// ✅ Reset form ke nilai awal
				resetForm()
			}
		}catch (err) {
		    console.error(err)
		    alert('Gagal menyimpan project.')
		}
	}

</script>

<template>
	<div class="new_wrapper">
		<div class="">
			<Input label="Judul Projects" v-model="form.judul_project" />
			<p v-if="errors.judul_project" class="err_message">{{ errors.judul_project }}</p>
		</div>
		<div class="">
			<InputImage label="Thumbnail Image" v-model="form.thumbnail" />
			<p v-if="errors.thumbnail" class="err_message">{{ errors.thumbnail }}</p>
		</div>
		<div class="quilWrapper">
			<QuilComponent v-model="form.desc" label="Deskripsi Project" />
			<p v-if="errors.desc" class="err_message">{{ errors.desc }}</p>
		</div>
		<div class="statusWrapper">
			<InputRadio
		      v-model="form.status"
		      :options="statusPublish"
		      name="user-role"
		      label="Pilih Status"
		    />
		    <p v-if="errors.status" class="err_message">{{ errors.status }}</p>
		</div>
		<div class="">
			<InputChip label="Tags Projects" v-model="form.tags" :set="true"/>
			<p v-if="errors.tags" class="err_message">{{ errors.tags }}</p>
		</div>
		<button v-if="store.loading" disabled class="btnSubmit">Processing</button>
		<button v-else @click="handleSubmit" class="btnSubmit">
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

	.btnSubmit{
		outline: none;
		border: none;
		padding: 1.2rem 2rem;
		border-radius: .5rem;
		cursor: pointer;
		font-weight: 600;
		font-size: .85rem;
		color: var(--text);
		background: var(--bg-secondary);
	}
</style>