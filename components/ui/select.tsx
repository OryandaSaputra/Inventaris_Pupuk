"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        "h-11 w-full rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(13,25,49,0.92),rgba(10,20,39,0.78))] px-3.5 py-2 text-sm text-slate-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_8px_24px_-20px_rgba(2,8,23,0.8)] outline-none transition focus:border-blue-400/35 focus:ring-4 focus:ring-blue-400/14 disabled:cursor-not-allowed disabled:opacity-50 [&_option]:bg-[#0b1730] [&_option]:text-slate-100 [&_option:disabled]:text-slate-500 [&_optgroup]:bg-[#0b1730] [&_optgroup]:text-slate-200",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}