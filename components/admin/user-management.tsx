"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteUserAction } from "@/lib/actions/user-management";
import { UserForm } from "@/components/admin/user-form";
import { type UserTableRow, UserTable } from "@/components/admin/user-table";

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
  const [selectedUser, setSelectedUser] = useState<UserTableRow | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  function handleEdit(row: UserTableRow) {
    setSelectedUser(row);
  }

  function handleCancelEdit() {
    setSelectedUser(null);
  }

  function handleSaved() {
    setSelectedUser(null);
  }

  function handleDelete(row: UserTableRow) {
    const confirmed = window.confirm(
      `Yakin ingin menghapus user "${row.name}"?`,
    );

    if (!confirmed) return;

    setDeletingId(row.id);

    startTransition(async () => {
      const result = await deleteUserAction(row.id);

      if (!result.success) {
        alert(result.message);
      } else {
        if (selectedUser?.id === row.id) {
          setSelectedUser(null);
        }

        router.refresh();
      }

      setDeletingId(null);
    });
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