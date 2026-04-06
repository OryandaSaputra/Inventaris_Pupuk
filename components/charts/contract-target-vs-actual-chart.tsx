"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
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

export type ContractTargetVsActualPoint = {
  dateKey: string;
  label: string;
  shortLabel: string;
  targetCumulative: number;
  actualCumulative: number;
};

function ContractTargetTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{
    payload: ContractTargetVsActualPoint;
  }>;
}) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const point = payload[0]?.payload;

  if (!point) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(14,27,52,0.96),rgba(9,20,40,0.92))] px-4 py-3 shadow-2xl backdrop-blur-xl">
      <p className="text-sm font-semibold text-slate-50">{point.label}</p>
      <div className="mt-2 space-y-1 text-xs text-slate-300">
        <p>
          Actual:{" "}
          <span className="font-semibold text-blue-100">
            {formatNumber(point.actualCumulative)}
          </span>
        </p>
        <p>
          Target:{" "}
          <span className="font-semibold text-cyan-100">
            {formatNumber(point.targetCumulative)}
          </span>
        </p>
      </div>
    </div>
  );
}

export function ContractTargetVsActualChart({
  points,
  quantityOrdered,
  totalDelivered,
}: {
  points: ContractTargetVsActualPoint[];
  quantityOrdered: number;
  totalDelivered: number;
}) {
  const finalPoint = points[points.length - 1];
  const gap = Math.max(
    (finalPoint?.targetCumulative ?? 0) - (finalPoint?.actualCumulative ?? 0),
    0,
  );

  const progress =
    quantityOrdered > 0
      ? Math.min(100, Math.round((totalDelivered / quantityOrdered) * 100))
      : 0;

  return (
    <Card className="h-full">
      <CardHeader className="gap-3">
        <div className="flex min-w-0 flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <CardTitle>Actual vs Target</CardTitle>
            <CardDescription>
              Bandingkan realisasi kumulatif dengan laju target kontrak sampai
              akhir periode.
            </CardDescription>
          </div>

          <div className="grid gap-2 sm:grid-cols-3 xl:min-w-[360px]">
            <div className="rounded-2xl border border-cyan-300/18 bg-cyan-400/10 px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                Target Akhir
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-50">
                {formatNumber(quantityOrdered)}
              </p>
            </div>

            <div className="rounded-2xl border border-blue-300/18 bg-blue-400/12 px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                Realisasi
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-50">
                {formatNumber(totalDelivered)}
              </p>
            </div>

            <div className="rounded-2xl border border-amber-300/18 bg-amber-400/12 px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                Gap
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-50">
                {formatNumber(gap)}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="min-w-0 space-y-5">
        {points.length === 0 ? (
          <div className="flex min-h-[320px] items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/6 px-6 py-10 text-center">
            <div>
              <p className="text-sm font-semibold text-slate-50">
                Belum ada data progres kontrak
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Grafik actual vs target akan muncul setelah periode kontrak dapat
                dihitung.
              </p>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-white/6 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <div className="h-[280px] w-full sm:h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={points}
                  margin={{ top: 12, right: 12, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    stroke="rgba(148,163,184,0.18)"
                    strokeDasharray="4 4"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="shortLabel"
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tickFormatter={(value: number) => formatNumber(value)}
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    width={54}
                  />
                  <Tooltip content={<ContractTargetTooltip />} />
                  <Legend
                    wrapperStyle={{
                      fontSize: 12,
                      color: "#cbd5e1",
                    }}
                  />
                  <ReferenceLine
                    y={quantityOrdered}
                    stroke="rgba(148,163,184,0.36)"
                    strokeDasharray="4 4"
                  />
                  <Line
                    type="monotone"
                    dataKey="actualCumulative"
                    name="Actual kumulatif"
                    stroke="#60a5fa"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#60a5fa", stroke: "#0f172a", strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="targetCumulative"
                    name="Target kumulatif"
                    stroke="#38bdf8"
                    strokeWidth={3}
                    strokeDasharray="6 4"
                    dot={{ r: 3, fill: "#38bdf8", stroke: "#0f172a", strokeWidth: 2 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        <p className="text-sm leading-6 text-slate-300">
          Progress volume saat ini berada di{" "}
          <strong className="text-slate-50">{progress}%</strong> dari total kontrak.
        </p>
      </CardContent>
    </Card>
  );
}