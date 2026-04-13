"use client";

import {
  useActionState,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import {
  Package2,
  Pencil,
  Plus,
  Save,
  Sprout,
  Store,
  Trash2,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  deleteFertilizerAction,
  deleteGardenAction,
  deleteSupplierAction,
  saveFertilizerAction,
  saveGardenAction,
  saveSupplierAction,
} from "@/lib/actions/admin";
import { initialActionState, type ActionState } from "@/lib/actions/shared";
import type {
  FertilizerMasterDataRow,
  GardenMasterDataRow,
  SupplierMasterDataRow,
} from "@/lib/data/master-data";
import { useActionFeedback } from "@/hooks/use-action-feedback";
import { getNextSortState, sortRows, type SortState } from "@/lib/table-sort";
import {
  confirmDelete,
  showErrorToast,
  showSuccessToast,
} from "@/lib/feedback/sweet-alert";
import { formatDate } from "@/lib/utils";
import { useAppLoading } from "@/components/providers/app-loading-provider";
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

type ModalMode = "create" | "edit" | null;

function getFieldError(
  errors: Record<string, string[]> | undefined,
  fieldName: string,
) {
  return errors?.[fieldName]?.[0];
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;

  return <p className="text-xs font-medium text-rose-300">{message}</p>;
}

function StatusBadge({ isActive }: { isActive: boolean }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${
        isActive
          ? "border-cyan-300/20 bg-cyan-400/10 text-cyan-100"
          : "border-white/10 bg-white/6 text-slate-300"
      }`}
    >
      {isActive ? "Aktif" : "Tidak aktif"}
    </span>
  );
}

function DataChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-slate-100">{value}</p>
    </div>
  );
}

function ModalShell({
  open,
  title,
  description,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  description: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  if (!mounted || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[999]">
      <button
        type="button"
        aria-label="Tutup popup"
        className="absolute inset-0 bg-slate-950/82 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative flex min-h-screen items-center justify-center p-4 sm:p-6">
        <div className="glass-surface-strong relative z-[1] w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/12">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.18),transparent_55%)]" />

          <div className="relative flex items-start justify-between gap-4 border-b border-white/8 px-5 py-5 md:px-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                Form Master Data
              </p>
              <h3 className="mt-2 text-xl font-semibold text-slate-50">
                {title}
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
                {description}
              </p>
            </div>

            <Button type="button" size="icon" variant="ghost" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="relative max-h-[calc(100vh-8rem)] overflow-y-auto px-5 py-5 md:px-6 md:py-6">
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function FormField({ children }: { children: ReactNode }) {
  return <div className="space-y-2">{children}</div>;
}

function ModalForm({
  type,
  formRef,
  formAction,
  state,
  pending,
  editingRow,
  onClose,
}: {
  type: Props["type"];
  formRef: React.RefObject<HTMLFormElement | null>;
  formAction: (payload: FormData) => void;
  state: ActionState;
  pending: boolean;
  editingRow:
    | GardenMasterDataRow
    | FertilizerMasterDataRow
    | SupplierMasterDataRow
    | null;
  onClose: () => void;
}) {
  const currentStatus = editingRow?.isActive ? "AKTIF" : "TIDAK_AKTIF";
  const isGarden = type === "garden";
  const isFertilizer = type === "fertilizer";
  const isSupplier = type === "supplier";

  return (
    <form
      key={`${type}-${editingRow?.id ?? "create"}`}
      ref={formRef}
      action={formAction}
      className="space-y-5"
    >
      {editingRow ? <input type="hidden" name="id" value={editingRow.id} /> : null}

      <div className="grid gap-4 md:grid-cols-2">
        {isGarden ? (
          <>
            <FormField>
              <Label htmlFor="name">Nama kebun</Label>
              <Input
                id="name"
                name="name"
                defaultValue={(editingRow as GardenMasterDataRow | null)?.name}
                placeholder="Contoh: Kebun Sei Rokan"
                aria-invalid={Boolean(getFieldError(state.errors, "name"))}
              />
              <FieldError message={getFieldError(state.errors, "name")} />
            </FormField>

            <FormField>
              <Label htmlFor="code">Kode kebun</Label>
              <Input
                id="code"
                name="code"
                defaultValue={(editingRow as GardenMasterDataRow | null)?.code}
                placeholder="Contoh: SRK"
                aria-invalid={Boolean(getFieldError(state.errors, "code"))}
              />
              <FieldError message={getFieldError(state.errors, "code")} />
            </FormField>

            <div className="md:col-span-2">
              <FormField>
                <Label htmlFor="address">Alamat</Label>
                <Textarea
                  id="address"
                  name="address"
                  defaultValue={
                    (editingRow as GardenMasterDataRow | null)?.address ?? undefined
                  }
                  placeholder="Alamat kebun"
                  className="min-h-28"
                  aria-invalid={Boolean(getFieldError(state.errors, "address"))}
                />
                <FieldError message={getFieldError(state.errors, "address")} />
              </FormField>
            </div>
          </>
        ) : null}

        {isFertilizer ? (
          <div className="md:col-span-2">
            <FormField>
              <Label htmlFor="name">Nama pupuk</Label>
              <Input
                id="name"
                name="name"
                defaultValue={(editingRow as FertilizerMasterDataRow | null)?.name}
                placeholder="Contoh: NPK Pelangi 16-16-16"
                aria-invalid={Boolean(getFieldError(state.errors, "name"))}
              />
              <FieldError message={getFieldError(state.errors, "name")} />
            </FormField>
          </div>
        ) : null}

        {isSupplier ? (
          <>
            <FormField>
              <Label htmlFor="name">Nama supplier</Label>
              <Input
                id="name"
                name="name"
                defaultValue={(editingRow as SupplierMasterDataRow | null)?.name}
                placeholder="Contoh: PT Pupuk Indonesia"
                aria-invalid={Boolean(getFieldError(state.errors, "name"))}
              />
              <FieldError message={getFieldError(state.errors, "name")} />
            </FormField>

            <FormField>
              <Label htmlFor="phone">Telepon</Label>
              <Input
                id="phone"
                name="phone"
                defaultValue={
                  (editingRow as SupplierMasterDataRow | null)?.phone ?? undefined
                }
                placeholder="Contoh: 081234567890"
                aria-invalid={Boolean(getFieldError(state.errors, "phone"))}
              />
              <FieldError message={getFieldError(state.errors, "phone")} />
            </FormField>

            <div className="md:col-span-2">
              <FormField>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={
                    (editingRow as SupplierMasterDataRow | null)?.email ?? undefined
                  }
                  placeholder="supplier@email.com"
                  aria-invalid={Boolean(getFieldError(state.errors, "email"))}
                />
                <FieldError message={getFieldError(state.errors, "email")} />
              </FormField>
            </div>

            <div className="md:col-span-2">
              <FormField>
                <Label htmlFor="address">Alamat</Label>
                <Textarea
                  id="address"
                  name="address"
                  defaultValue={
                    (editingRow as SupplierMasterDataRow | null)?.address ?? undefined
                  }
                  placeholder="Alamat supplier"
                  className="min-h-28"
                  aria-invalid={Boolean(getFieldError(state.errors, "address"))}
                />
                <FieldError message={getFieldError(state.errors, "address")} />
              </FormField>
            </div>
          </>
        ) : null}

        <FormField>
          <Label htmlFor="status">Status</Label>
          <Select
            id="status"
            name="status"
            defaultValue={currentStatus}
            aria-invalid={Boolean(getFieldError(state.errors, "status"))}
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <FieldError message={getFieldError(state.errors, "status")} />
        </FormField>
      </div>

      <FormMessage message={state.message} success={state.success} />

      <div className="flex flex-col-reverse gap-3 border-t border-white/8 pt-4 sm:flex-row sm:justify-end">
        <Button type="button" variant="ghost" onClick={onClose}>
          Batal
        </Button>
        <Button type="submit" variant="primary" disabled={pending}>
          <Save className="mr-2 h-4 w-4" />
          {pending
            ? "Menyimpan..."
            : editingRow
              ? "Simpan Perubahan"
              : "Simpan Data"}
        </Button>
      </div>
    </form>
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
    <div className="flex items-center justify-end gap-2">
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
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteFeedback, setDeleteFeedback] = useState<ActionState | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

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

  const [state, formAction, pending] = useActionState(saveAction, initialActionState);

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
    if (!state.message || !state.success) return;

    formRef.current?.reset();
    setEditingId(null);
    setModalMode(null);
    setDeleteFeedback(null);
    router.refresh();
  }, [router, state]);

  const [gardenSortState, setGardenSortState] = useState<SortState<GardenSortKey>>(null);
  const [fertilizerSortState, setFertilizerSortState] =
    useState<SortState<FertilizerSortKey>>(null);
  const [supplierSortState, setSupplierSortState] =
    useState<SortState<SupplierSortKey>>(null);

  const sortedGardenRows = useMemo(() => {
    if (props.type !== "garden") return [] as GardenMasterDataRow[];

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
    if (props.type !== "fertilizer") return [] as FertilizerMasterDataRow[];

    return sortRows(props.rows, fertilizerSortState, {
      name: (row) => row.name,
      status: (row) => row.isActive,
      usage: (row) => row.supplyOrderCount,
      createdAt: (row) => row.createdAt,
    });
  }, [fertilizerSortState, props]);

  const sortedSupplierRows = useMemo(() => {
    if (props.type !== "supplier") return [] as SupplierMasterDataRow[];

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

  const activeRows = props.rows.filter((row) => row.isActive).length;
  const inactiveRows = totalRows - activeRows;
  const usedRows = props.rows.filter((row) => row.supplyOrderCount > 0).length;

  const modalTitle =
    props.type === "garden"
      ? editingRow
        ? "Edit data kebun"
        : "Tambah data kebun"
      : props.type === "fertilizer"
        ? editingRow
          ? "Edit data pupuk"
          : "Tambah data pupuk"
        : editingRow
          ? "Edit data supplier"
          : "Tambah data supplier";

  const modalDescription =
    props.type === "garden"
      ? "Nama, kode, dan alamat kebun dipakai pada modul pasokan, hak akses, dan referensi operasional."
      : props.type === "fertilizer"
        ? "Pastikan nama pupuk dan statusnya rapi agar pilihan pada kontrak pasokan tetap konsisten."
        : "Lengkapi kontak dan alamat supplier agar relasi pasokan lebih mudah dilacak dan dipantau.";

  function openCreateModal() {
    setEditingId(null);
    setDeleteFeedback(null);
    setModalMode("create");
  }

  function openEditModal(id: string) {
    setEditingId(id);
    setDeleteFeedback(null);
    setModalMode("edit");
  }

  function closeModal() {
    if (pending) return;
    setModalMode(null);
    setEditingId(null);
  }

  async function handleDelete(id: string) {
    const confirmed = await confirmDelete({
      title: `Hapus ${entityLabel}?`,
      text: "Jika data sudah dipakai transaksi, penghapusan akan ditolak oleh sistem.",
      confirmButtonText: "Ya, hapus data",
    });

    if (!confirmed) return;

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
          description: "Mohon tunggu sebentar, sistem sedang memperbarui data master.",
        },
      );

      setDeleteFeedback(result);

      if (!result.success) {
        void showErrorToast(result.message, "Gagal menghapus data");
        return;
      }

      void showSuccessToast(result.message, "Data dihapus");
      router.refresh();
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <>
      <Card className="overflow-hidden rounded-[2rem]">
        <CardHeader className="gap-4 border-b border-white/8 pb-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <CardTitle>{props.title}</CardTitle>
              <CardDescription className="mt-2 max-w-3xl">
                {props.description}
              </CardDescription>
            </div>

            <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">
              <Button type="button" variant="primary" onClick={openCreateModal}>
                <Plus className="mr-2 h-4 w-4" />
                Tambah Data
              </Button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <DataChip label="Total Data" value={`${totalRows} item`} />
            <DataChip label="Status Aktif" value={`${activeRows} item`} />
            <DataChip label="Tidak Aktif" value={`${inactiveRows} item`} />
            <DataChip label="Dipakai Pasokan" value={`${usedRows} item`} />
          </div>
        </CardHeader>

        <CardContent className="pt-5">
          {deleteFeedback?.success === false ? (
            <FormMessage message={deleteFeedback.message} className="mb-4" />
          ) : null}

          {totalRows === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-white/10 bg-white/[0.03] px-6 py-16 text-center">
              <div className="rounded-2xl border border-cyan-300/15 bg-cyan-400/10 p-3 text-cyan-100">
                {props.type === "garden" ? (
                  <Sprout className="h-6 w-6" />
                ) : props.type === "fertilizer" ? (
                  <Package2 className="h-6 w-6" />
                ) : (
                  <Store className="h-6 w-6" />
                )}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-50">
                Belum ada data tersimpan
              </h3>
              <p className="mt-2 max-w-md text-sm leading-6 text-slate-300">
                Klik tombol tambah di atas untuk membuat data baru. Setelah tersimpan,
                data akan langsung muncul pada tabel ini.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-[1.6rem] border border-white/8 bg-[linear-gradient(180deg,rgba(13,25,49,0.58),rgba(10,20,39,0.44))] p-2">
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
                              <TableCell className="font-medium text-slate-100">
                                {row.name}
                              </TableCell>
                              <TableCell>{row.code}</TableCell>
                              <TableCell className="max-w-[260px] whitespace-normal text-slate-300">
                                {row.address || "-"}
                              </TableCell>
                              <TableCell>
                                <StatusBadge isActive={row.isActive} />
                              </TableCell>
                              <TableCell>{row.supplyOrderCount} pasokan</TableCell>
                              <TableCell>{formatDate(row.createdAt)}</TableCell>
                              <TableCell className="text-right">
                                <ActionButtons
                                  onEdit={() => openEditModal(row.id)}
                                  onDelete={() => handleDelete(row.id)}
                                  deleting={deletingId === row.id}
                                />
                              </TableCell>
                            </TableRow>
                          ))
                        : null}

                      {props.type === "fertilizer"
                        ? sortedFertilizerRows.map((row) => (
                            <TableRow key={row.id}>
                              <TableCell className="font-medium text-slate-100">
                                {row.name}
                              </TableCell>
                              <TableCell>
                                <StatusBadge isActive={row.isActive} />
                              </TableCell>
                              <TableCell>{row.supplyOrderCount} pasokan</TableCell>
                              <TableCell>{formatDate(row.createdAt)}</TableCell>
                              <TableCell className="text-right">
                                <ActionButtons
                                  onEdit={() => openEditModal(row.id)}
                                  onDelete={() => handleDelete(row.id)}
                                  deleting={deletingId === row.id}
                                />
                              </TableCell>
                            </TableRow>
                          ))
                        : null}

                      {props.type === "supplier"
                        ? sortedSupplierRows.map((row) => (
                            <TableRow key={row.id}>
                              <TableCell className="font-medium text-slate-100">
                                {row.name}
                              </TableCell>
                              <TableCell>{row.phone || "-"}</TableCell>
                              <TableCell>{row.email || "-"}</TableCell>
                              <TableCell className="max-w-[260px] whitespace-normal text-slate-300">
                                {row.address || "-"}
                              </TableCell>
                              <TableCell>
                                <StatusBadge isActive={row.isActive} />
                              </TableCell>
                              <TableCell>{row.supplyOrderCount} pasokan</TableCell>
                              <TableCell>{formatDate(row.createdAt)}</TableCell>
                              <TableCell className="text-right">
                                <ActionButtons
                                  onEdit={() => openEditModal(row.id)}
                                  onDelete={() => handleDelete(row.id)}
                                  deleting={deletingId === row.id}
                                />
                              </TableCell>
                            </TableRow>
                          ))
                        : null}
                    </TableBody>
                  </Table>
                </div>

                <div className="space-y-3 xl:hidden">
                  {props.type === "garden"
                    ? sortedGardenRows.map((row) => (
                        <div
                          key={row.id}
                          className="rounded-[1.4rem] border border-white/8 bg-white/[0.03] p-4"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-base font-semibold text-slate-100">
                                {row.name}
                              </p>
                              <p className="mt-1 text-sm text-slate-400">
                                Kode: {row.code}
                              </p>
                            </div>
                            <StatusBadge isActive={row.isActive} />
                          </div>
                          <div className="mt-4 grid gap-2 text-sm text-slate-300">
                            <p>Alamat: {row.address || "-"}</p>
                            <p>Dipakai: {row.supplyOrderCount} pasokan</p>
                            <p>Dibuat: {formatDate(row.createdAt)}</p>
                          </div>
                          <div className="mt-4">
                            <ActionButtons
                              onEdit={() => openEditModal(row.id)}
                              onDelete={() => handleDelete(row.id)}
                              deleting={deletingId === row.id}
                            />
                          </div>
                        </div>
                      ))
                    : null}

                  {props.type === "fertilizer"
                    ? sortedFertilizerRows.map((row) => (
                        <div
                          key={row.id}
                          className="rounded-[1.4rem] border border-white/8 bg-white/[0.03] p-4"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-base font-semibold text-slate-100">
                                {row.name}
                              </p>
                              <p className="mt-1 text-sm text-slate-400">
                                Dibuat: {formatDate(row.createdAt)}
                              </p>
                            </div>
                            <StatusBadge isActive={row.isActive} />
                          </div>
                          <p className="mt-4 text-sm text-slate-300">
                            Dipakai: {row.supplyOrderCount} pasokan
                          </p>
                          <div className="mt-4">
                            <ActionButtons
                              onEdit={() => openEditModal(row.id)}
                              onDelete={() => handleDelete(row.id)}
                              deleting={deletingId === row.id}
                            />
                          </div>
                        </div>
                      ))
                    : null}

                  {props.type === "supplier"
                    ? sortedSupplierRows.map((row) => (
                        <div
                          key={row.id}
                          className="rounded-[1.4rem] border border-white/8 bg-white/[0.03] p-4"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-base font-semibold text-slate-100">
                                {row.name}
                              </p>
                              <p className="mt-1 text-sm text-slate-400">
                                {row.phone || "-"}
                              </p>
                            </div>
                            <StatusBadge isActive={row.isActive} />
                          </div>
                          <div className="mt-4 grid gap-2 text-sm text-slate-300">
                            <p>Email: {row.email || "-"}</p>
                            <p>Alamat: {row.address || "-"}</p>
                            <p>Dipakai: {row.supplyOrderCount} pasokan</p>
                            <p>Dibuat: {formatDate(row.createdAt)}</p>
                          </div>
                          <div className="mt-4">
                            <ActionButtons
                              onEdit={() => openEditModal(row.id)}
                              onDelete={() => handleDelete(row.id)}
                              deleting={deletingId === row.id}
                            />
                          </div>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <ModalShell
        open={modalMode !== null}
        title={modalTitle}
        description={modalDescription}
        onClose={closeModal}
      >
        <ModalForm
          type={props.type}
          formRef={formRef}
          formAction={formAction}
          state={state}
          pending={pending}
          editingRow={editingRow}
          onClose={closeModal}
        />
      </ModalShell>
    </>
  );
}