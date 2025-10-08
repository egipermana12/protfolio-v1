<script setup lang="ts">
	import { ref, onMounted } from 'vue'
	import { useRoute, useRouter } from 'vue-router'

	import {usePublicStore} from '../stores/usePublicStore'

    const selectedProjects = usePublicStore()

    const route = useRoute()

    onMounted(async () => {
    	const { uuid, slug } = route.params

    	await selectedProjects.getSingleProject({
		    uuid: uuid as string,
		    slug: slug as string
		  })
    })
</script>

<template>
	<div class="projectdetail_wrapper">
		<!-- Loading state -->
	    <div v-if="selectedProjects.loading">Loading project...</div>

	    <!-- Error state -->
	    <div v-else-if="selectedProjects.error">
	      <p class="text-red-500">{{ selectedProjects.error }}</p>
	    </div>

	    <!-- Project detail -->
    	<div v-else-if="selectedProjects.project">
	      	<h1 class="text-2xl font-bold mb-2">
	        	{{ selectedProjects.project.judul_project }}
	      	</h1>
      	</div>
	</div>
</template>

<style scoped></style>