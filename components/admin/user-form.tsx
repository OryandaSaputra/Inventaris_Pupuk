"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ShieldCheck, UserPlus, X } from "lucide-react";
import { saveUserAction } from "@/lib/actions/user-management";
import { initialActionState } from "@/lib/actions/shared";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormMessage } from "@/components/ui/form-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import type { UserTableRow } from "@/components/admin/user-table";

const ROLE_OPTIONS = [
  { value: "ADMIN", label: "Asisten Pemupukan (Admin)" },
  { value: "KRANI_TANAMAN", label: "Krani Tanaman" },
  { value: "KRANI_KEBUN", label: "Krani Kebun" },
] as const;

const STATUS_OPTIONS = [
  { value: "AKTIF", label: "Aktif" },
  { value: "TIDAK_AKTIF", label: "Tidak Aktif" },
] as const;

function getFieldError(
  errors: Record<string, string[]> | undefined,
  fieldName: string,
) {
  return errors?.[fieldName]?.[0];
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs font-medium text-rose-500">{message}</p>;
}

function TextField({
  id,
  name,
  label,
  type = "text",
  autoComplete,
  error,
  defaultValue,
  required = true,
  placeholder,
  description,
}: {
  id: string;
  name: string;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  autoComplete?: string;
  error?: string;
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
  description?: string;
}) {
  return (
    <div className="field-stack">
      <Label htmlFor={id}>{label}</Label>
      {description ? (
        <p className="text-xs leading-5 text-slate-500">{description}</p>
      ) : null}
      <Input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={Boolean(error)}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={
          error
            ? "border-rose-300/60 focus-visible:border-rose-400/60 focus-visible:ring-rose-400/12"
            : ""
        }
      />
      <FieldError message={error} />
    </div>
  );
}

type GardenOption = {
  value: string;
  label: string;
};

