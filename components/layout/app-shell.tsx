import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { LogOut, Sparkles } from "lucide-react";
import { signOut } from "@/auth";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { Sidebar } from "@/components/layout/sidebar";
import {
  getRoleLabel,
  type AppUserRole,
} from "@/components/layout/navigation-config";
import { Button } from "@/components/ui/button";
import { getCurrentUserAccess } from "@/lib/session";
import {
  canAccessFeature,
  getFirstAllowedPath,
  getRouteFeatureKey,
} from "@/lib/permissions";

async function logoutAction() {
  "use server";
  await signOut({ redirectTo: "/login" });
}

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
    <div className="min-h-screen text-slate-100 lg:grid lg:grid-cols-[18.5rem_minmax(0,1fr)] xl:grid-cols-[19.5rem_minmax(0,1fr)]">
      <Sidebar role={role} pathname={pathname} permission={permission} />

      <main className="shell-main">
        <div className="shell-stage">
          <div className="mx-auto flex w-full max-w-[1600px] min-w-0 flex-col gap-4 md:gap-6">
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
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-blue-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-100 shadow-[0_12px_26px_-22px_rgba(59,130,246,0.52)]">
                    <Sparkles className="h-3.5 w-3.5 text-blue-200" />
                    Inventaris Pasokan Pupuk
                  </div>

                  <h2 className="mt-3 truncate text-xl font-semibold text-slate-50 sm:text-2xl md:text-[2rem]">
                    {displayName}
                  </h2>
                  <p className="mt-1 text-sm text-slate-300">{getRoleLabel(role)}</p>
                </div>
              </div>

              <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:min-w-[230px] sm:items-end">
                <form action={logoutAction} className="w-full sm:w-auto">
                  <Button variant="outline" type="submit" className="w-full sm:w-auto">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </form>
              </div>
            </header>

            {children}
          </div>
        </div>
      </main>
    </div>
  );
}