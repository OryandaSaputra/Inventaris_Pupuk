import Link from "next/link";
import { ClipboardList, Layers3, Sparkles } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { SupplyOrderForm } from "@/components/admin/supply-order-form";
import { buttonVariants } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { getSupplyOrderFormOptions } from "@/lib/data/admin";
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

export default async function AdminSupplyInputPage() {
  const options = await getSupplyOrderFormOptions();

  return (
    <AppShell pathname={ADMIN_ROUTES.supply.input}>
      <div className="app-page">
        <PageHeader
          eyebrow="Kelola Pasokan"
          title="Input Pasokan Pupuk"
          description="Halaman ini difokuskan untuk pencatatan kontrak baru agar proses input lebih rapi, cepat dibaca, dan tidak bercampur dengan tabel pengelolaan."
          action={
            <Link
              href={ADMIN_ROUTES.supply.list}
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              Buka Daftar Pasokan
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
                      Workspace input kontrak
                    </div>

                    <h2 className="mt-4 text-2xl font-semibold leading-tight text-slate-900 md:text-3xl xl:text-[2.15rem]">
                      Halaman input pasokan dibuat lebih fokus agar admin cepat
                      mengisi kontrak tanpa terganggu tabel manajemen.
                    </h2>

                    <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                      Semua elemen penting dikelompokkan jelas: identitas
                      kontrak, periode, volume, biaya, dan ringkasan otomatis.
                      Hasilnya lebih modern, lebih rapi, dan jauh lebih mudah
                      dipindai saat input data.
                    </p>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    <InfoCard
                      label="Kebun"
                      value={formatNumber(options.gardens.length)}
                      description="Pilihan kebun yang tersedia untuk kontrak baru."
                      tone="info"
                    />
                    <InfoCard
                      label="Jenis Pupuk"
                      value={formatNumber(options.fertilizerTypes.length)}
                      description="Master jenis pupuk yang siap dipakai pada form."
                      tone="default"
                    />
                    <InfoCard
                      label="Supplier"
                      value={formatNumber(options.suppliers.length)}
                      description="Daftar pemasok aktif yang dapat dipilih."
                      tone="success"
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  <div className="rounded-3xl border border-white/70 bg-white/62 p-4 shadow-[0_18px_34px_-30px_rgba(15,56,45,0.18)]">
                    <div className="flex items-center gap-2 text-slate-900">
                      <ClipboardList className="h-4 w-4 text-emerald-600" />
                      <span className="font-medium">Alur input lebih bersih</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Halaman ini sengaja dipisahkan dari daftar pasokan supaya
                      admin bisa fokus penuh saat membuat kontrak baru.
                    </p>
                  </div>

                  <div className="rounded-3xl border border-sky-200/80 bg-sky-500/[0.08] p-4 shadow-[0_18px_34px_-30px_rgba(14,165,233,0.22)]">
                    <div className="flex items-center gap-2 text-slate-900">
                      <Layers3 className="h-4 w-4 text-sky-700" />
                      <span className="font-medium">Ringkasan otomatis</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Total biaya, PPN, dan grand total dihitung langsung dari
                      angka yang Anda masukkan di form.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="w-full">
          <SupplyOrderForm options={options} />
        </section>
      </div>
    </AppShell>
  );
}