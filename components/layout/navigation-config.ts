import {
  ChevronRight,
  ClipboardList,
  Database,
  Home,
  Package,
  PackageCheck,
  Truck,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { UserRole } from "@/src/generated/prisma";
import type {
  FeaturePermissionKey,
  ResolvedRolePermission,
} from "@/lib/permissions";
import { ADMIN_ROUTES, KRANI_ROUTES } from "@/lib/routes";

export type AppUserRole = Extract<
  UserRole,
  "ADMIN" | "KRANI_TANAMAN" | "KRANI_KEBUN"
>;

export type NavigationChildItem = {
  href: string;
  label: string;
  shortLabel: string;
  requiredFeature?: FeaturePermissionKey;
};

export type NavigationItem = {
  href: string;
  label: string;
  shortLabel: string;
  icon: LucideIcon;
  requiredFeature?: FeaturePermissionKey;
  children?: NavigationChildItem[];
};

const navigationByRole: Record<AppUserRole, NavigationItem[]> = {
  ADMIN: [
    {
      href: ADMIN_ROUTES.home,
      label: "Home",
      shortLabel: "Home",
      icon: Home,
      requiredFeature: "canAccessAdminHome",
    },
    {
      href: ADMIN_ROUTES.supply.root,
      label: "Kelola Pasokan",
      shortLabel: "Pasokan",
      icon: Package,
      children: [
        {
          href: ADMIN_ROUTES.supply.input,
          label: "Input Pasokan",
          shortLabel: "Input",
          requiredFeature: "canAccessSupplyInput",
        },
        {
          href: ADMIN_ROUTES.supply.list,
          label: "Daftar Pasokan",
          shortLabel: "Daftar",
          requiredFeature: "canAccessSupplyList",
        },
      ],
    },
    {
      href: ADMIN_ROUTES.delivery,
      label: "Input Penerimaan Pupuk",
      shortLabel: "Penerimaan",
      icon: PackageCheck,
      requiredFeature: "canAccessAdminDelivery",
    },
    {
      href: ADMIN_ROUTES.masterData.root,
      label: "Input Data",
      shortLabel: "Input Data",
      icon: Database,
      children: [
        {
          href: ADMIN_ROUTES.masterData.gardens,
          label: "Kebun",
          shortLabel: "Kebun",
          requiredFeature: "canAccessMasterGardens",
        },
        {
          href: ADMIN_ROUTES.masterData.fertilizers,
          label: "Pupuk",
          shortLabel: "Pupuk",
          requiredFeature: "canAccessMasterFertilizers",
        },
        {
          href: ADMIN_ROUTES.masterData.suppliers,
          label: "Pemasok / Supplier",
          shortLabel: "Supplier",
          requiredFeature: "canAccessMasterSuppliers",
        },
      ],
    },
    {
      href: ADMIN_ROUTES.supplierInformation,
      label: "Informasi Pemasok / Supplier",
      shortLabel: "Supplier",
      icon: Truck,
      requiredFeature: "canAccessSupplierInformation",
    },
    {
      href: ADMIN_ROUTES.users,
      label: "Hak Akses User",
      shortLabel: "User",
      icon: Users,
      requiredFeature: "canAccessUserManagement",
    },
  ],
  KRANI_TANAMAN: [
    {
      href: KRANI_ROUTES.home,
      label: "Home",
      shortLabel: "Home",
      icon: Home,
      requiredFeature: "canAccessKraniHome",
    },
    {
      href: KRANI_ROUTES.delivery,
      label: "Tabel Informasi",
      shortLabel: "Penerimaan",
      icon: ClipboardList,
      requiredFeature: "canAccessDeliveryWorkspace",
    },
  ],
  KRANI_KEBUN: [
    {
      href: KRANI_ROUTES.delivery,
      label: "Tabel Informasi",
      shortLabel: "Penerimaan",
      icon: ClipboardList,
      requiredFeature: "canAccessDeliveryWorkspace",
    },
  ],
};

function filterNavigationItems(
  items: NavigationItem[],
  permission: ResolvedRolePermission,
) {
  return items.flatMap((item) => {
    const allowedChildren = item.children?.filter((child) =>
      child.requiredFeature ? permission[child.requiredFeature] : true,
    );

    if (allowedChildren && allowedChildren.length > 0) {
      return [{ ...item, children: allowedChildren }];
    }

    if (item.children?.length) {
      return [];
    }

    if (item.requiredFeature && !permission[item.requiredFeature]) {
      return [];
    }

    return [item];
  });
}

export function getNavigationItems(
  role: AppUserRole,
  permission: ResolvedRolePermission,
) {
  return filterNavigationItems(navigationByRole[role], permission);
}

export function isActiveNavigationItem(pathname: string, href: string) {
  const isRootItem = href === ADMIN_ROUTES.home || href === KRANI_ROUTES.home;

  return pathname === href || (!isRootItem && pathname.startsWith(`${href}/`));
}

export function hasActiveNavigationChildren(
  pathname: string,
  item: NavigationItem,
) {
  return (
    item.children?.some((child) => isActiveNavigationItem(pathname, child.href)) ??
    false
  );
}

export function getRoleLabel(role: AppUserRole) {
  switch (role) {
    case "ADMIN":
      return "Asisten Pemupukan";
    case "KRANI_TANAMAN":
      return "Krani Tanaman";
    case "KRANI_KEBUN":
      return "Krani Kebun";
    default:
      return "Pengguna";
  }
}

export function getPanelTitle(role: AppUserRole) {
  switch (role) {
    case "ADMIN":
      return "Admin Panel";
    case "KRANI_TANAMAN":
      return "Krani Tanaman Panel";
    case "KRANI_KEBUN":
      return "Krani Kebun Panel";
    default:
      return "Panel";
  }
}

export const navigationChildIcons = {
  input: Package,
  list: ClipboardList,
  chevron: ChevronRight,
} as const;