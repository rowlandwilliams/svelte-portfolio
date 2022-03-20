<script lang="ts">
	import Chart from './Chart/Chart.svelte';
	import ChartFooter from './ChartFooter/ChartFooter.svelte';
	import ChartHeader from './ChartHeader/ChartHeader.svelte';
	import Tooltip from './Tooltip/Tooltip.svelte';
	import days from './data/days.json';
	import weeks from './data/weeks.json';
	import { getScale } from './utils/plot';
	import { getActiveDayData, getActiveWeekData } from './utils/utils';
	import { bisector } from 'd3-array';
	import type { ProjectsResponse, TooltipData } from 'src/types/types';

	export let projects: ProjectsResponse;
	let width: number;
	let height = 100;
	let activeTime = '1Y';

	const dates = days.map(({ date }) => new Date(date));
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

		if (i < days.length) {
			point = days[i];
		}

		tooltipData.date = days[i].date;
		tooltipData.value = daysData[i].value;
	};

	$: daysData = getActiveDayData(days, activeTime);
	$: weeksData = getActiveWeekData(weeks, activeTime);

	$: xScale = getScale(daysData, width, height).x;
	$: yScale = getScale(weeksData, width, height).y;
	$: point = days[0];
</script>

<div class=" flex w-full flex-col gap-y-8 rounded  border-b border-gray-100 py-2 ">
	<ChartHeader bind:activeTime />
	<div bind:clientWidth={width} class="relative flex flex-col">
		<Chart
			{width}
			{height}
			{hovered}
			{xScale}
			{yScale}
			{daysData}
			{weeksData}
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
