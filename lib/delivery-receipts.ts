import { prisma } from "@/lib/prisma";

export async function getDeliveredQuantityMap(orderIds: string[]) {
  if (orderIds.length === 0) {
    return new Map<string, number>();
  }

  const groupedDeliveries = await prisma.deliveryReceipt.groupBy({
    by: ["supplyOrderId"],
    where: {
      supplyOrderId: {
        in: orderIds,
      },
    },
    _sum: {
      quantityDelivered: true,
    },
  });

  return new Map(
    groupedDeliveries.map((item) => [
      item.supplyOrderId,
      item._sum.quantityDelivered ?? 0,
    ]),
  );
}