"use client";

import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import type { SortDirection } from "@/lib/table-sort";
import { cn } from "@/lib/utils";
import { TableHead } from "@/components/ui/table";

type Props = {
  label: string;
  isActive: boolean;
  direction?: SortDirection;
  onClick: () => void;
  className?: string;
  align?: "left" | "right" | "center";
};

function SortIcon({ isActive, direction }: { isActive: boolean; direction?: SortDirection }) {
  if (!isActive) {
    return <ArrowUpDown className="h-3.5 w-3.5 opacity-70 transition group-hover:opacity-100" />;
  }

  return direction === "asc" ? (
    <ArrowUp className="h-3.5 w-3.5" />
  ) : (
    <ArrowDown className="h-3.5 w-3.5" />
  );
}

export function SortableTableHead({
  label,
  isActive,
  direction,
  onClick,
  className,
  align = "left",
}: Props) {
  return (
    <TableHead
      className={cn(
        align === "right" && "text-right",
        align === "center" && "text-center",
        className,
      )}
    >
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "group inline-flex w-full items-center gap-1.5 rounded-md text-inherit transition hover:text-slate-200",
          align === "right" && "justify-end",
          align === "center" && "justify-center",
          isActive && "text-slate-100",
        )}
        aria-label={`Urutkan kolom ${label}`}
        title={`Urutkan ${label}`}
      >
        <span>{label}</span>
        <SortIcon isActive={isActive} direction={direction} />
      </button>
    </TableHead>
  );
}