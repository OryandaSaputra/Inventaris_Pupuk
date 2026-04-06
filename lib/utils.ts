import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { decimalToNumber, type DecimalLike } from "@/lib/supply-order";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function formatNumber(value: number | null | undefined) {
  return new Intl.NumberFormat("id-ID").format(value ?? 0);
}

export function formatCurrency(value: DecimalLike) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(decimalToNumber(value));
}

export function normalizeName(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export function normalizeUppercase(value: string) {
  return value.toUpperCase().trim().replace(/\s+/g, "");
}

export { decimalToNumber };