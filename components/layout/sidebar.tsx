import Image from "next/image";
import {
  getPanelTitle,
  getRoleLabel,
  type AppUserRole,
} from "@/components/layout/navigation-config";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import type { ResolvedRolePermission } from "@/lib/permissions";

export function Sidebar({
  role,
  pathname,
  permission,
}: {
  role: AppUserRole;
  pathname: string;
  permission: ResolvedRolePermission;
}) {
  return (
    <aside className="sidebar-shell">
      <div className="sidebar-frame">
        <div className="flex h-full min-h-0 flex-col">
          <div className="sidebar-panel">
            <div className="flex items-start gap-3.5">
              <div className="relative inline-flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[1.1rem] border border-white/12 bg-[linear-gradient(135deg,rgba(59,130,246,0.24),rgba(37,99,235,0.12))] shadow-[0_18px_30px_-24px_rgba(59,130,246,0.35)]">
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

              <div className="min-w-0 flex-1 pt-0.5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-300">
                  PT Perkebunan
                </p>
                <h1 className="mt-1 text-sm font-semibold leading-[1.15] text-slate-50 xl:text-[15px]">
                  Nusantara IV
                </h1>
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

          <div className="mt-5 flex min-h-0 flex-1 flex-col">
            <div className="flex items-center justify-between px-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                Menu Navigasi
              </p>
              <span className="h-px w-14 rounded-full bg-white/8" />
            </div>

            <div className="scrollbar-hidden mt-3 min-h-0 flex-1 overflow-y-auto pr-1">
              <SidebarNav
                role={role}
                pathname={pathname}
                permission={permission}
                variant="desktop"
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}