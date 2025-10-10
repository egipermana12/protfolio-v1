<script setup lang="ts">
	import { ref, onMounted } from 'vue'
	import Input from '@utils/Input.vue'
	import InputRadio from '@utils/InputRadio.vue'
	import InputChip from '@utils/InputChip.vue'
	import InputImage from '@utils/InputImage.vue'
	import QuilComponent from '@components/QuilComponent.vue'
	import {slugify} from '@func/useSlugify'
	import { useRoute, useRouter } from 'vue-router'
	import route from '../../route/route.ts'

	import {useProjectSupabase} from '../../stores/projectSupabaseStore'  

	const supabaseProject = useProjectSupabase()

	const vrouter = useRoute()

	const existingThumbnailUrl = ref<string | null>(null);

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

	onMounted(async () => {
		const uuid = vrouter.params.uuid as string
  		const slug = vrouter.params.slug as string

  		if (!uuid || !slug) {
			route.push('/admin') // Redirect jika parameter URL hilang
  		}

  		try {
  			await supabaseProject.fetchSingeProject({
  				uuid: uuid,
  				slug: slug
  			})
  			const getData = supabaseProject.projects
  			// 1. Simpan URL thumbnail yang ada (String)
        	if (getData.thumbnail) {
            	existingThumbnailUrl.value = getData.thumbnail as string;
        	}
  			form.value = {
  				...form.value,
  				judul_project: getData.judul_project,
  				slug_project: getData.slug,
				desc: getData.desc,
				status: getData.status,
				tags: getData.tags
  			}
  		}catch (error: any) {
  			route.push('/admin')
  		}
	})


</script>

<template>
	<div class="new_wrapper">
		<div class="">
			<Input label="Judul Projects" v-model="form.judul_project" />
			<p v-if="errors.judul_project" class="err_message">{{ errors.judul_project }}</p>
		</div>
		<div class="">
			<InputImage label="Thumbnail Image" v-model="form.thumbnail" :existingUrl="existingThumbnailUrl" />
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
		<button v-if="supabaseProject.loading" disabled class="btnSubmit">Processing</button>
		<button v-else @click="handleSubmit" class="btnSubmit">
      		Update Post
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