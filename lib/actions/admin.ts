"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@/src/generated/prisma";
import { prisma } from "@/lib/prisma";
import { requireFeatureAccess } from "@/lib/auth-guards";
import { calculateSupplyCosts } from "@/lib/supply-order";
import { normalizeName } from "@/lib/utils";
import {
  fertilizerMasterSchema,
  gardenMasterSchema,
  supplierMasterSchema,
  supplyOrderSchema,
} from "@/lib/validations/admin";
import type { ActionState } from "@/lib/actions/shared";
import { ADMIN_ROUTES } from "@/lib/routes";
import { canAccessGardenAction } from "@/lib/permissions";

const ADMIN_REVALIDATE_PATHS = [
  ADMIN_ROUTES.home,
  ADMIN_ROUTES.supply.root,
  ADMIN_ROUTES.supply.input,
  ADMIN_ROUTES.supply.list,
  ADMIN_ROUTES.supplierInformation,
  ADMIN_ROUTES.gardenInformation,
  ADMIN_ROUTES.masterData.root,
  ADMIN_ROUTES.masterData.gardens,
  ADMIN_ROUTES.masterData.fertilizers,
  ADMIN_ROUTES.masterData.suppliers,
] as const;

function buildErrorState(message: string, errors?: Record<string, string[]>) {
  return {
    success: false,
    message,
    errors,
  } satisfies ActionState;
}

function buildSuccessState(message: string) {
  return {
    success: true,
    message,
  } satisfies ActionState;
}

function revalidateMany(paths: readonly string[]) {
  for (const path of paths) {
    revalidatePath(path);
  }
}

function parseSupplyOrderForm(formData: FormData) {
  return supplyOrderSchema.safeParse({
    gardenName: formData.get("gardenName"),
    fertilizerTypeName: formData.get("fertilizerTypeName"),
    supplierName: formData.get("supplierName"),
    sp2bjNumber: formData.get("sp2bjNumber"),
    contractStartDate: formData.get("contractStartDate"),
    contractEndDate: formData.get("contractEndDate"),
    quantityOrdered: formData.get("quantityOrdered"),
    budgetType: formData.get("budgetType"),
    unitPrice: formData.get("unitPrice"),
    freightCost: formData.get("freightCost"),
  });
}

function normalizeOptionalText(value: string | null | undefined) {
  const normalized = value?.trim().replace(/\s+/g, " ") ?? "";
  return normalized.length > 0 ? normalized : null;
}

function toStatusBoolean(status: "AKTIF" | "TIDAK_AKTIF") {
  return status === "AKTIF";
}

async function resolveMasterDataByName(
  tx: Prisma.TransactionClient,
  input: {
    gardenName: string;
    fertilizerTypeName: string;
    supplierName: string;
  },
) {
  const gardenName = normalizeName(input.gardenName);
  const fertilizerTypeName = normalizeName(input.fertilizerTypeName);
  const supplierName = normalizeName(input.supplierName);

  const [garden, fertilizerType, supplier] = await Promise.all([
    tx.garden.findUnique({ where: { name: gardenName } }),
    tx.fertilizerType.findUnique({ where: { name: fertilizerTypeName } }),
    tx.supplier.findUnique({ where: { name: supplierName } }),
  ]);

  if (!garden) {
    throw new Error(
      "Data kebun tidak ditemukan. Tambahkan dulu dari menu Input Data > Kebun.",
    );
  }

  if (!fertilizerType) {
    throw new Error(
      "Data pupuk tidak ditemukan. Tambahkan dulu dari menu Input Data > Pupuk.",
    );
  }

  if (!supplier) {
    throw new Error(
      "Data supplier tidak ditemukan. Tambahkan dulu dari menu Input Data > Pemasok / Supplier.",
    );
  }

  return { garden, fertilizerType, supplier };
}

