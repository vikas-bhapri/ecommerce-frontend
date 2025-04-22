const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default async function fetchWithAuth(path: string, init: RequestInit){

    const response = await fetch(`${backendUrl}${path}`, {
        ...init,
        credentials: "include",
    });

    if (response.status === 401) {
        // Handle token expiration and refresh logic here
        // For example, you can call a function to refresh the token
        console.log("Not authorized, token expired or invalid");
    }

    return await response.json();
}