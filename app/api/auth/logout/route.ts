import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });

  // Clear the token cookie
  response.cookies.set("token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0, // instantly expires it
    sameSite: "strict",
  });

  response.cookies.set("refresh_token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0, // instantly expires it
    sameSite: "strict",
  });

  return response;
}