async function getDeliveredQuantityForOrder(
  tx: Prisma.TransactionClient,
  supplyOrderId: string,
) {
  const aggregate = await tx.deliveryReceipt.aggregate({
    where: { supplyOrderId },
    _sum: {
      quantityDelivered: true,
    },
  });

  return aggregate._sum.quantityDelivered ?? 0;
}

function getUniqueFieldMessage(target: string[]) {
  if (target.includes("code")) {
    return "Kode kebun sudah digunakan.";
  }

  if (target.includes("email")) {
    return "Email sudah digunakan.";
  }

  if (target.includes("sp2bjNumber")) {
    return "Data duplikat terdeteksi. Periksa kombinasi kebun, jenis pupuk, dan nomor SP2BJ.";
  }

  if (target.includes("name")) {
    return "Nama data sudah digunakan. Gunakan nama lain yang unik.";
  }

  return "Data duplikat terdeteksi. Periksa kembali isian Anda.";
}

function getPrismaErrorMessage(error: unknown) {
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    const target = Array.isArray(error.meta?.target)
      ? (error.meta?.target as string[])
      : [];

    return getUniqueFieldMessage(target);
  }

  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2003"
  ) {
    return "Data tidak bisa dihapus karena sudah dipakai pada transaksi.";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return null;
}

export async function createSupplyOrderAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const { user, permission } = await requireFeatureAccess(
    "canAccessSupplyInput",
    "Tidak memiliki akses input pasokan.",
  );

  const parsed = parseSupplyOrderForm(formData);

  if (!parsed.success) {
    return buildErrorState(
      "Validasi gagal.",
      parsed.error.flatten().fieldErrors,
    );
  }

  const data = parsed.data;
  const calculated = calculateSupplyCosts(
    data.quantityOrdered,
    data.unitPrice,
    data.freightCost,
  );

  try {
    await prisma.$transaction(
      async (tx) => {
        const master = await resolveMasterDataByName(tx, data);

        if (
          !canAccessGardenAction(
            permission,
            "edit",
            user.assignedGardenId,
            master.garden.id,
          )
        ) {
          throw new Error(
            "Role Anda tidak memiliki akses edit untuk kebun pada data pasokan ini.",
          );
        }

        await tx.supplyOrder.create({
          data: {
            gardenId: master.garden.id,
            fertilizerTypeId: master.fertilizerType.id,
            supplierId: master.supplier.id,
            sp2bjNumber: normalizeName(data.sp2bjNumber),
            contractStartDate: new Date(data.contractStartDate),
            contractEndDate: new Date(data.contractEndDate),
            quantityOrdered: data.quantityOrdered,
            budgetType: data.budgetType,
            unitPrice: data.unitPrice,
            freightCost: data.freightCost,
            totalCost: calculated.totalCost,
            ppnAmount: calculated.ppnAmount,
            grandTotal: calculated.grandTotal,
            createdById: user.id,
          },
        });
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      },
    );

    revalidateMany(ADMIN_REVALIDATE_PATHS);

    return buildSuccessState("Data pasokan berhasil disimpan.");
  } catch (error) {
    return buildErrorState(
      getPrismaErrorMessage(error) ?? "Gagal menyimpan data pasokan.",
    );
  }
}

