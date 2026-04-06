import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Inventaris Pasokan Pupuk",
  description: "Monitoring pasokan pupuk untuk Admin dan Krani Tanaman",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body className="text-slate-900">{children}</body>
    </html>
  );
}