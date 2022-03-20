<script lang="ts">
	import timeframes from '../data/timeframes.json';
	import ExpandButton from './ExpandButton/ExpandButton.svelte';
	import Toggle from './Toggle/Toggle.svelte';

	export let height: number;
</script>

<div class="flex items-center justify-between">
	<div class="flex items-center gap-x-4 text-xs">
		<h1>Contributions:</h1>

		{#each timeframes as timeframe}
			<Toggle {...timeframe} />
		{/each}
	</div>
	<ExpandButton bind:height />
</div>
