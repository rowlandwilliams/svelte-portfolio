<script lang="ts">
	import { scaleTime, scaleLinear } from 'd3-scale';
	import { extent, max, min } from 'd3-array';
	import { area, line } from 'd3-shape';
	import TimeBuckets from './TimeBuckets/TimeBuckets.svelte';
	import { slide, fly } from 'svelte/transition';

	import data from './data/data.json';
	import AreaGradient from './Shapes/AreaGradient/AreaGradient.svelte';

	let width: number;
	const margin = 0;
	const height = 80;
	const topChartHeight = 120;

	let activeTime = '1Y';

	const getData = (
		data: {
			date: string;
			open: number;
		}[],
		activeTime: string
	) => {
		if (activeTime === '1W') return data.slice(data.length - 7);
		if (activeTime === '2W') return data.slice(data.length - 14);
		if (activeTime === '1M') return data.slice(data.length - 31);
		if (activeTime === '6M') return data.slice(data.length - 31 * 6);

		return data;
	};

	$: chartData = getData(data, activeTime);
	$: xScale = scaleTime()
		.domain(extent(chartData, (d) => new Date(d.date)))
		.range([margin, width - margin]);
	$: yScale = scaleLinear()
		.domain([0, max(chartData, (d) => +d.open)])
		.range([height - margin, margin]);
	$: lineGenerator = line<{ date: string; open: number }>()
		.x((d) => xScale(new Date(d.date)))
		.y((d) => yScale(d.open));
	$: areaGenerator = area<{ date: string; open: number }>()
		.x((d) => xScale(new Date(d.date)))
		.y0((d) => yScale(0))
		.y1((d) => yScale(+d.open));
</script>

<div class=" flex w-full flex-col gap-y-2 rounded  py-2 ">
	<!-- <TimeBuckets bind:activeTime /> -->
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
						stroke="#7263F1"
					/>
				</g></svg
			>
		{/if}
	</div>
</div>
