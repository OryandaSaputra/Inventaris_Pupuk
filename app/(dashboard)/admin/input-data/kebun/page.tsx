import Link from "next/link";
import { ArrowRight, Sprout, Trees, Waypoints } from "lucide-react";
import { MasterDataManager } from "@/components/admin/master-data-manager";
import { StatCard } from "@/components/dashboard/stat-card";
import { AppShell } from "@/components/layout/app-shell";
import { buttonVariants } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { getGardensMasterData } from "@/lib/data/master-data";
import { ADMIN_ROUTES } from "@/lib/routes";

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
          description="Fokuskan halaman ini untuk melihat data tersimpan. Penambahan dan perubahan data dilakukan melalui popup agar workspace tetap ringkas dan nyaman dibaca."
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
            title="Total Kebun"
            value={String(rows.length)}
            description="Semua referensi kebun yang tersimpan pada sistem."
            meta="Master aktif"
            tone="info"
          />
          <StatCard
            title="Kebun Aktif"
            value={String(activeRows)}
            description="Bisa dipakai langsung pada pasokan dan penugasan user."
            meta={`${inactiveRows} nonaktif`}
            tone="success"
          />
          <StatCard
            title="Sudah Dipakai"
            value={String(usedRows)}
            description="Terhubung dengan proses bisnis sehingga perubahan harus tetap rapi."
            meta="Perlu hati-hati"
            tone="warning"
          />
        </section>

        <section className="grid gap-4 xl:grid-cols-3">
          <div className="glass-surface rounded-[1.8rem] border border-white/10 p-5 xl:col-span-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100">
              <Sprout className="h-3.5 w-3.5" />
              Tampilan lebih fokus
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-slate-50">
              Data kebun kini tampil lebih bersih dan siap dipindai cepat.
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
              Tabel menjadi pusat utama halaman. User cukup klik tombol tambah di
              bagian atas tabel untuk membuat data baru, sedangkan edit dilakukan
              lewat popup agar alur kerja terasa modern, rapi, dan tidak memakan
              ruang layar.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            <div className="glass-surface rounded-[1.8rem] border border-white/10 p-5">
              <div className="flex items-center gap-2 text-slate-100">
                <Trees className="h-4 w-4 text-cyan-200" />
                <span className="font-medium">Kebun aktif</span>
              </div>
              <p className="mt-3 text-2xl font-semibold text-slate-50">{activeRows}</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Menjadi opsi resmi pada modul pasokan dan hak akses.
              </p>
            </div>

            <div className="glass-surface rounded-[1.8rem] border border-white/10 p-5">
              <div className="flex items-center gap-2 text-slate-100">
                <Waypoints className="h-4 w-4 text-cyan-200" />
                <span className="font-medium">Terhubung proses</span>
              </div>
              <p className="mt-3 text-2xl font-semibold text-slate-50">{usedRows}</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Kebun yang sudah dipakai transaksi sebaiknya dikelola dengan cermat.
              </p>
            </div>
          </div>
        </section>

        <MasterDataManager
          type="garden"
          rows={rows}
          title="Data Tersimpan"
          description="Klik tombol tambah di kanan atas untuk menambahkan kebun baru. Edit data akan muncul dalam popup agar tampilan tetap ringkas."
        />
      </div>
    </AppShell>
  );
}