import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const toneMap = {
  default: {
    glow: "from-white/10 via-blue-400/8 to-transparent",
    badge: "border-white/10 bg-white/8 text-slate-200",
    accent: "bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(96,165,250,0.04))]",
  },
  success: {
    glow: "from-blue-300/22 via-sky-300/10 to-transparent",
    badge: "border-blue-300/18 bg-blue-400/12 text-blue-100",
    accent: "bg-[linear-gradient(135deg,rgba(96,165,250,0.24),rgba(125,211,252,0.08))]",
  },
  warning: {
    glow: "from-amber-300/22 via-amber-200/10 to-transparent",
    badge: "border-amber-300/18 bg-amber-400/12 text-amber-100",
    accent: "bg-[linear-gradient(135deg,rgba(251,191,36,0.22),rgba(253,224,71,0.08))]",
  },
  danger: {
    glow: "from-rose-300/22 via-orange-200/10 to-transparent",
    badge: "border-rose-300/18 bg-rose-400/12 text-rose-100",
    accent: "bg-[linear-gradient(135deg,rgba(244,63,94,0.22),rgba(251,146,60,0.08))]",
  },
  info: {
    glow: "from-cyan-300/22 via-blue-300/10 to-transparent",
    badge: "border-cyan-300/18 bg-cyan-400/12 text-cyan-100",
    accent: "bg-[linear-gradient(135deg,rgba(125,211,252,0.22),rgba(96,165,250,0.08))]",
  },
} as const;

export type StatCardTone = keyof typeof toneMap;

export function StatCard({
  title,
  value,
  description,
  meta,
  tone = "default",
  className,
}: {
  title: string;
  value: string;
  description: string;
  meta?: string;
  tone?: StatCardTone;
  className?: string;
}) {
  const styles = toneMap[tone];

  return (
    <Card className={cn("relative h-full overflow-hidden", className)}>
      <div className={cn("pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-r opacity-95", styles.glow)} />
      <div className={cn("pointer-events-none absolute right-4 top-4 h-16 w-16 rounded-full blur-2xl", styles.accent)} />

      <CardHeader className="gap-3">
        <div className="flex items-start justify-between gap-3">
          <CardDescription className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
            {title}
          </CardDescription>

          {meta ? (
            <span
              className={cn(
                "rounded-full border px-3 py-1 text-[11px] font-medium shadow-[0_10px_22px_-18px_rgba(2,8,23,0.48)]",
                styles.badge,
              )}
            >
              {meta}
            </span>
          ) : null}
        </div>
      </CardHeader>

      <CardContent className="relative flex h-full flex-col justify-between gap-5">
        <div>
          <p className="text-3xl font-semibold leading-none tracking-tight text-slate-50 md:text-[2rem]">
            {value}
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}