export async function updateSupplyOrderAction(
  supplyOrderId: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const { user, permission } = await requireFeatureAccess(
    "canAccessSupplyInput",
    "Tidak memiliki akses mengubah data pasokan.",
  );

  const parsed = parseSupplyOrderForm(formData);

  if (!parsed.success) {
    return buildErrorState(
      "Validasi gagal.",
      parsed.error.flatten().fieldErrors,
    );
  }

  const data = parsed.data;
  const calculated = calculateSupplyCosts(
    data.quantityOrdered,
    data.unitPrice,
    data.freightCost,
  );

  try {
    await prisma.$transaction(
      async (tx) => {
        const existingOrder = await tx.supplyOrder.findUnique({
          where: { id: supplyOrderId },
          select: { id: true, gardenId: true },
        });

        if (!existingOrder) {
          throw new Error("Data pasokan tidak ditemukan.");
        }

        if (
          !canAccessGardenAction(
            permission,
            "edit",
            user.assignedGardenId,
            existingOrder.gardenId,
          )
        ) {
          throw new Error(
            "Role Anda tidak memiliki akses edit untuk kebun pada data pasokan ini.",
          );
        }

        const totalDelivered = await getDeliveredQuantityForOrder(
          tx,
          supplyOrderId,
        );

        if (data.quantityOrdered < totalDelivered) {
          throw new Error(
            `Volume kontrak tidak boleh lebih kecil dari total penerimaan yang sudah tercatat (${totalDelivered}).`,
          );
        }

        const master = await resolveMasterDataByName(tx, data);

        if (
          !canAccessGardenAction(
            permission,
            "edit",
            user.assignedGardenId,
            master.garden.id,
          )
        ) {
          throw new Error(
            "Role Anda tidak memiliki akses edit untuk kebun tujuan pada data pasokan ini.",
          );
        }

        await tx.supplyOrder.update({
          where: { id: supplyOrderId },
          data: {
            gardenId: master.garden.id,
            fertilizerTypeId: master.fertilizerType.id,
            supplierId: master.supplier.id,
            sp2bjNumber: normalizeName(data.sp2bjNumber),
            contractStartDate: new Date(data.contractStartDate),
            contractEndDate: new Date(data.contractEndDate),
            quantityOrdered: data.quantityOrdered,
            budgetType: data.budgetType,
            unitPrice: data.unitPrice,
            freightCost: data.freightCost,
            totalCost: calculated.totalCost,
            ppnAmount: calculated.ppnAmount,
            grandTotal: calculated.grandTotal,
          },
        });
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      },
    );

    revalidateMany([
      ...ADMIN_REVALIDATE_PATHS,
      `${ADMIN_ROUTES.supply.root}/${supplyOrderId}`,
      `${ADMIN_ROUTES.supply.root}/${supplyOrderId}/edit`,
    ]);

    return buildSuccessState("Data pasokan berhasil diperbarui.");
  } catch (error) {
    return buildErrorState(
      getPrismaErrorMessage(error) ?? "Gagal memperbarui data pasokan.",
    );
  }
}

export async function deleteSupplyOrderAction(supplyOrderId: string) {
  const { user, permission } = await requireFeatureAccess(
    "canAccessSupplyList",
    "Tidak memiliki akses menghapus data pasokan.",
  );

  try {
    const existingOrder = await prisma.supplyOrder.findUnique({
      where: { id: supplyOrderId },
      select: { id: true, gardenId: true },
    });

    if (!existingOrder) {
      throw new Error("Data pasokan tidak ditemukan.");
    }

    if (
      !canAccessGardenAction(
        permission,
        "delete",
        user.assignedGardenId,
        existingOrder.gardenId,
      )
    ) {
      throw new Error(
        "Role Anda tidak memiliki akses hapus untuk kebun pada data pasokan ini.",
      );
    }

    await prisma.supplyOrder.delete({
      where: { id: supplyOrderId },
    });

    revalidateMany([
      ...ADMIN_REVALIDATE_PATHS,
      `${ADMIN_ROUTES.supply.root}/${supplyOrderId}`,
      `${ADMIN_ROUTES.supply.root}/${supplyOrderId}/edit`,
    ]);
  } catch (error) {
    throw new Error(
      getPrismaErrorMessage(error) ?? "Gagal menghapus data pasokan.",
    );
  }
}

