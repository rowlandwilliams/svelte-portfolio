<script lang="ts">
	import classNames from 'classnames';

	export let time: string;
	export let activeTime: string;
</script>

<button
	on:click
	class={classNames('px-2 py-1 rounded-sm ', {
		'bg-[#7263F1] text-white font-medium': time === activeTime,
		'hover:bg-indigo-50': time !== activeTime
	})}
>
	{time}
</button>
