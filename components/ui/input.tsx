import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full min-w-0 rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(13,25,49,0.92),rgba(10,20,39,0.78))] px-3.5 py-2 text-sm text-slate-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_8px_24px_-20px_rgba(2,8,23,0.8)] outline-none transition placeholder:text-slate-400 focus-visible:border-blue-400/35 focus-visible:ring-4 focus-visible:ring-blue-400/14 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-red-400/45 aria-invalid:ring-4 aria-invalid:ring-red-400/12",
        className,
      )}
      {...props}
    />
  );
}

export { Input };