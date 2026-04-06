import { ClipboardCheck, PackageCheck, Sparkles, Truck } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { DeliveryForm } from "@/components/krani/delivery-form";
import { DeliveryTable } from "@/components/krani/delivery-table";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { requireKraniGardenFeature } from "@/lib/auth-guards";
import { getDeliveryTableData, getKraniFormOptions } from "@/lib/data/krani";
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

export default async function DeliveryPage() {
  const { user } = await requireKraniGardenFeature(
    "canAccessDeliveryWorkspace",
    "view",
    "Role Anda tidak memiliki akses ke workspace penerimaan pupuk.",
  );

  const [{ garden, options }, rows] = await Promise.all([
    getKraniFormOptions(user.assignedGardenId),
    getDeliveryTableData(user.assignedGardenId),
  ]);

  const totalOutstanding = options.reduce(
    (acc, item) => acc + item.remainingQuantity,
    0,
  );

  return (
    <AppShell pathname="/krani/penerimaan">
      <div className="app-page">
        <PageHeader
          eyebrow="Penerimaan"
          title={`Tabel Informasi Penerimaan - ${garden.name}`}
          description={`User hanya dapat melihat dan mencatat penerimaan untuk kebun ${garden.code} · ${garden.name}, sesuai penugasan user dan permission role.`}
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
                      Workspace penerimaan kebun
                    </div>

                    <h2 className="mt-4 text-2xl font-semibold leading-tight text-slate-900 md:text-3xl xl:text-[2.15rem]">
                      Halaman penerimaan dibuat lebih fokus agar input transaksi
                      dan pengecekan histori terasa menyatu.
                    </h2>

                    <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                      Krani dapat langsung memilih SP2BJ yang sesuai, mengisi
                      detail kendaraan dan volume, lalu melihat histori
                      penerimaan pada kebun yang sama tanpa pindah konteks.
                    </p>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    <InfoCard
                      label="Kebun Aktif"
                      value={`${garden.code}`}
                      description={garden.name}
                      tone="info"
                    />
                    <InfoCard
                      label="SP2BJ Tersedia"
                      value={formatNumber(options.length)}
                      description="Jumlah kontrak yang bisa dipakai untuk input penerimaan."
                      tone="default"
                    />
                    <InfoCard
                      label="Outstanding"
                      value={formatNumber(totalOutstanding)}
                      description="Total sisa volume dari kontrak yang belum terpenuhi."
                      tone="success"
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  <div className="rounded-3xl border border-white/70 bg-white/62 p-4 shadow-[0_18px_34px_-30px_rgba(15,56,45,0.18)]">
                    <div className="flex items-center gap-2 text-slate-900">
                      <ClipboardCheck className="h-4 w-4 text-emerald-600" />
                      <span className="font-medium">Input lebih cepat</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Form dan tabel histori digabung dalam satu halaman supaya
                      proses input dan pengecekan data menjadi lebih praktis.
                    </p>
                  </div>

                  <div className="rounded-3xl border border-sky-200/80 bg-sky-500/[0.08] p-4 shadow-[0_18px_34px_-30px_rgba(14,165,233,0.22)]">
                    <div className="flex items-center gap-2 text-slate-900">
                      <Truck className="h-4 w-4 text-sky-700" />
                      <span className="font-medium">Terhubung ke kontrak</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Setiap penerimaan langsung dikaitkan ke SP2BJ yang dipilih,
                      sehingga progress outstanding otomatis terjaga.
                    </p>
                  </div>

                  <div className="rounded-3xl border border-emerald-200/80 bg-emerald-500/[0.08] p-4 shadow-[0_18px_34px_-30px_rgba(5,150,105,0.22)] sm:col-span-2 xl:col-span-1">
                    <div className="flex items-center gap-2 text-slate-900">
                      <PackageCheck className="h-4 w-4 text-emerald-700" />
                      <span className="font-medium">Ruang kerja terfokus</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      User hanya melihat data yang memang terkait dengan kebun
                      penugasannya.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <div className="data-grid">
          <DeliveryForm
            options={options}
            gardenName={`${garden.code} · ${garden.name}`}
          />
          <DeliveryTable rows={rows} />
        </div>
      </div>
    </AppShell>
  );
}