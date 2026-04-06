"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
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

export type DeliveryTrendPoint = {
  dateKey: string;
  label: string;
  shortLabel: string;
  totalDelivered: number;
  deliveryCount: number;
};

function DeliveryTrendTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{
    payload: DeliveryTrendPoint;
    value: number;
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
          Volume:{" "}
          <span className="font-semibold text-blue-100">
            {formatNumber(point.totalDelivered)}
          </span>
        </p>
        <p>
          Frekuensi:{" "}
          <span className="font-semibold text-cyan-100">
            {formatNumber(point.deliveryCount)}
          </span>
        </p>
      </div>
    </div>
  );
}

export function DeliveryTrendChart({
  title,
  description,
  points,
  footerLabel = "Total volume",
}: {
  title: string;
  description: string;
  points: DeliveryTrendPoint[];
  footerLabel?: string;
}) {
  const totalDelivered = points.reduce(
    (total, point) => total + point.totalDelivered,
    0,
  );

  const totalDeliveries = points.reduce(
    (total, point) => total + point.deliveryCount,
    0,
  );

  const nonZeroDays = points.filter((point) => point.totalDelivered > 0).length;

  const peakDay = points.reduce<DeliveryTrendPoint | null>((current, point) => {
    if (!current || point.totalDelivered > current.totalDelivered) {
      return point;
    }

    return current;
  }, null);

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
                {footerLabel}
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-50">
                {formatNumber(totalDelivered)}
              </p>
            </div>

            <div className="rounded-2xl border border-cyan-300/18 bg-cyan-400/10 px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                Hari Aktif
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-50">
                {formatNumber(nonZeroDays)}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                Frekuensi
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-50">
                {formatNumber(totalDeliveries)}
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
                Belum ada data penerimaan
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Grafik akan muncul setelah data penerimaan tersedia.
              </p>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-white/6 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <div className="h-[280px] w-full sm:h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={points}
                  margin={{ top: 12, right: 12, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="deliveryTrendGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.04} />
                    </linearGradient>
                  </defs>

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
                  <Tooltip content={<DeliveryTrendTooltip />} />
                  <Legend
                    wrapperStyle={{
                      fontSize: 12,
                      color: "#cbd5e1",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="totalDelivered"
                    name="Volume penerimaan"
                    stroke="#60a5fa"
                    strokeWidth={3}
                    fill="url(#deliveryTrendGradient)"
                    dot={{ r: 4, fill: "#7dd3fc", stroke: "#0f172a", strokeWidth: 2 }}
                    activeDot={{
                      r: 6,
                      fill: "#60a5fa",
                      stroke: "#dbeafe",
                      strokeWidth: 2,
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {peakDay ? (
          <p className="text-sm leading-6 text-slate-300">
            Puncak penerimaan terjadi pada{" "}
            <strong className="text-slate-50">{peakDay.label}</strong> dengan volume{" "}
            <strong className="text-slate-50">
              {formatNumber(peakDay.totalDelivered)}
            </strong>
            .
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}