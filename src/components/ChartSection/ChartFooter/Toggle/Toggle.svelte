<script lang="ts">
	import { chartLayers } from 'src/stores';

	export let timeframe: string;
	export let toggleColor: string;
	export let layer: string;
</script>

<label
	class="group relative flex items-center justify-between gap-x-2 p-2"
	on:change={() => {
		chartLayers.update((state) => {
			state[layer] = !state[layer];
			return state;
		});
	}}
>
	<input
		type="checkbox"
		class="left-1/8 peer absolute z-0 hidden appearance-none rounded-md"
		checked
	/>
	<span
		class="flex h-2 w-8 flex-shrink-0 cursor-pointer items-center rounded-full bg-gray-300 duration-300 ease-in-out after:h-4 after:w-4 after:rounded-full after:border after:border-gray-100 after:bg-white after:shadow-sm after:duration-300 {toggleColor} peer-checked:after:translate-x-4"
	/>
	<span>{timeframe}</span>
</label>
