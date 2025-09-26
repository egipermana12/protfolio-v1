<script setup lang="ts">
	
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