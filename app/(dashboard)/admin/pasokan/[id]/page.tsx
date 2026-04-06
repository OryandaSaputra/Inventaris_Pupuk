import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarClock,
  FileText,
  Package2,
  Sparkles,
  Truck,
  Wallet,
} from "lucide-react";
import { ContractTargetVsActualChart } from "@/components/charts/contract-target-vs-actual-chart";
import { AppShell } from "@/components/layout/app-shell";
import { SupplyOrderProgress } from "@/components/admin/supply-order-progress";
import { SupplyOrderStatusBadge } from "@/components/admin/supply-order-status-badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import {
  buildContractTargetVsActualData,
  getSupplyOrderById,
} from "@/lib/data/admin";
import {
  getBudgetTypeLabel,
  getSupplyOrderMetrics,
  sumDeliveredQuantities,
} from "@/lib/supply-order";
import { ADMIN_ROUTES } from "@/lib/routes";
import {
  decimalToNumber,
  formatCurrency,
  formatDate,
  formatNumber,
} from "@/lib/utils";

function DetailRow({
  label,
  value,
  emphasize = false,
}: {
  label: string;
  value: React.ReactNode;
  emphasize?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1 border-b border-white/55 py-3 last:border-b-0 md:flex-row md:items-start md:justify-between md:gap-6">
      <p className="text-sm text-slate-500">{label}</p>
      <div
        className={
          emphasize
            ? "text-sm font-semibold text-slate-900 md:text-right"
            : "text-sm font-medium text-slate-700 md:text-right"
        }
      >
        {value}
      </div>
    </div>
  );
}

function MiniStat({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: React.ReactNode;
  tone?: "default" | "success" | "warning" | "info";
}) {
  const toneClassName =
    tone === "success"
      ? "border-emerald-200/80 bg-emerald-500/[0.08]"
      : tone === "warning"
        ? "border-amber-200/80 bg-amber-500/[0.08]"
        : tone === "info"
          ? "border-sky-200/80 bg-sky-500/[0.08]"
          : "border-white/70 bg-white/72";

  return (
    <div className={`rounded-2xl border px-4 py-3 ${toneClassName}`}>
      <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>
      <div className="mt-2 text-base font-semibold text-slate-900">{value}</div>
    </div>
  );
}

function getRemainingContractLabel(days: number) {
  if (days < 0) {
    return `${formatNumber(Math.abs(days))} hari lewat`;
  }

  return `${formatNumber(days)} hari tersisa`;
}

