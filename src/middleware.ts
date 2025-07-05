import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "access-secret";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow /admin/login dan /admin/register tanpa auth
  if (pathname === "/admin/login" || pathname === "/admin/register") {
    return NextResponse.next();
  }

  // Batasi hanya untuk /(admin) route
  if (pathname.startsWith("/admin")) {
    // Cek access token dari cookie
    const accessToken =
      request.cookies.get("accessToken")?.value ||
      request.headers.get("authorization")?.replace("Bearer ", "");
    if (!accessToken) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    try {
      await jwtVerify(
        accessToken,
        new TextEncoder().encode(ACCESS_TOKEN_SECRET)
      );
      return NextResponse.next();
    } catch (e) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
