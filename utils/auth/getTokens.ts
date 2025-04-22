import { cookies } from "next/headers";

import verifyJWT from "./verifyJWT";

export default async function getTokens() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("token")?.value || "";
    const refreshToken = cookieStore.get("refresh_token")?.value || "";

    console.log("Access Token: ", accessToken);
    console.log("Refresh Token: ", refreshToken);

    const access_token_payload = verifyJWT(accessToken);
    const refresh_token_payload = verifyJWT(refreshToken);

    console.log("Payload: ", {access_token_payload, refresh_token_payload});
    
    return { accessToken, refreshToken };
}