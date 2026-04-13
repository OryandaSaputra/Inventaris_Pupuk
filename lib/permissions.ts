import type { GardenAccessScope, UserRole } from "@/src/generated/prisma";
import { ADMIN_ROUTES, KRANI_ROUTES } from "@/lib/routes";

export type FeaturePermissionKey =
  | "canAccessAdminHome"
  | "canAccessSupplyInput"
  | "canAccessSupplyList"
  | "canAccessMasterGardens"
  | "canAccessMasterFertilizers"
  | "canAccessMasterSuppliers"
  | "canAccessSupplierInformation"
  | "canAccessUserManagement"
  | "canAccessAdminDelivery"
  | "canAccessKraniHome"
  | "canAccessDeliveryWorkspace";

export type ResolvedRolePermission = {
  role: UserRole;
  gardenViewScope: GardenAccessScope;
  gardenEditScope: GardenAccessScope;
  gardenDeleteScope: GardenAccessScope;
  canAccessAdminHome: boolean;
  canAccessSupplyInput: boolean;
  canAccessSupplyList: boolean;
  canAccessMasterGardens: boolean;
  canAccessMasterFertilizers: boolean;
  canAccessMasterSuppliers: boolean;
  canAccessSupplierInformation: boolean;
  canAccessUserManagement: boolean;
  canAccessAdminDelivery: boolean;
  canAccessKraniHome: boolean;
  canAccessDeliveryWorkspace: boolean;
};

export const ROLE_PERMISSION_FEATURES: ReadonlyArray<{
  key: FeaturePermissionKey;
  label: string;
  description: string;
}> = [
  {
    key: "canAccessAdminHome",
    label: "Home Admin",
    description: "Mengakses dashboard utama admin.",
  },
  {
    key: "canAccessSupplyInput",
    label: "Input Pasokan",
    description: "Membuat dan mengubah data pasokan.",
  },
  {
    key: "canAccessSupplyList",
    label: "Daftar Pasokan",
    description: "Melihat daftar, detail, dan monitoring pasokan.",
  },
  {
    key: "canAccessMasterGardens",
    label: "Input Data Kebun",
    description: "Mengelola master data kebun.",
  },
  {
    key: "canAccessMasterFertilizers",
    label: "Input Data Pupuk",
    description: "Mengelola master data pupuk.",
  },
  {
    key: "canAccessMasterSuppliers",
    label: "Input Data Supplier",
    description: "Mengelola master data supplier.",
  },
  {
    key: "canAccessSupplierInformation",
    label: "Informasi Supplier",
    description: "Melihat dashboard informasi pemasok.",
  },
  {
    key: "canAccessUserManagement",
    label: "Hak Akses User",
    description: "Mengelola user dan pengaturan role permission.",
  },
  {
    key: "canAccessAdminDelivery",
    label: "Input Penerimaan (Admin)",
    description: "Admin dapat menginput penerimaan untuk seluruh kebun.",
  },
  {
    key: "canAccessKraniHome",
    label: "Home Krani",
    description: "Mengakses dashboard krani.",
  },
  {
    key: "canAccessDeliveryWorkspace",
    label: "Penerimaan Pupuk",
    description: "Melihat tabel dan input penerimaan pupuk.",
  },
] as const;

export const GARDEN_SCOPE_OPTIONS = [
  { value: "NONE", label: "Tidak ada akses" },
  { value: "ASSIGNED", label: "Hanya kebun yang ditugaskan" },
  { value: "ALL", label: "Semua kebun" },
] as const;

const ROLE_DEFAULT_PERMISSION_MAP: Record<
  UserRole,
  Omit<ResolvedRolePermission, "role">
> = {
  ADMIN: {
    gardenViewScope: "ALL",
    gardenEditScope: "ALL",
    gardenDeleteScope: "ALL",
    canAccessAdminHome: true,
    canAccessSupplyInput: true,
    canAccessSupplyList: true,
    canAccessMasterGardens: true,
    canAccessMasterFertilizers: true,
    canAccessMasterSuppliers: true,
    canAccessSupplierInformation: true,
    canAccessUserManagement: true,
    canAccessAdminDelivery: true,
    canAccessKraniHome: false,
    canAccessDeliveryWorkspace: false,
  },
  KRANI_TANAMAN: {
    gardenViewScope: "ASSIGNED",
    gardenEditScope: "ASSIGNED",
    gardenDeleteScope: "NONE",
    canAccessAdminHome: false,
    canAccessSupplyInput: false,
    canAccessSupplyList: false,
    canAccessMasterGardens: false,
    canAccessMasterFertilizers: false,
    canAccessMasterSuppliers: false,
    canAccessSupplierInformation: false,
    canAccessUserManagement: false,
    canAccessAdminDelivery: false,
    canAccessKraniHome: true,
    canAccessDeliveryWorkspace: true,
  },
  KRANI_KEBUN: {
    gardenViewScope: "ASSIGNED",
    gardenEditScope: "ASSIGNED",
    gardenDeleteScope: "NONE",
    canAccessAdminHome: false,
    canAccessSupplyInput: false,
    canAccessSupplyList: false,
    canAccessMasterGardens: false,
    canAccessMasterFertilizers: false,
    canAccessMasterSuppliers: false,
    canAccessSupplierInformation: false,
    canAccessUserManagement: false,
    canAccessAdminDelivery: false,
    canAccessKraniHome: false,
    canAccessDeliveryWorkspace: true,
  },
};

export function getDefaultRolePermission(role: UserRole): ResolvedRolePermission {
  return {
    role,
    ...ROLE_DEFAULT_PERMISSION_MAP[role],
  };
}

export function normalizeRolePermission(
  input: Partial<ResolvedRolePermission> & { role: UserRole },
): ResolvedRolePermission {
  return {
    ...getDefaultRolePermission(input.role),
    ...input,
  };
}

