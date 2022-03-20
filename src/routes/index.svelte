<script lang="ts">
	import ChartSection from '../components/ChartSection/ChartSection.svelte';
	import Projects from '../components/Projects/Projects.svelte';
	import { querySanityApi } from '../components/Projects/utils/utils';
	import Header from 'src/components/Header/Header.svelte';
	import type { ProjectsResponse } from 'src/types/types';
	import { onMount } from 'svelte';

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

<Header />
<ChartSection {projects} />
<Projects {projects} />
