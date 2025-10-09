<script setup lang="ts">
	import { ref, onMounted } from 'vue'
	import { useRoute, useRouter } from 'vue-router'

	import {usePublicStore} from '../stores/usePublicStore'

    const selectedProjects = usePublicStore()

    const route = useRoute()
    const router = useRouter()

    onMounted(async () => {
    	const uuid = route.params.uuid as string
  		const slug = route.params.slug as string

  		if (!uuid || !slug) {
			router.replace('/404') // Redirect jika parameter URL hilang
			return
  		}

    	try {
    		await selectedProjects.getSingleProject({
		    uuid: uuid as string,
		    slug: slug as string
		  })
    	}catch (error: any) {
		    router.replace('/404') // **Redirect dilakukan di sini**
    	}

    })
</script>

<template>
	<div class="main projectdetail_wrapper container">
		<!-- Loading state -->
	    <div v-if="selectedProjects.loading">Loading project...</div>

	    <!-- Error state -->
	    <div v-else-if="selectedProjects.error">
	      <p class="text-red-500">{{ selectedProjects.error }}</p>
	    </div>

	    <!-- Project detail -->
    	<div v-else-if="selectedProjects.project">
    		<div class="header_wrapper container_inner width_responsive">
    			<div class="link_wrapper">
    				<svg xmlns="http://www.w3.org/2000/svg" width="5" height="8" viewBox="0 0 5 8" fill="none"><path d="M4 1L1 4L4 7" stroke="currentcolor"></path></svg>
    				<RouterLink to="/projects" rel="noopener noreferrer" class="link_button">See All Project</RouterLink>
    			</div>
    			<h1 class="judul_project">
	        		{{ selectedProjects.project.judul_project }}
	      		</h1>
    		</div>
    		<div class="content_wrapper container_inner width_responsive">
    			<!-- untuk thumbnail -->
    			<div class="thumbnail_wrapper">
    				<img :src="selectedProjects.project.thumbnail" alt="image" class="card_thumbnail">
    			</div>

    			<!-- untuk desc -->
    			<div class="desc_wrapper container_inner width_responsive">
    				<div v-html="selectedProjects.project.desc" class="prose"></div>
    			</div>

    			<!-- untuk tag -->

    			<ul class="tag_wrapper_prose">
    				<span class="tags_txt">tags:</span>
			        <li
			          v-for="tag in selectedProjects.project.tags"
			          :key="tag"
			          class="px-3 py-1 bg-gray-200 rounded text-sm"
			        >
			          {{ tag }}
			        </li>
			    </ul>
    		</div>
      	</div>
      	<!-- Not found fallback -->
      	<div v-else>
      		<p>Project tidak ditemukan.</p>
    	</div>
	</div>
</template>

<style scoped>

	.projectdetail_wrapper{
		min-height: 500px;
	}

	.container{
		width: 100%;
	    padding-right: 15px;
	    padding-left: 15px;
	    margin-right: auto;
	    margin-left: auto;
	    margin-bottom: 10rem;
	}

	.container_inner{
		display: flex;
		margin-left: auto;
		margin-right: auto;
		position: relative;
	}

	.header_wrapper{
		margin-top: 6rem;
		margin-bottom: 20px;
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.content_wrapper{
		margin-top: 3rem;
		margin-bottom: 20px;
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.thumbnail_wrapper{
		width: 100%;
		height: auto;
	}

	.card_thumbnail{
		max-width: 680px;
		min-width: 680px;
		height: auto;
	}

	.width_responsive{
		max-width: 700px;
	}

	.link_wrapper{
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 6px;
		margin-bottom: 10px;
	}

	.link_button{
		font-size: 12px;
		font-weight: 300;
	}

	.judul_project{
		margin-bottom: 20px;
		font-size: 32px;
		font-weight: 500;
		line-height: 42px;
	}

	.tag_wrapper_prose {
		display: flex;
		gap: .5rem;
		align-items: center;
		justify-content: start;
	}

	.tags_txt{
		font-size: .8rem;
	}

	@media (min-width: 576px) {
		.projectdetail_wrapper{
			max-width: 540px;
		}
		
	}

	@media (min-width: 768px) {
		.projectdetail_wrapper{
			max-width: 720px;
		}
		
	}

	@media (min-width: 992px) {
		.projectdetail_wrapper{
			max-width: 960px;
		}	
	}
	@media (min-width: 1200px) {
		.projectdetail_wrapper{
			max-width: 1140px;
		}
		
	}
</style>