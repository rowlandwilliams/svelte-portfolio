<script lang="ts">
	import type { Projects } from 'src/types/types';

	import { onMount } from 'svelte';
	import { querySanityApi } from './utils/utils';

	let projects: Projects;
	const query = `
		query {
			allProject {
				name,
				technologies,
				date
			}
		}
	`;

	onMount(async () => {
		const allProjects = await querySanityApi(query);
		projects = allProjects;
	});
</script>

<div class="grid grid-cols-2">
	{#if projects}
		{#each projects as project}
			<h1 class="max-w-max rounded-sm border border-indigo-400 px-2 text-sm text-indigo-400">
				{project.name}
			</h1>
		{/each}
	{/if}
</div>
