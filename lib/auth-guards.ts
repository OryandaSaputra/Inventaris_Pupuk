import type { Session } from "next-auth";
import { auth } from "@/auth";
import type { UserRole } from "@/src/generated/prisma";
import { getRolePermissionForRole } from "@/lib/data/role-permissions";
import type {
  FeaturePermissionKey,
  ResolvedRolePermission,
} from "@/lib/permissions";
import {
  canAccessFeature,
  canAccessGardenAction,
} from "@/lib/permissions";

type AuthenticatedUser = NonNullable<Session["user"]>;

async function getAuthenticatedUser(
  message = "Tidak memiliki akses.",
): Promise<AuthenticatedUser> {
  const session = await auth();
  const user = session?.user;

  if (!user || !user.isActive) {
    throw new Error(message);
  }

  return user;
}

async function requireRole(
  allowedRoles: readonly UserRole[],
  message = "Tidak memiliki akses.",
): Promise<AuthenticatedUser> {
  const user = await getAuthenticatedUser(message);

  const isAllowed = allowedRoles.some((role) => role === user.role);

  if (!isAllowed) {
    throw new Error(message);
  }

  return user;
}

export async function requireAdmin(
  message = "Tidak memiliki akses admin.",
) {
  return requireRole(["ADMIN"], message);
}

export async function requireKrani(
  message = "Tidak memiliki akses krani.",
) {
  return requireRole(["KRANI_TANAMAN", "KRANI_KEBUN"], message);
}

export async function requireKraniAssignedGarden(
  message = "User belum memiliki kebun yang ditugaskan.",
) {
  const user = await requireKrani(message);

  if (!user.assignedGardenId) {
    throw new Error(message);
  }

  return user as AuthenticatedUser & { assignedGardenId: string };
}

export async function requireFeatureAccess(
  featureKey: FeaturePermissionKey,
  message = "Fitur ini tidak diizinkan untuk role Anda.",
): Promise<{
  user: AuthenticatedUser;
  permission: ResolvedRolePermission;
}> {
  const user = await getAuthenticatedUser(message);
  const permission = await getRolePermissionForRole(user.role as UserRole);

  if (!canAccessFeature(permission, featureKey)) {
    throw new Error(message);
  }

  return { user, permission };
}

export async function requireGardenScopedFeature(
  featureKey: FeaturePermissionKey,
  action: "view" | "edit" | "delete",
  targetGardenId?: string | null,
  message = "Anda tidak memiliki akses kebun untuk aksi ini.",
): Promise<{
  user: AuthenticatedUser;
  permission: ResolvedRolePermission;
}> {
  const { user, permission } = await requireFeatureAccess(featureKey, message);

  if (
    !canAccessGardenAction(
      permission,
      action,
      user.assignedGardenId,
      targetGardenId ?? user.assignedGardenId,
    )
  ) {
    throw new Error(message);
  }

  return { user, permission };
}

export async function requireKraniGardenFeature(
  featureKey: FeaturePermissionKey,
  action: "view" | "edit" | "delete",
  message = "Akses kebun Anda tidak mengizinkan aksi ini.",
): Promise<{
  user: AuthenticatedUser & { assignedGardenId: string };
  permission: ResolvedRolePermission;
}> {
  const user = await requireKraniAssignedGarden(message);
  const permission = await getRolePermissionForRole(user.role as UserRole);

  if (!canAccessFeature(permission, featureKey)) {
    throw new Error(message);
  }

  if (
    !canAccessGardenAction(
      permission,
      action,
      user.assignedGardenId,
      user.assignedGardenId,
    )
  ) {
    throw new Error(message);
  }

  return { user, permission };
}