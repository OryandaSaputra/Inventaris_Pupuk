import { cache } from "react";
import { unstable_cache } from "next/cache";
import { getDeliveredQuantityMap } from "@/lib/delivery-receipts";
import { CACHE_TAGS } from "@/lib/cache-tags";
import { prisma } from "@/lib/prisma";
import { getSupplyOrderMetrics } from "@/lib/supply-order";
import { decimalToNumber } from "@/lib/utils";
import type { Prisma } from "@/src/generated/prisma";

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

const supplyOrderListSelect = {
  id: true,
  sp2bjNumber: true,
  contractStartDate: true,
  contractEndDate: true,
  quantityOrdered: true,
  budgetType: true,
  unitPrice: true,
  freightCost: true,
  totalCost: true,
  ppnAmount: true,
  grandTotal: true,
  createdAt: true,
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
      id: true,
      name: true,
    },
  },
} satisfies Prisma.SupplyOrderSelect;

type SupplyOrderListRecord = Prisma.SupplyOrderGetPayload<{
  select: typeof supplyOrderListSelect;
}>;

export type AdminSupplyOrderRow = ReturnType<typeof mapSupplyOrderRow>;

export type DeliveryTrendPoint = {
  dateKey: string;
  label: string;
  shortLabel: string;
  totalDelivered: number;
  deliveryCount: number;
};

export type SupplierPerformanceRow = {
  supplierName: string;
  totalContractQuantity: number;
  totalDeliveredQuantity: number;
  outstandingQuantity: number;
  activeContracts: number;
  completedContracts: number;
  fillRate: number;
};

export type ContractPriorityPoint = {
  id: string;
  sp2bjNumber: string;
  gardenName: string;
  fertilizerTypeName: string;
  remainingQuantity: number;
  remainingContractDays: number;
  notificationStatus: AdminSupplyOrderRow["notificationStatus"];
  notificationLabel: string;
  completionRate: number;
};

export type ContractTargetVsActualPoint = {
  dateKey: string;
  label: string;
  shortLabel: string;
  targetCumulative: number;
  actualCumulative: number;
};

function getJakartaDateKey(value: Date | string) {
  const parts = DATE_KEY_FORMATTER.formatToParts(new Date(value));
  const year = parts.find((part) => part.type === "year")?.value ?? "0000";
  const month = parts.find((part) => part.type === "month")?.value ?? "00";
  const day = parts.find((part) => part.type === "day")?.value ?? "00";

  return `${year}-${month}-${day}`;
}

function getJakartaShortLabel(value: Date | string) {
  return SHORT_DAY_FORMATTER.format(new Date(value));
}

function getJakartaLongLabel(value: Date | string) {
  return LONG_DAY_FORMATTER.format(new Date(value));
}

function roundPercentage(value: number) {
  return Math.min(100, Math.max(0, Number(value.toFixed(1))));
}

function getCompletionRate(quantityOrdered: number, totalDelivered: number) {
  if (quantityOrdered <= 0) {
    return 0;
  }

  return roundPercentage((totalDelivered / quantityOrdered) * 100);
}

function getPriorityRank(status: AdminSupplyOrderRow["notificationStatus"]) {
  switch (status) {
    case "MERAH":
      return 0;
    case "KUNING":
      return 1;
    case "NORMAL":
      return 2;
    default:
      return 3;
  }
}

function createRecentDayBuckets(days: number) {
  const today = new Date();

  return Array.from({ length: days }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (days - index - 1));

    return {
      dateKey: getJakartaDateKey(date),
      label: getJakartaLongLabel(date),
      shortLabel: getJakartaShortLabel(date),
      totalDelivered: 0,
      deliveryCount: 0,
    } satisfies DeliveryTrendPoint;
  });
}

function mapSupplyOrderRow(
  order: SupplyOrderListRecord,
  deliveredQuantityMap: Map<string, number>,
) {
  const totalDelivered = deliveredQuantityMap.get(order.id) ?? 0;

  const metrics = getSupplyOrderMetrics({
    quantityOrdered: order.quantityOrdered,
    totalDelivered,
    contractStartDate: order.contractStartDate,
    contractEndDate: order.contractEndDate,
  });

  return {
    id: order.id,
    gardenName: order.garden.name,
    fertilizerTypeName: order.fertilizerType.name,
    supplierName: order.supplier.name,
    sp2bjNumber: order.sp2bjNumber,
    contractStartDate: order.contractStartDate,
    contractEndDate: order.contractEndDate,
    quantityOrdered: order.quantityOrdered,
    budgetType: order.budgetType,
    unitPrice: decimalToNumber(order.unitPrice),
    freightCost: decimalToNumber(order.freightCost),
    totalCost: decimalToNumber(order.totalCost),
    ppnAmount: decimalToNumber(order.ppnAmount),
    grandTotal: decimalToNumber(order.grandTotal),
    totalDelivered,
    completionRate: getCompletionRate(order.quantityOrdered, totalDelivered),
    ...metrics,
  };
}

