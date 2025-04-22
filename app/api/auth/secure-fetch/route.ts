import { NextResponse, NextRequest } from "next/server";
import getTokens from "@/utils/auth/getTokens";
import verifyJWT from "@/utils/auth/verifyJWT";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

async function refresh(refreshToken: string, request: NextRequest) {
    const response = await fetch(`${backendUrl}/auth/refresh/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Cookie": `refresh_token=${refreshToken}`,
        },
        credentials: "include",
    })
    if (response.status !== 200) {
        return Response.redirect(new URL("sign-in", request.url));
    }
    const refreshData = await response.json();
    return refreshData.access_token;
}

export async function POST(request: NextRequest) {
    const {accessToken, refreshToken} = await getTokens();
    let newAccessToken = undefined;

    if (!accessToken) {
        newAccessToken = await refresh(refreshToken, request);
    }

    const access_token_payload = verifyJWT(accessToken);
    const refresh_token_payload = verifyJWT(refreshToken);

    const body = await request.json();

    if (!access_token_payload || !refresh_token_payload) {
        return NextResponse.json({ message: "Invalid token payloads" }, { status: 401 });
    }

    const expirationTime = access_token_payload.exp;
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    const isExpired = (expirationTime - currentTime) < 15; // Check if the token is about to expire in less than 15 seconds


    if (isExpired) {
        console.log("Access token expired, refreshing...");
        newAccessToken = await refresh(refreshToken, request);
    }

    // Make the request to the backend with the (possibly refreshed) access token
    const apiResponse = await fetch(`${backendUrl}${body.path}`, {
        method: body.method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${newAccessToken || accessToken}`,
        },
        body: JSON.stringify(body.body),
        credentials: "include",
    });

    const apiData = await apiResponse.json();

    const response = NextResponse.json(apiData);
    if (newAccessToken) {
        response.cookies.set("token", newAccessToken, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 30, // 30 minutes
        sameSite: "strict",
        });
    }
    return response;
}
