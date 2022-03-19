<script lang="ts">
	import type { ScaleLinear, ScaleTime } from 'd3-scale';
	import type { ChartPoint, ProjectsResponse } from 'src/types/types';
	import { getShapeGenerator } from '../utils/plot';
	import Area from './Shapes/Area/Area.svelte';

	import AreaGradient from './Shapes/AreaGradient/AreaGradient.svelte';
	import Line from './Shapes/Line/Line.svelte';
	import Focus from './Shapes/Focus/Focus.svelte';
	import { getProjectLinePosition } from './utils/utils';

	export let width: number;
	export let height: number;
	export let hovered: boolean;
	export let xScale: ScaleTime<number, number, never>;
	export let yScale: ScaleLinear<number, number, never>;
	export let chartData: ChartPoint[];
	export let point: ChartPoint = chartData[0];
	export let projects: ProjectsResponse;
	export let handleMousemove: (event: MouseEvent) => void;
	export let handleMouseLeave: () => void;
	export let handleMouseEnter: () => void;

	const padding = 0;
	$: projectLineSectionHeight = projects ? (height - padding) / projects.length : null;
	$: lineGenerator = getShapeGenerator(xScale, yScale).line;
	$: areaGenerator = getShapeGenerator(xScale, yScale).area;
	$: ({ date, value } = point);
</script>

{#if width}
	<svg
		{width}
		{height}
		on:mousemove={handleMousemove}
		on:mouseleave={() => handleMouseLeave()}
		on:mouseenter={() => handleMouseEnter()}
	>
		<AreaGradient />
		{#if projects}
			<g transform="translate(0,{padding / 2})">
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
		<Area {areaGenerator} {chartData} />
		<Line {lineGenerator} {chartData} />
		<Focus left={xScale(new Date(date))} top={yScale(value)} {height} {hovered} />
	</svg>
{/if}
