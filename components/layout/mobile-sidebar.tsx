"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getPanelTitle,
  getRoleLabel,
  type AppUserRole,
} from "@/components/layout/navigation-config";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import type { ResolvedRolePermission } from "@/lib/permissions";

export function MobileSidebar({
  role,
  pathname,
  permission,
}: {
  role: AppUserRole;
  pathname: string;
  permission: ResolvedRolePermission;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="h-10 w-10 rounded-2xl border-white/12 bg-white/6 lg:hidden"
        aria-label="Buka menu navigasi"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Tutup menu navigasi"
            className="absolute inset-0 bg-slate-950/62 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <aside className="absolute left-0 top-0 flex h-full w-[min(84vw,21.5rem)] flex-col border-r border-white/10 bg-[linear-gradient(180deg,rgba(6,18,26,0.97),rgba(5,15,22,0.94))] p-4 shadow-2xl backdrop-blur-[34px]">
            <div className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(14,33,67,0.78),rgba(9,24,49,0.72))] p-4 shadow-[0_24px_70px_-40px_rgba(2,8,23,0.72)]">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-start gap-3">
                    <div className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[1rem] border border-white/10 bg-[linear-gradient(135deg,rgba(59,130,246,0.24),rgba(37,99,235,0.12))] shadow-[0_16px_28px_-22px_rgba(59,130,246,0.35)]">
                      <Image
                        src="/logo.png"
                        alt="Logo PTPN IV Regional III"
                        fill
                        priority
                        unoptimized
                        sizes="44px"
                        className="object-contain p-2"
                      />
                    </div>

                    <div className="min-w-0 flex-1 pt-0.5">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-300">
                        PT Perkebunan
                      </p>
                      <h2 className="mt-1 text-sm font-semibold leading-[1.15] text-slate-50">
                        Nusantara IV
                      </h2>
                      <p className="mt-1 text-xs text-slate-400">Regional III</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/10 pt-3">
                    <span className="inline-flex items-center rounded-full border border-sky-300/15 bg-sky-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-100">
                      {getPanelTitle(role)}
                    </span>
                    <span className="text-xs text-slate-300">{getRoleLabel(role)}</span>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-2xl text-slate-200"
                  aria-label="Tutup menu"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between px-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                Menu Navigasi
              </p>
              <span className="h-px w-14 rounded-full bg-white/8" />
            </div>

            <div className="scrollbar-hidden mt-3 min-h-0 flex-1 overflow-y-auto pb-4">
              <SidebarNav
                role={role}
                pathname={pathname}
                permission={permission}
                variant="mobile"
              />
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}