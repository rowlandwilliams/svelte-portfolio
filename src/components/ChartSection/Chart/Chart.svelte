<script lang="ts">
	import { getShapeGenerator } from '../utils/plot';
	import AreaGradient from './Shapes/AreaGradient/AreaGradient.svelte';
	import AreaGroup from './Shapes/AreaGroup/AreaGroup.svelte';
	import Focus from './Shapes/Focus/Focus.svelte';
	import { debounce, getProjectLinePosition } from './utils/utils';
	import type { ScaleLinear, ScaleTime } from 'd3-scale';
	import type { ChartPoint, ProjectsResponse } from 'src/types/types';

	export let width: number;
	export let height: number;
	export let hovered: boolean;
	export let xScale: ScaleTime<number, number, never>;
	export let yScale: ScaleLinear<number, number, never>;
	export let daysData: ChartPoint[];
	export let weeksData: ChartPoint[];
	export let point: ChartPoint = daysData[0];
	export let projects: ProjectsResponse;
	export let handleMousemove: (event: MouseEvent) => void;
	export let handleMouseLeave: () => void;
	export let handleMouseEnter: () => void;

	$: projectLineSectionHeight = projects ? height / projects.length : null;
	$: lineGenerator = getShapeGenerator(xScale, yScale).line;
	$: areaGenerator = getShapeGenerator(xScale, yScale).area;
	$: ({ date, value } = point);

	const timeframes = [
		{ timeframe: 'weeks', data: weeksData },
		{ timeframe: 'days', data: daysData }
	];
</script>

{#if width}
	<svg
		{width}
		{height}
		on:mousemove={debounce(handleMousemove)}
		on:mouseleave={() => handleMouseLeave()}
		on:mouseenter={() => handleMouseEnter()}
	>
		<AreaGradient />
		{#each timeframes as timeframe}
			<AreaGroup {areaGenerator} {lineGenerator} {...timeframe} />
		{/each}

		{#if projects}
			<g>
				{#each projects as project, i}
					<line
						x1={xScale(new Date(project.startDate))}
						x2={xScale(new Date(project.endDate))}
						y1={getProjectLinePosition(i, projectLineSectionHeight)}
						y2={getProjectLinePosition(i, projectLineSectionHeight)}
						class="stroke-indigo-500"
						stroke-dasharray="2"
					/>
				{/each}
			</g>
		{/if}
		<Focus left={xScale(new Date(date))} top={yScale(value)} {height} {hovered} />
	</svg>
{/if}
