import {
  getContractDurationDays,
  getNotificationLabel,
  getOverdueContractDays,
  getRemainingContractDays,
  getSupplyNotificationStatus,
  hasContractEnded,
  type NotificationStatus,
} from "@/lib/notifications";
import type { SupplyBudgetType } from "@/src/generated/prisma";

export type DecimalLike =
  | number
  | string
  | null
  | undefined
  | {
      toNumber?: () => number;
      valueOf?: () => number | string;
    };

export function decimalToNumber(value: DecimalLike) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  if (value && typeof value.toNumber === "function") {
    const parsed = value.toNumber();
    return Number.isFinite(parsed) ? parsed : 0;
  }

  if (value && typeof value.valueOf === "function") {
    const parsed = Number(value.valueOf());
    return Number.isFinite(parsed) ? parsed : 0;
  }

  return 0;
}

export function sumDeliveredQuantities(
  items: Array<{ quantityDelivered: number | null | undefined }>,
) {
  return items.reduce((total, item) => total + (item.quantityDelivered ?? 0), 0);
}

export function clampNonNegative(value: number) {
  return Math.max(0, value);
}

export function roundCurrency(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function roundPercentage(value: number) {
  return Math.min(100, Math.max(0, Number(value.toFixed(1))));
}

function getPercentage(part: number, total: number) {
  if (total <= 0) {
    return 0;
  }

  return roundPercentage((part / total) * 100);
}

export function calculateSupplyCosts(
  quantityOrdered: number,
  unitPrice: number,
  freightCost: number,
) {
  const subtotal = quantityOrdered * unitPrice;
  const totalCost = roundCurrency(subtotal + freightCost);
  const ppnAmount = roundCurrency(totalCost * 0.11);
  const grandTotal = roundCurrency(totalCost + ppnAmount);

  return {
    subtotal: roundCurrency(subtotal),
    totalCost,
    ppnAmount,
    grandTotal,
  };
}

export function getBudgetTypeLabel(value: SupplyBudgetType) {
  return value === "EKSPLOITASI" ? "Eksploitasi" : "Investasi";
}

export function getSupplyOrderMetrics(input: {
  quantityOrdered: number;
  totalDelivered: number;
  contractStartDate: Date | string;
  contractEndDate: Date | string;
}) {
  const remainingQuantity = clampNonNegative(
    input.quantityOrdered - input.totalDelivered,
  );

  const contractDurationDays = getContractDurationDays(input);
  const remainingContractDays = getRemainingContractDays(input.contractEndDate);
  const overdueContractDays = getOverdueContractDays(input.contractEndDate);
  const isContractEnded = hasContractEnded(input.contractEndDate);
  const isCompleted = remainingQuantity <= 0;

  const deliveredPercentage = getPercentage(
    Math.min(input.totalDelivered, input.quantityOrdered),
    input.quantityOrdered,
  );

  const outstandingPercentage = getPercentage(
    remainingQuantity,
    input.quantityOrdered,
  );

  const notificationStatus = getSupplyNotificationStatus({
    ...input,
    remainingQuantity,
  });

  const notificationLabel = getNotificationLabel(notificationStatus, {
    remainingDays: remainingContractDays,
    overdueDays: overdueContractDays,
    isCompleted,
    isContractEnded,
  });

  return {
    remainingQuantity,
    contractDurationDays,
    remainingContractDays,
    overdueContractDays,
    deliveredPercentage,
    outstandingPercentage,
    isCompleted,
    isContractEnded,
    isOverdue: overdueContractDays > 0 && remainingQuantity > 0,
    needsAttention:
      notificationStatus === "MERAH" || notificationStatus === "KUNING",
    notificationStatus,
    notificationLabel,
  } satisfies {
    remainingQuantity: number;
    contractDurationDays: number;
    remainingContractDays: number;
    overdueContractDays: number;
    deliveredPercentage: number;
    outstandingPercentage: number;
    isCompleted: boolean;
    isContractEnded: boolean;
    isOverdue: boolean;
    needsAttention: boolean;
    notificationStatus: NotificationStatus;
    notificationLabel: string;
  };
}