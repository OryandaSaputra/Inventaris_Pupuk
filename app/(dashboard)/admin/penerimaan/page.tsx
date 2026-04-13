import { ClipboardCheck, PackageCheck, Sparkles, Truck } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { AdminDeliveryForm } from "@/components/admin/admin-delivery-form";
import { DeliveryTable } from "@/components/krani/delivery-table";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { requireFeatureAccess } from "@/lib/auth-guards";
import {
  getAdminDeliveryFormOptions,
  getAdminDeliveryTableData,
} from "@/lib/data/admin-delivery";
import { ADMIN_ROUTES } from "@/lib/routes";
import { formatNumber } from "@/lib/utils";

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

export default async function AdminDeliveryPage() {
  await requireFeatureAccess(
    "canAccessAdminDelivery",
    "Tidak memiliki akses ke halaman input penerimaan admin.",
  );

  const [options, rows] = await Promise.all([
    getAdminDeliveryFormOptions(),
    getAdminDeliveryTableData(),
  ]);

  const totalOutstanding = options.reduce(
    (acc, item) => acc + item.remainingQuantity,
    0,
  );

  const activeGardenCount = new Set(options.map((item) => item.gardenId)).size;

  return (
    <AppShell pathname={ADMIN_ROUTES.delivery}>
      <div className="app-page">
        <PageHeader
          eyebrow="Penerimaan"
          title="Input Penerimaan Pupuk"
          description="Admin dapat menginput penerimaan pupuk untuk seluruh kebun yang terdaftar. Pilih kebun, jenis pupuk, dan SP2BJ sesuai dengan dokumen penerimaan."
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
                      Workspace penerimaan admin
                    </div>

                    <h2 className="mt-4 text-2xl font-semibold leading-tight text-slate-900 md:text-3xl xl:text-[2.15rem]">
                      Admin dapat menginput penerimaan untuk semua kebun tanpa
                      batasan wilayah.
                    </h2>

                    <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                      Berbeda dengan krani yang dibatasi satu kebun, admin dapat
                      memilih kebun mana saja yang menerima pupuk. Pilih kebun,
                      jenis pupuk, SP2BJ, kemudian isi detail penerimaan.
                    </p>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    <InfoCard
                      label="Kebun Aktif"
                      value={formatNumber(activeGardenCount)}
                      description="Jumlah kebun yang memiliki kontrak aktif."
                      tone="info"
                    />
                    <InfoCard
                      label="SP2BJ Tersedia"
                      value={formatNumber(options.length)}
                      description="Kontrak yang masih memiliki sisa kuantitas."
                      tone="default"
                    />
                    <InfoCard
                      label="Total Outstanding"
                      value={formatNumber(totalOutstanding)}
                      description="Total sisa volume dari semua kontrak aktif."
                      tone="success"
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  <div className="rounded-3xl border border-white/70 bg-white/62 p-4 shadow-[0_18px_34px_-30px_rgba(15,56,45,0.18)]">
                    <div className="flex items-center gap-2 text-slate-900">
                      <ClipboardCheck className="h-4 w-4 text-emerald-600" />
                      <span className="font-medium">Akses penuh admin</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Tidak ada batasan kebun. Admin dapat menginput penerimaan
                      untuk seluruh kontrak yang masih berjalan.
                    </p>
                  </div>

                  <div className="rounded-3xl border border-sky-200/80 bg-sky-500/[0.08] p-4 shadow-[0_18px_34px_-30px_rgba(14,165,233,0.22)]">
                    <div className="flex items-center gap-2 text-slate-900">
                      <Truck className="h-4 w-4 text-sky-700" />
                      <span className="font-medium">Terhubung ke kontrak</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Setiap penerimaan langsung dikaitkan ke SP2BJ yang dipilih
                      sehingga progress outstanding otomatis terjaga.
                    </p>
                  </div>

                  <div className="rounded-3xl border border-emerald-200/80 bg-emerald-500/[0.08] p-4 shadow-[0_18px_34px_-30px_rgba(5,150,105,0.22)] sm:col-span-2 xl:col-span-1">
                    <div className="flex items-center gap-2 text-slate-900">
                      <PackageCheck className="h-4 w-4 text-emerald-700" />
                      <span className="font-medium">Sinkron otomatis</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Data penerimaan yang disimpan akan langsung terlihat pada
                      dashboard admin, laporan supplier, dan tabel monitoring.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <div className="data-grid">
          <AdminDeliveryForm options={options} />
          <DeliveryTable rows={rows} />
        </div>
      </div>
    </AppShell>
  );
}