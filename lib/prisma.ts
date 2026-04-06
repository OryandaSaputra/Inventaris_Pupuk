import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/src/generated/prisma";

declare global {
  var prismaGlobal: PrismaClient | undefined;
}

function getDatabaseUrl() {
  const rawValue = process.env.DATABASE_URL?.trim();

  if (!rawValue) {
    throw new Error("DATABASE_URL belum terisi di file .env");
  }

  const url = new URL(rawValue);
  const sslMode = url.searchParams.get("sslmode");
  const isNeonHost = url.hostname.includes("neon.tech");

  if (
    isNeonHost &&
    (!sslMode || ["prefer", "require", "verify-ca"].includes(sslMode))
  ) {
    url.searchParams.set("sslmode", "verify-full");
  }

  return url.toString();
}

function createPrismaClient() {
  return new PrismaClient({
    adapter: new PrismaPg({
      connectionString: getDatabaseUrl(),
    }),
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const prisma = globalThis.prismaGlobal ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}