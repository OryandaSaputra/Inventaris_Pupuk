import { ShieldCheck, Trees, UserCog, Users } from "lucide-react";
import { RolePermissionManager } from "@/components/admin/role-permission-manager";
import { UserManagement } from "@/components/admin/user-management";
import { StatCard } from "@/components/dashboard/stat-card";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { requireFeatureAccess } from "@/lib/auth-guards";
import { getRolePermissionRows } from "@/lib/data/role-permissions";
import { getUserManagementData } from "@/lib/data/user-management";
import { ADMIN_ROUTES } from "@/lib/routes";

function InfoCard({
  title,
  value,
  description,
  icon: Icon,
  tone = "default",
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tone?: "default" | "success" | "warning" | "info";
}) {
  const toneClassName =
    tone === "success"
      ? "border-emerald-200/80 bg-emerald-500/[0.08]"
      : tone === "warning"
        ? "border-amber-200/80 bg-amber-500/[0.08]"
        : tone === "info"
          ? "border-sky-200/80 bg-sky-500/[0.08]"
          : "border-white/70 bg-white/62";

  return (
    <div className={`rounded-3xl border p-4 shadow-[0_20px_36px_-30px_rgba(15,56,45,0.24)] ${toneClassName}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
            {title}
          </p>
          <p className="mt-2 text-xl font-semibold text-slate-900">{value}</p>
        </div>

        <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/70 bg-white/72 text-slate-800">
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}

export default async function UsersPage() {
  await requireFeatureAccess(
    "canAccessUserManagement",
    "Tidak memiliki akses ke manajemen pengguna.",
  );

  const [{ rows, gardenOptions }, permissionRows] = await Promise.all([
    getUserManagementData(),
    getRolePermissionRows(),
  ]);

  const totalUsers = rows.length;
  const activeUsers = rows.filter((row) => row.isActive).length;
  const adminUsers = rows.filter((row) => row.role === "ADMIN").length;
  const kraniTanamanUsers = rows.filter(
    (row) => row.role === "KRANI_TANAMAN",
  ).length;
  const kraniKebunUsers = rows.filter(
    (row) => row.role === "KRANI_KEBUN",
  ).length;
  const scopedUsers = rows.filter((row) => row.role !== "ADMIN").length;

  return (
    <AppShell pathname={ADMIN_ROUTES.users}>
      <div className="app-page">
        <PageHeader
          eyebrow="Hak Akses"
          title="Manajemen Pengguna & Role Permission"
          description="Atur user, role, kebun akses, serta hak fitur setiap role agar dashboard dan aksi user benar-benar terkendali dan mudah diaudit."
        />

        <section>
          <Card className="relative overflow-hidden border-white/65 bg-white/62 shadow-[0_30px_90px_-42px_rgba(15,56,45,0.3)] backdrop-blur-[30px]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.16),transparent_28%),radial-gradient(circle_at_center_right,rgba(250,204,21,0.12),transparent_18%)]" />

            <CardContent className="relative min-w-0 p-5 md:p-6 xl:p-7">
              <div className="grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,0.95fr)]">
                <div className="space-y-5">
                  <div className="max-w-3xl">
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-800">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Workspace kontrol akses
                    </div>

                    <h2 className="mt-4 text-2xl font-semibold leading-tight text-slate-900 md:text-3xl xl:text-[2.15rem]">
                      Hak akses kini lebih mudah dipahami lewat pemisahan yang
                      jelas antara data user dan aturan role.
                    </h2>

                    <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                      Halaman ini menggabungkan dua kebutuhan penting:
                      pengelolaan akun pengguna dan pengaturan kemampuan tiap
                      role, termasuk pembatasan kebun dan fitur yang boleh
                      diakses.
                    </p>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    <InfoCard
                      title="Total User"
                      value={String(totalUsers)}
                      description="Jumlah seluruh akun yang tercatat pada sistem."
                      icon={Users}
                      tone="info"
                    />
                    <InfoCard
                      title="User Aktif"
                      value={String(activeUsers)}
                      description="Akun yang bisa login dan memakai fitur."
                      icon={UserCog}
                      tone="success"
                    />
                    <InfoCard
                      title="Terikat Kebun"
                      value={String(scopedUsers)}
                      description="User non-admin yang dibatasi ke kebun tertentu."
                      icon={Trees}
                      tone="warning"
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  <div className="rounded-3xl border border-emerald-200/80 bg-emerald-500/[0.08] p-4">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-slate-600">
                      Asisten Pemupukan
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      {adminUsers}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Role utama untuk pengelolaan sistem.
                    </p>
                  </div>

                  <div className="rounded-3xl border border-sky-200/80 bg-sky-500/[0.08] p-4">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-slate-600">
                      Krani Tanaman
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      {kraniTanamanUsers}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Role operasional dengan akses dashboard krani.
                    </p>
                  </div>

                  <div className="rounded-3xl border border-amber-200/80 bg-amber-500/[0.08] p-4 sm:col-span-2 xl:col-span-1">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-slate-600">
                      Krani Kebun
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      {kraniKebunUsers}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Role lapangan yang fokus ke penerimaan pupuk.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="data-grid md:grid-cols-2 xl:grid-cols-5">
          <StatCard
            title="Total Pengguna"
            value={String(totalUsers)}
            description="Jumlah seluruh akun yang terdaftar."
            meta="Semua role"
            tone="info"
          />
          <StatCard
            title="Pengguna Aktif"
            value={String(activeUsers)}
            description="Akun aktif bisa login dan menggunakan fitur."
            meta={`${totalUsers - activeUsers} nonaktif`}
            tone="success"
          />
          <StatCard
            title="Asisten Pemupukan"
            value={String(adminUsers)}
            description="Pengelola sistem dan konfigurasi utama."
            meta="Role admin"
            tone="warning"
          />
          <StatCard
            title="Krani Tanaman"
            value={String(kraniTanamanUsers)}
            description="Role operasional dengan dashboard krani."
            meta="Per kebun"
            tone="info"
          />
          <StatCard
            title="Krani Kebun"
            value={String(kraniKebunUsers)}
            description="Role operasional yang lebih sempit."
            meta="Per kebun"
            tone="warning"
          />
        </section>

        <RolePermissionManager rows={permissionRows} />
        <UserManagement rows={rows} gardenOptions={gardenOptions} />
      </div>
    </AppShell>
  );
}