import Image from "next/image";
import { cn } from "@/lib/utils";

type LoadingScreenProps = {
  message?: string;
  description?: string;
  fullscreen?: boolean;
  className?: string;
};

export function LoadingScreen({
  message = "Memproses permintaan...",
  description = "Mohon tunggu sebentar, sistem sedang menyiapkan data terbaru.",
  fullscreen = true,
  className,
}: LoadingScreenProps) {
  const content = (
    <div
      className={cn(
        "relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(9,20,39,0.96),rgba(6,14,28,0.92))] p-6 shadow-[0_40px_120px_-50px_rgba(2,8,23,0.95)] backdrop-blur-[34px] sm:p-7",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-x-12 top-0 h-28 rounded-full bg-sky-400/18 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-0 h-32 w-32 rounded-full bg-blue-500/18 blur-3xl" />
      <div className="pointer-events-none absolute -left-10 bottom-0 h-28 w-28 rounded-full bg-cyan-300/14 blur-3xl" />

      <div className="relative flex flex-col items-center gap-5 text-center">
        <div className="relative flex h-30 w-30 items-center justify-center sm:h-32 sm:w-32">
          <div className="loading-screen-orbit absolute inset-0 rounded-full border border-sky-300/18" />
          <div className="absolute inset-[12%] rounded-full border border-white/8" />
          <div className="absolute inset-[22%] rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.18),transparent_68%)] blur-2xl" />

          <div className="relative inline-flex h-24 w-24 items-center justify-center rounded-[1.8rem] border border-white/14 bg-[linear-gradient(180deg,rgba(13,25,49,0.95),rgba(9,19,38,0.88))] shadow-[0_26px_56px_-30px_rgba(59,130,246,0.52)] sm:h-26 sm:w-26">
            <div className="absolute inset-[0.32rem] rounded-[1.45rem] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.12),transparent_46%),linear-gradient(180deg,rgba(10,22,43,0.84),rgba(7,17,34,0.76))]" />
            <Image
              src="/logo.png"
              alt="Logo aplikasi"
              fill
              priority
              unoptimized
              sizes="104px"
              className="relative z-10 object-contain p-3"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/14 bg-sky-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-100">
            Sistem Inventaris Pupuk
          </div>
          <h2 className="text-xl font-semibold text-slate-50 sm:text-[1.45rem]">
            {message}
          </h2>
          <p className="mx-auto max-w-sm text-sm leading-6 text-slate-300">
            {description}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="loading-screen-dot" />
          <span className="loading-screen-dot" />
          <span className="loading-screen-dot" />
        </div>
      </div>
    </div>
  );

  if (!fullscreen) {
    return content;
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/72 px-4 backdrop-blur-xl">
      {content}
    </div>
  );
}