export async function saveGardenAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const { user, permission } = await requireFeatureAccess(
    "canAccessMasterGardens",
    "Tidak memiliki akses mengelola master kebun.",
  );

  const parsed = gardenMasterSchema.safeParse({
    id: formData.get("id") || undefined,
    name: formData.get("name"),
    code: formData.get("code"),
    address: formData.get("address"),
    status: formData.get("status"),
  });

  if (!parsed.success) {
    return buildErrorState(
      "Validasi data kebun gagal.",
      parsed.error.flatten().fieldErrors,
    );
  }

  const data = parsed.data;

  try {
    if (data.id) {
      const garden = await prisma.garden.findUnique({
        where: { id: data.id },
        select: { id: true },
      });

      if (!garden) {
        return buildErrorState("Data kebun tidak ditemukan.");
      }

      if (
        !canAccessGardenAction(permission, "edit", user.assignedGardenId, data.id)
      ) {
        return buildErrorState(
          "Role Anda tidak memiliki akses edit untuk data kebun ini.",
        );
      }

      await prisma.garden.update({
        where: { id: data.id },
        data: {
          name: normalizeName(data.name),
          code: data.code.trim().toUpperCase(),
          address: normalizeOptionalText(data.address),
          isActive: toStatusBoolean(data.status),
        },
      });

      revalidateMany(ADMIN_REVALIDATE_PATHS);
      return buildSuccessState("Data kebun berhasil diperbarui.");
    }

    if (!canAccessGardenAction(permission, "edit", user.assignedGardenId)) {
      return buildErrorState(
        "Role Anda tidak memiliki akses menambah data kebun baru.",
      );
    }

    await prisma.garden.create({
      data: {
        name: normalizeName(data.name),
        code: data.code.trim().toUpperCase(),
        address: normalizeOptionalText(data.address),
        isActive: toStatusBoolean(data.status),
      },
    });

    revalidateMany(ADMIN_REVALIDATE_PATHS);
    return buildSuccessState("Data kebun berhasil ditambahkan.");
  } catch (error) {
    return buildErrorState(
      getPrismaErrorMessage(error) ?? "Gagal menyimpan data kebun.",
    );
  }
}

export async function deleteGardenAction(id: string): Promise<ActionState> {
  const { user, permission } = await requireFeatureAccess(
    "canAccessMasterGardens",
    "Tidak memiliki akses menghapus master kebun.",
  );

  try {
    if (!canAccessGardenAction(permission, "delete", user.assignedGardenId, id)) {
      return buildErrorState(
        "Role Anda tidak memiliki akses hapus untuk data kebun ini.",
      );
    }

    const usageCount = await prisma.supplyOrder.count({ where: { gardenId: id } });

    if (usageCount > 0) {
      return buildErrorState(
        "Data kebun tidak bisa dihapus karena sudah dipakai pada transaksi pasokan. Ubah status menjadi tidak aktif jika tidak ingin dipilih lagi.",
      );
    }

    await prisma.garden.delete({ where: { id } });
    revalidateMany(ADMIN_REVALIDATE_PATHS);
    return buildSuccessState("Data kebun berhasil dihapus.");
  } catch (error) {
    return buildErrorState(
      getPrismaErrorMessage(error) ?? "Gagal menghapus data kebun.",
    );
  }
}

export async function saveFertilizerAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireFeatureAccess(
    "canAccessMasterFertilizers",
    "Tidak memiliki akses mengelola master pupuk.",
  );

  const parsed = fertilizerMasterSchema.safeParse({
    id: formData.get("id") || undefined,
    name: formData.get("name"),
    status: formData.get("status"),
  });

  if (!parsed.success) {
    return buildErrorState(
      "Validasi data pupuk gagal.",
      parsed.error.flatten().fieldErrors,
    );
  }

  const data = parsed.data;

  try {
    if (data.id) {
      await prisma.fertilizerType.update({
        where: { id: data.id },
        data: {
          name: normalizeName(data.name),
          isActive: toStatusBoolean(data.status),
        },
      });

      revalidateMany(ADMIN_REVALIDATE_PATHS);
      return buildSuccessState("Data pupuk berhasil diperbarui.");
    }

    await prisma.fertilizerType.create({
      data: {
        name: normalizeName(data.name),
        isActive: toStatusBoolean(data.status),
      },
    });

    revalidateMany(ADMIN_REVALIDATE_PATHS);
    return buildSuccessState("Data pupuk berhasil ditambahkan.");
  } catch (error) {
    return buildErrorState(
      getPrismaErrorMessage(error) ?? "Gagal menyimpan data pupuk.",
    );
  }
}

