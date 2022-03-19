<script lang="ts">
	import TimeBucket from './TimeBucket/TimeBucket.svelte';

	const times: string[] = ['1W', '2W', '1M', '6M', '1Y', '2021', '2022'];

	export let activeTime: string;

	const handleTimeClick = (time: string) => {
		activeTime = time;
	};
</script>

<div class="flex items-center justify-end gap-x-2 text-xs text-gray-500">
	<!-- <h1 class="font-semibold">Timeframe:</h1> -->
	{#each times as time}
		<TimeBucket {time} {activeTime} on:click={() => handleTimeClick(time)} />
	{/each}
</div>
