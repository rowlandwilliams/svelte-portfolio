export const querySanityApi = async (query: string) => {
	const response = await fetch(
		'https://7jzr31g2.apicdn.sanity.io/v1/graphql/production/default' as RequestInfo,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				query: query
			})
		}
	);

	const json = await response.json();

	const { allProject } = json.data;
	return allProject;
};
