import { prisma } from "@/lib/prisma";

export type GardenMasterDataRow = {
  id: string;
  name: string;
  code: string;
  address: string | null;
  isActive: boolean;
  supplyOrderCount: number;
  createdAt: Date;
};

export type FertilizerMasterDataRow = {
  id: string;
  name: string;
  isActive: boolean;
  supplyOrderCount: number;
  createdAt: Date;
};

export type SupplierMasterDataRow = {
  id: string;
  name: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  isActive: boolean;
  supplyOrderCount: number;
  createdAt: Date;
};

export async function getGardensMasterData() {
  const rows = await prisma.garden.findMany({
    orderBy: [{ isActive: "desc" }, { code: "asc" }, { name: "asc" }],
    select: {
      id: true,
      name: true,
      code: true,
      address: true,
      isActive: true,
      createdAt: true,
      _count: {
        select: {
          supplyOrders: true,
        },
      },
    },
  });

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    code: row.code,
    address: row.address,
    isActive: row.isActive,
    createdAt: row.createdAt,
    supplyOrderCount: row._count.supplyOrders,
  })) satisfies GardenMasterDataRow[];
}

export async function getFertilizersMasterData() {
  const rows = await prisma.fertilizerType.findMany({
    orderBy: [{ isActive: "desc" }, { name: "asc" }],
    select: {
      id: true,
      name: true,
      isActive: true,
      createdAt: true,
      _count: {
        select: {
          supplyOrders: true,
        },
      },
    },
  });

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    isActive: row.isActive,
    createdAt: row.createdAt,
    supplyOrderCount: row._count.supplyOrders,
  })) satisfies FertilizerMasterDataRow[];
}

export async function getSuppliersMasterData() {
  const rows = await prisma.supplier.findMany({
    orderBy: [{ isActive: "desc" }, { name: "asc" }],
    select: {
      id: true,
      name: true,
      address: true,
      phone: true,
      email: true,
      isActive: true,
      createdAt: true,
      _count: {
        select: {
          supplyOrders: true,
        },
      },
    },
  });

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    address: row.address,
    phone: row.phone,
    email: row.email,
    isActive: row.isActive,
    createdAt: row.createdAt,
    supplyOrderCount: row._count.supplyOrders,
  })) satisfies SupplierMasterDataRow[];
}