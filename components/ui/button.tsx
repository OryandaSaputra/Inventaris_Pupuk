import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-2xl border border-transparent text-sm font-medium transition-all outline-none ring-offset-0 disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-4 focus-visible:ring-blue-400/18 focus-visible:ring-offset-0",
  {
    variants: {
      variant: {
        default:
          "border-white/10 bg-white/8 text-slate-100 shadow-[0_16px_34px_-24px_rgba(2,8,23,0.72)] hover:-translate-y-0.5 hover:bg-white/12",
        primary:
          "border-blue-300/20 bg-[linear-gradient(135deg,rgba(96,165,250,0.96),rgba(59,130,246,0.88))] text-white shadow-[0_20px_36px_-22px_rgba(59,130,246,0.62)] hover:-translate-y-0.5 hover:brightness-105",
        outline:
          "border-white/10 bg-white/6 text-slate-100 shadow-[0_12px_30px_-24px_rgba(2,8,23,0.68)] hover:-translate-y-0.5 hover:bg-white/10",
        secondary:
          "border-cyan-300/20 bg-[linear-gradient(135deg,rgba(125,211,252,0.9),rgba(56,189,248,0.82))] text-slate-950 shadow-[0_18px_34px_-20px_rgba(56,189,248,0.48)] hover:-translate-y-0.5 hover:brightness-105",
        ghost:
          "text-slate-200 hover:bg-white/8 hover:text-slate-50",
        destructive:
          "border-rose-500/30 bg-[linear-gradient(135deg,rgba(244,63,94,0.95),rgba(225,29,72,0.92))] text-white shadow-[0_18px_34px_-20px_rgba(225,29,72,0.48)] hover:-translate-y-0.5 hover:brightness-105",
        link: "text-blue-200 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        xs: "h-7 px-2 text-xs",
        sm: "h-9 px-3.5",
        lg: "h-11 px-6",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { buttonVariants };