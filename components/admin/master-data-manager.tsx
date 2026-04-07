"use client";

import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ClipboardList,
  MapPinned,
  Pencil,
  Save,
  Sprout,
  Store,
  Trash2,
} from "lucide-react";
import {
  deleteFertilizerAction,
  deleteGardenAction,
  deleteSupplierAction,
  saveFertilizerAction,
  saveGardenAction,
  saveSupplierAction,
} from "@/lib/actions/admin";
import { initialActionState, type ActionState } from "@/lib/actions/shared";
import { useActionFeedback } from "@/hooks/use-action-feedback";
import type {
  FertilizerMasterDataRow,
  GardenMasterDataRow,
  SupplierMasterDataRow,
} from "@/lib/data/master-data";
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
import { SortableTableHead } from "@/components/ui/sortable-table-head";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { getNextSortState, sortRows, type SortState } from "@/lib/table-sort";
import {
  confirmDelete,
  showErrorToast,
  showSuccessToast,
} from "@/lib/feedback/sweet-alert";
import { useAppLoading } from "@/components/providers/app-loading-provider";
import { formatDate } from "@/lib/utils";

const STATUS_OPTIONS = [
  { value: "AKTIF", label: "Aktif" },
  { value: "TIDAK_AKTIF", label: "Tidak Aktif" },
] as const;

type Props =
  | {
      type: "garden";
      rows: GardenMasterDataRow[];
      title: string;
      description: string;
    }
  | {
      type: "fertilizer";
      rows: FertilizerMasterDataRow[];
      title: string;
      description: string;
    }
  | {
      type: "supplier";
      rows: SupplierMasterDataRow[];
      title: string;
      description: string;
    };

type GardenSortKey =
  | "name"
  | "code"
  | "address"
  | "status"
  | "usage"
  | "createdAt";
type FertilizerSortKey = "name" | "status" | "usage" | "createdAt";
type SupplierSortKey =
  | "name"
  | "phone"
  | "email"
  | "address"
  | "status"
  | "usage"
  | "createdAt";

function getFieldError(
  errors: Record<string, string[]> | undefined,
  fieldName: string,
) {
  return errors?.[fieldName]?.[0];
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="text-xs font-medium text-rose-500">{message}</p>;
}

function StatusBadge({ isActive }: { isActive: boolean }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${
        isActive
          ? "border-emerald-200/80 bg-emerald-500/10 text-emerald-800"
          : "border-slate-200/80 bg-slate-500/10 text-slate-700"
      }`}
    >
      {isActive ? "Aktif" : "Tidak aktif"}
    </span>
  );
}

function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-5">
      <p className="page-eyebrow">{eyebrow}</p>
      <h3 className="mt-3 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}

function TextField({
  id,
  label,
  type = "text",
  defaultValue,
  required = true,
  error,
  placeholder,
}: {
  id: string;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  defaultValue?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
}) {
  return (
    <div className="field-stack">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        name={id}
        type={type}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
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

function TextareaField({
  id,
  label,
  defaultValue,
  required = false,
  error,
  placeholder,
}: {
  id: string;
  label: string;
  defaultValue?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
}) {
  return (
    <div className="field-stack">
      <Label htmlFor={id}>{label}</Label>
      <Textarea
        id={id}
        name={id}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        className={
          error
            ? "min-h-24 border-rose-300/60 focus-visible:border-rose-400/60 focus-visible:ring-rose-400/12"
            : "min-h-24"
        }
      />
      <FieldError message={error} />
    </div>
  );
}

function StatusField({
  defaultValue,
  error,
}: {
  defaultValue?: "AKTIF" | "TIDAK_AKTIF";
  error?: string;
}) {
  return (
    <div className="field-stack">
      <Label htmlFor="status">Status</Label>
      <Select
        id="status"
        name="status"
        defaultValue={defaultValue ?? "AKTIF"}
        required
        aria-invalid={Boolean(error)}
        className={
          error
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
      <FieldError message={error} />
    </div>
  );
}

function ActionButtons({
  onEdit,
  onDelete,
  deleting,
}: {
  onEdit: () => void;
  onDelete: () => void;
  deleting: boolean;
}) {
  return (
    <div className="flex gap-2">
      <Button type="button" size="sm" variant="outline" onClick={onEdit}>
        <Pencil className="mr-2 h-3.5 w-3.5" />
        Edit
      </Button>
      <Button
        type="button"
        size="sm"
        variant="destructive"
        disabled={deleting}
        onClick={onDelete}
      >
        <Trash2 className="mr-2 h-3.5 w-3.5" />
        {deleting ? "Menghapus..." : "Hapus"}
      </Button>
    </div>
  );
}

export function MasterDataManager(props: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const { withLoading } = useAppLoading();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteFeedback, setDeleteFeedback] = useState<ActionState | null>(
    null,
  );
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const isDeleting = deletingId !== null;

  const editingRow = useMemo(() => {
    if (!editingId) return null;
    return props.rows.find((row) => row.id === editingId) ?? null;
  }, [editingId, props.rows]);

  const saveAction =
    props.type === "garden"
      ? saveGardenAction
      : props.type === "fertilizer"
        ? saveFertilizerAction
        : saveSupplierAction;

  const [state, formAction, pending] = useActionState(
    saveAction,
    initialActionState,
  );

  const entityLabel =
    props.type === "garden"
      ? "data kebun"
      : props.type === "fertilizer"
        ? "data pupuk"
        : "data supplier";

  useActionFeedback({
    pending,
    state,
    loadingMessage: editingRow
      ? `Menyimpan perubahan ${entityLabel}...`
      : `Menambahkan ${entityLabel}...`,
    loadingDescription:
      "Mohon tunggu sebentar, sistem sedang memperbarui master data.",
    successTitle: editingRow ? "Data diperbarui" : "Data ditambahkan",
    errorTitle: "Gagal menyimpan master data",
  });

  useEffect(() => {
    if (!state.message) return;

    setDeleteFeedback(null);

    if (state.success) {
      formRef.current?.reset();
      setEditingId(null);
      router.refresh();
    }
  }, [router, state]);

  const currentStatus = editingRow?.isActive ? "AKTIF" : "TIDAK_AKTIF";

  const gardenRow =
    props.type === "garden" && editingRow
      ? (editingRow as GardenMasterDataRow)
      : null;

  const fertilizerRow =
    props.type === "fertilizer" && editingRow
      ? (editingRow as FertilizerMasterDataRow)
      : null;

  const supplierRow =
    props.type === "supplier" && editingRow
      ? (editingRow as SupplierMasterDataRow)
      : null;

  const [gardenSortState, setGardenSortState] =
    useState<SortState<GardenSortKey>>(null);
  const [fertilizerSortState, setFertilizerSortState] =
    useState<SortState<FertilizerSortKey>>(null);
  const [supplierSortState, setSupplierSortState] =
    useState<SortState<SupplierSortKey>>(null);

  const sortedGardenRows = useMemo(() => {
    if (props.type !== "garden") {
      return [] as GardenMasterDataRow[];
    }

    return sortRows(props.rows, gardenSortState, {
      name: (row) => row.name,
      code: (row) => row.code,
      address: (row) => row.address,
      status: (row) => row.isActive,
      usage: (row) => row.supplyOrderCount,
      createdAt: (row) => row.createdAt,
    });
  }, [gardenSortState, props]);

  const sortedFertilizerRows = useMemo(() => {
    if (props.type !== "fertilizer") {
      return [] as FertilizerMasterDataRow[];
    }

    return sortRows(props.rows, fertilizerSortState, {
      name: (row) => row.name,
      status: (row) => row.isActive,
      usage: (row) => row.supplyOrderCount,
      createdAt: (row) => row.createdAt,
    });
  }, [fertilizerSortState, props]);

  const sortedSupplierRows = useMemo(() => {
    if (props.type !== "supplier") {
      return [] as SupplierMasterDataRow[];
    }

    return sortRows(props.rows, supplierSortState, {
      name: (row) => row.name,
      phone: (row) => row.phone,
      email: (row) => row.email,
      address: (row) => row.address,
      status: (row) => row.isActive,
      usage: (row) => row.supplyOrderCount,
      createdAt: (row) => row.createdAt,
    });
  }, [props, supplierSortState]);

  const totalRows =
    props.type === "garden"
      ? sortedGardenRows.length
      : props.type === "fertilizer"
        ? sortedFertilizerRows.length
        : sortedSupplierRows.length;

  async function handleDelete(id: string) {
    const confirmed = await confirmDelete({
      title: `Hapus ${entityLabel}?`,
      text: "Jika data sudah dipakai transaksi, penghapusan akan ditolak oleh sistem.",
      confirmButtonText: "Ya, hapus data",
    });

    if (!confirmed) {
      return;
    }

    setDeletingId(id);

    try {
      const result = await withLoading(
        () =>
          props.type === "garden"
            ? deleteGardenAction(id)
            : props.type === "fertilizer"
              ? deleteFertilizerAction(id)
              : deleteSupplierAction(id),
        {
          message: `Menghapus ${entityLabel}...`,
          description:
            "Mohon tunggu sebentar, sistem sedang memperbarui data master.",
        },
      );

      setDeleteFeedback(result);

      if (!result.success) {
        void showErrorToast(result.message, "Gagal menghapus data");
        return;
      }

      void showSuccessToast(result.message, "Data dihapus");

      if (editingId === id) {
        setEditingId(null);
        formRef.current?.reset();
      }

      router.refresh();
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.35fr)]">
      <Card className="glass-surface-strong rounded-[2rem]">
        <CardHeader>
          <CardTitle>{props.title}</CardTitle>
          <CardDescription>{props.description}</CardDescription>
        </CardHeader>

        <CardContent>
          <form
            key={`${props.type}-${editingRow?.id ?? "create"}`}
            ref={formRef}
            action={formAction}
            className="space-y-5"
          >
            {editingRow ? (
              <input type="hidden" name="id" value={editingRow.id} />
            ) : null}

            {props.type === "garden" ? (
              <section className="rounded-[1.8rem] border border-white/70 bg-white/62 p-4 md:p-5">
                <SectionIntro
                  eyebrow="Data Kebun"
                  title={editingRow ? "Edit data kebun" : "Tambah data kebun"}
                  description="Nama, kode, dan alamat kebun akan dipakai pada kontrak pasokan serta pembatasan user per kebun."
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <TextField
                    id="name"
                    label="Nama kebun"
                    defaultValue={gardenRow?.name}
                    error={getFieldError(state.errors, "name")}
                    placeholder="Contoh: Kebun Sei Rokan"
                  />
                  <TextField
                    id="code"
                    label="Kode kebun"
                    defaultValue={gardenRow?.code}
                    error={getFieldError(state.errors, "code")}
                    placeholder="Contoh: SRK"
                  />
                  <div className="md:col-span-2">
                    <TextareaField
                      id="address"
                      label="Alamat"
                      defaultValue={gardenRow?.address ?? undefined}
                      error={getFieldError(state.errors, "address")}
                      placeholder="Alamat kebun"
                    />
                  </div>
                  <StatusField
                    defaultValue={currentStatus}
                    error={getFieldError(state.errors, "status")}
                  />
                </div>
              </section>
            ) : null}

            {props.type === "fertilizer" ? (
              <section className="rounded-[1.8rem] border border-white/70 bg-white/62 p-4 md:p-5">
                <SectionIntro
                  eyebrow="Data Pupuk"
                  title={editingRow ? "Edit data pupuk" : "Tambah data pupuk"}
                  description="Nama pupuk yang tersimpan di sini akan tampil sebagai opsi resmi pada form pasokan."
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <TextField
                    id="name"
                    label="Nama pupuk"
                    defaultValue={fertilizerRow?.name}
                    error={getFieldError(state.errors, "name")}
                    placeholder="Contoh: NPK 16-16-16"
                  />
                  <StatusField
                    defaultValue={currentStatus}
                    error={getFieldError(state.errors, "status")}
                  />
                </div>
              </section>
            ) : null}

            {props.type === "supplier" ? (
              <section className="rounded-[1.8rem] border border-white/70 bg-white/62 p-4 md:p-5">
                <SectionIntro
                  eyebrow="Data Supplier"
                  title={
                    editingRow ? "Edit data supplier" : "Tambah data supplier"
                  }
                  description="Informasi supplier yang lengkap memudahkan pemilihan pada kontrak dan monitoring follow-up pemasok."
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <TextField
                    id="name"
                    label="Nama supplier"
                    defaultValue={supplierRow?.name}
                    error={getFieldError(state.errors, "name")}
                    placeholder="Nama pemasok"
                  />
                  <TextField
                    id="phone"
                    label="Telepon"
                    defaultValue={supplierRow?.phone ?? undefined}
                    error={getFieldError(state.errors, "phone")}
                    placeholder="Nomor telepon"
                  />
                  <TextField
                    id="email"
                    label="Email"
                    type="email"
                    defaultValue={supplierRow?.email ?? undefined}
                    error={getFieldError(state.errors, "email")}
                    placeholder="supplier@perusahaan.com"
                  />
                  <StatusField
                    defaultValue={currentStatus}
                    error={getFieldError(state.errors, "status")}
                  />
                  <div className="md:col-span-2">
                    <TextareaField
                      id="address"
                      label="Alamat"
                      required
                      defaultValue={supplierRow?.address ?? undefined}
                      error={getFieldError(state.errors, "address")}
                      placeholder="Alamat lengkap supplier"
                    />
                  </div>
                </div>
              </section>
            ) : null}

            <div className="space-y-3">
              <FormMessage
                message={deleteFeedback?.message || state.message}
                success={
                  deleteFeedback ? deleteFeedback.success : state.success
                }
              />

              <div className="flex flex-wrap gap-2">
                <Button type="submit" variant="primary" disabled={pending}>
                  <Save className="mr-2 h-4 w-4" />
                  {pending
                    ? "Menyimpan..."
                    : editingRow
                      ? "Simpan Perubahan"
                      : "Simpan Data"}
                </Button>

                {editingRow ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setEditingId(null);
                      setDeleteFeedback(null);
                    }}
                  >
                    Batal Edit
                  </Button>
                ) : null}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="glass-surface rounded-[2rem]">
        <CardHeader>
          <CardTitle>Data Tersimpan</CardTitle>
          <CardDescription>
            Master data di bawah ini langsung dipakai oleh modul lain di dalam
            sistem. Klik judul kolom untuk mengurutkan data sesuai kebutuhan.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {totalRows === 0 ? (
            <div className="rounded-3xl border border-dashed border-white/65 bg-white/70 px-6 py-12 text-center">
              <p className="text-base font-medium text-slate-900">
                Belum ada data tersimpan.
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Tambahkan data baru dari form di sebelah kiri.
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-3 xl:hidden">
                {props.type === "garden"
                  ? sortedGardenRows.map((row) => (
                      <div
                        key={row.id}
                        className="rounded-3xl border border-white/65 bg-white/70 p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-base font-semibold text-slate-900">
                              {row.name}
                            </p>
                            <p className="mt-1 text-sm text-slate-500">
                              {row.code}
                            </p>
                          </div>
                          <StatusBadge isActive={row.isActive} />
                        </div>

                        <p className="mt-3 text-sm leading-6 text-slate-600">
                          {row.address || "-"}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600">
                          <span className="rounded-full border border-white/60 bg-white/72 px-3 py-1">
                            {row.supplyOrderCount} pasokan
                          </span>
                          <span className="rounded-full border border-white/60 bg-white/72 px-3 py-1">
                            {formatDate(row.createdAt)}
                          </span>
                        </div>

                        <div className="mt-4">
                          <ActionButtons
                            onEdit={() => setEditingId(row.id)}
                            onDelete={() => handleDelete(row.id)}
                            deleting={isDeleting && deletingId === row.id}
                          />
                        </div>
                      </div>
                    ))
                  : null}

                {props.type === "fertilizer"
                  ? sortedFertilizerRows.map((row) => (
                      <div
                        key={row.id}
                        className="rounded-3xl border border-white/65 bg-white/70 p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-base font-semibold text-slate-900">
                              {row.name}
                            </p>
                            <p className="mt-1 text-sm text-slate-500">
                              {formatDate(row.createdAt)}
                            </p>
                          </div>
                          <StatusBadge isActive={row.isActive} />
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600">
                          <span className="rounded-full border border-white/60 bg-white/72 px-3 py-1">
                            {row.supplyOrderCount} pasokan
                          </span>
                        </div>

                        <div className="mt-4">
                          <ActionButtons
                            onEdit={() => setEditingId(row.id)}
                            onDelete={() => handleDelete(row.id)}
                            deleting={isDeleting && deletingId === row.id}
                          />
                        </div>
                      </div>
                    ))
                  : null}

                {props.type === "supplier"
                  ? sortedSupplierRows.map((row) => (
                      <div
                        key={row.id}
                        className="rounded-3xl border border-white/65 bg-white/70 p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-base font-semibold text-slate-900">
                              {row.name}
                            </p>
                            <p className="mt-1 text-sm text-slate-500">
                              {row.phone || "-"} • {row.email || "-"}
                            </p>
                          </div>
                          <StatusBadge isActive={row.isActive} />
                        </div>

                        <p className="mt-3 text-sm leading-6 text-slate-600">
                          {row.address || "-"}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600">
                          <span className="rounded-full border border-white/60 bg-white/72 px-3 py-1">
                            {row.supplyOrderCount} pasokan
                          </span>
                          <span className="rounded-full border border-white/60 bg-white/72 px-3 py-1">
                            {formatDate(row.createdAt)}
                          </span>
                        </div>

                        <div className="mt-4">
                          <ActionButtons
                            onEdit={() => setEditingId(row.id)}
                            onDelete={() => handleDelete(row.id)}
                            deleting={isDeleting && deletingId === row.id}
                          />
                        </div>
                      </div>
                    ))
                  : null}
              </div>

              <div className="hidden xl:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {props.type === "garden" ? (
                        <>
                          <SortableTableHead
                            label="Nama Kebun"
                            isActive={gardenSortState?.key === "name"}
                            direction={
                              gardenSortState?.key === "name"
                                ? gardenSortState.direction
                                : undefined
                            }
                            onClick={() =>
                              setGardenSortState((current) =>
                                getNextSortState(current, "name"),
                              )
                            }
                          />
                          <SortableTableHead
                            label="Kode"
                            isActive={gardenSortState?.key === "code"}
                            direction={
                              gardenSortState?.key === "code"
                                ? gardenSortState.direction
                                : undefined
                            }
                            onClick={() =>
                              setGardenSortState((current) =>
                                getNextSortState(current, "code"),
                              )
                            }
                          />
                          <SortableTableHead
                            label="Alamat"
                            isActive={gardenSortState?.key === "address"}
                            direction={
                              gardenSortState?.key === "address"
                                ? gardenSortState.direction
                                : undefined
                            }
                            onClick={() =>
                              setGardenSortState((current) =>
                                getNextSortState(current, "address"),
                              )
                            }
                          />
                          <SortableTableHead
                            label="Status"
                            isActive={gardenSortState?.key === "status"}
                            direction={
                              gardenSortState?.key === "status"
                                ? gardenSortState.direction
                                : undefined
                            }
                            onClick={() =>
                              setGardenSortState((current) =>
                                getNextSortState(current, "status"),
                              )
                            }
                          />
                          <SortableTableHead
                            label="Dipakai"
                            isActive={gardenSortState?.key === "usage"}
                            direction={
                              gardenSortState?.key === "usage"
                                ? gardenSortState.direction
                                : undefined
                            }
                            onClick={() =>
                              setGardenSortState((current) =>
                                getNextSortState(current, "usage"),
                              )
                            }
                          />
                          <SortableTableHead
                            label="Dibuat"
                            isActive={gardenSortState?.key === "createdAt"}
                            direction={
                              gardenSortState?.key === "createdAt"
                                ? gardenSortState.direction
                                : undefined
                            }
                            onClick={() =>
                              setGardenSortState((current) =>
                                getNextSortState(current, "createdAt"),
                              )
                            }
                          />
                          <TableHead className="text-right">Aksi</TableHead>
                        </>
                      ) : null}
                      {props.type === "fertilizer" ? (
                        <>
                          <SortableTableHead
                            label="Nama Pupuk"
                            isActive={fertilizerSortState?.key === "name"}
                            direction={
                              fertilizerSortState?.key === "name"
                                ? fertilizerSortState.direction
                                : undefined
                            }
                            onClick={() =>
                              setFertilizerSortState((current) =>
                                getNextSortState(current, "name"),
                              )
                            }
                          />
                          <SortableTableHead
                            label="Status"
                            isActive={fertilizerSortState?.key === "status"}
                            direction={
                              fertilizerSortState?.key === "status"
                                ? fertilizerSortState.direction
                                : undefined
                            }
                            onClick={() =>
                              setFertilizerSortState((current) =>
                                getNextSortState(current, "status"),
                              )
                            }
                          />
                          <SortableTableHead
                            label="Dipakai"
                            isActive={fertilizerSortState?.key === "usage"}
                            direction={
                              fertilizerSortState?.key === "usage"
                                ? fertilizerSortState.direction
                                : undefined
                            }
                            onClick={() =>
                              setFertilizerSortState((current) =>
                                getNextSortState(current, "usage"),
                              )
                            }
                          />
                          <SortableTableHead
                            label="Dibuat"
                            isActive={fertilizerSortState?.key === "createdAt"}
                            direction={
                              fertilizerSortState?.key === "createdAt"
                                ? fertilizerSortState.direction
                                : undefined
                            }
                            onClick={() =>
                              setFertilizerSortState((current) =>
                                getNextSortState(current, "createdAt"),
                              )
                            }
                          />
                          <TableHead className="text-right">Aksi</TableHead>
                        </>
                      ) : null}
                      {props.type === "supplier" ? (
                        <>
                          <SortableTableHead
                            label="Nama Supplier"
                            isActive={supplierSortState?.key === "name"}
                            direction={
                              supplierSortState?.key === "name"
                                ? supplierSortState.direction
                                : undefined
                            }
                            onClick={() =>
                              setSupplierSortState((current) =>
                                getNextSortState(current, "name"),
                              )
                            }
                          />
                          <SortableTableHead
                            label="Telepon"
                            isActive={supplierSortState?.key === "phone"}
                            direction={
                              supplierSortState?.key === "phone"
                                ? supplierSortState.direction
                                : undefined
                            }
                            onClick={() =>
                              setSupplierSortState((current) =>
                                getNextSortState(current, "phone"),
                              )
                            }
                          />
                          <SortableTableHead
                            label="Email"
                            isActive={supplierSortState?.key === "email"}
                            direction={
                              supplierSortState?.key === "email"
                                ? supplierSortState.direction
                                : undefined
                            }
                            onClick={() =>
                              setSupplierSortState((current) =>
                                getNextSortState(current, "email"),
                              )
                            }
                          />
                          <SortableTableHead
                            label="Alamat"
                            isActive={supplierSortState?.key === "address"}
                            direction={
                              supplierSortState?.key === "address"
                                ? supplierSortState.direction
                                : undefined
                            }
                            onClick={() =>
                              setSupplierSortState((current) =>
                                getNextSortState(current, "address"),
                              )
                            }
                          />
                          <SortableTableHead
                            label="Status"
                            isActive={supplierSortState?.key === "status"}
                            direction={
                              supplierSortState?.key === "status"
                                ? supplierSortState.direction
                                : undefined
                            }
                            onClick={() =>
                              setSupplierSortState((current) =>
                                getNextSortState(current, "status"),
                              )
                            }
                          />
                          <SortableTableHead
                            label="Dipakai"
                            isActive={supplierSortState?.key === "usage"}
                            direction={
                              supplierSortState?.key === "usage"
                                ? supplierSortState.direction
                                : undefined
                            }
                            onClick={() =>
                              setSupplierSortState((current) =>
                                getNextSortState(current, "usage"),
                              )
                            }
                          />
                          <SortableTableHead
                            label="Dibuat"
                            isActive={supplierSortState?.key === "createdAt"}
                            direction={
                              supplierSortState?.key === "createdAt"
                                ? supplierSortState.direction
                                : undefined
                            }
                            onClick={() =>
                              setSupplierSortState((current) =>
                                getNextSortState(current, "createdAt"),
                              )
                            }
                          />
                          <TableHead className="text-right">Aksi</TableHead>
                        </>
                      ) : null}
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {props.type === "garden"
                      ? sortedGardenRows.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell className="font-medium text-slate-900">
                              {row.name}
                            </TableCell>
                            <TableCell>{row.code}</TableCell>
                            <TableCell className="max-w-[240px] whitespace-normal">
                              {row.address || "-"}
                            </TableCell>
                            <TableCell>
                              <StatusBadge isActive={row.isActive} />
                            </TableCell>
                            <TableCell>
                              {row.supplyOrderCount} pasokan
                            </TableCell>
                            <TableCell>{formatDate(row.createdAt)}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <ActionButtons
                                  onEdit={() => setEditingId(row.id)}
                                  onDelete={() => handleDelete(row.id)}
                                  deleting={isDeleting && deletingId === row.id}
                                />
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      : null}

                    {props.type === "fertilizer"
                      ? sortedFertilizerRows.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell className="font-medium text-slate-900">
                              {row.name}
                            </TableCell>
                            <TableCell>
                              <StatusBadge isActive={row.isActive} />
                            </TableCell>
                            <TableCell>
                              {row.supplyOrderCount} pasokan
                            </TableCell>
                            <TableCell>{formatDate(row.createdAt)}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <ActionButtons
                                  onEdit={() => setEditingId(row.id)}
                                  onDelete={() => handleDelete(row.id)}
                                  deleting={isDeleting && deletingId === row.id}
                                />
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      : null}

                    {props.type === "supplier"
                      ? sortedSupplierRows.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell className="font-medium text-slate-900">
                              {row.name}
                            </TableCell>
                            <TableCell>{row.phone || "-"}</TableCell>
                            <TableCell>{row.email || "-"}</TableCell>
                            <TableCell className="max-w-[240px] whitespace-normal">
                              {row.address || "-"}
                            </TableCell>
                            <TableCell>
                              <StatusBadge isActive={row.isActive} />
                            </TableCell>
                            <TableCell>
                              {row.supplyOrderCount} pasokan
                            </TableCell>
                            <TableCell>{formatDate(row.createdAt)}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <ActionButtons
                                  onEdit={() => setEditingId(row.id)}
                                  onDelete={() => handleDelete(row.id)}
                                  deleting={isDeleting && deletingId === row.id}
                                />
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      : null}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