const getCachedAdminSupplyOrdersWithMetrics = unstable_cache(
  async () => {
    const orders = await prisma.supplyOrder.findMany({
      select: supplyOrderListSelect,
      orderBy: { createdAt: "desc" },
    });

    const deliveredQuantityMap = await getDeliveredQuantityMap(
      orders.map((order) => order.id),
    );

    return orders.map((order) => mapSupplyOrderRow(order, deliveredQuantityMap));
  },
  ["admin:supply-orders-with-metrics"],
  {
    revalidate: 300,
    tags: [CACHE_TAGS.supplyOrders, CACHE_TAGS.deliveryReceipts],
  },
);

const getAdminSupplyOrdersWithMetrics = cache(async () => {
  return getCachedAdminSupplyOrdersWithMetrics();
});

const getCachedSupplyOrderFormOptions = unstable_cache(
  async () => {
    const [gardens, fertilizerTypes, suppliers] = await Promise.all([
      prisma.garden.findMany({
        where: { isActive: true },
        orderBy: { name: "asc" },
        select: { name: true },
      }),
      prisma.fertilizerType.findMany({
        where: { isActive: true },
        orderBy: { name: "asc" },
        select: { name: true },
      }),
      prisma.supplier.findMany({
        where: { isActive: true },
        orderBy: { name: "asc" },
        select: { name: true },
      }),
    ]);

    return {
      gardens: gardens.map((item) => item.name),
      fertilizerTypes: fertilizerTypes.map((item) => item.name),
      suppliers: suppliers.map((item) => item.name),
    };
  },
  ["admin:supply-order-form-options"],
  {
    revalidate: 300,
    tags: [CACHE_TAGS.masterData],
  },
);

export async function getSupplyOrderFormOptions() {
  return getCachedSupplyOrderFormOptions();
}

const getCachedAdminDeliveryTrendData = unstable_cache(
  async (days: number) => {
    const buckets = createRecentDayBuckets(days);
    const bucketMap = new Map(buckets.map((bucket) => [bucket.dateKey, bucket]));

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - (days + 2));

    const deliveries = await prisma.deliveryReceipt.findMany({
      where: {
        receivedDate: {
          gte: startDate,
        },
      },
      select: {
        receivedDate: true,
        quantityDelivered: true,
      },
      orderBy: { receivedDate: "asc" },
    });

    for (const delivery of deliveries) {
      const key = getJakartaDateKey(delivery.receivedDate);
      const bucket = bucketMap.get(key);

      if (!bucket) {
        continue;
      }

      bucket.totalDelivered += delivery.quantityDelivered;
      bucket.deliveryCount += 1;
    }

    return buckets;
  },
  ["admin:delivery-trend"],
  {
    revalidate: 300,
    tags: [CACHE_TAGS.deliveryReceipts],
  },
);

export const getAdminDeliveryTrendData = cache(async (days = 14) => {
  return getCachedAdminDeliveryTrendData(days);
});

export function getSupplierPerformanceData(rows: AdminSupplyOrderRow[]) {
  const grouped = new Map<string, SupplierPerformanceRow>();

  for (const row of rows) {
    const current = grouped.get(row.supplierName) ?? {
      supplierName: row.supplierName,
      totalContractQuantity: 0,
      totalDeliveredQuantity: 0,
      outstandingQuantity: 0,
      activeContracts: 0,
      completedContracts: 0,
      fillRate: 0,
    };

    current.totalContractQuantity += row.quantityOrdered;
    current.totalDeliveredQuantity += row.totalDelivered;
    current.outstandingQuantity += row.remainingQuantity;

    if (row.remainingQuantity > 0) {
      current.activeContracts += 1;
    } else {
      current.completedContracts += 1;
    }

    grouped.set(row.supplierName, current);
  }

  return Array.from(grouped.values())
    .map((row) => ({
      ...row,
      fillRate:
        row.totalContractQuantity > 0
          ? roundPercentage(
              (row.totalDeliveredQuantity / row.totalContractQuantity) * 100,
            )
          : 0,
    }))
    .sort((left, right) => {
      if (right.fillRate !== left.fillRate) {
        return right.fillRate - left.fillRate;
      }

      return right.totalContractQuantity - left.totalContractQuantity;
    });
}

