<script lang="ts">
	import ExpandButton from '../ExpandButton/ExpandButton.svelte';

	export let height: number;
</script>

<div class="flex items-center justify-between">
	<div class="flex items-center gap-x-2 ">
		<div class="h-2 w-2 rounded-sm bg-orange-300" />
		<p class="text-xs">Github Contributions</p>
	</div>
	<ExpandButton bind:height />
</div>
