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
        <div className="flex h-full min-h-0 flex-col gap-5">
          <div className="sidebar-panel">
            <div className="relative inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-[1.35rem] border border-white/12 bg-[linear-gradient(135deg,rgba(96,165,250,0.22),rgba(59,130,246,0.12))] shadow-[0_18px_34px_-24px_rgba(59,130,246,0.46)]">
              <Image
                src="/logo.png"
                alt="Logo PTPN IV Regional III"
                fill
                priority
                unoptimized
                sizes="64px"
                className="object-contain p-2.5"
              />
            </div>

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-100/80">
              PTPN IV Regional III
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-50">
              {getPanelTitle(role)}
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              {getRoleLabel(role)}
            </p>
          </div>

          <div className="scrollbar-hidden min-h-0 flex-1 overflow-y-auto pr-1">
            <SidebarNav
              role={role}
              pathname={pathname}
              permission={permission}
              variant="desktop"
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
