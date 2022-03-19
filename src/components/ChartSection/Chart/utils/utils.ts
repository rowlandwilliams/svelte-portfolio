export const getProjectLinePosition = (index: number, projectLineSectionHeight: number) => {
	return index * projectLineSectionHeight + projectLineSectionHeight / 2;
};
