import Link from "next/link";
import {
  ClipboardList,
  Package2,
  Sparkles,
  TestTubeDiagonal,
} from "lucide-react";
import { MasterDataManager } from "@/components/admin/master-data-manager";
import { StatCard } from "@/components/dashboard/stat-card";
import { AppShell } from "@/components/layout/app-shell";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { getFertilizersMasterData } from "@/lib/data/master-data";
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

export default async function InputDataFertilizerPage() {
  const rows = await getFertilizersMasterData();

  const activeRows = rows.filter((row) => row.isActive).length;
  const inactiveRows = rows.length - activeRows;
  const usedRows = rows.filter((row) => row.supplyOrderCount > 0).length;

  return (
    <AppShell pathname={ADMIN_ROUTES.masterData.fertilizers}>
      <div className="app-page">
        <PageHeader
          eyebrow="Master Data"
          title="Master Data Pupuk"
          description="Kelola daftar pupuk agar proses input kontrak dan monitoring pasokan tetap memakai nama pupuk yang konsisten."
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
                      Workspace pupuk
                    </div>

                    <h2 className="mt-4 text-2xl font-semibold leading-tight text-slate-900 md:text-3xl xl:text-[2.15rem]">
                      Master pupuk dibuat lebih rapi untuk menjaga konsistensi
                      nama dan status aktif.
                    </h2>

                    <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                      Data pupuk yang baik mempermudah admin saat membuat pasokan,
                      membaca dashboard, dan menjaga agar semua kontrak memakai
                      referensi jenis pupuk yang sama.
                    </p>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    <InfoCard
                      label="Total Pupuk"
                      value={String(rows.length)}
                      description="Semua jenis pupuk yang tersimpan."
                      tone="info"
                    />
                    <InfoCard
                      label="Pupuk Aktif"
                      value={String(activeRows)}
                      description="Langsung tersedia pada input pasokan."
                      tone="success"
                    />
                    <InfoCard
                      label="Sudah Dipakai"
                      value={String(usedRows)}
                      description="Sudah pernah dipakai pada kontrak."
                      tone="default"
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  <div className="rounded-3xl border border-sky-200/80 bg-sky-500/[0.08] p-4">
                    <div className="flex items-center gap-2 text-slate-900">
                      <Package2 className="h-4 w-4 text-sky-700" />
                      <span className="font-medium">Master siap pakai</span>
                    </div>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      {activeRows}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Pupuk aktif menjadi opsi resmi di form kontrak pasokan.
                    </p>
                  </div>

                  <div className="rounded-3xl border border-amber-200/80 bg-amber-500/[0.08] p-4">
                    <div className="flex items-center gap-2 text-slate-900">
                      <ClipboardList className="h-4 w-4 text-amber-700" />
                      <span className="font-medium">Sudah terhubung</span>
                    </div>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      {usedRows}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Pupuk yang sudah dipakai perlu dikelola dengan hati-hati.
                    </p>
                  </div>

                  <div className="rounded-3xl border border-white/70 bg-white/62 p-4 sm:col-span-2 xl:col-span-1">
                    <div className="flex items-center gap-2 text-slate-900">
                      <TestTubeDiagonal className="h-4 w-4 text-emerald-700" />
                      <span className="font-medium">Referensi teknis</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Nama pupuk yang konsisten memudahkan pembacaan kontrak dan
                      histori penerimaan.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="data-grid md:grid-cols-3">
          <StatCard
            title="Total Pupuk"
            value={String(rows.length)}
            description="Jumlah seluruh master pupuk."
            meta={`${usedRows} dipakai`}
            tone="info"
          />
          <StatCard
            title="Pupuk Aktif"
            value={String(activeRows)}
            description="Jenis pupuk aktif tersedia di form pasokan."
            meta={`${inactiveRows} nonaktif`}
            tone="success"
          />
          <StatCard
            title="Pupuk Terpakai"
            value={String(usedRows)}
            description="Data pupuk yang sudah terhubung ke transaksi."
            meta="Perlu hati-hati"
            tone="warning"
          />
        </section>

        <MasterDataManager
          type="fertilizer"
          rows={rows}
          title="Kelola Data Pupuk"
          description="Tambah dan rapikan referensi pupuk agar selalu konsisten pada modul pasokan."
        />
      </div>
    </AppShell>
  );
}