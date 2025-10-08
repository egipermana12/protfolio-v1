<script setup lang="ts">
    import { onMounted } from 'vue' 
    import {usePublicStore} from '../stores/usePublicStore'

    const selectedProjects = usePublicStore()

    onMounted(() => {
        selectedProjects.fetchPublishProjects()
    })

	import CardComponent from '@components/CardComponent.vue'
	import courseCard from '@img/course-card.webp'

</script>

<template>
	<section id="projects" class="projects">
        <!-- untuk sticky mobile -->
         <div>
            <ol class="group_list" v-for="project in selectedProjects.projects">
                <CardComponent :cardTitle="project.judul_project" :cardDesc="project.desc" :cardImage="project.thumbnail" :cardTag="project.tags" :linkHref="`/project/${project.id}/${project.slug_project}`" />
            </ol>
         </div>
         <RouterLink to="/projects" rel="noopener noreferrer">View Full Projects Archive</RouterLink>
    </section>
</template>

<style scoped>
	.projects{
        scroll-margin-top: 4rem;
        margin-bottom: 4rem;
    }

    .group_list>li {
        margin-bottom: 3rem;
    }

    /* tablet */
    @media (min-width: 768px) {
        .projects{
            margin-bottom: 6rem;
        }
    }
    
    /* desktop */
    @media (min-width: 1024px) {
        .projects{
            scroll-margin-top: 6rem;
            margin-bottom: 9rem;
        }
    }
</style>