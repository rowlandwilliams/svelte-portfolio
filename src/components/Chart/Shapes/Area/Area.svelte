<script lang="ts">
	import type { Area } from 'd3-shape';
	import type { ChartPoint } from 'src/types/types';

	export let areaGenerator: Area<ChartPoint>;
	export let chartData: ChartPoint[];
</script>

<path
	d={areaGenerator(chartData)}
	stroke-width={1}
	stroke-linecap="round"
	fill="url(#area-gradient)"
/>
