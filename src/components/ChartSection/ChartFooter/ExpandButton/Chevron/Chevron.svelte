<script lang="ts">
	import classNames from 'classnames';

	export let clicked: boolean = false;
</script>

<svg
	class={classNames('h-5 w-5 transition-all duration-75 opacity-50', {
		'rotate-180': clicked
	})}
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 20 20"
	fill="currentColor"
	aria-hidden="true"
>
	<path
		fill-rule="evenodd"
		d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
		clip-rule="evenodd"
	/>
</svg>
