// prisma/seed.ts
import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import {
  PrismaClient,
  SupplyBudgetType,
  UserRole,
  GardenAccessScope,
} from "../src/generated/prisma";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL belum terisi di file .env");

const adapter = new PrismaPg({ connectionString: databaseUrl });
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminPassword = await bcrypt.hash("admin123", 10);
  const kraniPassword = await bcrypt.hash("krani123", 10);

  // === Seed User ===
  const admin = await prisma.user.upsert({
    where: { email: "admin@pupuk.local" },
    update: { name: "Admin Asisten Pemupukan", role: UserRole.ADMIN, isActive: true },
    create: {
      name: "Admin Asisten Pemupukan",
      email: "admin@pupuk.local",
      passwordHash: adminPassword,
      role: UserRole.ADMIN,
      isActive: true,
    },
  });

  const kraniTanaman = await prisma.user.upsert({
    where: { email: "krani@pupuk.local" },
    update: { name: "Krani Tanaman", role: UserRole.KRANI_TANAMAN, isActive: true },
    create: {
      name: "Krani Tanaman",
      email: "krani@pupuk.local",
      passwordHash: kraniPassword,
      role: UserRole.KRANI_TANAMAN,
      isActive: true,
    },
  });

  // === Seed RolePermission ===
  await prisma.rolePermission.upsert({
    where: { role: UserRole.ADMIN },
    update: {},
    create: {
      role: UserRole.ADMIN,
      gardenViewScope: GardenAccessScope.ALL,
      gardenEditScope: GardenAccessScope.ALL,
      gardenDeleteScope: GardenAccessScope.ALL,
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
  });

  await prisma.rolePermission.upsert({
    where: { role: UserRole.KRANI_TANAMAN },
    update: {},
    create: {
      role: UserRole.KRANI_TANAMAN,
      gardenViewScope: GardenAccessScope.ASSIGNED,
      gardenEditScope: GardenAccessScope.ASSIGNED,
      gardenDeleteScope: GardenAccessScope.NONE,
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
  });

  await prisma.rolePermission.upsert({
    where: { role: UserRole.KRANI_KEBUN },
    update: {},
    create: {
      role: UserRole.KRANI_KEBUN,
      gardenViewScope: GardenAccessScope.ASSIGNED,
      gardenEditScope: GardenAccessScope.ASSIGNED,
      gardenDeleteScope: GardenAccessScope.NONE,
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
  });

  // === Seed Master Data (Kebun, Pupuk, Supplier) ===
  const gardenA = await prisma.garden.upsert({
    where: { name: "Kebun A" },
    update: { code: "KBA", isActive: true },
    create: { name: "Kebun A", code: "KBA", isActive: true },
  });

  const fertilizerA = await prisma.fertilizerType.upsert({
    where: { name: "NPK Pelangi" },
    update: { unit: "kg", isActive: true },
    create: { name: "NPK Pelangi", unit: "kg", isActive: true },
  });

  const supplierA = await prisma.supplier.upsert({
    where: { name: "PT Pupuk Makmur" },
    update: { isActive: true },
    create: { name: "PT Pupuk Makmur", isActive: true },
  });

  console.log("✅ Seed berhasil dijalankan (termasuk RolePermission).");
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });