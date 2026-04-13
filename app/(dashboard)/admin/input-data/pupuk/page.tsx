import Link from "next/link";
import { ArrowRight, Beaker, Package2, Sparkles } from "lucide-react";
import { MasterDataManager } from "@/components/admin/master-data-manager";
import { StatCard } from "@/components/dashboard/stat-card";
import { AppShell } from "@/components/layout/app-shell";
import { buttonVariants } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { getFertilizersMasterData } from "@/lib/data/master-data";
import { ADMIN_ROUTES } from "@/lib/routes";

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
          description="Halaman difokuskan pada tabel master pupuk. Tambah dan edit dilakukan lewat popup agar area kerja terasa lebih modern, lapang, dan mudah digunakan."
          action={
            <Link
              href={ADMIN_ROUTES.supply.input}
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              Buka Input Pasokan
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          }
        />

        <section className="data-grid md:grid-cols-3">
          <StatCard
            title="Total Pupuk"
            value={String(rows.length)}
            description="Semua jenis pupuk yang terdaftar sebagai referensi."
            meta="Master tersedia"
            tone="info"
          />
          <StatCard
            title="Pupuk Aktif"
            value={String(activeRows)}
            description="Tersedia langsung pada form input pasokan."
            meta={`${inactiveRows} nonaktif`}
            tone="success"
          />
          <StatCard
            title="Sudah Dipakai"
            value={String(usedRows)}
            description="Sudah dipakai pada kontrak atau histori pasokan."
            meta="Perlu hati-hati"
            tone="warning"
          />
        </section>

        <section className="grid gap-4 xl:grid-cols-3">
          <div className="glass-surface rounded-[1.8rem] border border-white/10 p-5 xl:col-span-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100">
              <Sparkles className="h-3.5 w-3.5" />
              Workspace lebih modern
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-slate-50">
              Master pupuk dibuat ringkas supaya nama dan status lebih cepat dicek.
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
              Semua data utama ditempatkan pada tabel. Dengan pola popup untuk tambah
              dan edit, pengguna bisa tetap fokus ke daftar data tanpa kehilangan
              konteks halaman.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            <div className="glass-surface rounded-[1.8rem] border border-white/10 p-5">
              <div className="flex items-center gap-2 text-slate-100">
                <Package2 className="h-4 w-4 text-cyan-200" />
                <span className="font-medium">Referensi aktif</span>
              </div>
              <p className="mt-3 text-2xl font-semibold text-slate-50">{activeRows}</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Jenis pupuk aktif siap dipakai sebagai pilihan resmi.
              </p>
            </div>

            <div className="glass-surface rounded-[1.8rem] border border-white/10 p-5">
              <div className="flex items-center gap-2 text-slate-100">
                <Beaker className="h-4 w-4 text-cyan-200" />
                <span className="font-medium">Konsistensi nama</span>
              </div>
              <p className="mt-3 text-2xl font-semibold text-slate-50">{usedRows}</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Data yang sudah dipakai kontrak perlu dijaga agar histori tetap konsisten.
              </p>
            </div>
          </div>
        </section>

        <MasterDataManager
          type="fertilizer"
          rows={rows}
          title="Data Tersimpan"
          description="Klik tombol tambah di kanan atas untuk menambahkan pupuk baru. Saat edit, form akan muncul di popup agar tampilan tetap bersih."
        />
      </div>
    </AppShell>
  );
}