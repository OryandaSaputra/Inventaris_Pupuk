import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { Sparkles } from "lucide-react";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { Sidebar } from "@/components/layout/sidebar";
import { LogoutButton } from "@/components/layout/logout-button";
import {
  getRoleLabel,
  type AppUserRole,
} from "@/components/layout/navigation-config";
import { getCurrentUserAccess } from "@/lib/session";
import {
  canAccessFeature,
  getFirstAllowedPath,
  getRouteFeatureKey,
} from "@/lib/permissions";

export async function AppShell({
  children,
  pathname,
}: {
  children: ReactNode;
  pathname: string;
}) {
  const { user, permission } = await getCurrentUserAccess();

  if (!user || !permission) {
    redirect("/login");
  }

  const role = user.role as AppUserRole;
  const routeFeature = getRouteFeatureKey(pathname);

  if (routeFeature && !canAccessFeature(permission, routeFeature)) {
    redirect(getFirstAllowedPath(role, permission));
  }

  const displayName = user.name?.trim() || user.email || "Pengguna";

  return (
    <div className="min-h-screen text-slate-100 lg:grid lg:grid-cols-[17.25rem_minmax(0,1fr)] xl:grid-cols-[18rem_minmax(0,1fr)]">
      <Sidebar role={role} pathname={pathname} permission={permission} />

      <main className="shell-main">
        <div className="shell-stage">
          <div className="mx-auto flex w-full max-w-[1500px] min-w-0 flex-col gap-4 md:gap-6">
            <header className="shell-header">
              <div className="flex min-w-0 flex-1 items-start gap-3 sm:gap-4">
                <div className="pt-0.5 lg:hidden">
                  <MobileSidebar
                    role={role}
                    pathname={pathname}
                    permission={permission}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-emerald-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-100 shadow-[0_12px_26px_-22px_rgba(16,185,129,0.38)]">
                    <Sparkles className="h-3.5 w-3.5 text-emerald-200" />
                    Sistem Inventaris Pupuk
                  </div>

                  <h2 className="mt-2 truncate text-lg font-semibold text-slate-50 sm:text-xl md:text-[1.7rem]">
                    {displayName}
                  </h2>
                  <p className="mt-1 text-sm text-slate-300">
                    {getRoleLabel(role)}
                  </p>
                </div>
              </div>

              <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:items-end">
                <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.03] p-1.5 shadow-[0_18px_40px_-26px_rgba(2,8,23,0.74)]">
                  <LogoutButton />
                </div>
              </div>
            </header>

            {children}
          </div>
        </div>
      </main>
    </div>
  );
}