// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.formData();
    const username = body.get("username");
    const password = body.get("password");
  
    if (!username || !password) {
      return NextResponse.json({ message: "Missing credentials" }, { status: 400 });
    }
  
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        username: username.toString(),
        password: password.toString(),
      }),
    });
  
    const result = await response.json();
  
    if (!response.ok) {
      return NextResponse.json({ message: result?.detail?.detail ?? "Login failed" }, { status: 401 });
    }
  
    const res = NextResponse.json({ success: true });
    res.cookies.set("token", result.access_token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "strict",
    });
  
    return res;
  }
  
