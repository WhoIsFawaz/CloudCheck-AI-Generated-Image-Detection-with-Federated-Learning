import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Get token from cookies
  const token = request.cookies.get("token")?.value;
  const isAuthPage =
    request.nextUrl.pathname.startsWith("/auth/login") ||
    request.nextUrl.pathname.startsWith("/auth/register");
  const is404Page = request.nextUrl.pathname.startsWith("/404");
  const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard");

  // If trying to access auth pages while logged in, redirect to dashboard
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // // If trying to access dashboard pages while logged out, redirect to login
  // if (isDashboardPage && !token) {
  //   const response = NextResponse.redirect(new URL("/dashboard", request.url));
  //   // Clear any invalid tokens
  //   response.cookies.delete("token");
  //   response.cookies.delete("userId");
  //   return response;
  // }

  // If accessing root path while logged in, redirect to dashboard
  if (request.nextUrl.pathname === "/" && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If accessing root path while logged out, redirect to login
  if (request.nextUrl.pathname === "/" && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (is404Page) {
    const response = NextResponse.redirect(new URL("/", request.url));
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
