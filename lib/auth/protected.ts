// lib/auth/protected.ts
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function requireAuth(
  permissionCheck?: (permissions: any) => boolean
) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (permissionCheck && !permissionCheck(session.user.permissions)) {
    redirect("/unauthorized");
  }

  return session;
}

export async function requireAdmin() {
  return requireAuth((perm) => perm?.canAccessAdminHome === true);
}

export async function requireKrani() {
  return requireAuth((perm) => perm?.canAccessKraniHome === true);
}