import { NextResponse, type NextRequest } from "next/server";

/** Anciennes URLs auth → app (au cas où le cache garde encore ces routes) */
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (
    path === "/login" ||
    path === "/signup" ||
    path.startsWith("/login/") ||
    path.startsWith("/signup/")
  ) {
    return NextResponse.redirect(new URL("/home", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/login/:path*", "/signup/:path*"],
};
