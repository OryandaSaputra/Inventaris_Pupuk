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

          <aside className="absolute left-0 top-0 flex h-full w-[min(88vw,23rem)] flex-col border-r border-white/10 bg-[linear-gradient(180deg,rgba(8,18,36,0.96),rgba(6,14,28,0.92))] p-4 shadow-2xl backdrop-blur-[34px]">
            <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(14,27,52,0.82),rgba(9,20,40,0.74))] p-4 shadow-[0_24px_70px_-40px_rgba(2,8,23,0.72)]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(96,165,250,0.22),rgba(59,130,246,0.1))] shadow-[0_18px_30px_-22px_rgba(59,130,246,0.42)]">
                    <Image
                      src="/logo.png"
                      alt="Logo PTPN IV Regional III"
                      fill
                      priority
                      unoptimized
                      sizes="48px"
                      className="object-contain p-2"
                    />
                  </div>

                  <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-100/80">
                    PTPN IV Regional III
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-slate-50">
                    {getPanelTitle(role)}
                  </h2>
                  <p className="mt-1 text-sm text-slate-300">
                    {getRoleLabel(role)}
                  </p>
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

            <div className="scrollbar-hidden mt-4 min-h-0 flex-1 overflow-y-auto pb-4">
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
