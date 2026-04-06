import { cache } from "react";
import { unstable_cache } from "next/cache";
import type { UserRole } from "@/src/generated/prisma";
import { prisma } from "@/lib/prisma";
import { CACHE_TAGS } from "@/lib/cache-tags";
import {
  getDefaultRolePermission,
  normalizeRolePermission,
} from "@/lib/permissions";

const ROLE_ORDER: UserRole[] = ["ADMIN", "KRANI_TANAMAN", "KRANI_KEBUN"];

const getCachedRolePermissionRows = unstable_cache(
  async () => {
    return prisma.rolePermission.findMany();
  },
  ["role-permissions:rows"],
  {
    revalidate: 300,
    tags: [CACHE_TAGS.rolePermissions],
  },
);

const getRolePermissionMap = cache(async () => {
  const rows = await getCachedRolePermissionRows();

  return new Map(rows.map((row) => [row.role, row]));
});

export async function ensureRolePermissions() {
  const permissionMap = await getRolePermissionMap();

  return ROLE_ORDER.map((role) =>
    normalizeRolePermission(permissionMap.get(role) ?? { role }),
  );
}

export async function getRolePermissionForRole(role: UserRole) {
  const permissionMap = await getRolePermissionMap();

  return normalizeRolePermission(permissionMap.get(role) ?? { role });
}

export async function getRolePermissionRows() {
  const permissionMap = await getRolePermissionMap();

  return ROLE_ORDER.map((role) => {
    const row = permissionMap.get(role);

    return normalizeRolePermission(row ?? getDefaultRolePermission(role));
  });
}

