<script>
	import { line } from 'd3-shape';

	import { lineColor } from '../../utils/utils';
</script>

<defs>
	<linearGradient id="area-gradient" gradientTransform="rotate(90)">
		<stop offset="10%" stop-color={lineColor} />
		<stop offset="100%" stop-color={lineColor} stop-opacity="0.8" />
	</linearGradient>
</defs>
