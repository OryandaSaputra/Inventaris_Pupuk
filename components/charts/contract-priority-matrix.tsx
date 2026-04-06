"use client";

import Link from "next/link";
import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";

type NotificationStatus = "HIJAU" | "MERAH" | "KUNING" | "NORMAL";

export type ContractPriorityPoint = {
  id: string;
  sp2bjNumber: string;
  gardenName: string;
  fertilizerTypeName: string;
  remainingQuantity: number;
  remainingContractDays: number;
  notificationStatus: NotificationStatus;
  notificationLabel: string;
  completionRate: number;
};

type ScatterPoint = ContractPriorityPoint & {
  bubbleSize: number;
};

function getScatterColor(status: NotificationStatus) {
  switch (status) {
    case "MERAH":
      return "#f43f5e";
    case "KUNING":
      return "#f59e0b";
    case "HIJAU":
      return "#60a5fa";
    default:
      return "#38bdf8";
  }
}

function PriorityTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{
    payload: ScatterPoint;
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
    <div className="max-w-[280px] rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(14,27,52,0.96),rgba(9,20,40,0.92))] px-4 py-3 shadow-2xl backdrop-blur-xl">
      <p className="text-sm font-semibold text-slate-50">{point.sp2bjNumber}</p>
      <p className="mt-1 text-xs text-slate-300">
        {point.gardenName} • {point.fertilizerTypeName}
      </p>

      <div className="mt-3 space-y-1 text-xs text-slate-300">
        <p>
          Sisa kontrak:{" "}
          <span className="font-semibold text-slate-50">
            {formatNumber(point.remainingContractDays)} hari
          </span>
        </p>
        <p>
          Outstanding:{" "}
          <span className="font-semibold text-amber-200">
            {formatNumber(point.remainingQuantity)}
          </span>
        </p>
        <p>
          Progres:{" "}
          <span className="font-semibold text-blue-100">
            {point.completionRate}%
          </span>
        </p>
        <p>
          Status:{" "}
          <span className="font-semibold text-cyan-100">
            {point.notificationLabel}
          </span>
        </p>
      </div>
    </div>
  );
}

export function ContractPriorityMatrix({
  points,
}: {
  points: ContractPriorityPoint[];
}) {
  const scatterData: ScatterPoint[] = points.map((point) => ({
    ...point,
    bubbleSize: Math.max(
      80,
      Math.min(420, 80 + point.remainingQuantity * 0.015),
    ),
  }));

  const minDays = Math.min(...scatterData.map((point) => point.remainingContractDays), 0);
  const maxDays = Math.max(...scatterData.map((point) => point.remainingContractDays), 1);
  const maxQuantity = Math.max(...scatterData.map((point) => point.remainingQuantity), 1);

  const grouped = [
    {
      status: "MERAH" as const,
      label: "Merah",
      color: getScatterColor("MERAH"),
      data: scatterData.filter((point) => point.notificationStatus === "MERAH"),
    },
    {
      status: "KUNING" as const,
      label: "Kuning",
      color: getScatterColor("KUNING"),
      data: scatterData.filter((point) => point.notificationStatus === "KUNING"),
    },
    {
      status: "NORMAL" as const,
      label: "Normal",
      color: getScatterColor("NORMAL"),
      data: scatterData.filter((point) => point.notificationStatus === "NORMAL"),
    },
    {
      status: "HIJAU" as const,
      label: "Hijau",
      color: getScatterColor("HIJAU"),
      data: scatterData.filter((point) => point.notificationStatus === "HIJAU"),
    },
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Matriks Prioritas Kontrak</CardTitle>
        <CardDescription>
          Titik makin ke kiri berarti tenggat makin dekat. Titik makin ke atas
          berarti outstanding makin besar.
        </CardDescription>
      </CardHeader>

      <CardContent className="min-w-0 space-y-5">
        {scatterData.length === 0 ? (
          <div className="flex min-h-[360px] items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/6 px-6 py-10 text-center">
            <div>
              <p className="text-sm font-semibold text-slate-50">
                Belum ada kontrak outstanding
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Matriks akan muncul saat ada kontrak yang masih perlu dipenuhi.
              </p>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-white/6 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <div className="h-[320px] w-full sm:h-[360px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
                  <CartesianGrid
                    stroke="rgba(148,163,184,0.18)"
                    strokeDasharray="4 4"
                  />
                  <XAxis
                    type="number"
                    dataKey="remainingContractDays"
                    name="Sisa kontrak"
                    unit=" hari"
                    domain={[minDays - 2, maxDays + 2]}
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    type="number"
                    dataKey="remainingQuantity"
                    name="Outstanding"
                    domain={[0, maxQuantity + Math.max(10, maxQuantity * 0.1)]}
                    tickFormatter={(value: number) => formatNumber(value)}
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    width={56}
                  />
                  <ZAxis
                    type="number"
                    dataKey="bubbleSize"
                    range={[80, 420]}
                    name="Ukuran"
                  />
                  <Tooltip content={<PriorityTooltip />} />

                  {grouped.map((group) =>
                    group.data.length > 0 ? (
                      <Scatter
                        key={group.status}
                        name={group.label}
                        data={group.data}
                        fill={group.color}
                      />
                    ) : null,
                  )}
                </ScatterChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-300">
              {grouped.map((group) => (
                <span
                  key={group.status}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-1.5"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: group.color }}
                  />
                  {group.label}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="grid gap-3 xl:grid-cols-2">
          {points.slice(0, 6).map((point) => (
            <div
              key={point.id}
              className="rounded-3xl border border-white/10 bg-white/6 p-4 shadow-[0_18px_32px_-28px_rgba(2,8,23,0.7)]"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="font-semibold text-slate-50">{point.sp2bjNumber}</p>
                  <p className="mt-1 text-sm text-slate-300">
                    {point.gardenName} • {point.fertilizerTypeName}
                  </p>
                </div>

                <Link
                  href={`/admin/pasokan/${point.id}`}
                  className={buttonVariants({ variant: "ghost", size: "sm" })}
                >
                  Lihat Detail
                </Link>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/4 px-3 py-2.5">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                    Outstanding
                  </p>
                  <p className="mt-2 font-semibold text-slate-50">
                    {formatNumber(point.remainingQuantity)}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/4 px-3 py-2.5">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                    Sisa hari
                  </p>
                  <p className="mt-2 font-semibold text-slate-50">
                    {formatNumber(point.remainingContractDays)}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/4 px-3 py-2.5">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                    Progres
                  </p>
                  <p className="mt-2 font-semibold text-slate-50">
                    {point.completionRate}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}