export function getContractPriorityMatrixData(rows: AdminSupplyOrderRow[]) {
  return rows
    .filter((row) => row.remainingQuantity > 0)
    .sort((left, right) => {
      const statusDiff =
        getPriorityRank(left.notificationStatus) -
        getPriorityRank(right.notificationStatus);

      if (statusDiff !== 0) {
        return statusDiff;
      }

      if (left.remainingContractDays !== right.remainingContractDays) {
        return left.remainingContractDays - right.remainingContractDays;
      }

      return right.remainingQuantity - left.remainingQuantity;
    })
    .slice(0, 18)
    .map((row) => ({
      id: row.id,
      sp2bjNumber: row.sp2bjNumber,
      gardenName: row.gardenName,
      fertilizerTypeName: row.fertilizerTypeName,
      remainingQuantity: row.remainingQuantity,
      remainingContractDays: row.remainingContractDays,
      notificationStatus: row.notificationStatus,
      notificationLabel: row.notificationLabel,
      completionRate: row.completionRate,
    })) satisfies ContractPriorityPoint[];
}

export function buildContractTargetVsActualData(input: {
  contractStartDate: Date | string;
  contractEndDate: Date | string;
  quantityOrdered: number;
  deliveries: Array<{
    receivedDate: Date | string;
    quantityDelivered: number;
  }>;
}) {
  const startDate = new Date(input.contractStartDate);
  const endDate = new Date(input.contractEndDate);

  if (
    Number.isNaN(startDate.getTime()) ||
    Number.isNaN(endDate.getTime()) ||
    endDate < startDate
  ) {
    return [] satisfies ContractTargetVsActualPoint[];
  }

  const totalDays = Math.max(
    1,
    Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000),
    ),
  );

  const sampleCount = Math.min(totalDays + 1, 8);
  const sampledDates = Array.from({ length: sampleCount }, (_, index) => {
    if (sampleCount === 1) {
      return new Date(startDate);
    }

    const ratio = index / (sampleCount - 1);
    const date = new Date(startDate);
    date.setTime(
      startDate.getTime() + ratio * (endDate.getTime() - startDate.getTime()),
    );
    return date;
  });

  const deliveriesByDay = new Map<string, number>();

  for (const delivery of input.deliveries) {
    const key = getJakartaDateKey(delivery.receivedDate);
    deliveriesByDay.set(
      key,
      (deliveriesByDay.get(key) ?? 0) + delivery.quantityDelivered,
    );
  }

  return sampledDates.map((date, index) => {
    const elapsedRatio = sampleCount === 1 ? 1 : index / (sampleCount - 1);
    const dateKey = getJakartaDateKey(date);

    let actualCumulative = 0;

    for (const [key, quantity] of deliveriesByDay.entries()) {
      if (key <= dateKey) {
        actualCumulative += quantity;
      }
    }

    return {
      dateKey,
      label: getJakartaLongLabel(date),
      shortLabel: getJakartaShortLabel(date),
      targetCumulative: Math.round(input.quantityOrdered * elapsedRatio),
      actualCumulative,
    } satisfies ContractTargetVsActualPoint;
  });
}

export async function getAdminDashboardData() {
  const [rows, userCount, deliveryCount, deliveryTrend] = await Promise.all([
    getAdminSupplyOrdersWithMetrics(),
    prisma.user.count(),
    prisma.deliveryReceipt.count(),
    getAdminDeliveryTrendData(),
  ]);

  const totalContractQuantity = rows.reduce(
    (total, item) => total + item.quantityOrdered,
    0,
  );

  const totalDeliveredQuantity = rows.reduce(
    (total, item) => total + item.totalDelivered,
    0,
  );

  const outstandingQuantity = rows.reduce(
    (total, item) => total + item.remainingQuantity,
    0,
  );

  const criticalOrders = rows.filter(
    (item) => item.notificationStatus === "MERAH",
  ).length;

  const warningOrders = rows.filter(
    (item) => item.notificationStatus === "KUNING",
  ).length;

  const completedOrders = rows.filter(
    (item) => item.remainingQuantity <= 0,
  ).length;

  const endedOrders = rows.filter(
    (item) => item.notificationStatus === "HIJAU",
  ).length;

  const safeOrders = rows.filter(
    (item) => item.notificationStatus === "NORMAL",
  ).length;

  const activeOrders = rows.filter(
    (item) => item.remainingContractDays > 0 && item.remainingQuantity > 0,
  ).length;

  const deliveryProgressPercentage =
    totalContractQuantity > 0
      ? Number(
          ((totalDeliveredQuantity / totalContractQuantity) * 100).toFixed(1),
        )
      : 0;

  return {
    totalOrders: rows.length,
    totalUsers: userCount,
    totalDeliveries: deliveryCount,
    activeOrders,
    criticalOrders,
    warningOrders,
    safeOrders,
    endedOrders,
    completedOrders,
    totalContractQuantity,
    totalDeliveredQuantity,
    outstandingQuantity,
    deliveryProgressPercentage,
    recentOrders: rows.slice(0, 5),
    deliveryTrend,
    supplierPerformance: getSupplierPerformanceData(rows),
    contractPriorityMatrix: getContractPriorityMatrixData(rows),
  };
}

