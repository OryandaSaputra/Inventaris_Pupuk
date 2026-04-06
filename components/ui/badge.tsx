import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium shadow-[0_12px_22px_-18px_rgba(2,8,23,0.5)]",
  {
    variants: {
      variant: {
        default: "border-white/10 bg-white/8 text-slate-100",
        secondary: "border-white/10 bg-white/6 text-slate-200",
        destructive: "border-red-400/20 bg-red-500/12 text-red-100",
        outline: "border-white/12 bg-transparent text-slate-100",
        ghost: "border-white/8 bg-white/6 text-slate-100",
        link: "border-transparent bg-transparent text-blue-200 underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { badgeVariants };