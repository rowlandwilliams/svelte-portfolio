<script lang="ts">
	import { chartLayers } from '../../../../../stores';
	import Area from './Area/Area.svelte';
	import Line from './Line/Line.svelte';
	import classNames from 'classnames';
	import type { Area as AreaGenerator, Line as LineGenerator } from 'd3-shape';
	import type { ChartPoint } from 'src/types/types';

	export let areaGenerator: AreaGenerator<ChartPoint>;
	export let lineGenerator: LineGenerator<ChartPoint>;
	export let data: ChartPoint[];
	export let timeframe: string;
</script>

<g
	class={classNames('transition-opacity duration-300', {
		'opacity-100': $chartLayers[timeframe],
		'opacity-0': !$chartLayers[timeframe]
	})}
>
	<Area {areaGenerator} chartData={data} {timeframe} />
	<Line {lineGenerator} chartData={data} {timeframe} />
</g>
