export async function apiRequest(url, options = {}) {
    const response = await fetch(url, options);

    if (!response.ok) {
        throw new Error("API request failed");
    }

    return await response.json();
}