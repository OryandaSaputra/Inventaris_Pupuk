import { cn } from "@/lib/utils";

type FormMessageProps = {
  message?: string;
  success?: boolean;
  className?: string;
};

export function FormMessage({
  message,
  success = false,
  className,
}: FormMessageProps) {
  if (!message) return null;

  return (
    <div
      className={cn(
        "rounded-2xl border px-3 py-2.5 text-sm shadow-[0_14px_26px_-22px_rgba(15,56,45,0.2)]",
        success
          ? "border-emerald-200/80 bg-emerald-500/10 text-emerald-800"
          : "border-rose-200/80 bg-rose-500/10 text-rose-700",
        className,
      )}
    >
      {message}
    </div>
  );
}