<script lang="ts">
	import classNames from 'classnames';
	import type { Line } from 'd3-shape';
	import type { ChartPoint } from 'src/types/types';

	export let lineGenerator: Line<ChartPoint>;
	export let chartData: ChartPoint[];
	export let timeframe: string;

	const isDays = timeframe === 'days';
</script>

<path
	d={lineGenerator(chartData)}
	stroke-width={1}
	stroke-linecap="round"
	fill="none"
	class={classNames({ 'stroke-yellow-300': isDays, 'stroke-red-400': !isDays })}
/>
