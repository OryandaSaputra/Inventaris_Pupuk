"use client";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";

export type SupplierPerformanceRow = {
  supplierName: string;
  totalContractQuantity: number;
  totalDeliveredQuantity: number;
  outstandingQuantity: number;
  activeContracts: number;
  completedContracts: number;
  fillRate: number;
};

function SupplierTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{
    dataKey: string;
    value: number;
    color?: string;
    payload: SupplierPerformanceRow;
  }>;
  label?: string;
}) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const row = payload[0]?.payload;

  if (!row) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(14,27,52,0.96),rgba(9,20,40,0.92))] px-4 py-3 shadow-2xl backdrop-blur-xl">
      <p className="text-sm font-semibold text-slate-50">{label}</p>
      <div className="mt-2 space-y-1 text-xs text-slate-300">
        <p>
          Kontrak:{" "}
          <span className="font-semibold text-cyan-100">
            {formatNumber(row.totalContractQuantity)}
          </span>
        </p>
        <p>
          Terkirim:{" "}
          <span className="font-semibold text-blue-100">
            {formatNumber(row.totalDeliveredQuantity)}
          </span>
        </p>
        <p>
          Outstanding:{" "}
          <span className="font-semibold text-amber-200">
            {formatNumber(row.outstandingQuantity)}
          </span>
        </p>
        <p>
          Fill rate:{" "}
          <span className="font-semibold text-slate-50">{row.fillRate}%</span>
        </p>
      </div>
    </div>
  );
}

export function SupplierPerformanceChart({
  rows,
  limit = 6,
  title = "Performa Pemasok",
  description = "Perbandingan volume kontrak, pengiriman, outstanding, dan fill rate per pemasok.",
}: {
  rows: SupplierPerformanceRow[];
  limit?: number;
  title?: string;
  description?: string;
}) {
  const chartRows = rows.slice(0, limit);

  return (
    <Card className="h-full">
      <CardHeader className="gap-3">
        <div className="flex min-w-0 flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>

          <div className="grid gap-2 sm:grid-cols-3 xl:min-w-[360px]">
            <div className="rounded-2xl border border-blue-300/18 bg-blue-400/12 px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                Pemasok Aktif
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-50">
                {formatNumber(rows.filter((row) => row.activeContracts > 0).length)}
              </p>
            </div>

            <div className="rounded-2xl border border-cyan-300/18 bg-cyan-400/10 px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                Kontrak Selesai
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-50">
                {formatNumber(
                  rows.reduce((total, row) => total + row.completedContracts, 0),
                )}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                Fill Rate Rata-rata
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-50">
                {rows.length
                  ? `${Math.round(
                      rows.reduce((total, row) => total + row.fillRate, 0) /
                        rows.length,
                    )}%`
                  : "0%"}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="min-w-0 space-y-5">
        {chartRows.length === 0 ? (
          <div className="flex min-h-[320px] items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/6 px-6 py-10 text-center">
            <div>
              <p className="text-sm font-semibold text-slate-50">
                Belum ada data pemasok
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Grafik performa akan muncul setelah kontrak dan pengiriman tersedia.
              </p>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-white/6 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <div className="h-[300px] w-full sm:h-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={chartRows}
                  margin={{ top: 12, right: 16, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    stroke="rgba(148,163,184,0.18)"
                    strokeDasharray="4 4"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="supplierName"
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    yAxisId="left"
                    tickFormatter={(value: number) => formatNumber(value)}
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    width={54}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    domain={[0, 100]}
                    tickFormatter={(value: number) => `${value}%`}
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    width={46}
                  />
                  <Tooltip content={<SupplierTooltip />} />
                  <Legend
                    wrapperStyle={{
                      fontSize: 12,
                      color: "#cbd5e1",
                    }}
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="totalDeliveredQuantity"
                    name="Terkirim"
                    fill="#60a5fa"
                    radius={[8, 8, 0, 0]}
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="outstandingQuantity"
                    name="Outstanding"
                    fill="#f59e0b"
                    radius={[8, 8, 0, 0]}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="fillRate"
                    name="Fill Rate"
                    stroke="#38bdf8"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#38bdf8", stroke: "#0f172a", strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}