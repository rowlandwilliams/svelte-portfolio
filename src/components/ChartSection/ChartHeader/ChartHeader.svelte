<script lang="ts">
	import TimeBuckets from '../TimeBuckets/TimeBuckets.svelte';

	export let activeTime: string;
</script>

<div class="flex items-center justify-between border-b border-gray-100 pb-1">
	<h1 class="text-sm font-medium text-gray-800">Projects</h1>
	<TimeBuckets bind:activeTime />
</div>
