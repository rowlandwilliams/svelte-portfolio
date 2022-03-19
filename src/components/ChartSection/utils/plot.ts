import type { ChartPoint } from '../../../types/types';
import { extent, max } from 'd3-array';
import { scaleLinear, scaleTime, type ScaleLinear, type ScaleTime } from 'd3-scale';
import { area, line } from 'd3-shape';

const margin = 10;

export const getScale = (chartData: ChartPoint[], width: number, height: number) => {
	return {
		x: scaleTime()
			.domain(extent(chartData, (d) => new Date(d.date)))
			.range([0, width]),
		y: scaleLinear()
			.domain([0, max(chartData, (d) => +d.value)])
			.range([height - margin, margin])
	};
};

export const getShapeGenerator = (
	xScale: ScaleTime<number, number, never>,
	yScale: ScaleLinear<number, number, never>
) => {
	return {
		line: line<{ date: string; value: number }>()
			.x((d) => xScale(new Date(d.date)))
			.y((d) => yScale(d.value)),
		area: area<{ date: string; value: number }>()
			.x((d) => xScale(new Date(d.date)))
			.y0(() => yScale(0))
			.y1((d) => yScale(+d.value))
	};
};