export default async function SupplyOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getSupplyOrderById(id);

  if (!order) {
    notFound();
  }

  const totalDelivered = sumDeliveredQuantities(order.deliveries);

  const metrics = getSupplyOrderMetrics({
    quantityOrdered: order.quantityOrdered,
    totalDelivered,
    contractStartDate: order.contractStartDate,
    contractEndDate: order.contractEndDate,
  });

  const totalCost = decimalToNumber(order.totalCost);
  const ppnAmount = decimalToNumber(order.ppnAmount);
  const grandTotal = decimalToNumber(order.grandTotal);
  const unitPrice = decimalToNumber(order.unitPrice);
  const freightCost = decimalToNumber(order.freightCost);

  const targetVsActualPoints = buildContractTargetVsActualData({
    contractStartDate: order.contractStartDate,
    contractEndDate: order.contractEndDate,
    quantityOrdered: order.quantityOrdered,
    deliveries: order.deliveries.map((delivery) => ({
      receivedDate: delivery.receivedDate,
      quantityDelivered: delivery.quantityDelivered,
    })),
  });

  return (
    <AppShell pathname={ADMIN_ROUTES.supply.list}>
      <div className="app-page">
        <PageHeader
          eyebrow="Manajemen Pasokan"
          title="Detail Pasokan Pupuk"
          description="Halaman detail dibuat lebih terstruktur agar identitas kontrak, progres aktual, nilai biaya, dan histori penerimaan bisa dibaca dalam satu alur yang jelas."
          action={
            <div className="flex flex-wrap gap-2">
              <Link href={`${ADMIN_ROUTES.supply.root}/${order.id}/edit`}>
                <Button variant="outline">Edit</Button>
              </Link>
              <Link href={ADMIN_ROUTES.supply.list}>
                <Button variant="outline">Kembali</Button>
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
                  <div className="min-w-0">
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-800">
                      <Sparkles className="h-3.5 w-3.5" />
                      Ringkasan kontrak
                    </div>

                    <h2 className="mt-4 text-2xl font-semibold leading-tight text-slate-900 md:text-3xl">
                      {order.sp2bjNumber}
                    </h2>

                    <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                      {order.garden.name} • {order.fertilizerType.name} • {order.supplier.name}
                    </p>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    <MiniStat
                      label="Volume Kontrak"
                      value={`${formatNumber(order.quantityOrdered)} kg`}
                      tone="info"
                    />
                    <MiniStat
                      label="Sudah Terkirim"
                      value={`${formatNumber(totalDelivered)} kg`}
                      tone="success"
                    />
                    <MiniStat
                      label="Sisa Volume"
                      value={`${formatNumber(metrics.remainingQuantity)} kg`}
                      tone="warning"
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  <div className="rounded-3xl border border-white/70 bg-white/68 p-4">
                    <div className="flex items-center gap-2 text-slate-900">
                      <CalendarClock className="h-4 w-4 text-sky-700" />
                      <span className="font-medium">Masa kontrak</span>
                    </div>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      {getRemainingContractLabel(metrics.remainingContractDays)}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {formatDate(order.contractStartDate)} - {formatDate(order.contractEndDate)}
                    </p>
                  </div>

                  <div className="rounded-3xl border border-emerald-200/80 bg-emerald-500/[0.08] p-4">
                    <div className="flex items-center gap-2 text-slate-900">
                      <Wallet className="h-4 w-4 text-emerald-700" />
                      <span className="font-medium">Grand total</span>
                    </div>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      {formatCurrency(grandTotal)}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Total biaya akhir kontrak termasuk PPN.
                    </p>
                  </div>

                  <div className="rounded-3xl border border-sky-200/80 bg-sky-500/[0.08] p-4 sm:col-span-2 xl:col-span-1">
                    <div className="flex items-center gap-2 text-slate-900">
                      <FileText className="h-4 w-4 text-sky-700" />
                      <span className="font-medium">Status notifikasi</span>
                    </div>
                    <div className="mt-3">
                      <SupplyOrderStatusBadge
                        status={metrics.notificationStatus}
                        label={metrics.notificationLabel}
                        className="justify-start text-left"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-3xl border border-white/70 bg-white/72 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-slate-900">Progress Pasokan</p>
                  <p className="text-xs text-slate-500">
                    {formatNumber(totalDelivered)} / {formatNumber(order.quantityOrdered)} kg
                  </p>
                </div>

                <div className="mt-3">
                  <SupplyOrderProgress
                    quantityOrdered={order.quantityOrdered}
                    totalDelivered={totalDelivered}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <Card className="border-white/65 bg-white/60 shadow-[0_24px_70px_-38px_rgba(41,65,45,0.24)] backdrop-blur-xl">
            <CardHeader>
              <CardTitle>Informasi Kontrak</CardTitle>
              <CardDescription>
                Detail dasar kontrak pasokan pupuk.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DetailRow label="No SP2BJ" value={order.sp2bjNumber} />
              <DetailRow label="Kebun" value={order.garden.name} />
              <DetailRow label="Jenis Pupuk" value={order.fertilizerType.name} />
              <DetailRow label="Pemasok" value={order.supplier.name} />
              <DetailRow label="Anggaran" value={getBudgetTypeLabel(order.budgetType)} />
              <DetailRow
                label="Tanggal Awal Kontrak"
                value={formatDate(order.contractStartDate)}
              />
              <DetailRow
                label="Tanggal Selesai Kontrak"
                value={formatDate(order.contractEndDate)}
              />
            </CardContent>
          </Card>

          <Card className="border-white/65 bg-white/60 shadow-[0_24px_70px_-38px_rgba(41,65,45,0.24)] backdrop-blur-xl">
            <CardHeader>
              <CardTitle>Ringkasan Biaya</CardTitle>
              <CardDescription>
                Nilai kontrak utama yang dipakai untuk monitoring pasokan.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DetailRow label="Harga Satuan" value={formatCurrency(unitPrice)} />
              <DetailRow label="Ongkos Angkut" value={formatCurrency(freightCost)} />
              <DetailRow label="Total Biaya" value={formatCurrency(totalCost)} />
              <DetailRow label="PPN 11%" value={formatCurrency(ppnAmount)} />
              <DetailRow
                label="Total Biaya Akhir"
                value={formatCurrency(grandTotal)}
                emphasize
              />
            </CardContent>
          </Card>
        </section>

        <ContractTargetVsActualChart
          points={targetVsActualPoints}
          quantityOrdered={order.quantityOrdered}
          totalDelivered={totalDelivered}
        />

        <section className="grid gap-4 xl:grid-cols-2">
          <Card className="border-white/65 bg-white/60 shadow-[0_24px_70px_-38px_rgba(41,65,45,0.24)] backdrop-blur-xl">
            <CardHeader>
              <CardTitle>Volume & Status</CardTitle>
              <CardDescription>
                Ringkasan volume kontrak dan progres realisasi.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DetailRow label="Volume Pupuk" value={formatNumber(order.quantityOrdered)} />
              <DetailRow label="Terkirim" value={formatNumber(totalDelivered)} />
              <DetailRow
                label="Sisa Volume"
                value={formatNumber(metrics.remainingQuantity)}
              />
              <DetailRow
                label="Sisa Kontrak"
                value={getRemainingContractLabel(metrics.remainingContractDays)}
              />
              <DetailRow
                label="Status Notifikasi"
                value={
                  <SupplyOrderStatusBadge
                    status={metrics.notificationStatus}
                    label={metrics.notificationLabel}
                  />
                }
              />
            </CardContent>
          </Card>

          <Card className="border-white/65 bg-white/60 shadow-[0_24px_70px_-38px_rgba(41,65,45,0.24)] backdrop-blur-xl">
            <CardHeader className="gap-3 md:flex md:flex-row md:items-start md:justify-between">
              <div>
                <CardTitle>Histori Penerimaan</CardTitle>
                <CardDescription>
                  Catatan penerimaan pupuk yang sudah masuk untuk kontrak ini.
                </CardDescription>
              </div>

              <div className="rounded-2xl border border-white/55 bg-white/72 px-4 py-2 text-sm text-slate-600">
                Total penerimaan:{" "}
                <strong className="text-slate-900">
                  {formatNumber(order.deliveries.length)}
                </strong>
              </div>
            </CardHeader>

            <CardContent>
              {order.deliveries.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-white/65 bg-white/72 px-6 py-10 text-center">
                  <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/65 bg-white/72 text-slate-700">
                    <Truck className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-slate-900">
                    Belum ada data penerimaan
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Penerimaan pupuk untuk kontrak ini belum dicatat.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {order.deliveries.map((delivery) => (
                    <div
                      key={delivery.id}
                      className="rounded-3xl border border-white/65 bg-white/72 p-4"
                    >
                      <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto_auto] md:items-center">
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500">
                            Tanggal
                          </p>
                          <p className="mt-1 text-sm font-medium text-slate-900">
                            {formatDate(delivery.receivedDate)}
                          </p>
                        </div>

                        <div>
                          <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500">
                            No Polisi
                          </p>
                          <p className="mt-1 text-sm font-medium text-slate-900">
                            {delivery.licensePlate}
                          </p>
                        </div>

                        <div>
                          <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500">
                            Jumlah Sak
                          </p>
                          <p className="mt-1 text-sm font-medium text-slate-900">
                            {formatNumber(delivery.sackCount)} Sak
                          </p>
                        </div>

                        <div className="md:text-right">
                          <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500">
                            Volume
                          </p>
                          <p className="mt-1 text-sm font-semibold text-slate-900">
                            {formatNumber(delivery.quantityDelivered)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}