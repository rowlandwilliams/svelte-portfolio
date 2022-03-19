export const lineColor = '#F4C269';

export const dayToDate = (year: number, day: number) => {
	const date = new Date(year, 0, day + 1);

	return date.toLocaleDateString('en-GB').split('/').reverse().join('-');
};

export const convertRawContributionData = (
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

export const getData = (
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
	if (activeTime === '2022') return data.filter(({ date }) => date.substring(0, 4) === '2022');
	if (activeTime === '2021') return data.filter(({ date }) => date.substring(0, 4) === '2021');

	return data;
};
