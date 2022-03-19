<script lang="ts">
	import { scaleTime, scaleLinear } from 'd3-scale';
	import { extent, max, min } from 'd3-array';
	import { area, line } from 'd3-shape';

	import data from './data/days.json';
	import AreaGradient from './Shapes/AreaGradient/AreaGradient.svelte';

	import { convertRawContributionData, lineColor } from './utils/utils';

	import contributions from './data/contributions2022.json';
	import TimeBuckets from './TimeBuckets/TimeBuckets.svelte';

	let width: number;
	const margin = 0;
	const height = 120;
	const topChartHeight = 120;

	let activeTime = '1Y';

	const getData = (
		data: {
			date: string;
			value: number;
		}[],
		activeTime: string
	) => {
		if (activeTime === '1W') return data.slice(data.length - 7);
		if (activeTime === '2W') return data.slice(data.length - 14);
		if (activeTime === '1M') return data.slice(data.length - 31);
		if (activeTime === '6M') return data.slice(data.length - 31 * 6);
		if (activeTime === '2022') return data.filter(({ date }) => date.substring(0, 4) === '2022');
		if (activeTime === '2021') return data.filter(({ date }) => date.substring(0, 4) === '2021');

		return data;
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
</script>

<div class=" flex w-full flex-col gap-y-8 rounded  py-2 ">
	<div class="flex items-center justify-between border-b border-gray-100 pb-1">
		<h1 class="text-sm font-medium text-gray-800">Projects</h1>
		<TimeBuckets bind:activeTime />
	</div>

	<div bind:clientWidth={width}>
		{#if width}
			<svg {width} {height}>
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
		<div>
			<div class="flex items-center gap-x-2 py-1">
				<div class="h-2 w-2 rounded-sm bg-orange-300" />
				<p class="text-xs">Github Contributions</p>
			</div>
		</div>
	</div>
</div>
