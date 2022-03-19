<script lang="ts">
	import TimeBuckets from './TimeBuckets/TimeBuckets.svelte';
	import { getData } from './utils/utils';
	import data from './data/days.json';
	import Tooltip from './Tooltip/Tooltip.svelte';
	import type { TooltipData } from 'src/types/types';
	import { getScale } from './utils/plot';
	import ChartFooter from './ChartFooter/ChartFooter.svelte';
	import Chart from './Chart/Chart.svelte';
	import { bisect } from 'd3-array';

	let width: number;
	let height = 160;
	let activeTime = '1Y';

	const dates = data.map(({ date }) => new Date(date));

	$: tooltip = false;
	let tooltipData: TooltipData = { date: '', value: 0 };

	// define inital coords
	let mouse = { x: 0, y: 0 };

	const handleMouseEnter = () => {
		tooltip = true;
	};

	const handleMouseLeave = () => {
		tooltip = false;
	};

	const handleMousemove = (event: MouseEvent) => {
		mouse.x = event.offsetX;
		mouse.y = event.offsetY;
		let i = bisect(dates, xScale.invert(mouse.x));

		if (i < chartData.length) {
			point = chartData[i];
		}

		tooltipData.date = chartData[i].date;
		tooltipData.value = chartData[i].value;
	};

	$: chartData = getData(data, activeTime);
	$: xScale = getScale(chartData, width, height).x;
	$: point = data[0];
</script>

<div class=" flex w-full flex-col gap-y-8 rounded  border-b border-gray-100 py-2 ">
	<div class="flex items-center justify-between border-b border-gray-100 pb-1">
		<h1 class="text-sm font-medium text-gray-800">Projects</h1>
		<TimeBuckets bind:activeTime />
	</div>

	<div bind:clientWidth={width} class="relative flex flex-col gap-y-2">
		<Chart
			{width}
			{height}
			{xScale}
			{chartData}
			{handleMouseEnter}
			{handleMouseLeave}
			{handleMousemove}
		/>
		<Tooltip left={xScale(new Date(point.date))} bind:tooltip {tooltipData} />
		<ChartFooter bind:height />
	</div>
</div>
