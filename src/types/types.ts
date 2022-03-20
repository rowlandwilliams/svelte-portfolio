export interface Project {
	startDate: string;
	endDate: string;
	name: string;
	technologies: string[];
}

export type ProjectsResponse = Project[];

export interface TooltipData {
	date: string;
	value: number;
}

export interface ChartPoint {
	date: string;
	value: number;
}