export function UserForm({
  selectedUser,
  gardenOptions,
  onSaved,
  onCancelEdit,
}: {
  selectedUser: UserTableRow | null;
  gardenOptions: GardenOption[];
  onSaved: () => void;
  onCancelEdit: () => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const isEditing = Boolean(selectedUser);

  const [role, setRole] = useState<
    "ADMIN" | "KRANI_TANAMAN" | "KRANI_KEBUN"
  >(selectedUser?.role ?? "KRANI_TANAMAN");

  const [state, formAction, pending] = useActionState(
    saveUserAction,
    initialActionState,
  );

  useEffect(() => {
    if (!state.success) return;

    formRef.current?.reset();
    onSaved();
    router.refresh();
  }, [onSaved, router, state.success]);

  return (
    <Card className="glass-surface-strong rounded-[2rem]">
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/70 bg-white/72 text-emerald-700">
            {isEditing ? <ShieldCheck className="h-5 w-5" /> : <UserPlus className="h-5 w-5" />}
          </div>
          <div>
            <CardTitle>{isEditing ? "Edit Pengguna" : "Tambah Pengguna"}</CardTitle>
            <CardDescription>
              Tentukan identitas akun, role, status aktif, dan kebun akses.
              Fitur yang benar-benar muncul tetap mengikuti pengaturan role permission.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form ref={formRef} action={formAction} className="space-y-5">
          {selectedUser ? <input type="hidden" name="id" value={selectedUser.id} /> : null}

          <section className="rounded-[1.8rem] border border-white/70 bg-white/62 p-4 md:p-5">
            <p className="page-eyebrow">Identitas Akun</p>
            <h3 className="mt-3 text-base font-semibold text-slate-900">
              {isEditing ? "Perbarui akun pengguna" : "Buat akun pengguna baru"}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Nama, email, dan password dipakai untuk login ke sistem.
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <TextField
                id="name"
                name="name"
                label="Nama pengguna"
                autoComplete="name"
                defaultValue={selectedUser?.name}
                error={getFieldError(state.errors, "name")}
                placeholder="Masukkan nama pengguna"
              />

              <TextField
                id="email"
                name="email"
                label="Email"
                type="email"
                autoComplete="email"
                defaultValue={selectedUser?.email}
                error={getFieldError(state.errors, "email")}
                placeholder="contoh@email.com"
              />

              <div className="md:col-span-2">
                <TextField
                  id="password"
                  name="password"
                  label={isEditing ? "Password baru (opsional)" : "Password"}
                  type="password"
                  autoComplete={isEditing ? "current-password" : "new-password"}
                  required={!isEditing}
                  error={getFieldError(state.errors, "password")}
                  placeholder={
                    isEditing
                      ? "Kosongkan jika tidak ingin mengubah password"
                      : "Minimal 6 karakter"
                  }
                />
              </div>
            </div>
          </section>

          <section className="rounded-[1.8rem] border border-white/70 bg-white/62 p-4 md:p-5">
            <p className="page-eyebrow">Role & Status</p>
            <h3 className="mt-3 text-base font-semibold text-slate-900">
              Pengaturan akses dasar
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Role menentukan kelompok akses besar, sedangkan kebun membatasi ruang kerja user non-admin.
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="field-stack">
                <Label htmlFor="status">Status</Label>
                <Select
                  id="status"
                  name="status"
                  defaultValue={selectedUser?.isActive ? "AKTIF" : "TIDAK_AKTIF"}
                  required
                  aria-invalid={Boolean(getFieldError(state.errors, "status"))}
                  className={
                    getFieldError(state.errors, "status")
                      ? "border-rose-300/60 focus:border-rose-400/60 focus:ring-rose-400/12"
                      : ""
                  }
                >
                  {STATUS_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
                <FieldError message={getFieldError(state.errors, "status")} />
              </div>

              <div className="field-stack">
                <Label htmlFor="role">Role</Label>
                <Select
                  id="role"
                  name="role"
                  defaultValue={selectedUser?.role ?? "KRANI_TANAMAN"}
                  required
                  aria-invalid={Boolean(getFieldError(state.errors, "role"))}
                  onChange={(event) =>
                    setRole(
                      event.target.value as
                        | "ADMIN"
                        | "KRANI_TANAMAN"
                        | "KRANI_KEBUN",
                    )
                  }
                  className={
                    getFieldError(state.errors, "role")
                      ? "border-rose-300/60 focus:border-rose-400/60 focus:ring-rose-400/12"
                      : ""
                  }
                >
                  {ROLE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
                <FieldError message={getFieldError(state.errors, "role")} />
              </div>

              <div className="field-stack md:col-span-2">
                <Label htmlFor="assignedGardenId">Kebun Akses</Label>
                <Select
                  id="assignedGardenId"
                  name="assignedGardenId"
                  defaultValue={selectedUser?.assignedGardenId ?? ""}
                  disabled={role === "ADMIN"}
                  required={role !== "ADMIN"}
                  aria-invalid={Boolean(getFieldError(state.errors, "assignedGardenId"))}
                  className={
                    getFieldError(state.errors, "assignedGardenId")
                      ? "border-rose-300/60 focus:border-rose-400/60 focus:ring-rose-400/12"
                      : ""
                  }
                >
                  <option value="">
                    {role === "ADMIN"
                      ? "Admin dapat mengakses seluruh kebun"
                      : "Pilih kebun yang boleh diakses"}
                  </option>
                  {gardenOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>

                <p className="text-xs leading-5 text-slate-500">
                  {role === "ADMIN"
                    ? "Role admin tidak dibatasi ke satu kebun."
                    : "User krani hanya dapat melihat dan menginput data sesuai kebun ini, dan tetap mengikuti izin fitur pada role."}
                </p>

                <FieldError message={getFieldError(state.errors, "assignedGardenId")} />
              </div>
            </div>
          </section>

          <div className="rounded-2xl border border-sky-200/80 bg-sky-500/10 px-4 py-3 text-sm leading-6 text-sky-900/85">
            Menu, halaman, dan batas aksi user akan mengikuti{" "}
            <strong>pengaturan role permission</strong> pada panel di bawah tabel user.
          </div>

          <div className="space-y-3">
            <FormMessage message={state.message} success={state.success} />

            <div className="flex flex-wrap gap-2">
              <Button type="submit" variant="primary" disabled={pending}>
                <Save className="mr-2 h-4 w-4" />
                {pending
                  ? "Menyimpan..."
                  : isEditing
                    ? "Simpan Perubahan"
                    : "Tambah Pengguna"}
              </Button>

              {isEditing ? (
                <Button type="button" variant="outline" onClick={onCancelEdit}>
                  <X className="mr-2 h-4 w-4" />
                  Batal Edit
                </Button>
              ) : null}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}