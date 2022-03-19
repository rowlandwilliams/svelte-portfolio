<script lang="ts">
	import type { ProjectsResponse } from 'src/types/types';

	export let projects: ProjectsResponse;
</script>

<div class="grid grid-cols-3 gap-4 py-4">
	{#if projects}
		{#each projects as project}
			<div class=" rounded-sm border border-gray-100">
				<h1 class="max-w-max rounded-sm  p-4 px-2 text-sm font-medium text-gray-700">
					{project.name}
				</h1>
			</div>
		{/each}
	{/if}
</div>
