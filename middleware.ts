import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const isLoggedIn = !!token;
  const isLoginPage = request.nextUrl.pathname === "/sign-in";
  const isSignUpPage = request.nextUrl.pathname === "/sign-up";

  // Redirect logged-in users away from the login and sign-up pages
  if (isLoggedIn && (isLoginPage || isSignUpPage)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow unauthenticated users to access the sign-up page
  if (!isLoggedIn && isSignUpPage) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to the login page for other protected routes
  if (!isLoggedIn && request.nextUrl.pathname !== "/sign-in") {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Apply middleware to all routes except static files and APIs
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
