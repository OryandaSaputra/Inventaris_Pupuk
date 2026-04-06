import Link from "next/link";
import {
  ClipboardList,
  MapPinned,
  Sparkles,
  Trees,
} from "lucide-react";
import { MasterDataManager } from "@/components/admin/master-data-manager";
import { StatCard } from "@/components/dashboard/stat-card";
import { AppShell } from "@/components/layout/app-shell";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { getGardensMasterData } from "@/lib/data/master-data";
import { ADMIN_ROUTES } from "@/lib/routes";

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

export default async function InputDataGardenPage() {
  const rows = await getGardensMasterData();

  const activeRows = rows.filter((row) => row.isActive).length;
  const inactiveRows = rows.length - activeRows;
  const usedRows = rows.filter((row) => row.supplyOrderCount > 0).length;

  return (
    <AppShell pathname={ADMIN_ROUTES.masterData.gardens}>
      <div className="app-page">
        <PageHeader
          eyebrow="Master Data"
          title="Master Data Kebun"
          description="Kelola data kebun agar pilihan pada input pasokan, penugasan user, dan pembatasan akses kebun selalu konsisten dan rapi."
          action={
            <Link
              href={ADMIN_ROUTES.supply.input}
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              Buka Input Pasokan
            </Link>
          }
        />

        <section>
          <Card className="relative overflow-hidden border-white/65 bg-white/62 shadow-[0_30px_90px_-42px_rgba(15,56,45,0.3)] backdrop-blur-[30px]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.16),transparent_28%),radial-gradient(circle_at_center_right,rgba(250,204,21,0.12),transparent_18%)]" />

            <CardContent className="relative min-w-0 p-5 md:p-6 xl:p-7">
              <div className="grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,0.95fr)]">
                <div className="space-y-5">
                  <div className="max-w-3xl">
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-800">
                      <Sparkles className="h-3.5 w-3.5" />
                      Workspace kebun
                    </div>

                    <h2 className="mt-4 text-2xl font-semibold leading-tight text-slate-900 md:text-3xl xl:text-[2.15rem]">
                      Master kebun kini lebih nyaman dikelola dan lebih mudah
                      dipindai.
                    </h2>

                    <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                      Halaman ini dipakai untuk menjaga kualitas data referensi
                      kebun yang nantinya dipakai pada kontrak pasokan, user
                      management, dan pembatasan akses berdasarkan kebun.
                    </p>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    <InfoCard
                      label="Total Kebun"
                      value={String(rows.length)}
                      description="Semua kebun yang tersimpan pada sistem."
                      tone="info"
                    />
                    <InfoCard
                      label="Kebun Aktif"
                      value={String(activeRows)}
                      description="Kebun aktif tersedia pada form dan penugasan."
                      tone="success"
                    />
                    <InfoCard
                      label="Kebun Dipakai"
                      value={String(usedRows)}
                      description="Sudah dipakai oleh data pasokan atau user."
                      tone="default"
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  <div className="rounded-3xl border border-sky-200/80 bg-sky-500/[0.08] p-4">
                    <div className="flex items-center gap-2 text-slate-900">
                      <Trees className="h-4 w-4 text-sky-700" />
                      <span className="font-medium">Kebun aktif</span>
                    </div>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      {activeRows}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Kebun aktif bisa langsung dipakai pada dropdown input pasokan.
                    </p>
                  </div>

                  <div className="rounded-3xl border border-amber-200/80 bg-amber-500/[0.08] p-4">
                    <div className="flex items-center gap-2 text-slate-900">
                      <ClipboardList className="h-4 w-4 text-amber-700" />
                      <span className="font-medium">Dipakai transaksi</span>
                    </div>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      {usedRows}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Data yang sudah dipakai tidak bisa dihapus sembarangan.
                    </p>
                  </div>

                  <div className="rounded-3xl border border-white/70 bg-white/62 p-4 sm:col-span-2 xl:col-span-1">
                    <div className="flex items-center gap-2 text-slate-900">
                      <MapPinned className="h-4 w-4 text-emerald-700" />
                      <span className="font-medium">Referensi lokasi</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Nama, kode, dan alamat kebun membantu menjaga konsistensi
                      data operasional dan pelaporan.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="data-grid md:grid-cols-3">
          <StatCard
            title="Total Kebun"
            value={String(rows.length)}
            description="Jumlah seluruh master kebun yang tersimpan."
            meta={`${usedRows} dipakai`}
            tone="info"
          />
          <StatCard
            title="Kebun Aktif"
            value={String(activeRows)}
            description="Kebun aktif muncul sebagai pilihan pada form."
            meta={`${inactiveRows} nonaktif`}
            tone="success"
          />
          <StatCard
            title="Kebun Terpakai"
            value={String(usedRows)}
            description="Jumlah kebun yang sudah terhubung dengan proses bisnis."
            meta="Perlu hati-hati"
            tone="warning"
          />
        </section>

        <MasterDataManager
          type="garden"
          rows={rows}
          title="Kelola Data Kebun"
          description="Tambah, edit, dan rapikan data kebun agar tetap siap dipakai pada modul lainnya."
        />
      </div>
    </AppShell>
  );
}