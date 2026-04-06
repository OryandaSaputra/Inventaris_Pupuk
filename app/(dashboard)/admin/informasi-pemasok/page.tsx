import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CircleAlert,
  Sparkles,
  Truck,
} from "lucide-react";
import { SupplierInformationTable } from "@/components/admin/supplier-information-table";
import { SupplierPerformanceChart } from "@/components/charts/supplier-performance-chart";
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
import { getSupplierInformationData } from "@/lib/data/admin";
import { ADMIN_ROUTES } from "@/lib/routes";
import { formatNumber } from "@/lib/utils";

function PrioritySupplierList({
  rows,
}: {
  rows: Awaited<ReturnType<typeof getSupplierInformationData>>;
}) {
  if (rows.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-white/65 bg-white/70 px-6 py-10 text-center">
        <p className="text-sm font-semibold text-slate-900">
          Belum ada supplier prioritas
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Daftar fokus supplier akan tampil setelah kontrak pasokan tersedia.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {rows.map((row, index) => (
        <div
          key={row.supplierName}
          className="rounded-3xl border border-white/65 bg-white/72 p-4 shadow-[0_18px_34px_-30px_rgba(15,56,45,0.18)]"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                Prioritas {index + 1}
              </p>
              <h3 className="mt-1 text-base font-semibold text-slate-900">
                {row.supplierName}
              </h3>
            </div>

            <span className="inline-flex rounded-full border border-amber-200/80 bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-800">
              {row.fillRate}% fill rate
            </span>
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/55 bg-white/72 px-3 py-2 text-xs text-slate-600">
              Outstanding{" "}
              <strong className="text-slate-900">
                {formatNumber(row.outstandingQuantity)}
              </strong>
            </div>
            <div className="rounded-2xl border border-white/55 bg-white/72 px-3 py-2 text-xs text-slate-600">
              Kontrak aktif{" "}
              <strong className="text-slate-900">
                {formatNumber(row.activeContracts)}
              </strong>
            </div>
            <div className="rounded-2xl border border-white/55 bg-white/72 px-3 py-2 text-xs text-slate-600">
              Terkirim{" "}
              <strong className="text-slate-900">
                {formatNumber(row.totalDeliveredQuantity)}
              </strong>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function HeroInfoCard({
  label,
  value,
  description,
  tone = "default",
}: {
  label: string;
  value: string;
  description: string;
  tone?: "default" | "success" | "info";
}) {
  const toneClassName =
    tone === "success"
      ? "border-emerald-200/80 bg-emerald-500/[0.08]"
      : tone === "info"
        ? "border-sky-200/80 bg-sky-500/[0.08]"
        : "border-white/70 bg-white/62";

  return (
    <div className={`rounded-3xl border p-4 shadow-[0_20px_36px_-30px_rgba(15,56,45,0.24)] ${toneClassName}`}>
      <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-xl font-semibold text-slate-900">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}

export default async function SupplierInformationPage() {
  const rows = await getSupplierInformationData();

  const summary = rows.reduce(
    (accumulator, row) => {
      accumulator.totalContract += row.totalContractQuantity;
      accumulator.totalDelivered += row.totalDeliveredQuantity;
      accumulator.totalOutstanding += row.outstandingQuantity;
      accumulator.totalActiveContracts += row.activeContracts;
      accumulator.totalCompletedContracts += row.completedContracts;
      return accumulator;
    },
    {
      totalContract: 0,
      totalDelivered: 0,
      totalOutstanding: 0,
      totalActiveContracts: 0,
      totalCompletedContracts: 0,
    },
  );

  const activeSuppliers = rows.filter((row) => row.activeContracts > 0).length;
  const completedSuppliers = rows.filter(
    (row) => row.outstandingQuantity <= 0,
  ).length;

  const overallFillRate =
    summary.totalContract > 0
      ? Math.round((summary.totalDelivered / summary.totalContract) * 100)
      : 0;

  const topFillRateSupplier = rows.reduce<(typeof rows)[number] | null>(
    (current, row) => {
      if (!current || row.fillRate > current.fillRate) {
        return row;
      }

      return current;
    },
    null,
  );

  const topOutstandingSupplier = rows.reduce<(typeof rows)[number] | null>(
    (current, row) => {
      if (!current || row.outstandingQuantity > current.outstandingQuantity) {
        return row;
      }

      return current;
    },
    null,
  );

  const priorityRows = [...rows]
    .sort((left, right) => {
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
    })
    .slice(0, 4);

  return (
    <AppShell pathname={ADMIN_ROUTES.supplierInformation}>
      <div className="app-page">
        <PageHeader
          eyebrow="Monitoring Supplier"
          title="Informasi Pemasok / Supplier"
          description="Pantau rekap kontrak, realisasi pengiriman, outstanding, dan prioritas follow-up setiap pemasok dari satu halaman yang lebih relevan untuk kebutuhan admin."
          action={
            <div className="flex flex-wrap gap-2">
              <Link
                href={ADMIN_ROUTES.supply.list}
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                Lihat Daftar Pasokan
              </Link>
              <Link
                href={ADMIN_ROUTES.supply.input}
                className={buttonVariants({ variant: "primary", size: "sm" })}
              >
                Input Pasokan
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
                      Monitoring hubungan pemasok
                    </div>

                    <h2 className="mt-4 text-2xl font-semibold leading-tight text-slate-900 md:text-3xl xl:text-[2.15rem]">
                      Halaman supplier kini lebih kuat untuk membaca performa dan
                      prioritas follow-up secara cepat.
                    </h2>

                    <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                      Fokus halaman ini adalah menjawab tiga hal utama: supplier
                      terbaik, supplier dengan outstanding tertinggi, dan supplier
                      mana yang perlu diprioritaskan untuk tindak lanjut.
                    </p>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    <HeroInfoCard
                      label="Supplier Aktif"
                      value={formatNumber(activeSuppliers)}
                      description="Jumlah supplier yang masih menangani kontrak berjalan."
                      tone="info"
                    />
                    <HeroInfoCard
                      label="Supplier Tuntas"
                      value={formatNumber(completedSuppliers)}
                      description="Jumlah supplier tanpa outstanding aktif."
                      tone="success"
                    />
                    <HeroInfoCard
                      label="Fill Rate Global"
                      value={`${overallFillRate}%`}
                      description="Rasio realisasi pengiriman dibanding total kontrak."
                      tone="default"
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  <div className="rounded-3xl border border-emerald-200/80 bg-emerald-500/10 p-4">
                    <div className="flex items-start gap-3">
                      <BadgeCheck className="mt-0.5 h-5 w-5 text-emerald-700" />
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-emerald-800">
                          Supplier terbaik
                        </p>
                        <p className="mt-1 text-base font-semibold text-slate-900">
                          {topFillRateSupplier?.supplierName ?? "-"}
                        </p>
                        <p className="mt-1 text-sm text-slate-600">
                          Fill rate {topFillRateSupplier?.fillRate ?? 0}% dengan
                          realisasi {formatNumber(topFillRateSupplier?.totalDeliveredQuantity ?? 0)}.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-amber-200/80 bg-amber-500/10 p-4">
                    <div className="flex items-start gap-3">
                      <CircleAlert className="mt-0.5 h-5 w-5 text-amber-700" />
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-amber-800">
                          Outstanding terbesar
                        </p>
                        <p className="mt-1 text-base font-semibold text-slate-900">
                          {topOutstandingSupplier?.supplierName ?? "-"}
                        </p>
                        <p className="mt-1 text-sm text-slate-600">
                          Outstanding {formatNumber(topOutstandingSupplier?.outstandingQuantity ?? 0)} dengan{" "}
                          {formatNumber(topOutstandingSupplier?.activeContracts ?? 0)} kontrak aktif.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-sky-200/80 bg-sky-500/[0.08] p-4 sm:col-span-2 xl:col-span-1">
                    <div className="flex items-start gap-3">
                      <Truck className="mt-0.5 h-5 w-5 text-sky-700" />
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-sky-800">
                          Total outstanding
                        </p>
                        <p className="mt-1 text-base font-semibold text-slate-900">
                          {formatNumber(summary.totalOutstanding)}
                        </p>
                        <p className="mt-1 text-sm text-slate-600">
                          Akumulasi volume yang masih perlu dipenuhi seluruh supplier.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="data-grid md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Supplier"
            value={String(rows.length)}
            description="Jumlah pemasok yang sudah tercatat pada kontrak pasokan pupuk."
            meta={`${formatNumber(activeSuppliers)} aktif`}
            tone="info"
          />
          <StatCard
            title="Kontrak Aktif"
            value={formatNumber(summary.totalActiveContracts)}
            description="Total kontrak yang masih berjalan dan masih memiliki outstanding."
            meta={`${formatNumber(completedSuppliers)} supplier tuntas`}
            tone="success"
          />
          <StatCard
            title="Total Outstanding"
            value={formatNumber(summary.totalOutstanding)}
            description="Akumulasi volume yang masih perlu dipenuhi oleh seluruh supplier."
            meta={topOutstandingSupplier?.supplierName ?? "Belum ada data"}
            tone="warning"
          />
          <StatCard
            title="Fill Rate Global"
            value={`${overallFillRate}%`}
            description="Persentase realisasi pengiriman dibanding total volume kontrak semua pemasok."
            meta={topFillRateSupplier?.supplierName ?? "Belum ada data"}
            tone="default"
          />
        </section>

        <section className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,0.9fr)]">
          <SupplierPerformanceChart
            rows={rows}
            limit={8}
            description="Bandingkan volume terkirim, outstanding, dan fill rate supplier yang saat ini paling perlu dipantau."
          />

          <Card className="h-full">
            <CardHeader>
              <CardTitle>Fokus Tindak Lanjut Supplier</CardTitle>
              <CardDescription>
                Prioritaskan supplier dengan outstanding terbesar, kontrak aktif
                lebih banyak, atau fill rate yang masih rendah.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <PrioritySupplierList rows={priorityRows} />

              <Link
                href={ADMIN_ROUTES.supply.list}
                className={buttonVariants({ variant: "ghost", size: "sm" })}
              >
                Buka daftar pasokan untuk tindak lanjut
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        </section>

        <SupplierInformationTable rows={rows} />

        <section className="grid gap-4 md:grid-cols-3">
          <Card size="sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Truck className="h-4 w-4 text-sky-700" />
                Supplier Aktif
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold text-slate-900">
                {formatNumber(activeSuppliers)}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Supplier yang masih menangani kontrak berjalan atau outstanding.
              </p>
            </CardContent>
          </Card>

          <Card size="sm">
            <CardHeader>
              <CardTitle className="text-base">Kontrak Selesai</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold text-slate-900">
                {formatNumber(summary.totalCompletedContracts)}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Total kontrak supplier yang volumenya sudah terpenuhi.
              </p>
            </CardContent>
          </Card>

          <Card size="sm">
            <CardHeader>
              <CardTitle className="text-base">Supplier Tuntas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold text-slate-900">
                {formatNumber(completedSuppliers)}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Jumlah supplier tanpa outstanding aktif pada seluruh kontraknya.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}