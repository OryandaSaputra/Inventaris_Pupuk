// middleware.ts

export const runtime = 'nodejs';

import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { getRateLimitKey, isRateLimited } from "@/lib/rate-limit";

export default auth((req) => {
  const { nextUrl } = req;
  const session = req.auth;

  // Rate Limiting untuk login
  if (nextUrl.pathname === "/api/auth/signin" && req.method === "POST") {
    const key = getRateLimitKey(req);
    if (isRateLimited(key)) {
      return NextResponse.json(
        { error: "Terlalu banyak percobaan login. Coba lagi dalam 1 menit." },
        { status: 429 }
      );
    }
  }

  if (!session && nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // Proteksi berdasarkan permission
  if (nextUrl.pathname.startsWith("/admin")) {
    if (!session?.user?.permissions?.canAccessAdminHome) {
      return NextResponse.redirect(new URL("/unauthorized", nextUrl));
    }
  }

  if (nextUrl.pathname.startsWith("/krani")) {
    if (!session?.user?.permissions?.canAccessKraniHome) {
      return NextResponse.redirect(new URL("/unauthorized", nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/admin/:path*",
    "/krani/:path*",
    "/dashboard/:path*",
    "/master/:path*",
    "/api/auth/signin",
  ],
};
