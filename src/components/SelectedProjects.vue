<script setup lang="ts">
	import CardComponent from '@components/CardComponent.vue'
	import courseCard from '@img/course-card.webp'

	const projects = [
        {
            cardTitle: "Build Website Portfolio",
            cardDesc: "Ini adalah Video course that teaches how to build a web app with the Spotify Web API. Topics covered include the principles of REST APIs, user auth flows, Node, Express, React, Styled Components, and more.",
            cardTag: [
                "Php",
                "Laravel",
                "Livewire",
                "MySQL"
            ],
            cardImage: courseCard,
            linkHref: "https://www.google.com/",
        },
        {
            cardTitle: "Build Website Portfolio Dua",
            cardDesc: "Ini adalah Video course that teaches how to build a web app with the Spotify Web API. Topics covered include the principles of REST APIs, user auth flows, Node, Express, React, Styled Components, and more.",
            cardTag: [
                "Php",
                "Laravel",
                "Livewire",
                "MySQL"
            ],
            cardImage: courseCard,
            linkHref: "https://www.google.com/",
        },
        {
            cardTitle: "Build Website Portfolio Dua",
            cardDesc: "Ini adalah Video course that teaches how to build a web app with the Spotify Web API. Topics covered include the principles of REST APIs, user auth flows, Node, Express, React, Styled Components, and more.",
            cardTag: [
                "Php",
                "Laravel",
                "Livewire",
                "MySQL"
            ],
            cardImage: courseCard,
            linkHref: "https://www.google.com/",
        },
        {
            cardTitle: "Build Website Portfolio Dua",
            cardDesc: "Ini adalah Video course that teaches how to build a web app with the Spotify Web API. Topics covered include the principles of REST APIs, user auth flows, Node, Express, React, Styled Components, and more.",
            cardTag: [
                "Php",
                "Laravel",
                "Livewire",
                "MySQL"
            ],
            cardImage: courseCard,
            linkHref: "https://www.google.com/",
        },
        {
            cardTitle: "Build Website Portfolio Dua",
            cardDesc: "Ini adalah Video course that teaches how to build a web app with the Spotify Web API. Topics covered include the principles of REST APIs, user auth flows, Node, Express, React, Styled Components, and more.",
            cardTag: [
                "Php",
                "Laravel",
                "Livewire",
                "MySQL"
            ],
            cardImage: courseCard,
            linkHref: "https://www.google.com/",
        }
    ];
</script>

<template>
	<section id="projects" class="projects">
        <!-- untuk sticky mobile -->
         <div>
            <ol class="group_list" v-for="project in projects">
                <CardComponent :cardTitle="project.cardTitle" :cardDesc="project.cardDesc" :cardImage="project.cardImage" :cardTag="project.cardTag" :linkHref="project.linkHref" />
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