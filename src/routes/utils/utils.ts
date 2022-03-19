export const dayToDate = (year: number, day: number) => {
	const date = new Date(year, 0, day + 1);

	return date.toLocaleDateString();
};