export async function getSupplyOrderTableData() {
  return getAdminSupplyOrdersWithMetrics();
}

export async function getSupplierInformationData() {
  const rows = await getAdminSupplyOrdersWithMetrics();

  return getSupplierPerformanceData(rows).sort((left, right) => {
    if (right.outstandingQuantity !== left.outstandingQuantity) {
      return right.outstandingQuantity - left.outstandingQuantity;
    }

    if (right.activeContracts !== left.activeContracts) {
      return right.activeContracts - left.activeContracts;
    }

    if (left.fillRate !== right.fillRate) {
      return left.fillRate - right.fillRate;
    }

    return left.supplierName.localeCompare(right.supplierName, "id-ID");
  });
}

export async function getSupplyOrderById(id: string) {
  return prisma.supplyOrder.findUnique({
    where: { id },
    select: {
      id: true,
      sp2bjNumber: true,
      contractStartDate: true,
      contractEndDate: true,
      quantityOrdered: true,
      budgetType: true,
      unitPrice: true,
      freightCost: true,
      totalCost: true,
      ppnAmount: true,
      grandTotal: true,
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
          id: true,
          name: true,
        },
      },
      deliveries: {
        orderBy: { receivedDate: "desc" },
        select: {
          id: true,
          quantityDelivered: true,
          receivedDate: true,
          licensePlate: true,
          sackCount: true,
        },
      },
    },
  });
}

export async function getUsersData() {
  return prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
  });
}

export async function getGardenInformationData() {
  const orders = await prisma.supplyOrder.findMany({
    select: {
      id: true,
      gardenId: true,
      quantityOrdered: true,
      contractStartDate: true,
      contractEndDate: true,
      garden: {
        select: {
          name: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const deliveredQuantityMap = await getDeliveredQuantityMap(
    orders.map((order) => order.id),
  );

  const grouped = new Map<
    string,
    {
      gardenName: string;
      totalContract: number;
      totalDelivered: number;
      activeSp2bj: number;
      redAlerts: number;
    }
  >();

  for (const order of orders) {
    const current = grouped.get(order.gardenId) ?? {
      gardenName: order.garden.name,
      totalContract: 0,
      totalDelivered: 0,
      activeSp2bj: 0,
      redAlerts: 0,
    };

    const totalDelivered = deliveredQuantityMap.get(order.id) ?? 0;

    const metrics = getSupplyOrderMetrics({
      quantityOrdered: order.quantityOrdered,
      totalDelivered,
      contractStartDate: order.contractStartDate,
      contractEndDate: order.contractEndDate,
    });

    current.totalContract += order.quantityOrdered;
    current.totalDelivered += totalDelivered;
    current.activeSp2bj += 1;

    if (metrics.notificationStatus === "MERAH") {
      current.redAlerts += 1;
    }

    grouped.set(order.gardenId, current);
  }

  return Array.from(grouped.values())
    .map((item) => {
      const remainingQuantity = Math.max(
        item.totalContract - item.totalDelivered,
        0,
      );

      return {
        ...item,
        remainingQuantity,
        deliveryPercentage:
          item.totalContract > 0
            ? roundPercentage((item.totalDelivered / item.totalContract) * 100)
            : 0,
      };
    })
    .sort((left, right) => {
      if (right.remainingQuantity !== left.remainingQuantity) {
        return right.remainingQuantity - left.remainingQuantity;
      }

      if (right.redAlerts !== left.redAlerts) {
        return right.redAlerts - left.redAlerts;
      }

      return left.gardenName.localeCompare(right.gardenName, "id-ID");
    });
}