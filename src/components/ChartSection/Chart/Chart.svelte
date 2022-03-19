<script lang="ts">
	import { bisect } from 'd3-array';
	import type { ScaleTime } from 'd3-scale';
	import type { ChartPoint } from 'src/types/types';
	import { getScale, getShapeGenerator } from '../utils/plot';
	import Area from './Shapes/Area/Area.svelte';

	import AreaGradient from './Shapes/AreaGradient/AreaGradient.svelte';
	import Line from './Shapes/Line/Line.svelte';

	export let width: number;
	export let height: number;
	export let xScale: ScaleTime<number, number, never>;
	export let chartData: ChartPoint[];
	export let handleMousemove: (event: MouseEvent) => void;
	export let handleMouseLeave: () => void;
	export let handleMouseEnter: () => void;

	$: yScale = getScale(chartData, width, height).y;
	$: lineGenerator = getShapeGenerator(xScale, yScale).line;
	$: areaGenerator = getShapeGenerator(xScale, yScale).area;
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
		<Area {areaGenerator} {chartData} />
		<Line {lineGenerator} {chartData} />
	</svg>
{/if}
