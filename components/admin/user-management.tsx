"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteUserAction } from "@/lib/actions/user-management";
import { UserForm } from "@/components/admin/user-form";
import { type UserTableRow, UserTable } from "@/components/admin/user-table";
import { useAppLoading } from "@/components/providers/app-loading-provider";
import {
  confirmDelete,
  showErrorToast,
  showSuccessToast,
} from "@/lib/feedback/sweet-alert";

type GardenOption = {
  value: string;
  label: string;
};

export function UserManagement({
  rows,
  gardenOptions,
}: {
  rows: UserTableRow[];
  gardenOptions: GardenOption[];
}) {
  const router = useRouter();
  const { withLoading } = useAppLoading();
  const [selectedUser, setSelectedUser] = useState<UserTableRow | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  function handleEdit(row: UserTableRow) {
    setSelectedUser(row);
  }

  function handleCancelEdit() {
    setSelectedUser(null);
  }

  function handleSaved() {
    setSelectedUser(null);
  }

  async function handleDelete(row: UserTableRow) {
    const confirmed = await confirmDelete({
      title: `Hapus user \"${row.name}\"?`,
      text: "Akun yang dihapus tidak dapat dipakai login lagi. Pastikan pengguna ini memang sudah tidak diperlukan.",
      confirmButtonText: "Ya, hapus user",
    });

    if (!confirmed) {
      return;
    }

    setDeletingId(row.id);

    try {
      const result = await withLoading(
        () => deleteUserAction(row.id),
        {
          message: "Menghapus pengguna...",
          description:
            "Mohon tunggu sebentar, sistem sedang memperbarui daftar user.",
        },
      );

      if (!result.success) {
        void showErrorToast(result.message, "Gagal menghapus user");
        return;
      }

      void showSuccessToast(result.message, "User dihapus");

      if (selectedUser?.id === row.id) {
        setSelectedUser(null);
      }

      router.refresh();
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <section className="grid gap-4 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.35fr)]">
      <UserForm
        key={selectedUser?.id ?? "create"}
        selectedUser={selectedUser}
        gardenOptions={gardenOptions}
        onSaved={handleSaved}
        onCancelEdit={handleCancelEdit}
      />

      <UserTable
        rows={rows}
        onEdit={handleEdit}
        onDelete={handleDelete}
        deletingId={deletingId}
      />
    </section>
  );
}