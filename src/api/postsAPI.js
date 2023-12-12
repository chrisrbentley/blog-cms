const getAllPosts = async (token) => {
	try {
		const response = await fetch(
			'https://blog-api-production-3581.up.railway.app/posts',
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token,
				},
			},
		);

		if (response.ok) {
			const data = await response.json();
			return data;
		}
	} catch (error) {
		console.log(error);
	}
};

const getPublished = async () => {
	try {
		const response = await fetch(
			'https://blog-api-production-3581.up.railway.app/posts/published-posts',
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

const getDrafts = async (token) => {
	try {
		const response = await fetch(
			'https://blog-api-production-3581.up.railway.app/posts/unpublished-posts',
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token,
				},
			},
		);

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export { getAllPosts, getPublished, getDrafts };
