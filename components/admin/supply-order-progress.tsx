import { cn, formatNumber } from "@/lib/utils";

export function getSupplyOrderProgressPercentage(
  quantityOrdered: number,
  totalDelivered: number,
) {
  if (quantityOrdered <= 0) {
    return 0;
  }

  return Math.min(
    100,
    Math.max(0, Math.round((totalDelivered / quantityOrdered) * 100)),
  );
}

export function SupplyOrderProgress({
  quantityOrdered,
  totalDelivered,
  className,
}: {
  quantityOrdered: number;
  totalDelivered: number;
  className?: string;
}) {
  const progress = getSupplyOrderProgressPercentage(
    quantityOrdered,
    totalDelivered,
  );

  const progressClassName =
    progress >= 100
      ? "bg-gradient-to-r from-emerald-500 to-teal-400"
      : progress >= 60
        ? "bg-gradient-to-r from-sky-500 to-cyan-400"
        : progress > 0
          ? "bg-gradient-to-r from-amber-500 to-yellow-400"
          : "bg-slate-300";

  const toneClassName =
    progress >= 100
      ? "border-emerald-200/80 bg-emerald-500/10 text-emerald-800"
      : progress >= 60
        ? "border-sky-200/80 bg-sky-500/10 text-sky-800"
        : progress > 0
          ? "border-amber-200/80 bg-amber-500/10 text-amber-800"
          : "border-slate-200/80 bg-slate-500/10 text-slate-700";

  return (
    <div className={cn("min-w-0 space-y-2", className)}>
      <div className="flex items-center justify-between gap-3 text-xs text-slate-600">
        <span>
          {formatNumber(totalDelivered)} / {formatNumber(quantityOrdered)}
        </span>

        <span
          className={cn(
            "inline-flex rounded-full border px-2.5 py-1 font-medium shadow-[0_12px_22px_-18px_rgba(15,56,45,0.18)]",
            toneClassName,
          )}
        >
          {progress}%
        </span>
      </div>

      <div className="relative h-2.5 overflow-hidden rounded-full bg-slate-900/8">
        <div
          className={cn(
            "h-2.5 rounded-full shadow-[0_12px_22px_-16px_rgba(15,56,45,0.28)] transition-all duration-300",
            progressClassName,
          )}
          style={{
            width: `${progress === 0 ? 0 : Math.max(progress, 6)}%`,
          }}
        />
      </div>
    </div>
  );
}