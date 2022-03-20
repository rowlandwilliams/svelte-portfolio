export const getProjectLinePosition = (index: number, projectLineSectionHeight: number) => {
	return index * projectLineSectionHeight + projectLineSectionHeight / 2;
};

export const debounce = <A = unknown, R = void>(fn: (args: A) => R, ms = 300) => {
	let timeoutId: ReturnType<typeof setTimeout>;
	return function (this: any, ...args: any[]) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => fn.apply(this, args), ms);
	};
};
