<script lang="ts">
	import { scaleTime, scaleLinear } from 'd3-scale';
	import { extent, max, bisector } from 'd3-array';
	import { area, line } from 'd3-shape';

	import TimeBuckets from './TimeBuckets/TimeBuckets.svelte';
	import AreaGradient from './Shapes/AreaGradient/AreaGradient.svelte';

	import { getData, lineColor } from './utils/utils';
	import data from './data/days.json';
	import Tooltip from './Tooltip/Tooltip.svelte';
	import type { TooltipData } from 'src/types/types';
	import { stringify } from 'querystring';

	let width: number;
	let activeTime = '1Y';

	const margin = 0;
	const height = 120;
	const dates = data.map(({ date }) => new Date(date));

	let tooltip: boolean = false;
	let tooltipData = { date: '', value: 0 } as TooltipData;

	// define inital coords
	let m = { x: 0, y: 0 };
	var bisect = bisector((d) => d).right;

	const handleMouseEnter = () => {
		tooltip = true;
	};

	const handleMouseLeave = () => {
		tooltip = false;
	};

	const handleMousemove = (event: MouseEvent) => {
		m.x = event.offsetX;
		m.y = event.offsetY;
		let i = bisect(dates, xScale.invert(m.x));

		if (i < data.length) {
			point = data[i];
		}

		tooltipData.date = data[i].date;
		tooltipData.value = data[i].value;
	};

	$: chartData = getData(data, activeTime);
	$: xScale = scaleTime()
		.domain(extent(chartData, (d) => new Date(d.date)))
		.range([margin, width - margin]);
	$: yScale = scaleLinear()
		.domain([0, max(chartData, (d) => +d.value)])
		.range([height - margin, margin]);
	$: lineGenerator = line<{ date: string; value: number }>()
		.x((d) => xScale(new Date(d.date)))
		.y((d) => yScale(d.value));
	$: areaGenerator = area<{ date: string; value: number }>()
		.x((d) => xScale(new Date(d.date)))
		.y0((d) => yScale(0))
		.y1((d) => yScale(+d.value));
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
				<g>
					<path
						d={areaGenerator(chartData)}
						stroke-width={1}
						stroke-linecap="round"
						fill="url(#area-gradient)"
						class=""
					/>
					<path
						d={lineGenerator(chartData)}
						stroke-width={1}
						stroke-linecap="round"
						fill="none"
						stroke={lineColor}
					/>
				</g></svg
			>
		{/if}
		<Tooltip left={xScale(new Date(point.date))} {tooltip} {tooltipData} />
		<div>
			<div class="flex items-center gap-x-2 py-1">
				<div class="h-2 w-2 rounded-sm bg-orange-300" />
				<p class="text-xs">Github Contributions</p>
			</div>
		</div>
	</div>
</div>
