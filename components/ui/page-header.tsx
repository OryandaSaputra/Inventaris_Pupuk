import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "page-header flex min-w-0 flex-col gap-4 md:flex-row md:items-start md:justify-between",
        className,
      )}
    >
      <div className="min-w-0">
        {eyebrow ? <p className="page-eyebrow">{eyebrow}</p> : null}
        <h1 className="page-title">{title}</h1>
        {description ? <p className="page-description">{description}</p> : null}
      </div>

      {action ? (
        <div className="w-full shrink-0 rounded-3xl border border-white/10 bg-white/6 p-2 backdrop-blur-xl md:w-auto md:min-w-[220px] md:bg-white/8">
          {action}
        </div>
      ) : null}
    </section>
  );
}