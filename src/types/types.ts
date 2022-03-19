export interface Project {
	date: null;
	name: string;
	technologies: string[];
}

export type Projects = Project[];

export interface TooltipData {
	date: string;
	value: number;
}

export interface ChartPoint {
	date: string;
	value: number;
}
