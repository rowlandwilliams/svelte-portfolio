<script lang="ts">
	import classNames from 'classnames';

	const padding = 10;
	export let left = 0;
	export let top = 0;
	export let height = 0;
	export let hovered: boolean;
</script>

<g class={classNames('stroke-indigo-500 fill-indigo-400', { hidden: !hovered })}>
	<line x1={left} y1="0" x2={left} y2={height - padding} class="opacity-50" />
	<circle r="3" cx={left} cy={top} />
</g>
