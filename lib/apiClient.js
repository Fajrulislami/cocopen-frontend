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

	const contentType = response.headers.get("content-type");
	if (!contentType || !contentType.includes("application/json")) {
		const text = await response.text();
		throw new Error(text.trim() || "Respons dari server tidak valid");
	}

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || "Login gagal");
	}

	return data;
};
