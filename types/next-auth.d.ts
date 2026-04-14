// types/next-auth.d.ts
import { DefaultSession } from "next-auth";

type AppRole = "ADMIN" | "KRANI_TANAMAN" | "KRANI_KEBUN";

type RolePermissions = {
  gardenViewScope: "NONE" | "ASSIGNED" | "ALL";
  gardenEditScope: "NONE" | "ASSIGNED" | "ALL";
  gardenDeleteScope: "NONE" | "ASSIGNED" | "ALL";

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

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      role: AppRole;
      isActive: boolean;
      assignedGardenId: string | null;
      assignedGardenName: string | null;
      permissions: RolePermissions;
    };
  }

  interface User {
    role: AppRole;
    isActive: boolean;
    assignedGardenId: string | null;
    assignedGardenName: string | null;
    permissions: RolePermissions;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: AppRole;
    isActive?: boolean;
    assignedGardenId?: string | null;
    assignedGardenName?: string | null;
    permissions?: RolePermissions;
  }
}