export async function deleteFertilizerAction(id: string): Promise<ActionState> {
  await requireFeatureAccess(
    "canAccessMasterFertilizers",
    "Tidak memiliki akses menghapus master pupuk.",
  );

  try {
    const usageCount = await prisma.supplyOrder.count({
      where: { fertilizerTypeId: id },
    });

    if (usageCount > 0) {
      return buildErrorState(
        "Data pupuk tidak bisa dihapus karena sudah dipakai pada transaksi pasokan. Ubah status menjadi tidak aktif jika tidak ingin dipilih lagi.",
      );
    }

    await prisma.fertilizerType.delete({ where: { id } });
    revalidateMany(ADMIN_REVALIDATE_PATHS);
    return buildSuccessState("Data pupuk berhasil dihapus.");
  } catch (error) {
    return buildErrorState(
      getPrismaErrorMessage(error) ?? "Gagal menghapus data pupuk.",
    );
  }
}

export async function saveSupplierAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireFeatureAccess(
    "canAccessMasterSuppliers",
    "Tidak memiliki akses mengelola master supplier.",
  );

  const parsed = supplierMasterSchema.safeParse({
    id: formData.get("id") || undefined,
    name: formData.get("name"),
    address: formData.get("address"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    status: formData.get("status"),
  });

  if (!parsed.success) {
    return buildErrorState(
      "Validasi data supplier gagal.",
      parsed.error.flatten().fieldErrors,
    );
  }

  const data = parsed.data;

  try {
    if (data.id) {
      await prisma.supplier.update({
        where: { id: data.id },
        data: {
          name: normalizeName(data.name),
          address: normalizeOptionalText(data.address),
          phone: normalizeOptionalText(data.phone),
          email: data.email.trim().toLowerCase(),
          isActive: toStatusBoolean(data.status),
        },
      });

      revalidateMany(ADMIN_REVALIDATE_PATHS);
      return buildSuccessState("Data supplier berhasil diperbarui.");
    }

    await prisma.supplier.create({
      data: {
        name: normalizeName(data.name),
        address: normalizeOptionalText(data.address),
        phone: normalizeOptionalText(data.phone),
        email: data.email.trim().toLowerCase(),
        isActive: toStatusBoolean(data.status),
      },
    });

    revalidateMany(ADMIN_REVALIDATE_PATHS);
    return buildSuccessState("Data supplier berhasil ditambahkan.");
  } catch (error) {
    return buildErrorState(
      getPrismaErrorMessage(error) ?? "Gagal menyimpan data supplier.",
    );
  }
}

export async function deleteSupplierAction(id: string): Promise<ActionState> {
  await requireFeatureAccess(
    "canAccessMasterSuppliers",
    "Tidak memiliki akses menghapus master supplier.",
  );

  try {
    const usageCount = await prisma.supplyOrder.count({
      where: { supplierId: id },
    });

    if (usageCount > 0) {
      return buildErrorState(
        "Data supplier tidak bisa dihapus karena sudah dipakai pada transaksi pasokan. Ubah status menjadi tidak aktif jika tidak ingin dipilih lagi.",
      );
    }

    await prisma.supplier.delete({ where: { id } });
    revalidateMany(ADMIN_REVALIDATE_PATHS);
    return buildSuccessState("Data supplier berhasil dihapus.");
  } catch (error) {
    return buildErrorState(
      getPrismaErrorMessage(error) ?? "Gagal menghapus data supplier.",
    );
  }
}