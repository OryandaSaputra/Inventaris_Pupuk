"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutPanelTop,
  LockKeyhole,
  Save,
  ShieldCheck,
  Trees,
} from "lucide-react";
import type { UserRole } from "@/src/generated/prisma";
import { saveRolePermissionAction } from "@/lib/actions/role-permissions";
import { initialActionState } from "@/lib/actions/shared";
import {
  GARDEN_SCOPE_OPTIONS,
  ROLE_PERMISSION_FEATURES,
  countEnabledFeatures,
  type ResolvedRolePermission,
  type FeaturePermissionKey,
} from "@/lib/permissions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormMessage } from "@/components/ui/form-message";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

function getRoleLabel(role: UserRole) {
  switch (role) {
    case "ADMIN":
      return "Asisten Pemupukan (Admin)";
    case "KRANI_TANAMAN":
      return "Krani Tanaman";
    case "KRANI_KEBUN":
      return "Krani Kebun";
    default:
      return role;
  }
}

function getRoleDescription(role: UserRole) {
  switch (role) {
    case "ADMIN":
      return "Role utama untuk pengelolaan sistem, pasokan, data master, dan user.";
    case "KRANI_TANAMAN":
      return "Role operasional dengan dashboard krani dan penerimaan pupuk.";
    case "KRANI_KEBUN":
      return "Role lapangan dengan fokus pada penerimaan pupuk.";
    default:
      return "-";
  }
}

function getVisibleFeatures(role: UserRole): FeaturePermissionKey[] {
  if (role === "ADMIN") {
    return [
      "canAccessAdminHome",
      "canAccessSupplyInput",
      "canAccessSupplyList",
      "canAccessMasterGardens",
      "canAccessMasterFertilizers",
      "canAccessMasterSuppliers",
      "canAccessSupplierInformation",
      "canAccessUserManagement",
    ];
  }

  if (role === "KRANI_TANAMAN") {
    return ["canAccessKraniHome", "canAccessDeliveryWorkspace"];
  }

  return ["canAccessDeliveryWorkspace"];
}

function PermissionCheckbox({
  name,
  label,
  description,
  defaultChecked,
}: {
  name: string;
  label: string;
  description: string;
  defaultChecked: boolean;
}) {
  return (
    <label className="flex items-start gap-3 rounded-2xl border border-white/65 bg-white/72 p-3 transition hover:bg-white/84">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-400"
      />
      <div>
        <p className="text-sm font-medium text-slate-900">{label}</p>
        <p className="mt-1 text-xs leading-5 text-slate-600">{description}</p>
      </div>
    </label>
  );
}

function ScopeField({
  id,
  label,
  description,
  defaultValue,
}: {
  id: string;
  label: string;
  description: string;
  defaultValue: "NONE" | "ASSIGNED" | "ALL";
}) {
  return (
    <div className="field-stack">
      <Label htmlFor={id}>{label}</Label>
      <Select id={id} name={id} defaultValue={defaultValue} required>
        {GARDEN_SCOPE_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      <p className="text-xs leading-5 text-slate-500">{description}</p>
    </div>
  );
}

function RolePermissionCard({ row }: { row: ResolvedRolePermission }) {
  const router = useRouter();
  const visibleFeatures = getVisibleFeatures(row.role);

  const [state, formAction, pending] = useActionState(
    saveRolePermissionAction.bind(null, row.role),
    initialActionState,
  );

  useEffect(() => {
    if (!state.success) return;
    router.refresh();
  }, [router, state.success]);

  return (
    <Card className="glass-surface-strong rounded-[2rem]">
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <CardTitle>{getRoleLabel(row.role)}</CardTitle>
            <CardDescription>{getRoleDescription(row.role)}</CardDescription>
          </div>

          <div className="inline-flex rounded-full border border-sky-200/80 bg-sky-500/10 px-3 py-1.5 text-xs text-sky-900/80">
            {countEnabledFeatures(row)} fitur aktif
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form action={formAction} className="space-y-5">
          <div className="rounded-[1.8rem] border border-white/70 bg-white/62 p-4 md:p-5">
            <div className="mb-4 flex items-start gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/70 bg-white/72 text-emerald-700">
                <Trees className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  Scope Akses Kebun
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Tentukan batas data kebun yang boleh dilihat, diedit, atau dihapus.
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <ScopeField
                id="gardenViewScope"
                label="Scope Lihat Kebun"
                description="Data kebun mana yang boleh dibaca oleh role ini."
                defaultValue={row.gardenViewScope}
              />
              <ScopeField
                id="gardenEditScope"
                label="Scope Edit Kebun"
                description="Data kebun mana yang boleh diubah oleh role ini."
                defaultValue={row.gardenEditScope}
              />
              <ScopeField
                id="gardenDeleteScope"
                label="Scope Hapus Kebun"
                description="Data kebun mana yang boleh dihapus oleh role ini."
                defaultValue={row.gardenDeleteScope}
              />
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-white/70 bg-white/62 p-4 md:p-5">
            <div className="mb-4 flex items-start gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/70 bg-white/72 text-sky-700">
                <LayoutPanelTop className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  Fitur yang Diizinkan
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Sidebar, halaman, dan aksi backend akan mengikuti pengaturan di bawah.
                </p>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {ROLE_PERMISSION_FEATURES.filter((item) =>
                visibleFeatures.includes(item.key),
              ).map((item) => (
                <PermissionCheckbox
                  key={`${row.role}-${item.key}`}
                  name={item.key}
                  label={item.label}
                  description={item.description}
                  defaultChecked={Boolean(row[item.key])}
                />
              ))}
            </div>
          </div>

          {row.role === "ADMIN" ? (
            <div className="rounded-2xl border border-amber-200/80 bg-amber-500/10 px-4 py-3 text-sm leading-6 text-amber-900/85">
              Role admin tetap harus mempertahankan akses ke{" "}
              <strong>Home Admin</strong> dan <strong>Hak Akses User</strong>
              agar sistem selalu bisa dikelola.
            </div>
          ) : (
            <div className="rounded-2xl border border-white/65 bg-white/72 px-4 py-3 text-sm leading-6 text-slate-600">
              Akses fitur krani tetap mengikuti kombinasi role, penugasan kebun,
              dan pengaturan scope yang Anda tetapkan di sini.
            </div>
          )}

          <div className="space-y-3">
            <FormMessage message={state.message} success={state.success} />

            <Button type="submit" variant="primary" disabled={pending}>
              <Save className="mr-2 h-4 w-4" />
              {pending ? "Menyimpan..." : "Simpan Hak Akses Role"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export function RolePermissionManager({
  rows,
}: {
  rows: ResolvedRolePermission[];
}) {
  return (
    <section className="space-y-4">
      <div className="rounded-[2rem] border border-white/65 bg-white/60 p-5 shadow-[0_24px_64px_-36px_rgba(15,56,45,0.22)] backdrop-blur-2xl">
        <div className="flex items-start gap-3">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/70 bg-white/72 text-emerald-700">
            <LockKeyhole className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Pengaturan Hak Akses Role
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Atur fitur yang boleh dipakai serta batas kebun untuk setiap role
              agar kontrol akses lebih rapi dan mudah ditelusuri.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {rows.map((row) => (
          <RolePermissionCard key={row.role} row={row} />
        ))}
      </div>
    </section>
  );
}