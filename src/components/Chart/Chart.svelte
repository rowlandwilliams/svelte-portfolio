<script lang="ts">
	import { scaleTime, scaleLinear } from 'd3-scale';
	import { extent, max, bisector } from 'd3-array';
	import { area, line } from 'd3-shape';

	import TimeBuckets from './TimeBuckets/TimeBuckets.svelte';
	import AreaGradient from './Shapes/AreaGradient/AreaGradient.svelte';

	import { getData } from './utils/utils';
	import data from './data/days.json';
	import Tooltip from './Tooltip/Tooltip.svelte';
	import type { TooltipData } from 'src/types/types';
	import Area from './Shapes/Area/Area.svelte';
	import Line from './Shapes/Line/Line.svelte';
	import ExpandButton from './ExpandButton/ExpandButton.svelte';
	import { getScale, getShapeGenerator } from './utils/plot';

	let width: number;
	let height = 160;
	let activeTime = '1Y';

	const dates = data.map(({ date }) => new Date(date));

	let tooltip: boolean = false;
	let tooltipData: TooltipData = { date: '', value: 0 };

	// define inital coords
	let mouse = { x: 0, y: 0 };
	var bisect = bisector((d) => d).right;

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

		if (i < data.length) {
			point = data[i];
		}

		tooltipData.date = data[i].date;
		tooltipData.value = data[i].value;
	};

	$: chartData = getData(data, activeTime);
	$: xScale = getScale(chartData, width, height).x;
	$: yScale = getScale(chartData, width, height).y;
	$: lineGenerator = getShapeGenerator(xScale, yScale).line;
	$: areaGenerator = getShapeGenerator(xScale, yScale).area;
	$: point = data[0];
</script>

<div class=" flex w-full flex-col gap-y-8 rounded  py-2 ">
	<div class="flex items-center justify-between border-b border-gray-100 pb-1">
		<h1 class="text-sm font-medium text-gray-800">Projects</h1>
		<TimeBuckets bind:activeTime />
	</div>

	<div bind:clientWidth={width} class="relative">
		{#if width}
			<svg
				{width}
				{height}
				on:mousemove={handleMousemove}
				on:mouseleave={handleMouseLeave}
				on:mouseenter={handleMouseEnter}
			>
				<AreaGradient />
				<Area {areaGenerator} {chartData} />
				<Line {lineGenerator} {chartData} />
			</svg>
		{/if}
		<Tooltip left={xScale(new Date(point.date))} {tooltip} {tooltipData} />
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-x-2 py-1">
				<div class="h-2 w-2 rounded-sm bg-orange-300" />
				<p class="text-xs">Github Contributions</p>
			</div>
			<ExpandButton bind:height />
		</div>
	</div>
</div>
