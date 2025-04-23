import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function getTokens() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("token")?.value || "";
    const refreshToken = cookieStore.get("refresh_token")?.value || "";

    if(!refreshToken) {
        console.log("No refresh token found, redirecting to sign-in page...");
        redirect("/sign-in");
    }
    
    return { accessToken, refreshToken };
}