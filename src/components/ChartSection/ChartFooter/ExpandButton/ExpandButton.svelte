<script lang="ts">
	import Chevron from './Chevron/Chevron.svelte';

	let clicked: boolean = false;
	export let height: number;

	const handleClick = () => {
		clicked = !clicked;
		height = clicked ? 400 : 120;
	};
</script>

<button on:click={() => handleClick()}><Chevron {clicked} /></button>
