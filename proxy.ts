import { auth } from "@/auth";
import { canAccessPath, roleHomeMap } from "@/lib/permissions";
import { NextResponse } from "next/server";
import type { UserRole } from "@/src/generated/prisma";

const publicRoutes = ["/login"];

function resolveRole(role?: string): UserRole {
  if (role === "ADMIN" || role === "KRANI_TANAMAN" || role === "KRANI_KEBUN") {
    return role;
  }

  return "KRANI_TANAMAN";
}

export default auth((request) => {
  const { nextUrl, auth: session } = request;
  const pathname = nextUrl.pathname;
  const role = resolveRole(session?.user?.role);
  const isLoggedIn = Boolean(session?.user?.id && session.user.isActive);

  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  if (!isLoggedIn && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  if (isLoggedIn && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL(roleHomeMap[role], nextUrl));
  }

  if ((pathname.startsWith("/admin") || pathname.startsWith("/krani")) && !canAccessPath(role, pathname)) {
    return NextResponse.redirect(new URL(roleHomeMap[role], nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};