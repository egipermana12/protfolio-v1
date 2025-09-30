<script setup lang="ts">
	import { onMounted } from 'vue'	
	import {useProjectSupabase} from '../stores/projectSupabaseStore'	
	const supabaseProject = useProjectSupabase()

	onMounted(async () => {
		await supabaseProject.fetchProject();
	});
</script>

<template>
	<div class="main">
		<section class="container">
			<RouterLink to="/" rel="noopener noreferrer">Back</RouterLink>
			<h3 class="text_projects">All Projects</h3>
			<table id="content" class="table_projects">
				<thead class="table_projects_thead">
					<tr>
						<th class="table_projects_th">Project</th>
						<th class="table_projects_th">Description</th>
						<th class="table_projects_th">Build with</th>
					</tr>
				</thead>
				<tbody >
					<tr class="table_projects_trbody" v-for="project in supabaseProject.projects" :key="project.id">
						<td class="table_projects_tdbody">
							<div class="td_higlight">{{project.judul_project}}</div>
						</td>
						<td class="table_projects_tdbody">
							<div class="">{{project.desc}}</div>
						</td>
						<td class="table_projects_tdbody card_tag">
							<li class="tag_li" v-for="tag in project.tags">
                            	<div class="tag_text">{{tag}}</div>
                        	</li>
 						</td>
					</tr>
				</tbody>
			</table>
		</section>
	</div>
</template>

<style scoped>
	.text_projects{
		letter-spacing: -.025em;
		font-weight: 700;
		font-size: 2.25rem;
    	line-height: 2.5rem;
	}

	.table_projects{
		margin-top: 3rem;
		width: 100%;
		border-collapse: collapse;
		text-align: left;
	}

	.table_projects_thead{
		position: sticky;
		top: 0;
		z-index: 10;
		border-bottom: 1px solid;
		border-color: rgba(203, 213, 225, .1);
		background-color: rgba(15, 23, 42, .75);
	}

	.table_projects_th{
		padding-top: 1rem;
    	padding-bottom: 1rem;
    	padding-right: 2rem;
    	font-size: .875rem;
    	line-height: 1.25rem;
    	font-weight: 600;
	}

	.table_projects_trbody{
		border-bottom: 1px solid;
		border-color: rgba(203, 213, 225, .1);
	}

	.table_projects_tdbody{
		padding-top: 1rem;
    	padding-bottom: 1rem;
    	padding-right: 1rem;
    	vertical-align: top;
    	font-size: .875rem;
    	line-height: 1.25rem;
    	color: var(--text-secondary);
	}

	.td_higlight{
		font-weight: 600;
		line-height: 1.375;
		color: var(--text);
	}

	.card_tag {
    	margin-top: .5rem;
    	display: flex;
    	flex-wrap: wrap;
    	transform: translateY(-12px);
	}

	.tag_li {
    	margin-right: .375rem;
    	margin-top: .5rem;
	}

	.tag_text {
	    display: flex;
	    align-items: center;
	    border-radius: 9999px;
	    padding-left: .75rem;
	    padding-right: .75rem;
	    padding-top: .25rem;
	    padding-bottom: .25rem;
	    font-size: .75rem;
	    line-height: 1rem;
	    font-weight: 600;
	    line-height: 1.25rem;
	    background-color: rgba(59, 130, 246, .2);
	    color: var(--accent);
	}

	@media (min-width: 640px) {
		.text_projects {
			font-size: 3rem;
        	line-height: 1;
		}
	}

	@media (min-width: 1024px) {
		.container{
			padding-top: 6rem;
		}
	}
</style>