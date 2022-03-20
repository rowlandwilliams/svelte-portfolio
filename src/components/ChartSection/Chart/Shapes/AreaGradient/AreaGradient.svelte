<script>
	import { daysColor, weeksColor } from '../../../utils/utils';
</script>

<defs>
	<linearGradient id="area-gradient-weeks" gradientTransform="rotate(90)">
		<stop offset="0%" stop-color={weeksColor} />
		<stop offset="100%" stop-color={weeksColor} stop-opacity="0.8" />
	</linearGradient>
	<linearGradient id="area-gradient-days" gradientTransform="rotate(90)">
		<stop offset="10%" stop-color={daysColor} />
		<stop offset="100%" stop-color={daysColor} stop-opacity="1" />
	</linearGradient>
</defs>
