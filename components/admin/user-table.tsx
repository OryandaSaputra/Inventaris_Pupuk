"use client";

import { useMemo, useState } from "react";
import type { UserRole } from "@/src/generated/prisma";
import { UserRound } from "lucide-react";
import { UserStatusBadge } from "@/components/admin/user-status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SortableTableHead } from "@/components/ui/sortable-table-head";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getNextSortState,
  sortRows,
  type SortState,
} from "@/lib/table-sort";
import { formatDate } from "@/lib/utils";

export type UserTableRow = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  assignedGardenId: string | null;
  assignedGardenName: string | null;
  assignedGardenCode: string | null;
};

type UserSortKey =
  | "name"
  | "email"
  | "role"
  | "garden"
  | "summary"
  | "status"
  | "createdAt";

function getRoleLabel(role: UserRole) {
  switch (role) {
    case "ADMIN":
      return "Asisten Pemupukan";
    case "KRANI_TANAMAN":
      return "Krani Tanaman";
    case "KRANI_KEBUN":
      return "Krani Kebun";
    default:
      return role;
  }
}

function getRoleSummary(row: UserTableRow) {
  if (row.role === "ADMIN") {
    return "Fitur mengikuti pengaturan role Admin dan pada umumnya dapat mencakup seluruh kebun.";
  }

  if (!row.assignedGardenName) {
    return "Belum ada kebun yang ditugaskan.";
  }

  return `Fitur mengikuti pengaturan role ${getRoleLabel(
    row.role,
  )} dan dibatasi ke kebun ${row.assignedGardenCode ?? "-"} · ${
    row.assignedGardenName
  }.`;
}

function getGardenAccessLabel(row: UserTableRow) {
  if (row.role === "ADMIN") {
    return "Semua kebun";
  }

  if (!row.assignedGardenName) {
    return "-";
  }

  return `${row.assignedGardenCode ?? "-"} · ${row.assignedGardenName}`;
}

