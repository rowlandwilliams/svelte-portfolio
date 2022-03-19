<script lang="ts">
	import { getData } from './utils/utils';
	import data from './data/days.json';
	import Tooltip from './Tooltip/Tooltip.svelte';
	import type { ProjectsResponse, TooltipData } from 'src/types/types';
	import { getScale } from './utils/plot';
	import ChartFooter from './ChartFooter/ChartFooter.svelte';
	import Chart from './Chart/Chart.svelte';
	import { bisector } from 'd3-array';
	import ChartHeader from './ChartHeader/ChartHeader.svelte';

	export let projects: ProjectsResponse;
	let width: number;
	let height = 160;
	let activeTime = '1Y';

	const dates = data.map(({ date }) => new Date(date));
	const bisect = bisector((d) => d).center;

	let hovered = false;
	let tooltipData: TooltipData = { date: '', value: 0 };

	// define inital coords
	let mouse = { x: 0, y: 0 };

	const handleMouseEnter = () => {
		hovered = true;
	};

	const handleMouseLeave = () => {
		hovered = false;
	};

	const handleMousemove = (event: MouseEvent) => {
		mouse.x = event.offsetX;
		mouse.y = event.offsetY;
		let i = bisect(dates, xScale.invert(mouse.x));

		if (i < data.length) {
			point = data[i];
		}

		tooltipData.date = data[i].date;
		tooltipData.value = chartData[i].value;
	};

	$: chartData = getData(data, activeTime);
	$: xScale = getScale(chartData, width, height).x;
	$: yScale = getScale(chartData, width, height).y;
	$: point = data[0];
</script>

<div class=" flex w-full flex-col gap-y-8 rounded  border-b border-gray-100 py-2 ">
	<ChartHeader bind:activeTime />
	<div bind:clientWidth={width} class="relative flex flex-col gap-y-2">
		<Chart
			{width}
			{height}
			{hovered}
			{xScale}
			{yScale}
			{chartData}
			{handleMouseEnter}
			{handleMouseLeave}
			{handleMousemove}
			{point}
			{projects}
		/>
		<Tooltip
			left={xScale(new Date(point.date))}
			top={yScale(point.value)}
			bind:hovered
			{tooltipData}
		/>
		<ChartFooter bind:height />
	</div>
</div>
