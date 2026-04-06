import { ReceiptText, ShieldCheck, Wallet } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

function SummaryCard({
  icon: Icon,
  label,
  value,
  tone = "default",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  tone?: "default" | "highlight";
}) {
  return (
    <div
      className={
        tone === "highlight"
          ? "rounded-[1.7rem] border border-emerald-200/80 bg-emerald-500/[0.09] p-4 shadow-[0_18px_30px_-26px_rgba(5,150,105,0.24)]"
          : "rounded-[1.7rem] border border-white/70 bg-white/72 p-4 shadow-[0_18px_30px_-26px_rgba(15,56,45,0.16)]"
      }
    >
      <div className="flex items-start gap-3">
        <span
          className={
            tone === "highlight"
              ? "inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-200/80 bg-white/72 text-emerald-700"
              : "inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/70 bg-white/78 text-slate-700"
          }
        >
          <Icon className="h-4 w-4" />
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            {label}
          </p>
          <p
            className={
              tone === "highlight"
                ? "mt-2 text-lg font-semibold text-emerald-800 md:text-xl"
                : "mt-2 text-base font-semibold text-slate-900 md:text-lg"
            }
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

function OperatorBadge({
  symbol,
}: {
  symbol: "+" | "=";
}) {
  return (
    <div className="flex items-center justify-center">
      <div className="inline-flex min-w-12 items-center justify-center rounded-2xl border border-white/70 bg-white/78 px-3 py-3 text-center shadow-[0_18px_30px_-26px_rgba(15,56,45,0.14)]">
        <p className="text-lg font-semibold text-slate-900 md:text-xl">{symbol}</p>
      </div>
    </div>
  );
}

export function SupplyOrderFormSummary({
  calculated,
}: {
  calculated: {
    totalCost: number;
    ppnAmount: number;
    grandTotal: number;
  };
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h4 className="text-sm font-semibold text-slate-900 md:text-base">
          Ringkasan Perhitungan Otomatis
        </h4>
        <p className="text-sm leading-6 text-slate-600">
          Nilai berikut dihitung otomatis berdasarkan volume pupuk, harga satuan,
          dan ongkos angkut yang Anda input.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
        <SummaryCard
          icon={ReceiptText}
          label="Total Biaya"
          value={formatCurrency(calculated.totalCost)}
        />

        <OperatorBadge symbol="+" />

        <SummaryCard
          icon={ShieldCheck}
          label="PPN 11%"
          value={formatCurrency(calculated.ppnAmount)}
        />

        <OperatorBadge symbol="=" />

        <SummaryCard
          icon={Wallet}
          label="Grand Total"
          value={formatCurrency(calculated.grandTotal)}
          tone="highlight"
        />
      </div>

      <input type="hidden" name="totalCost" value={calculated.totalCost} />
      <input type="hidden" name="ppnAmount" value={calculated.ppnAmount} />
      <input type="hidden" name="grandTotal" value={calculated.grandTotal} />
    </div>
  );
}