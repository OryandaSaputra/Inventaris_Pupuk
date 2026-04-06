import { Badge } from "@/components/ui/badge";

export function UserStatusBadge({ isActive }: { isActive: boolean }) {
  return (
    <Badge
      className={
        isActive
          ? "border-emerald-200/90 bg-emerald-500/15 text-emerald-800"
          : "border-slate-200/90 bg-slate-500/10 text-slate-700"
      }
    >
      {isActive ? "Aktif" : "Nonaktif"}
    </Badge>
  );
}