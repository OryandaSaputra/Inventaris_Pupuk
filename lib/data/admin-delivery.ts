import { unstable_cache } from "next/cache";
import { cache } from "react";
import { CACHE_TAGS } from "@/lib/cache-tags";
import { prisma } from "@/lib/prisma";
import { getDeliveredQuantityMap } from "@/lib/delivery-receipts";

export type AdminDeliveryOption = {
  id: string;
  gardenId: string;
  gardenName: string;
  fertilizerTypeId: string;
  fertilizerTypeName: string;
  supplierName: string;
  sp2bjNumber: string;
  remainingQuantity: number;
};

const getCachedAdminDeliveryFormOptions = unstable_cache(
  async () => {
    const orders = await prisma.supplyOrder.findMany({
      select: {
        id: true,
        quantityOrdered: true,
        sp2bjNumber: true,
        garden: {
          select: {
            id: true,
            name: true,
          },
        },
        fertilizerType: {
          select: {
            id: true,
            name: true,
          },
        },
        supplier: {
          select: {
            name: true,
          },
        },
      },
      orderBy: [{ garden: { name: "asc" } }, { createdAt: "desc" }],
    });

    const deliveredQuantityMap = await getDeliveredQuantityMap(
      orders.map((order) => order.id),
    );

    return orders
      .map((order) => {
        const delivered = deliveredQuantityMap.get(order.id) ?? 0;

        return {
          id: order.id,
          gardenId: order.garden.id,
          gardenName: order.garden.name,
          fertilizerTypeId: order.fertilizerType.id,
          fertilizerTypeName: order.fertilizerType.name,
          supplierName: order.supplier.name,
          sp2bjNumber: order.sp2bjNumber,
          remainingQuantity: Math.max(order.quantityOrdered - delivered, 0),
        };
      })
      .filter((order) => order.remainingQuantity > 0);
  },
  ["admin:delivery-form-options"],
  {
    revalidate: 300,
    tags: [CACHE_TAGS.supplyOrders, CACHE_TAGS.deliveryReceipts, CACHE_TAGS.masterData],
  },
);

export const getAdminDeliveryFormOptions = cache(async () => {
  return getCachedAdminDeliveryFormOptions();
});

export async function getAdminDeliveryTableData() {
  return prisma.deliveryReceipt.findMany({
    orderBy: [{ receivedDate: "desc" }, { createdAt: "desc" }],
    include: {
      supplyOrder: {
        select: {
          sp2bjNumber: true,
          garden: {
            select: {
              name: true,
            },
          },
          fertilizerType: {
            select: {
              name: true,
            },
          },
          supplier: {
            select: {
              name: true,
            },
          },
        },
      },
      createdBy: {
        select: {
          name: true,
        },
      },
    },
    take: 200,
  });
}