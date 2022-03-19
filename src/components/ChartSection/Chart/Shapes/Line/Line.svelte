
<script lang="ts">
	import type { Line } from 'd3-shape';
	import type { ChartPoint } from 'src/types/types';
	import { lineColor } from '../../../utils/utils';

	export let lineGenerator: Line<ChartPoint>;
	export let chartData: ChartPoint[];
</script>

<path
	d={lineGenerator(chartData)}
	stroke-width={1}
	stroke-linecap="round"
	fill="none"
	stroke={lineColor}
/>
