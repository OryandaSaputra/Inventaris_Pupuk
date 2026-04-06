import type { NotificationStatus } from "@/lib/notifications";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusClassMap: Record<NotificationStatus, string> = {
  HIJAU:
    "border-emerald-200/90 bg-emerald-500/10 text-emerald-800 shadow-[0_12px_24px_-18px_rgba(5,150,105,0.35)]",
  MERAH:
    "border-rose-200/90 bg-rose-500/10 text-rose-800 shadow-[0_12px_24px_-18px_rgba(225,29,72,0.28)]",
  KUNING:
    "border-amber-200/90 bg-amber-500/10 text-amber-800 shadow-[0_12px_24px_-18px_rgba(245,158,11,0.28)]",
  NORMAL:
    "border-slate-200/90 bg-slate-500/10 text-slate-700 shadow-[0_12px_24px_-18px_rgba(100,116,139,0.2)]",
};

export function SupplyOrderStatusBadge({
  status,
  label,
  className,
}: {
  status: NotificationStatus;
  label: string;
  className?: string;
}) {
  return (
    <Badge
      className={cn(
        "justify-center rounded-full whitespace-normal px-3 py-1.5 text-center text-[11px] font-semibold uppercase tracking-[0.14em] leading-5",
        statusClassMap[status],
        className,
      )}
    >
      {label}
    </Badge>
  );
}