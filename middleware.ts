import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("refresh_token")?.value;
  const isLoggedIn = !!token;
  const isPublicPage = ["/sign-in", "/sign-up", "/contact"].includes(request.nextUrl.pathname);

  // Redirect logged-in users away from the login and sign-up pages
  if (isLoggedIn && isPublicPage) {
    return NextResponse.next();
  }

  // Allow unauthenticated users to access public pages
  if (!isLoggedIn && isPublicPage) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to the login page for protected routes
  if (!isLoggedIn) {
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
