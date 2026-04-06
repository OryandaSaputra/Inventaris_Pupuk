import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, SupplyBudgetType, UserRole } from "../src/generated/prisma";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL belum terisi di file .env");
}

const adapter = new PrismaPg({
  connectionString: databaseUrl,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const adminPassword = await bcrypt.hash("admin123", 10);
  const kraniPassword = await bcrypt.hash("krani123", 10);

  await prisma.user.upsert({
    where: { email: "admin@pupuk.local" },
    update: {
      name: "Admin Asisten Pemupukan",
      role: UserRole.ADMIN,
      isActive: true,
    },
    create: {
      name: "Admin Asisten Pemupukan",
      email: "admin@pupuk.local",
      passwordHash: adminPassword,
      role: UserRole.ADMIN,
      isActive: true,
    },
  });

  await prisma.user.upsert({
    where: { email: "krani@pupuk.local" },
    update: {
      name: "Krani Tanaman",
      role: UserRole.KRANI_TANAMAN,
      isActive: true,
    },
    create: {
      name: "Krani Tanaman",
      email: "krani@pupuk.local",
      passwordHash: kraniPassword,
      role: UserRole.KRANI_TANAMAN,
      isActive: true,
    },
  });

  const gardenA = await prisma.garden.upsert({
    where: { name: "Kebun A" },
    update: { isActive: true },
    create: { name: "Kebun A", isActive: true },
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

  const admin = await prisma.user.findUniqueOrThrow({
    where: { email: "admin@pupuk.local" },
  });

  const quantityOrdered = 5000;
  const unitPrice = 2500;
  const freightCost = 350000;
  const totalCost = quantityOrdered * unitPrice + freightCost;
  const ppnAmount = totalCost * 0.11;
  const grandTotal = totalCost + ppnAmount;

  const order = await prisma.supplyOrder.upsert({
    where: {
      gardenId_fertilizerTypeId_sp2bjNumber: {
        gardenId: gardenA.id,
        fertilizerTypeId: fertilizerA.id,
        sp2bjNumber: "SP2BJ-001/2026",
      },
    },
    update: {
      supplierId: supplierA.id,
      contractStartDate: new Date("2026-01-10"),
      contractEndDate: new Date("2026-04-20"),
      quantityOrdered,
      budgetType: SupplyBudgetType.EKSPLOITASI,
      unitPrice,
      freightCost,
      totalCost,
      ppnAmount,
      grandTotal,
      createdById: admin.id,
    },
    create: {
      gardenId: gardenA.id,
      fertilizerTypeId: fertilizerA.id,
      supplierId: supplierA.id,
      sp2bjNumber: "SP2BJ-001/2026",
      contractStartDate: new Date("2026-01-10"),
      contractEndDate: new Date("2026-04-20"),
      quantityOrdered,
      budgetType: SupplyBudgetType.EKSPLOITASI,
      unitPrice,
      freightCost,
      totalCost,
      ppnAmount,
      grandTotal,
      createdById: admin.id,
    },
  });

  await prisma.deliveryReceipt.upsert({
    where: { id: "seed-delivery-1" },
    update: {
      supplyOrderId: order.id,
      licensePlate: "BK1234AA",
      receivedDate: new Date("2026-02-12"),
      quantityDelivered: 1500,
      sackCount: 30,
      createdById: admin.id,
    },
    create: {
      id: "seed-delivery-1",
      supplyOrderId: order.id,
      licensePlate: "BK1234AA",
      receivedDate: new Date("2026-02-12"),
      quantityDelivered: 1500,
      sackCount: 30,
      createdById: admin.id,
    },
  });

  console.log("Seed berhasil dijalankan.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Seed gagal:", error);
    await prisma.$disconnect();
    process.exit(1);
  });