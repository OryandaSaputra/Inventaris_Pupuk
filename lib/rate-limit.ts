// lib/rate-limit.ts
import { NextRequest } from "next/server";

type RateLimitEntry = {
  count: number;
  timestamp: number;
};

const rateLimitMap = new Map<string, RateLimitEntry>();
const WINDOW_MS = 60 * 1000;     // 1 menit
const MAX_ATTEMPTS = 10;         // maksimal 10 percobaan per menit per IP

export function getRateLimitKey(req: NextRequest): string {
  // Cara aman mendapatkan IP address di Next.js
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    req.headers.get("cf-connecting-ip") || // Cloudflare
    "unknown-ip";

  return `login:${ip}`;
}

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record) {
    rateLimitMap.set(key, { count: 1, timestamp: now });
    return false;
  }

  // Reset jika sudah lewat window waktu
  if (now - record.timestamp > WINDOW_MS) {
    rateLimitMap.set(key, { count: 1, timestamp: now });
    return false;
  }

  // Tambah percobaan
  record.count += 1;
  rateLimitMap.set(key, record);

  return record.count > MAX_ATTEMPTS;
}

export function getRemainingAttempts(key: string): number {
  const record = rateLimitMap.get(key);
  if (!record) return MAX_ATTEMPTS;
  return Math.max(0, MAX_ATTEMPTS - record.count);
}