import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Clock3,
  ClipboardList,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Siren,
  Truck,
} from "lucide-react";

import { ContractPriorityMatrix } from "@/components/charts/contract-priority-matrix";
import { DeliveryTrendChart } from "@/components/charts/delivery-trend-chart";
import { SupplierPerformanceChart } from "@/components/charts/supplier-performance-chart";
import { SupplyOrderStatusBadge } from "@/components/admin/supply-order-status-badge";
import { SupplyOrderTable } from "@/components/admin/supply-order-table";
import { StatCard } from "@/components/dashboard/stat-card";
import { AppShell } from "@/components/layout/app-shell";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";

import {
  getAdminDashboardData,
  getSupplyOrderTableData,
} from "@/lib/data/admin";
import { ADMIN_ROUTES } from "@/lib/routes";
import { cn, formatNumber } from "@/lib/utils";

// ← TAMBAHAN BARU: Proteksi halaman
import { requireAdmin } from "@/lib/auth/protected";

const STATUS_PRIORITY = {
  MERAH: 0,
  KUNING: 1,
  NORMAL: 2,
  HIJAU: 3,
} as const;

function HeroMetric({
  label,
  value,
  description,
  icon: Icon,
  tone = "default",
}: {
  label: string;
  value: string;
  description: string;
  icon: LucideIcon;
  tone?: "default" | "success" | "warning" | "info";
}) {
  const toneClassName =
    tone === "success"
      ? "border-emerald-200/85 bg-emerald-500/[0.09]"
      : tone === "warning"
        ? "border-amber-200/85 bg-amber-500/[0.09]"
        : tone === "info"
          ? "border-sky-200/85 bg-sky-500/[0.09]"
          : "border-white/70 bg-white/60";

  return (
    <div
      className={cn(
        "rounded-3xl border p-4 shadow-[0_20px_36px_-30px_rgba(15,56,45,0.24)]",
        toneClassName,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
            {label}
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
        </div>

        <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/70 bg-white/70 text-emerald-800 shadow-[0_14px_24px_-18px_rgba(5,150,105,0.32)]">
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}

function OverviewItem({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "danger" | "warning" | "success" | "info";
}) {
  const toneClassName =
    tone === "danger"
      ? "border-rose-200/85 bg-rose-500/[0.09]"
      : tone === "warning"
        ? "border-amber-200/85 bg-amber-500/[0.09]"
        : tone === "success"
          ? "border-emerald-200/85 bg-emerald-500/[0.09]"
          : tone === "info"
            ? "border-sky-200/85 bg-sky-500/[0.09]"
            : "border-white/70 bg-white/60";

  return (
    <div
      className={cn(
        "rounded-2xl border px-4 py-3 shadow-[0_18px_34px_-30px_rgba(15,56,45,0.22)]",
        toneClassName,
      )}
    >
      <p className="text-[11px] uppercase tracking-[0.16em] text-slate-600">
        {label}
      </p>
      <p className="mt-2 text-lg font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function PrioritySummaryCard({
  title,
  value,
  description,
  icon: Icon,
  tone,
}: {
  title: string;
  value: number;
  description: string;
  icon: LucideIcon;
  tone: "danger" | "warning" | "info" | "success";
}) {
  const toneClassName =
    tone === "danger"
      ? "border-rose-200/85 bg-rose-500/[0.09]"
      : tone === "warning"
        ? "border-amber-200/85 bg-amber-500/[0.09]"
        : tone === "success"
          ? "border-emerald-200/85 bg-emerald-500/[0.09]"
          : "border-sky-200/85 bg-sky-500/[0.09]";

  return (
    <div
      className={cn(
        "rounded-3xl border p-4 shadow-[0_18px_34px_-30px_rgba(15,56,45,0.22)]",
        toneClassName,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-slate-600">
            {title}
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
        </div>

        <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/70 bg-white/72 text-slate-900/90">
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}

export default async function AdminHomePage() {
  // ← PROTEKSI BARU: Hanya admin dengan izin canAccessAdminHome yang boleh masuk
  const session = await requireAdmin();

  const [data, rows] = await Promise.all([
    getAdminDashboardData(),
    getSupplyOrderTableData(),
  ]);

  const attentionRows = rows
    .filter(
      (row) =>
        row.notificationStatus === "MERAH" ||
        row.notificationStatus === "KUNING",
    )
    .sort((left, right) => {
      const statusDiff =
        STATUS_PRIORITY[left.notificationStatus] -
        STATUS_PRIORITY[right.notificationStatus];

      if (statusDiff !== 0) return statusDiff;

      if (left.remainingContractDays !== right.remainingContractDays) {
        return left.remainingContractDays - right.remainingContractDays;
      }

      return right.remainingQuantity - left.remainingQuantity;
    })
    .slice(0, 5);

  const completedRows = rows.filter((row) => row.isCompleted).length;
  const endedRows = rows.filter((row) => row.isContractEnded).length;
  const overdueRows = rows.filter((row) => row.isOverdue).length;
  const safeRows = rows.filter(
    (row) => row.notificationStatus === "NORMAL",
  ).length;

  const topOutstandingOrder = rows
    .filter((row) => row.remainingQuantity > 0)
    .sort((left, right) => right.remainingQuantity - left.remainingQuantity)[0];

  const topSupplier = data.supplierPerformance[0];

  const stats = [
    {
      title: "SP2BJ Aktif",
      value: String(data.activeOrders),
      description:
        "Kontrak yang masih berjalan dan masih memiliki outstanding volume.",
      meta: `${data.totalOrders} total`,
      tone: "info" as const,
    },
    {
      title: "Rencana Pasokan",
      value: formatNumber(data.outstandingQuantity),
      description: "Total sisa volume yang belum terpenuhi.",
      meta: "Perlu dipenuhi",
      tone: "warning" as const,
    },
    {
      title: "Kontrak Overdue",
      value: String(attentionRows.length),
      description: "Kontrak merah dan kuning yang perlu tindakan cepat.",
      meta: `${overdueRows} overdue`,
      tone: "danger" as const,
    },
    {
      title: "Realisasi Pasokan",
      value: `${data.deliveryProgressPercentage}%`,
      description: "Persentase realisasi volume terkirim.",
      meta: `${formatNumber(data.totalDeliveredQuantity)} terkirim`,
      tone: "success" as const,
    },
  ];

  return (
    <AppShell pathname="/admin">
      <div className="app-page">
        <PageHeader
          eyebrow={`Admin Dashboard • ${session.user.name}`}
          title="Monitoring Pasokan Pupuk"
          action={
            <div className="flex flex-wrap gap-2">
              <Link
                href={ADMIN_ROUTES.supply.input}
                className={buttonVariants({ variant: "primary", size: "sm" })}
              >
                Input Pasokan
              </Link>
              <Link
                href={ADMIN_ROUTES.supplierInformation}
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                Informasi Supplier
              </Link>
            </div>
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
                      Fokus operasional hari ini
                    </div>

                    <h2 className="mt-4 text-2xl font-semibold leading-tight text-slate-900 md:text-3xl xl:text-[2.15rem]">
                      Ringkasan pasokan pupuk menampilkan kontrak aktif, progres
                      penerimaan, dan titik prioritas tindak lanjut.
                    </h2>

                    <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                      Halaman ini membantu memantau kondisi pasokan secara
                      menyeluruh, mulai dari jumlah kontrak yang tercatat,
                      realisasi penerimaan, status keterlambatan, hingga
                      supplier dengan performa terbaik dan outstanding yang
                      masih perlu diselesaikan.
                    </p>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    <HeroMetric
                      label="Total Kontrak"
                      value={formatNumber(data.totalOrders)}
                      description="Jumlah seluruh SP2BJ yang sudah tercatat di sistem."
                      icon={ClipboardList}
                      tone="info"
                    />
                    <HeroMetric
                      label="Total Penerimaan"
                      value={formatNumber(data.totalDeliveries)}
                      description="Frekuensi data penerimaan pupuk yang sudah diinput."
                      icon={Truck}
                      tone="success"
                    />
                    <HeroMetric
                      label="Volume Tuntas"
                      value={formatNumber(completedRows)}
                      description="Jumlah kontrak yang volumenya sudah terpenuhi."
                      icon={PackageCheck}
                      tone="warning"
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  <OverviewItem
                    label="Kontrak Overdue"
                    value={`${formatNumber(overdueRows)} kontrak`}
                    tone={overdueRows > 0 ? "danger" : "success"}
                  />
                  <OverviewItem
                    label="Kontrak Aman"
                    value={`${formatNumber(safeRows)} kontrak`}
                    tone="info"
                  />
                  <OverviewItem
                    label="Kontrak Berakhir"
                    value={`${formatNumber(endedRows)} kontrak`}
                    tone="default"
                  />
                  <OverviewItem
                    label="Pemasok Teratas"
                    value={
                      topSupplier
                        ? `${topSupplier.supplierName} • ${topSupplier.fillRate}%`
                        : "-"
                    }
                    tone="success"
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-white/55 pt-5">
                <Link
                  href={ADMIN_ROUTES.supply.list}
                  className={buttonVariants({ variant: "outline", size: "sm" })}
                >
                  Lihat seluruh pasokan
                </Link>
                <Link
                  href={ADMIN_ROUTES.supply.input}
                  className={buttonVariants({ variant: "primary", size: "sm" })}
                >
                  Input kontrak baru
                </Link>

                {topOutstandingOrder ? (
                  <div className="ml-auto inline-flex flex-wrap items-center gap-2 rounded-full border border-white/70 bg-white/74 px-3 py-2 text-xs text-slate-600 shadow-[0_16px_30px_-24px_rgba(15,56,45,0.22)]">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                    Outstanding terbesar saat ini:
                    <strong className="text-slate-900">
                      {topOutstandingOrder.sp2bjNumber}
                    </strong>
                    <span className="text-slate-500">•</span>
                    <span>
                      {formatNumber(topOutstandingOrder.remainingQuantity)}
                    </span>
                  </div>
                ) : null}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="data-grid md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <StatCard
              key={item.title}
              title={item.title}
              value={item.value}
              description={item.description}
              meta={item.meta}
              tone={item.tone}
            />
          ))}
        </section>

        <section className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Prioritas Operasional</CardTitle>
              {/* <CardDescription>
                Ringkasan kondisi kontrak agar admin bisa menentukan fokus kerja
                harian dengan lebih cepat.
              </CardDescription> */}
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <PrioritySummaryCard
                  title="Merah"
                  value={data.criticalOrders}
                  description="Kontrak yang paling dekat dengan tenggat (<= 5 hari)."
                  icon={Siren}
                  tone="danger"
                />
                <PrioritySummaryCard
                  title="Kuning"
                  value={data.warningOrders}
                  description="Kontrak yang mulai mendekati akhir masa kontrak."
                  icon={Clock3}
                  tone="warning"
                />
                <PrioritySummaryCard
                  title="Normal"
                  value={safeRows}
                  description="Kontrak yang masih dalam rentang aman."
                  icon={ShieldCheck}
                  tone="info"
                />
                <PrioritySummaryCard
                  title="Tuntas Volume"
                  value={completedRows}
                  description="Kontrak yang volumenya sudah terpenuhi."
                  icon={CheckCircle2}
                  tone="success"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardHeader className="gap-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <CardTitle>Kontrak Perlu Perhatian</CardTitle>
                  <CardDescription>
                    SP2BJ yang paling mendesak untuk ditinjau sekarang.
                  </CardDescription>
                </div>

                <Link
                  href={ADMIN_ROUTES.supply.list}
                  className={buttonVariants({ variant: "outline", size: "sm" })}
                >
                  Lihat semua
                </Link>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              {attentionRows.length === 0 ? (
                <div className="rounded-3xl border border-emerald-200/80 bg-emerald-500/10 p-5 text-sm leading-6 text-emerald-800">
                  Tidak ada kontrak merah atau kuning saat ini. Fokus dapat
                  diarahkan ke penyelesaian outstanding volume terbesar dan
                  menjaga ritme realisasi harian.
                </div>
              ) : (
                attentionRows.map((row) => (
                  <div
                    key={row.id}
                    className="rounded-3xl border border-white/70 bg-white/72 p-4 transition-all shadow-[0_18px_34px_-28px_rgba(15,56,45,0.2)] hover:-translate-y-0.5 hover:border-emerald-200/80 hover:bg-white/84"
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <p className="font-semibold text-slate-900">
                            {row.sp2bjNumber}
                          </p>
                          <p className="text-sm text-slate-600">
                            {row.gardenName} • {row.fertilizerTypeName}
                          </p>
                          <p className="text-xs text-slate-500">
                            Supplier: {row.supplierName}
                          </p>
                        </div>

                        <SupplyOrderStatusBadge
                          status={row.notificationStatus}
                          label={row.notificationLabel}
                          className="shrink-0"
                        />
                      </div>

                      <div className="grid gap-2 sm:grid-cols-2">
                        <div className="rounded-2xl border border-white/60 bg-white/72 px-3 py-2 text-xs text-slate-600">
                          Sisa volume:{" "}
                          <strong className="text-slate-900">
                            {formatNumber(row.remainingQuantity)}
                          </strong>
                        </div>
                        <div className="rounded-2xl border border-white/60 bg-white/72 px-3 py-2 text-xs text-slate-600">
                          Sisa kontrak:{" "}
                          <strong className="text-slate-900">
                            {row.remainingContractDays} hari
                          </strong>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Link
                          href={`${ADMIN_ROUTES.supply.root}/${row.id}`}
                          className={cn(
                            buttonVariants({ variant: "ghost", size: "sm" }),
                            "h-auto px-0 text-sm text-emerald-800 hover:text-emerald-800",
                          )}
                        >
                          Lihat detail
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </section>

        <section className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
          <DeliveryTrendChart
            title="Tren Penerimaan 14 Hari Terakhir"
            description="Pantau pola volume penerimaan harian untuk melihat momentum realisasi pasokan dan hari-hari yang masih rendah."
            points={data.deliveryTrend}
          />

          <SupplierPerformanceChart rows={data.supplierPerformance} />
        </section>

        <ContractPriorityMatrix points={data.contractPriorityMatrix} />

        <SupplyOrderTable
          rows={rows}
          mode="home"
          maxRows={10}
          title="Tabel Pasokan Utama"
          description="Preview kontrak yang paling relevan untuk monitoring harian. Gunakan halaman Pasokan untuk melihat dan mengelola data lengkap."
        />
      </div>
    </AppShell>
  );
}
