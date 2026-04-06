"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { Prisma } from "@/src/generated/prisma";
import { prisma } from "@/lib/prisma";
import { requireKraniGardenFeature } from "@/lib/auth-guards";
import { CACHE_TAGS } from "@/lib/cache-tags";
import { normalizeUppercase } from "@/lib/utils";
import { deliveryReceiptSchema } from "@/lib/validations/krani";
import type { ActionState } from "@/lib/actions/shared";
import { ADMIN_ROUTES, KRANI_ROUTES } from "@/lib/routes";
import { canAccessGardenAction } from "@/lib/permissions";

const KRANI_REVALIDATE_PATHS = [
  KRANI_ROUTES.home,
  KRANI_ROUTES.delivery,
  ADMIN_ROUTES.home,
  ADMIN_ROUTES.supply.root,
  ADMIN_ROUTES.supply.input,
  ADMIN_ROUTES.supply.list,
  ADMIN_ROUTES.supplierInformation,
] as const;

function buildErrorState(message: string, errors?: Record<string, string[]>) {
  return {
    success: false,
    message,
    errors,
  } satisfies ActionState;
}

function revalidateMany(paths: readonly string[]) {
  for (const path of paths) {
    revalidatePath(path);
  }
}

function revalidateTags(tags: readonly string[]) {
  for (const tag of tags) {
    revalidateTag(tag, "max");
  }
}

export async function createDeliveryReceiptAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const { user, permission } = await requireKraniGardenFeature(
    "canAccessDeliveryWorkspace",
    "edit",
    "Tidak memiliki akses input penerimaan pupuk.",
  );

  const parsed = deliveryReceiptSchema.safeParse({
    supplyOrderId: formData.get("supplyOrderId"),
    licensePlate: formData.get("licensePlate"),
    receivedDate: formData.get("receivedDate"),
    quantityDelivered: formData.get("quantityDelivered"),
    sackCount: formData.get("sackCount"),
  });

  if (!parsed.success) {
    return buildErrorState(
      "Validasi penerimaan gagal.",
      parsed.error.flatten().fieldErrors,
    );
  }

  const data = parsed.data;

  try {
    await prisma.$transaction(
      async (tx) => {
        const order = await tx.supplyOrder.findUnique({
          where: { id: data.supplyOrderId },
          select: {
            id: true,
            quantityOrdered: true,
            gardenId: true,
          },
        });

        const deliveredAggregate = await tx.deliveryReceipt.aggregate({
          where: {
            supplyOrderId: data.supplyOrderId,
          },
          _sum: {
            quantityDelivered: true,
          },
        });

        if (!order) {
          throw new Error("Data SP2BJ tidak ditemukan.");
        }

        if (
          !canAccessGardenAction(
            permission,
            "edit",
            user.assignedGardenId,
            order.gardenId,
          )
        ) {
          throw new Error(
            "Anda hanya dapat menginput penerimaan untuk kebun yang diizinkan pada role Anda.",
          );
        }

        const currentDelivered = deliveredAggregate._sum.quantityDelivered ?? 0;

        if (currentDelivered + data.quantityDelivered > order.quantityOrdered) {
          throw new Error("Jumlah pengiriman melebihi sisa kontrak pasokan.");
        }

        await tx.deliveryReceipt.create({
          data: {
            supplyOrderId: data.supplyOrderId,
            licensePlate: normalizeUppercase(data.licensePlate),
            receivedDate: new Date(data.receivedDate),
            quantityDelivered: data.quantityDelivered,
            sackCount: data.sackCount,
            createdById: user.id,
          },
        });
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      },
    );

    revalidateMany(KRANI_REVALIDATE_PATHS);
    revalidateTags([CACHE_TAGS.deliveryReceipts, CACHE_TAGS.supplyOrders]);

    return { success: true, message: "Data penerimaan berhasil disimpan." };
  } catch (error) {
    return buildErrorState(
      error instanceof Error
        ? error.message
        : "Gagal menyimpan penerimaan pupuk.",
    );
  }
}