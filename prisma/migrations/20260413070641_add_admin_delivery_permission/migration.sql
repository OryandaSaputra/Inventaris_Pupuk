-- CreateEnum
CREATE TYPE "GardenAccessScope" AS ENUM ('NONE', 'ASSIGNED', 'ALL');

-- CreateTable
CREATE TABLE "RolePermission" (
    "role" "UserRole" NOT NULL,
    "gardenViewScope" "GardenAccessScope" NOT NULL DEFAULT 'NONE',
    "gardenEditScope" "GardenAccessScope" NOT NULL DEFAULT 'NONE',
    "gardenDeleteScope" "GardenAccessScope" NOT NULL DEFAULT 'NONE',
    "canAccessAdminHome" BOOLEAN NOT NULL DEFAULT false,
    "canAccessSupplyInput" BOOLEAN NOT NULL DEFAULT false,
    "canAccessSupplyList" BOOLEAN NOT NULL DEFAULT false,
    "canAccessMasterGardens" BOOLEAN NOT NULL DEFAULT false,
    "canAccessMasterFertilizers" BOOLEAN NOT NULL DEFAULT false,
    "canAccessMasterSuppliers" BOOLEAN NOT NULL DEFAULT false,
    "canAccessSupplierInformation" BOOLEAN NOT NULL DEFAULT false,
    "canAccessUserManagement" BOOLEAN NOT NULL DEFAULT false,
    "canAccessAdminDelivery" BOOLEAN NOT NULL DEFAULT false,
    "canAccessKraniHome" BOOLEAN NOT NULL DEFAULT false,
    "canAccessDeliveryWorkspace" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RolePermission_pkey" PRIMARY KEY ("role")
);
