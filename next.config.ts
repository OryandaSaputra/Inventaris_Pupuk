import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "@prisma/client",
    "@prisma/adapter-pg",
    "pg",
    "prisma",
    "bcryptjs",
  ],
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;