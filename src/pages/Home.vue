<script setup lang="ts">
	import HeaderHero from '@components/HeaderHero.vue';
	import About from '@components/About.vue';
	import SelectedProjects from '@components/SelectedProjects.vue';
</script>

<template>
	<div class="main">
		<div class="containers">
			<HeaderHero />
			<main id="content" class="content">
				<About />
				<SelectedProjects />
			</main>
		</div>
	</div>
</template>

<style scoped>
	/* base mobile */
    .content{
        padding-top: 6rem;
    }

    /* tablet */

    /* desktop */
    @media (min-width: 1024px) {
        .containers {
            display: flex;
            justify-content: space-between;
            gap: 1rem;
        }

        .content{
            padding-top: 6rem;
            padding-bottom: 6rem;
            width: 52%;
        }
    }
</style>