import { cache } from "react";
import { unstable_cache } from "next/cache";
import { getDeliveredQuantityMap } from "@/lib/delivery-receipts";
import { CACHE_TAGS } from "@/lib/cache-tags";
import { prisma } from "@/lib/prisma";

const JAKARTA_TIME_ZONE = "Asia/Jakarta";

const DATE_KEY_FORMATTER = new Intl.DateTimeFormat("en-US", {
  timeZone: JAKARTA_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const SHORT_DAY_FORMATTER = new Intl.DateTimeFormat("id-ID", {
  timeZone: JAKARTA_TIME_ZONE,
  day: "2-digit",
  month: "short",
});

const LONG_DAY_FORMATTER = new Intl.DateTimeFormat("id-ID", {
  timeZone: JAKARTA_TIME_ZONE,
  day: "2-digit",
  month: "short",
  year: "numeric",
});

function getJakartaDateKey(value: Date | string) {
  const parts = DATE_KEY_FORMATTER.formatToParts(new Date(value));
  const year = parts.find((part) => part.type === "year")?.value ?? "0000";
  const month = parts.find((part) => part.type === "month")?.value ?? "00";
  const day = parts.find((part) => part.type === "day")?.value ?? "00";

  return `${year}-${month}-${day}`;
}

function createRecentDayBuckets(days: number) {
  const today = new Date();

  return Array.from({ length: days }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (days - index - 1));

    return {
      dateKey: getJakartaDateKey(date),
      label: LONG_DAY_FORMATTER.format(date),
      shortLabel: SHORT_DAY_FORMATTER.format(date),
      totalDelivered: 0,
      deliveryCount: 0,
    };
  });
}

const getCachedGardenContext = unstable_cache(
  async (gardenId: string) => {
    const garden = await prisma.garden.findUnique({
      where: { id: gardenId },
      select: {
        id: true,
        name: true,
        code: true,
      },
    });

    if (!garden) {
      throw new Error("Kebun user tidak ditemukan.");
    }

    return garden;
  },
  ["krani:garden-context"],
  {
    revalidate: 300,
    tags: [CACHE_TAGS.masterData],
  },
);

const getGardenContext = cache(async (gardenId: string) => {
  return getCachedGardenContext(gardenId);
});

const getCachedKraniDashboardData = unstable_cache(
  async (gardenId: string) => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 16);

    const [garden, orders, recentDeliveries, recentDeliverySeries] =
      await Promise.all([
        getGardenContext(gardenId),
        prisma.supplyOrder.findMany({
          where: { gardenId },
          select: {
            id: true,
            quantityOrdered: true,
          },
        }),
        prisma.deliveryReceipt.findMany({
          where: {
            supplyOrder: {
              is: {
                gardenId,
              },
            },
          },
          orderBy: [{ receivedDate: "desc" }, { createdAt: "desc" }],
          take: 5,
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
          },
        }),
        prisma.deliveryReceipt.findMany({
          where: {
            receivedDate: {
              gte: startDate,
            },
            supplyOrder: {
              is: {
                gardenId,
              },
            },
          },
          orderBy: { receivedDate: "asc" },
          select: {
            receivedDate: true,
            quantityDelivered: true,
          },
        }),
      ]);

    const deliveredQuantityMap = await getDeliveredQuantityMap(
      orders.map((order) => order.id),
    );

    const outstandingOrders = orders.map((order) => {
      const totalDelivered = deliveredQuantityMap.get(order.id) ?? 0;
      return Math.max(order.quantityOrdered - totalDelivered, 0);
    });

    const deliveryTrend = createRecentDayBuckets(7);
    const deliveryTrendMap = new Map(
      deliveryTrend.map((item) => [item.dateKey, item]),
    );

    for (const delivery of recentDeliverySeries) {
      const key = getJakartaDateKey(delivery.receivedDate);
      const bucket = deliveryTrendMap.get(key);

      if (!bucket) {
        continue;
      }

      bucket.totalDelivered += delivery.quantityDelivered;
      bucket.deliveryCount += 1;
    }

    const todayKey = getJakartaDateKey(new Date());
    const todayDelivered = deliveryTrendMap.get(todayKey)?.totalDelivered ?? 0;

    return {
      garden,
      activeOrders: outstandingOrders.filter((item) => item > 0).length,
      todayDelivered,
      outstandingQuantity: outstandingOrders.reduce(
        (total, item) => total + item,
        0,
      ),
      recentDeliveries,
      deliveryTrend,
    };
  },
  ["krani:dashboard"],
  {
    revalidate: 300,
    tags: [CACHE_TAGS.supplyOrders, CACHE_TAGS.deliveryReceipts, CACHE_TAGS.masterData],
  },
);

export async function getKraniDashboardData(gardenId: string) {
  return getCachedKraniDashboardData(gardenId);
}

const getCachedKraniFormOptions = unstable_cache(
  async (gardenId: string) => {
    const [garden, orders] = await Promise.all([
      getGardenContext(gardenId),
      prisma.supplyOrder.findMany({
        where: { gardenId },
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
        orderBy: { createdAt: "desc" },
      }),
    ]);

    const deliveredQuantityMap = await getDeliveredQuantityMap(
      orders.map((order) => order.id),
    );

    const options = orders
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

    return {
      garden,
      options,
    };
  },
  ["krani:form-options"],
  {
    revalidate: 300,
    tags: [CACHE_TAGS.supplyOrders, CACHE_TAGS.deliveryReceipts, CACHE_TAGS.masterData],
  },
);

export async function getKraniFormOptions(gardenId: string) {
  return getCachedKraniFormOptions(gardenId);
}

export async function getDeliveryTableData(gardenId: string) {
  return prisma.deliveryReceipt.findMany({
    where: {
      supplyOrder: {
        is: {
          gardenId,
        },
      },
    },
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
  });
}