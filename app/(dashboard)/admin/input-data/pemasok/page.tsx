import Link from "next/link";
import { ArrowRight, Building2, PhoneCall, Truck } from "lucide-react";
import { MasterDataManager } from "@/components/admin/master-data-manager";
import { StatCard } from "@/components/dashboard/stat-card";
import { AppShell } from "@/components/layout/app-shell";
import { buttonVariants } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { getSuppliersMasterData } from "@/lib/data/master-data";
import { ADMIN_ROUTES } from "@/lib/routes";

export default async function InputDataSupplierPage() {
  const rows = await getSuppliersMasterData();

  const activeRows = rows.filter((row) => row.isActive).length;
  const inactiveRows = rows.length - activeRows;
  const usedRows = rows.filter((row) => row.supplyOrderCount > 0).length;

  return (
    <AppShell pathname={ADMIN_ROUTES.masterData.suppliers}>
      <div className="app-page">
        <PageHeader
          eyebrow="Master Data"
          title="Master Data Pemasok / Supplier"
          description="Tampilan dipusatkan pada tabel supplier. Penambahan dan edit dilakukan dengan popup supaya halaman lebih modern dan tetap nyaman dibaca di layar besar maupun kecil."
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
            title="Total Supplier"
            value={String(rows.length)}
            description="Seluruh pemasok yang tersimpan sebagai referensi resmi."
            meta="Master tersedia"
            tone="info"
          />
          <StatCard
            title="Supplier Aktif"
            value={String(activeRows)}
            description="Bisa dipilih langsung saat membuat data pasokan."
            meta={`${inactiveRows} nonaktif`}
            tone="success"
          />
          <StatCard
            title="Sudah Dipakai"
            value={String(usedRows)}
            description="Sudah terhubung dengan pasokan atau histori transaksi."
            meta="Perlu hati-hati"
            tone="warning"
          />
        </section>

        <section className="grid gap-4 xl:grid-cols-3">
          <div className="glass-surface rounded-[1.8rem] border border-white/10 p-5 xl:col-span-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100">
              <Truck className="h-3.5 w-3.5" />
              Navigasi lebih fokus
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-slate-50">
              Data supplier lebih mudah dibaca tanpa form permanen di samping tabel.
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
              User dapat tetap fokus pada daftar supplier, lalu membuka popup saat
              ingin menambah atau mengedit data. Pendekatan ini menjaga layout tetap
              bersih sambil mempertahankan nuansa warna dan gaya dashboard yang ada.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            <div className="glass-surface rounded-[1.8rem] border border-white/10 p-5">
              <div className="flex items-center gap-2 text-slate-100">
                <Building2 className="h-4 w-4 text-cyan-200" />
                <span className="font-medium">Supplier aktif</span>
              </div>
              <p className="mt-3 text-2xl font-semibold text-slate-50">{activeRows}</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Menjadi pilihan siap pakai pada kontrak pasokan.
              </p>
            </div>

            <div className="glass-surface rounded-[1.8rem] border border-white/10 p-5">
              <div className="flex items-center gap-2 text-slate-100">
                <PhoneCall className="h-4 w-4 text-cyan-200" />
                <span className="font-medium">Kontak terhubung</span>
              </div>
              <p className="mt-3 text-2xl font-semibold text-slate-50">{usedRows}</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Supplier terpakai perlu dijaga agar histori dan follow-up tetap akurat.
              </p>
            </div>
          </div>
        </section>

        <MasterDataManager
          type="supplier"
          rows={rows}
          title="Data Tersimpan"
          description="Klik tombol tambah di kanan atas untuk menambahkan supplier baru. Saat edit, form akan dibuka dalam popup agar tabel tetap menjadi fokus utama."
        />
      </div>
    </AppShell>
  );
}