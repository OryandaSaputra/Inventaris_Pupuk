import type { UserRole } from "@/src/generated/prisma";
import { prisma } from "@/lib/prisma";
import {
  getDefaultRolePermission,
  normalizeRolePermission,
} from "@/lib/permissions";

const ROLE_ORDER: UserRole[] = ["ADMIN", "KRANI_TANAMAN", "KRANI_KEBUN"];

async function ensureRolePermission(role: UserRole) {
  const defaults = getDefaultRolePermission(role);

  return prisma.rolePermission.upsert({
    where: { role },
    update: {},
    create: defaults,
  });
}

export async function ensureRolePermissions() {
  return Promise.all(ROLE_ORDER.map((role) => ensureRolePermission(role)));
}

export async function getRolePermissionForRole(role: UserRole) {
  const rows = await ensureRolePermissions();
  const row = rows.find((item) => item.role === role);

  return normalizeRolePermission(row ?? { role });
}

export async function getRolePermissionRows() {
  const rows = await ensureRolePermissions();

  return ROLE_ORDER.map((role) => {
    const row = rows.find((item) => item.role === role);
    return normalizeRolePermission(row ?? { role });
  });
}