// lib/apiClient.js
export const apiClient = async (endpoint, options = {}) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
		{
			...options,
			headers: {
				"Content-Type": "application/json",
				...options.headers,
			},
		}
	);

	// Cek apakah respons punya body dan berformat JSON
	const contentType = response.headers.get("content-type");
	if (!contentType || !contentType.includes("application/json")) {
		const text = await response.text();
		throw new Error(text || "Respons bukan JSON");
	}

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || "Request gagal");
	}

	return data;
};
