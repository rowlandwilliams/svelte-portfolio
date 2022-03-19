<script lang="ts">

    let areaGenerator: Line
(data: {
    date: string;
    open: number;
}[] => string
</script>

<path
	d={areaGenerator(chartData)}
	stroke-width={1}
	stroke-linecap="round"
	fill="url(#area-gradient)"
/>
