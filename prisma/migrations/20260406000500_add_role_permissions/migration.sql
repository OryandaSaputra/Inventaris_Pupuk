DO $$
BEGIN
  CREATE TYPE "GardenAccessScope" AS ENUM ('NONE', 'ASSIGNED', 'ALL');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS "RolePermission" (
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
  "canAccessKraniHome" BOOLEAN NOT NULL DEFAULT false,
  "canAccessDeliveryWorkspace" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "RolePermission_pkey" PRIMARY KEY ("role")
);

INSERT INTO "RolePermission" (
  "role",
  "gardenViewScope",
  "gardenEditScope",
  "gardenDeleteScope",
  "canAccessAdminHome",
  "canAccessSupplyInput",
  "canAccessSupplyList",
  "canAccessMasterGardens",
  "canAccessMasterFertilizers",
  "canAccessMasterSuppliers",
  "canAccessSupplierInformation",
  "canAccessUserManagement",
  "canAccessKraniHome",
  "canAccessDeliveryWorkspace"
) VALUES
(
  'ADMIN',
  'ALL',
  'ALL',
  'ALL',
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  false,
  false
),
(
  'KRANI_TANAMAN',
  'ASSIGNED',
  'ASSIGNED',
  'NONE',
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  true,
  true
),
(
  'KRANI_KEBUN',
  'ASSIGNED',
  'ASSIGNED',
  'NONE',
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  true
)
ON CONFLICT ("role") DO NOTHING;