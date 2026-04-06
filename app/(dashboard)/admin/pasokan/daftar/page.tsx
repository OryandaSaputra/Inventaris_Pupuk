import type { ReactNode } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  CircleDollarSign,
  Package,
  Sparkles,
  Truck,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { SupplyOrderTable } from "@/components/admin/supply-order-table";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { getSupplyOrderTableData } from "@/lib/data/admin";
import { ADMIN_ROUTES } from "@/lib/routes";
import { formatCurrency, formatNumber } from "@/lib/utils";

function SummaryCard({
  title,
  value,
  description,
  icon,
  tone = "default",
}: {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
  tone?: "default" | "success" | "warning" | "info";
}) {
  const toneClassName =
    tone === "success"
      ? "border-emerald-200/80 bg-emerald-500/[0.08]"
      : tone === "warning"
        ? "border-amber-200/80 bg-amber-500/[0.08]"
        : tone === "info"
          ? "border-sky-200/80 bg-sky-500/[0.08]"
          : "border-white/70 bg-white/62";

  return (
    <Card className={`rounded-[1.8rem] ${toneClassName}`}>
      <CardContent className="flex items-start justify-between gap-4 py-5">
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            {title}
          </p>
          <p className="text-2xl font-semibold text-slate-900 md:text-3xl">
            {value}
          </p>
          <p className="text-sm leading-6 text-slate-600">{description}</p>
        </div>

        <div className="rounded-2xl border border-white/70 bg-white/72 p-3 text-slate-700 shadow-[0_14px_24px_-20px_rgba(15,56,45,0.2)]">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}

export default async function AdminSupplyListPage() {
  const rows = await getSupplyOrderTableData();

  const totalQuantity = rows.reduce((total, row) => total + row.quantityOrdered, 0);
  const totalDelivered = rows.reduce((total, row) => total + row.totalDelivered, 0);
  const totalOutstanding = rows.reduce((total, row) => total + row.remainingQuantity, 0);
  const totalContractValue = rows.reduce((total, row) => total + row.grandTotal, 0);
  const urgentContracts = rows.filter(
    (row) => row.notificationStatus === "MERAH" || row.notificationStatus === "KUNING",
  ).length;

  return (
    <AppShell pathname={ADMIN_ROUTES.supply.list}>
      <div className="app-page">
        <PageHeader
          eyebrow="Kelola Pasokan"
          title="Daftar Pasokan Pupuk"
          description="Halaman ini difokuskan untuk monitoring kontrak pasokan secara menyeluruh: nilai kontrak, realisasi kirim, outstanding, status notifikasi, dan aksi tindak lanjut."
          action={
            <Link
              href={ADMIN_ROUTES.supply.input}
              className={buttonVariants({ variant: "primary", size: "sm" })}
            >
              Input Pasokan
            </Link>
          }
        />

        <section>
          <Card className="relative overflow-hidden border-white/65 bg-white/62 shadow-[0_30px_90px_-42px_rgba(15,56,45,0.3)] backdrop-blur-[30px]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.16),transparent_28%),radial-gradient(circle_at_center_right,rgba(250,204,21,0.12),transparent_18%)]" />

            <CardContent className="relative min-w-0 p-5 md:p-6 xl:p-7">
              <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,0.95fr)]">
                <div className="min-w-0 space-y-5">
                  <div className="min-w-0 max-w-3xl">
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-800">
                      <Sparkles className="h-3.5 w-3.5" />
                      Workspace monitoring kontrak
                    </div>

                    <h2 className="mt-4 text-2xl font-semibold leading-tight text-slate-900 md:text-3xl xl:text-[2.15rem]">
                      Daftar pasokan kini lebih fokus pada progres, risiko, dan
                      tindakan yang perlu dilakukan.
                    </h2>

                    <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                      Tabel pengelolaan disusun agar admin bisa lebih cepat
                      mengenali kontrak yang sehat, kontrak kritis, outstanding
                      terbesar, dan nilai pengadaan yang sedang berjalan.
                    </p>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    <SummaryCard
                      title="Total Kontrak"
                      value={formatNumber(rows.length)}
                      description="Jumlah SP2BJ aktif maupun histori yang tercatat."
                      icon={<Package className="h-5 w-5" />}
                      tone="info"
                    />
                    <SummaryCard
                      title="Volume Terkontrak"
                      value={`${formatNumber(totalQuantity)} kg`}
                      description="Akumulasi kebutuhan pupuk dari seluruh kontrak."
                      icon={<Truck className="h-5 w-5" />}
                      tone="default"
                    />
                    <SummaryCard
                      title="Sudah Terkirim"
                      value={`${formatNumber(totalDelivered)} kg`}
                      description="Total realisasi pengiriman yang sudah diterima."
                      icon={<Package className="h-5 w-5" />}
                      tone="success"
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  <div className="rounded-3xl border border-amber-200/80 bg-amber-500/[0.08] p-4 shadow-[0_18px_34px_-30px_rgba(245,158,11,0.22)]">
                    <div className="flex items-center gap-2 text-slate-900">
                      <AlertTriangle className="h-4 w-4 text-amber-700" />
                      <span className="font-medium">Kontrak perlu perhatian</span>
                    </div>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      {formatNumber(urgentContracts)}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Kontrak merah dan kuning yang perlu dipantau lebih dekat.
                    </p>
                  </div>

                  <div className="rounded-3xl border border-emerald-200/80 bg-emerald-500/[0.08] p-4 shadow-[0_18px_34px_-30px_rgba(5,150,105,0.22)]">
                    <div className="flex items-center gap-2 text-slate-900">
                      <Truck className="h-4 w-4 text-emerald-700" />
                      <span className="font-medium">Total outstanding</span>
                    </div>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      {formatNumber(totalOutstanding)} kg
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Sisa volume kontrak yang belum terpenuhi.
                    </p>
                  </div>

                  <div className="rounded-3xl border border-sky-200/80 bg-sky-500/[0.08] p-4 shadow-[0_18px_34px_-30px_rgba(14,165,233,0.22)] sm:col-span-2 xl:col-span-1">
                    <div className="flex items-center gap-2 text-slate-900">
                      <CircleDollarSign className="h-4 w-4 text-sky-700" />
                      <span className="font-medium">Nilai pengadaan</span>
                    </div>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      {formatCurrency(totalContractValue)}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Total nilai kontrak yang sedang dikelola pada sistem.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <SupplyOrderTable
          rows={rows}
          mode="management"
          title="Daftar Pasokan untuk Pengelolaan"
          description="Gunakan tabel ini untuk membaca progres kontrak, nilai pengadaan, outstanding, masa kontrak, status notifikasi, dan aksi edit/detail secara lebih cepat."
        />
      </div>
    </AppShell>
  );
}