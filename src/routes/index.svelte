<script lang="ts">
	import Projects from '../components/Projects/Projects.svelte';
	import ChartSection from '../components/ChartSection/ChartSection.svelte';

	import type { ProjectsResponse } from 'src/types/types';

	import { onMount } from 'svelte';
	import { querySanityApi } from '../components/Projects/utils/utils';

	let projects: ProjectsResponse;
	const query = `
		query {
			allProject {
				name,
				technologies,
				startDate,
				endDate
			}
		}
	`;

	onMount(async () => {
		const allProjects = await querySanityApi(query);
		projects = allProjects;
	});
</script>

<div class="mb-8 flex items-center gap-x-2">
	<img src="/rw.svg" alt="rw" class="h-5 w-5" />
	<h1 class="font-medium text-gray-900">Rowland Williams</h1>
</div>
<ChartSection {projects} />
<Projects {projects} />