function matchesPath(pathname: string, prefix: string) {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

export const roleHomeMap: Record<UserRole, string> = {
  ADMIN: ADMIN_ROUTES.home,
  KRANI_TANAMAN: KRANI_ROUTES.home,
  KRANI_KEBUN: KRANI_ROUTES.delivery,
};

export const DEFAULT_LOGIN_REDIRECT = roleHomeMap;

export function canAccessPath(role: UserRole | undefined, pathname: string) {
  if (!role) {
    return false;
  }

  switch (role) {
    case "ADMIN":
      return matchesPath(pathname, "/admin");
    case "KRANI_TANAMAN":
      return matchesPath(pathname, "/krani");
    case "KRANI_KEBUN":
      return matchesPath(pathname, KRANI_ROUTES.delivery);
    default:
      return false;
  }
}

export function isAdmin(role?: string) {
  return role === "ADMIN";
}

export function isKrani(role?: string) {
  return role === "KRANI_TANAMAN" || role === "KRANI_KEBUN";
}

export function isKraniTanaman(role?: string) {
  return role === "KRANI_TANAMAN";
}

export function isKraniKebun(role?: string) {
  return role === "KRANI_KEBUN";
}

export function canAccessFeature(
  permission: ResolvedRolePermission,
  featureKey: FeaturePermissionKey,
) {
  return Boolean(permission[featureKey]);
}

export function countEnabledFeatures(permission: ResolvedRolePermission) {
  return ROLE_PERMISSION_FEATURES.reduce(
    (total, item) => total + (permission[item.key] ? 1 : 0),
    0,
  );
}

export function getGardenScopeForAction(
  permission: ResolvedRolePermission,
  action: "view" | "edit" | "delete",
): GardenAccessScope {
  if (action === "view") {
    return permission.gardenViewScope;
  }

  if (action === "edit") {
    return permission.gardenEditScope;
  }

  return permission.gardenDeleteScope;
}

export function canAccessGardenAction(
  permission: ResolvedRolePermission,
  action: "view" | "edit" | "delete",
  assignedGardenId?: string | null,
  targetGardenId?: string | null,
) {
  const scope = getGardenScopeForAction(permission, action);

  if (scope === "ALL") {
    return true;
  }

  if (scope === "NONE") {
    return false;
  }

  if (!assignedGardenId) {
    return false;
  }

  if (!targetGardenId) {
    return true;
  }

  return assignedGardenId === targetGardenId;
}

export function getRouteFeatureKey(pathname: string): FeaturePermissionKey | null {
  if (pathname === ADMIN_ROUTES.home) {
    return "canAccessAdminHome";
  }

  if (pathname === ADMIN_ROUTES.users) {
    return "canAccessUserManagement";
  }

  if (
    pathname === ADMIN_ROUTES.supplierInformation ||
    pathname === ADMIN_ROUTES.gardenInformation
  ) {
    return "canAccessSupplierInformation";
  }

  if (pathname.startsWith(ADMIN_ROUTES.delivery)) {
    return "canAccessAdminDelivery";
  }

  if (pathname.startsWith(ADMIN_ROUTES.supply.input)) {
    return "canAccessSupplyInput";
  }

  if (pathname.startsWith(ADMIN_ROUTES.supply.root)) {
    return "canAccessSupplyList";
  }

  if (pathname.startsWith(ADMIN_ROUTES.masterData.gardens)) {
    return "canAccessMasterGardens";
  }

  if (pathname.startsWith(ADMIN_ROUTES.masterData.fertilizers)) {
    return "canAccessMasterFertilizers";
  }

  if (pathname.startsWith(ADMIN_ROUTES.masterData.suppliers)) {
    return "canAccessMasterSuppliers";
  }

  if (pathname === KRANI_ROUTES.home) {
    return "canAccessKraniHome";
  }

  if (pathname.startsWith(KRANI_ROUTES.delivery)) {
    return "canAccessDeliveryWorkspace";
  }

  return null;
}

const roleRouteCandidates: Record<
  UserRole,
  Array<{ route: string; feature: FeaturePermissionKey }>
> = {
  ADMIN: [
    { route: ADMIN_ROUTES.home, feature: "canAccessAdminHome" },
    { route: ADMIN_ROUTES.supply.input, feature: "canAccessSupplyInput" },
    { route: ADMIN_ROUTES.supply.list, feature: "canAccessSupplyList" },
    { route: ADMIN_ROUTES.masterData.gardens, feature: "canAccessMasterGardens" },
    {
      route: ADMIN_ROUTES.masterData.fertilizers,
      feature: "canAccessMasterFertilizers",
    },
    {
      route: ADMIN_ROUTES.masterData.suppliers,
      feature: "canAccessMasterSuppliers",
    },
    {
      route: ADMIN_ROUTES.supplierInformation,
      feature: "canAccessSupplierInformation",
    },
    { route: ADMIN_ROUTES.delivery, feature: "canAccessAdminDelivery" },
    { route: ADMIN_ROUTES.users, feature: "canAccessUserManagement" },
  ],
  KRANI_TANAMAN: [
    { route: KRANI_ROUTES.home, feature: "canAccessKraniHome" },
    { route: KRANI_ROUTES.delivery, feature: "canAccessDeliveryWorkspace" },
  ],
  KRANI_KEBUN: [
    { route: KRANI_ROUTES.delivery, feature: "canAccessDeliveryWorkspace" },
  ],
};

export function getFirstAllowedPath(
  role: UserRole,
  permission: ResolvedRolePermission,
) {
  const match = roleRouteCandidates[role].find((item) =>
    canAccessFeature(permission, item.feature),
  );

  return match?.route ?? roleHomeMap[role];
}