function RoleBadge({ role }: { role: UserRole }) {
  const className =
    role === "ADMIN"
      ? "border-emerald-200/80 bg-emerald-500/10 text-emerald-800"
      : role === "KRANI_TANAMAN"
        ? "border-sky-200/80 bg-sky-500/10 text-sky-800"
        : "border-amber-200/80 bg-amber-500/10 text-amber-800";

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${className}`}
    >
      {getRoleLabel(role)}
    </span>
  );
}

function UserMobileCard({
  row,
  onEdit,
  onDelete,
  deletingId,
}: {
  row: UserTableRow;
  onEdit: (row: UserTableRow) => void;
  onDelete: (row: UserTableRow) => void;
  deletingId?: string | null;
}) {
  return (
    <div className="rounded-3xl border border-white/65 bg-white/72 p-4 shadow-[0_18px_34px_-30px_rgba(15,56,45,0.18)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{row.name}</h3>
          <p className="mt-1 text-sm text-slate-600">{row.email}</p>
        </div>
        <UserStatusBadge isActive={row.isActive} />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/60 bg-white/70 px-3 py-3">
          <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
            Role
          </p>
          <div className="mt-2">
            <RoleBadge role={row.role} />
          </div>
        </div>

        <div className="rounded-2xl border border-white/60 bg-white/70 px-3 py-3">
          <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
            Kebun Akses
          </p>
          <p className="mt-2 text-sm font-medium text-slate-900">
            {getGardenAccessLabel(row)}
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-white/60 bg-white/70 px-3 py-3">
        <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
          Ringkasan Hak Akses
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-600">{getRoleSummary(row)}</p>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-xs text-slate-500">Dibuat {formatDate(row.createdAt)}</p>

        <div className="flex gap-2">
          <Button type="button" size="sm" variant="outline" onClick={() => onEdit(row)}>
            Edit
          </Button>
          <Button
            type="button"
            size="sm"
            variant="destructive"
            disabled={deletingId === row.id}
            onClick={() => onDelete(row)}
          >
            {deletingId === row.id ? "Menghapus..." : "Hapus"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function UserTable({
  rows,
  onEdit,
  onDelete,
  deletingId,
}: {
  rows: UserTableRow[];
  onEdit: (row: UserTableRow) => void;
  onDelete: (row: UserTableRow) => void;
  deletingId?: string | null;
}) {
  const [sortState, setSortState] = useState<SortState<UserSortKey>>(null);

  const sortedRows = useMemo(
    () =>
      sortRows(rows, sortState, {
        name: (row) => row.name,
        email: (row) => row.email,
        role: (row) => getRoleLabel(row.role),
        garden: (row) => getGardenAccessLabel(row),
        summary: (row) => getRoleSummary(row),
        status: (row) => row.isActive,
        createdAt: (row) => row.createdAt,
      }),
    [rows, sortState],
  );

  function toggleSort(key: UserSortKey) {
    setSortState((current) => getNextSortState(current, key));
  }

  return (
    <Card className="glass-surface rounded-[2rem]">
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/70 bg-white/72 text-sky-700">
            <UserRound className="h-5 w-5" />
          </div>
          <div>
            <CardTitle>Daftar Pengguna</CardTitle>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Klik judul kolom untuk mengurutkan user berdasarkan nama, role,
              kebun akses, status, atau tanggal dibuat.
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {sortedRows.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/65 bg-white/70 px-6 py-12 text-center">
            <p className="text-base font-medium text-slate-900">
              Belum ada user yang terdaftar.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Tambahkan akun baru dari panel form di sebelah kiri.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-3 xl:hidden">
              {sortedRows.map((row) => (
                <UserMobileCard
                  key={row.id}
                  row={row}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  deletingId={deletingId}
                />
              ))}
            </div>

            <div className="hidden overflow-x-auto xl:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <SortableTableHead
                      label="Nama"
                      isActive={sortState?.key === "name"}
                      direction={sortState?.key === "name" ? sortState.direction : undefined}
                      onClick={() => toggleSort("name")}
                    />
                    <SortableTableHead
                      label="Email"
                      isActive={sortState?.key === "email"}
                      direction={sortState?.key === "email" ? sortState.direction : undefined}
                      onClick={() => toggleSort("email")}
                    />
                    <SortableTableHead
                      label="Role"
                      isActive={sortState?.key === "role"}
                      direction={sortState?.key === "role" ? sortState.direction : undefined}
                      onClick={() => toggleSort("role")}
                    />
                    <SortableTableHead
                      label="Kebun Akses"
                      isActive={sortState?.key === "garden"}
                      direction={sortState?.key === "garden" ? sortState.direction : undefined}
                      onClick={() => toggleSort("garden")}
                    />
                    <SortableTableHead
                      label="Ringkasan Hak Akses"
                      isActive={sortState?.key === "summary"}
                      direction={sortState?.key === "summary" ? sortState.direction : undefined}
                      onClick={() => toggleSort("summary")}
                    />
                    <SortableTableHead
                      label="Status"
                      isActive={sortState?.key === "status"}
                      direction={sortState?.key === "status" ? sortState.direction : undefined}
                      onClick={() => toggleSort("status")}
                    />
                    <SortableTableHead
                      label="Dibuat"
                      isActive={sortState?.key === "createdAt"}
                      direction={sortState?.key === "createdAt" ? sortState.direction : undefined}
                      onClick={() => toggleSort("createdAt")}
                    />
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {sortedRows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="font-medium text-slate-900">
                        {row.name}
                      </TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>
                        <RoleBadge role={row.role} />
                      </TableCell>
                      <TableCell>{getGardenAccessLabel(row)}</TableCell>
                      <TableCell className="min-w-[280px] text-sm text-slate-600">
                        {getRoleSummary(row)}
                      </TableCell>
                      <TableCell>
                        <UserStatusBadge isActive={row.isActive} />
                      </TableCell>
                      <TableCell>{formatDate(row.createdAt)}</TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => onEdit(row)}
                          >
                            Edit
                          </Button>

                          <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            disabled={deletingId === row.id}
                            onClick={() => onDelete(row)}
                          >
                            {deletingId === row.id ? "Menghapus..." : "Hapus"}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}