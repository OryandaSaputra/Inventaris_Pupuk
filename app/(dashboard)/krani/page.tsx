import { ClipboardCheck, PackageCheck, Sparkles, Truck } from "lucide-react";
import { DeliveryTrendChart } from "@/components/charts/delivery-trend-chart";
import { AppShell } from "@/components/layout/app-shell";
import { RecentDeliveriesList } from "@/components/krani/recent-deliveries-list";
import { StatCard } from "@/components/dashboard/stat-card";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { requireKraniGardenFeature } from "@/lib/auth-guards";
import { getKraniDashboardData } from "@/lib/data/krani";
import { formatNumber } from "@/lib/utils";

function HeroMetric({
  label,
  value,
  description,
  icon: Icon,
  tone = "default",
}: {
  label: string;
  value: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tone?: "default" | "success" | "info";
}) {
  const toneClassName =
    tone === "success"
      ? "border-emerald-200/85 bg-emerald-500/[0.09]"
      : tone === "info"
        ? "border-sky-200/85 bg-sky-500/[0.09]"
        : "border-white/70 bg-white/62";

  return (
    <div className={`rounded-3xl border p-4 shadow-[0_20px_36px_-30px_rgba(15,56,45,0.24)] ${toneClassName}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
            {label}
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
        </div>

        <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/70 bg-white/70 text-emerald-800 shadow-[0_14px_24px_-18px_rgba(5,150,105,0.32)]">
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}

export default async function KraniHomePage() {
  const { user } = await requireKraniGardenFeature(
    "canAccessKraniHome",
    "view",
    "Role Anda tidak memiliki akses ke dashboard krani.",
  );

  const data = await getKraniDashboardData(user.assignedGardenId);

  return (
    <AppShell pathname="/krani">
      <div className="app-page">
        <PageHeader
          eyebrow="Krani Dashboard"
          title={`Ringkasan Penerimaan Pupuk - ${data.garden.name}`}
          description={`Dashboard ini hanya menampilkan data kebun ${data.garden.code} · ${data.garden.name}, dan tetap mengikuti permission role yang aktif.`}
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
                      Fokus penerimaan kebun
                    </div>

                    <h2 className="mt-4 text-2xl font-semibold leading-tight text-slate-900 md:text-3xl xl:text-[2.15rem]">
                      Dashboard krani dibuat lebih cepat dibaca untuk operasional
                      penerimaan harian.
                    </h2>

                    <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                      Semua insight difokuskan ke satu kebun aktif: jumlah
                      kontrak, ritme penerimaan, volume outstanding, dan daftar
                      penerimaan terbaru agar proses pencatatan lebih praktis.
                    </p>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    <HeroMetric
                      label="Kode Kebun"
                      value={data.garden.code}
                      description="Identitas kebun aktif yang menjadi ruang kerja user saat ini."
                      icon={ClipboardCheck}
                      tone="info"
                    />
                    <HeroMetric
                      label="Penerimaan Hari Ini"
                      value={formatNumber(data.todayDelivered)}
                      description="Total volume pupuk yang diterima hari ini."
                      icon={Truck}
                      tone="success"
                    />
                    <HeroMetric
                      label="Outstanding"
                      value={formatNumber(data.outstandingQuantity)}
                      description="Sisa volume kontrak yang masih perlu dipenuhi."
                      icon={PackageCheck}
                      tone="default"
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  <div className="rounded-3xl border border-sky-200/80 bg-sky-500/[0.08] p-4 shadow-[0_18px_34px_-30px_rgba(14,165,233,0.22)]">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-slate-600">
                      Kebun aktif
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      {data.garden.code} · {data.garden.name}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Semua tabel dan form di halaman ini otomatis dibatasi ke kebun ini.
                    </p>
                  </div>

                  <div className="rounded-3xl border border-emerald-200/80 bg-emerald-500/[0.08] p-4 shadow-[0_18px_34px_-30px_rgba(5,150,105,0.22)]">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-slate-600">
                      SP2BJ aktif
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      {formatNumber(data.activeOrders)}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Jumlah kontrak aktif yang masih berjalan untuk kebun user.
                    </p>
                  </div>

                  <div className="rounded-3xl border border-white/70 bg-white/62 p-4 shadow-[0_18px_34px_-30px_rgba(15,56,45,0.18)] sm:col-span-2 xl:col-span-1">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-slate-600">
                      Catatan operasional
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Fokus kerja krani adalah memastikan penerimaan yang masuk
                      tercatat sesuai SP2BJ, jumlah kirim, dan tanggal aktual
                      penerimaan.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="data-grid md:grid-cols-3">
          <StatCard
            title="SP2BJ Aktif"
            value={String(data.activeOrders)}
            description="Jumlah kontrak aktif pada kebun yang diizinkan untuk user ini."
            meta={data.garden.code}
            tone="info"
          />
          <StatCard
            title="Penerimaan Hari Ini"
            value={formatNumber(data.todayDelivered)}
            description="Total kuantitas pupuk yang diterima hari ini untuk kebun yang diizinkan."
            meta={data.garden.name}
            tone="success"
          />
          <StatCard
            title="Outstanding"
            value={formatNumber(data.outstandingQuantity)}
            description="Sisa total kontrak yang belum terpenuhi pada kebun yang diizinkan."
            meta="Perlu ditindaklanjuti"
            tone="warning"
          />
        </section>

        <section className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <DeliveryTrendChart
            title="Tren Penerimaan 7 Hari Terakhir"
            description="Grafik ini menampilkan ritme penerimaan khusus untuk kebun yang diizinkan pada user."
            points={data.deliveryTrend}
            footerLabel="Total 7 Hari"
          />

          <RecentDeliveriesList deliveries={data.recentDeliveries} />
        </section>
      </div>
    </AppShell>
  );
}