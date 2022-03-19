<script lang="ts">
	import type { TooltipData } from 'src/types/types';

	export let left = 200;
	export let tooltip: boolean;
	export let tooltipData: TooltipData = { date: '', value: 0 };

	$: ({ date, value } = tooltipData);
</script>

{#if date}
	<div
		class="pointer-events-none absolute -translate-y-full  whitespace-nowrap bg-white text-xs shadow-xl"
		style="left: {left}px"
		hidden={!tooltip}
	>
		<h1 class="border-b p-2">{date}</h1>
		<p class="p-2">{value} contributions</p>
	</div>
{/if}
