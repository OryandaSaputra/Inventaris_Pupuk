import Link from "next/link";
import { notFound } from "next/navigation";
import { FilePenLine, History, Sparkles } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { SupplyOrderForm } from "@/components/admin/supply-order-form";
import { Button, buttonVariants } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { getSupplyOrderById, getSupplyOrderFormOptions } from "@/lib/data/admin";
import { ADMIN_ROUTES } from "@/lib/routes";
import { decimalToNumber, formatCurrency, formatNumber } from "@/lib/utils";

function toDateInputValue(value: Date | string) {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function InfoCard({
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

export default async function EditSupplyOrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [order, options] = await Promise.all([
    getSupplyOrderById(id),
    getSupplyOrderFormOptions(),
  ]);

  if (!order) {
    notFound();
  }

  return (
    <AppShell pathname={ADMIN_ROUTES.supply.list}>
      <div className="app-page">
        <PageHeader
          eyebrow="Manajemen Pasokan"
          title="Edit Pasokan Pupuk"
          description="Perbarui detail kontrak pasokan pupuk beserta nilai anggaran dan biaya secara terpusat."
          action={
            <Link href={ADMIN_ROUTES.supply.list} className="inline-flex">
              <Button variant="outline">Kembali ke tabel pasokan</Button>
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
                      Workspace edit kontrak
                    </div>

                    <h2 className="mt-4 text-2xl font-semibold leading-tight text-slate-900 md:text-3xl xl:text-[2.15rem]">
                      Edit kontrak kini terasa lebih terarah dengan ringkasan
                      data utama di bagian atas.
                    </h2>

                    <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                      Anda bisa memperbarui identitas kontrak, periode, volume,
                      serta struktur biaya tanpa kehilangan konteks kontrak yang
                      sedang dibuka.
                    </p>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    <InfoCard
                      label="No SP2BJ"
                      value={order.sp2bjNumber}
                      description="Identitas utama kontrak yang sedang diedit."
                      tone="info"
                    />
                    <InfoCard
                      label="Volume Kontrak"
                      value={formatNumber(order.quantityOrdered)}
                      description="Total kuantitas pupuk sesuai kontrak."
                      tone="default"
                    />
                    <InfoCard
                      label="Grand Total"
                      value={formatCurrency(decimalToNumber(order.grandTotal))}
                      description="Nilai total kontrak saat ini."
                      tone="success"
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  <div className="rounded-3xl border border-white/70 bg-white/62 p-4 shadow-[0_18px_34px_-30px_rgba(15,56,45,0.18)]">
                    <div className="flex items-center gap-2 text-slate-900">
                      <FilePenLine className="h-4 w-4 text-emerald-600" />
                      <span className="font-medium">Perbarui data inti</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Gunakan halaman ini untuk memperbaiki data kontrak tanpa
                      harus kembali ke tabel manajemen utama.
                    </p>
                  </div>

                  <div className="rounded-3xl border border-sky-200/80 bg-sky-500/[0.08] p-4 shadow-[0_18px_34px_-30px_rgba(14,165,233,0.22)]">
                    <div className="flex items-center gap-2 text-slate-900">
                      <History className="h-4 w-4 text-sky-700" />
                      <span className="font-medium">Tetap dalam konteks</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Ringkasan di atas membantu memastikan Anda sedang mengedit
                      kontrak yang benar sebelum menyimpan perubahan.
                    </p>
                  </div>

                  <Link
                    href={ADMIN_ROUTES.supply.list}
                    className={buttonVariants({ variant: "outline", size: "sm" })}
                  >
                    Kembali ke daftar pasokan
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <SupplyOrderForm
          mode="edit"
          options={options}
          initialData={{
            id: order.id,
            gardenName: order.garden.name,
            fertilizerTypeName: order.fertilizerType.name,
            supplierName: order.supplier.name,
            sp2bjNumber: order.sp2bjNumber,
            contractStartDate: toDateInputValue(order.contractStartDate),
            contractEndDate: toDateInputValue(order.contractEndDate),
            quantityOrdered: order.quantityOrdered,
            budgetType: order.budgetType,
            unitPrice: decimalToNumber(order.unitPrice),
            freightCost: decimalToNumber(order.freightCost),
            totalCost: decimalToNumber(order.totalCost),
            ppnAmount: decimalToNumber(order.ppnAmount),
            grandTotal: decimalToNumber(order.grandTotal),
          }}
        />
      </div>
    </AppShell>
  );
}