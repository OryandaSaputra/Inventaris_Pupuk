export type StatusInput = {
  contractStartDate: Date | string;
  contractEndDate: Date | string;
  remainingQuantity?: number;
};

export type NotificationStatus = "HIJAU" | "MERAH" | "KUNING" | "NORMAL";

type NotificationLabelMeta =
  | number
  | {
      remainingDays?: number;
      overdueDays?: number;
      isCompleted?: boolean;
      isContractEnded?: boolean;
    };

const DAY_IN_MS = 24 * 60 * 60 * 1000;
const RED_THRESHOLD_DAYS = 5;
const YELLOW_MIN_DAYS = 6;
const JAKARTA_TIME_ZONE = "Asia/Jakarta";

const DATE_KEY_FORMATTER = new Intl.DateTimeFormat("en-US", {
  timeZone: JAKARTA_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

function getJakartaDateKey(value: Date | string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  const parts = DATE_KEY_FORMATTER.formatToParts(date);
  const year = parts.find((part) => part.type === "year")?.value ?? "0000";
  const month = parts.find((part) => part.type === "month")?.value ?? "00";
  const day = parts.find((part) => part.type === "day")?.value ?? "00";

  return `${year}-${month}-${day}`;
}

function normalizeDate(value: Date | string) {
  const dateKey = getJakartaDateKey(value);

  if (!dateKey) {
    return null;
  }

  return new Date(`${dateKey}T00:00:00.000Z`);
}

function getDiffInDays(startDate: Date | null, endDate: Date | null) {
  if (!startDate || !endDate) {
    return 0;
  }

  return Math.round((endDate.getTime() - startDate.getTime()) / DAY_IN_MS);
}

function getContractDayDelta(contractEndDate: Date | string) {
  const today = normalizeDate(new Date());
  const endDate = normalizeDate(contractEndDate);

  return getDiffInDays(today, endDate);
}

function getYellowUpperBound(totalContractDays: number) {
  if (totalContractDays <= 0) {
    return 0;
  }

  return Math.max(0, Math.ceil(totalContractDays / 2) - 1);
}

export function getRemainingContractDays(contractEndDate: Date | string) {
  return Math.max(0, getContractDayDelta(contractEndDate));
}

export function getOverdueContractDays(contractEndDate: Date | string) {
  return Math.max(0, getContractDayDelta(contractEndDate) * -1);
}

export function hasContractEnded(contractEndDate: Date | string) {
  return getContractDayDelta(contractEndDate) < 0;
}

export function getContractDurationDays(input: StatusInput) {
  const startDate = normalizeDate(input.contractStartDate);
  const endDate = normalizeDate(input.contractEndDate);

  return Math.max(0, getDiffInDays(startDate, endDate));
}

export function getSupplyNotificationStatus(
  input: StatusInput,
): NotificationStatus {
  const totalContractDays = getContractDurationDays(input);
  const contractDayDelta = getContractDayDelta(input.contractEndDate);
  const remainingDays = Math.max(0, contractDayDelta);
  const yellowUpperBound = getYellowUpperBound(totalContractDays);
  const isCompleted =
    typeof input.remainingQuantity === "number"
      ? input.remainingQuantity <= 0
      : false;

  if (isCompleted) {
    return "HIJAU";
  }

  if (contractDayDelta < 0) {
    return "HIJAU";
  }

  if (remainingDays === 0) {
    return "HIJAU";
  }

  if (remainingDays >= 1 && remainingDays <= RED_THRESHOLD_DAYS) {
    return "MERAH";
  }

  if (
    totalContractDays > 0 &&
    remainingDays >= YELLOW_MIN_DAYS &&
    remainingDays <= yellowUpperBound
  ) {
    return "KUNING";
  }

  return "NORMAL";
}

export function getNotificationLabel(
  status: NotificationStatus,
  meta?: NotificationLabelMeta,
) {
  const normalizedMeta =
    typeof meta === "number"
      ? {
          remainingDays: meta,
        }
      : meta ?? {};

  const remainingDays = normalizedMeta.remainingDays ?? 0;
  const overdueDays = normalizedMeta.overdueDays ?? 0;
  const isCompleted = normalizedMeta.isCompleted ?? false;
  const isContractEnded = normalizedMeta.isContractEnded ?? false;

  if (status === "HIJAU") {
    if (isCompleted && isContractEnded) {
      return "Hijau · Kontrak tuntas";
    }

    if (isCompleted) {
      return "Hijau · Volume tuntas";
    }

    if (remainingDays === 0) {
      return "Hijau · Hari terakhir";
    }

    if (overdueDays > 0 || isContractEnded) {
      return "Hijau · Kontrak berakhir";
    }

    return "Hijau · Kontrak selesai";
  }

  if (status === "MERAH") {
    return `Merah · Sisa ${remainingDays} hari`;
  }

  if (status === "KUNING") {
    return `Kuning · Sisa ${remainingDays} hari`;
  }

  return `Normal${
    typeof remainingDays === "number" ? ` · Sisa ${remainingDays} hari` : ""
  }`;
}