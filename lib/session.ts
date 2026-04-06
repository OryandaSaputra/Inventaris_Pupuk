import { cache } from "react";
import { auth } from "@/auth";
import { getRolePermissionForRole } from "@/lib/data/role-permissions";
import type { UserRole } from "@/src/generated/prisma";

export const getCachedSession = cache(async () => auth());

export const getCurrentUserAccess = cache(async () => {
  const session = await getCachedSession();
  const user = session?.user;

  if (!user || !user.isActive) {
    return {
      session,
      user: null,
      permission: null,
    };
  }

  const permission = await getRolePermissionForRole(user.role as UserRole);

  return {
    session,
    user,
    permission,
  };
});
