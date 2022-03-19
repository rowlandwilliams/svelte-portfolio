<script lang="ts">
	import classNames from 'classnames';
	import type { TooltipData } from 'src/types/types';

	export let left = 200;
	export let tooltip: boolean;
	export let tooltipData = {} as TooltipData;

	$: ({ date, value } = tooltipData);
</script>

{#if tooltipData}
	<div
		class={classNames('absolute -translate-y-full shadow-xl  text-xs bg-white pointer-events-none', {
			hidden: !tooltip,
			block: tooltip
		})}
		style="left: {left}px"
	>
		<h1 class="border-b p-2">{date}</h1>
		<p class="p-2">{value} contributions</p>
	</div>
{/if}
