<script lang="ts">
	import type { TooltipData } from 'src/types/types';

	const padding = 10;

	export let left = 200;
	export let top: number;
	export let hovered: boolean;
	export let tooltipData: TooltipData = { date: '', value: 0 };

	$: ({ date, value } = tooltipData);
</script>

{#if date}
	<div
		class="pointer-events-none absolute -translate-y-full whitespace-nowrap  rounded-sm border border-gray-100 bg-white text-xs text-gray-700 shadow-xl"
		style="left: {left + padding}px; top: {top - padding}px"
		hidden={!hovered}
	>
		<h1 class="border-b p-2 font-medium">{date}</h1>
		<p class="p-2">
			<span class="font-medium text-indigo-500">{value}</span> contribution{value !== 1 ? 's' : ''}
		</p>
	</div>
{/if}
