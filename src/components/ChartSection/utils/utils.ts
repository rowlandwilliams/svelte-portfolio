export const daysColor = '#ffdc5e';
export const weeksColor = '#f7638d';

export const dayToDate = (year: number, day: number) => {
	const date = new Date(year, 0, day + 1);

	return date.toLocaleDateString('en-GB').split('/').reverse().join('-');
};

export const weekToDate = (w: number, y: number) => {
	const date = new Date(y, 0, 1 + (w - 1) * 7);
	date.setDate(date.getDate() + (1 - date.getDay()));
	return date.toLocaleDateString('en-GB').split('/').reverse().join('-');
};

export const convertRawContributionDataToDays = (
	contributionsData: {
		contributions: { week: number; days: { count: number }[] }[];
	},
	year: number
) => {
	const { contributions } = contributionsData;

	const processedContributions = contributions
		.map((x) => x.days)
		.flat()
		.map((x, i) => ({ date: dayToDate(year, i), value: x.count }));

	const today = new Date();
	const currentYear = today.getFullYear();

	// if in current year filter to only include past contributions
	if (currentYear === year) {
		const pastContributions = processedContributions.filter(
			({ date }) => new Date(date).getTime() < today.getTime()
		);

		return pastContributions;
	}

	return processedContributions;
};

export const convertRawContributionDataToWeeks = (
	contributionsData: {
		contributions: { week: number; days: { count: number }[] }[];
	},
	year: number
) => {
	const { contributions } = contributionsData;

	const processedContributions = contributions.map(({ week, days }) => ({
		date: weekToDate(week, 2022),
		value: days.map((day) => day.count).reduce((a, b) => a + b, 0)
	}));

	const today = new Date();
	const currentYear = today.getFullYear();

	// if in current year filter to only include past contributions
	if (currentYear === year) {
		const pastContributions = processedContributions.filter(
			({ date }) => new Date(date).getTime() < today.getTime()
		);

		return pastContributions;
	}

	return processedContributions;
};

export const getActiveDayData = (
	data: {
		date: string;
		value: number;
	}[],
	activeTime: string
) => {
	if (activeTime === '1W') return data.slice(data.length - 7);
	if (activeTime === '2W') return data.slice(data.length - 14);
	if (activeTime === '1M') return data.slice(data.length - 31);
	if (activeTime === '6M') return data.slice(data.length - 31 * 6);
	

	return data.slice(data.length - 365);
};

export const getActiveWeekData = (
	data: {
		date: string;
		value: number;
	}[],
	activeTime: string
) => {
	if (activeTime === '1W') return data.slice(data.length - 1);
	if (activeTime === '2W') return data.slice(data.length - 2);
	if (activeTime === '1M') return data.slice(data.length - 4);
	if (activeTime === '6M') return data.slice(data.length - 26);
	if (activeTime === '2022') return data.filter(({ date }) => date.substring(0, 4) === '2022');
	if (activeTime === '2021') return data.filter(({ date }) => date.substring(0, 4) === '2021');

	return data.slice(data.length - 52);
};
