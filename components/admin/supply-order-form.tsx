"use client";

import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarRange,
  CircleDollarSign,
  ClipboardList,
  Package2,
  Save,
  Sparkles,
  Truck,
} from "lucide-react";
import {
  createSupplyOrderAction,
  updateSupplyOrderAction,
} from "@/lib/actions/admin";
import { initialActionState } from "@/lib/actions/shared";
import { calculateSupplyCosts } from "@/lib/supply-order";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormMessage } from "@/components/ui/form-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SupplyOrderFormSelect } from "@/components/admin/supply-order-form-select";
import { SupplyOrderFormSummary } from "@/components/admin/supply-order-form-summary";

export type SupplyOrderInitialData = {
  id?: string;
  gardenName?: string;
  fertilizerTypeName?: string;
  supplierName?: string;
  sp2bjNumber?: string;
  contractStartDate?: string;
  contractEndDate?: string;
  quantityOrdered?: number;
  budgetType?: "EKSPLOITASI" | "INVESTASI";
  unitPrice?: number;
  freightCost?: number;
  totalCost?: number;
  ppnAmount?: number;
  grandTotal?: number;
};

type SupplyOrderFormOption = {
  gardens: string[];
  fertilizerTypes: string[];
  suppliers: string[];
};

type SupplyOrderFormProps = {
  initialData?: SupplyOrderInitialData;
  options: SupplyOrderFormOption;
  mode?: "create" | "edit";
};

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

  return <p className="text-xs font-medium text-rose-600">{message}</p>;
}

function SectionCard({
  eyebrow,
  title,
  description,
  icon: Icon,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <section className="glass-surface rounded-[2rem] p-4 md:p-5">
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <p className="page-eyebrow">{eyebrow}</p>
          <h3 className="mt-3 text-lg font-semibold text-slate-900">{title}</h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            {description}
          </p>
        </div>

        <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/70 bg-white/72 text-emerald-700 shadow-[0_18px_30px_-24px_rgba(5,150,105,0.35)]">
          <Icon className="h-5 w-5" />
        </div>
      </div>

      {children}
    </section>
  );
}

function MetricChip({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "success" | "info";
}) {
  const toneClassName =
    tone === "success"
      ? "border-emerald-200/80 bg-emerald-500/[0.08]"
      : tone === "info"
        ? "border-sky-200/80 bg-sky-500/[0.08]"
        : "border-white/70 bg-white/62";

  return (
    <div
      className={cn(
        "rounded-2xl border px-4 py-3 shadow-[0_18px_30px_-28px_rgba(15,56,45,0.22)]",
        toneClassName,
      )}
    >
      <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-base font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function TextField({
  id,
  name,
  label,
  type = "text",
  min,
  step,
  defaultValue,
  required = true,
  error,
  onChange,
  placeholder,
  description,
  className,
}: {
  id: string;
  name: string;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  min?: number;
  step?: string;
  defaultValue?: string | number;
  required?: boolean;
  error?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("field-stack", className)}>
      <div className="space-y-1.5">
        <Label htmlFor={id}>{label}</Label>
        {description ? (
          <p className="text-xs leading-5 text-slate-500">{description}</p>
        ) : null}
      </div>

      <Input
        id={id}
        name={name}
        type={type}
        min={min}
        step={step}
        defaultValue={defaultValue}
        required={required}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        className={cn(
          error
            ? "border-rose-300/60 focus-visible:border-rose-400/60 focus-visible:ring-rose-400/12"
            : "",
        )}
      />

      <FieldError message={error} />
    </div>
  );
}

export function SupplyOrderForm({
  initialData,
  options,
  mode = "create",
}: SupplyOrderFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const [quantityOrdered, setQuantityOrdered] = useState<number>(
    initialData?.quantityOrdered ?? 0,
  );
  const [unitPrice, setUnitPrice] = useState<number>(
    initialData?.unitPrice ?? 0,
  );
  const [freightCost, setFreightCost] = useState<number>(
    initialData?.freightCost ?? 0,
  );

  const action =
    mode === "edit" && initialData?.id
      ? updateSupplyOrderAction.bind(null, initialData.id)
      : createSupplyOrderAction;

  const [state, formAction, pending] = useActionState(
    action,
    initialActionState,
  );

  const calculated = useMemo(
    () =>
      calculateSupplyCosts(
        quantityOrdered || 0,
        unitPrice || 0,
        freightCost || 0,
      ),
    [quantityOrdered, unitPrice, freightCost],
  );

  useEffect(() => {
    if (!state.success) {
      return;
    }

    if (mode === "create") {
      formRef.current?.reset();
      setQuantityOrdered(0);
      setUnitPrice(0);
      setFreightCost(0);
    }

    router.refresh();
  }, [mode, router, state.success]);

  const isEditMode = mode === "edit";

  return (
    <Card className="glass-surface-strong w-full overflow-hidden rounded-[2rem]">
      <CardHeader className="border-b border-white/55 pb-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-800">
              <Sparkles className="h-3.5 w-3.5" />
              {isEditMode ? "Mode Edit Kontrak" : "Form Input Kontrak"}
            </div>

            <CardTitle className="mt-4 text-xl text-slate-900 md:text-2xl">
              {isEditMode ? "Edit Pasokan Pupuk" : "Input Pasokan Pupuk"}
            </CardTitle>

            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
              Form dirancang ulang agar input kontrak lebih mudah dipindai:
              identitas pasokan, periode kontrak, volume, dan komponen biaya
              dikelompokkan jelas dengan ringkasan otomatis.
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-3 xl:min-w-[390px]">
            <MetricChip
              label="Kebun"
              value={formatNumber(options.gardens.length)}
              tone="info"
            />
            <MetricChip
              label="Jenis Pupuk"
              value={formatNumber(options.fertilizerTypes.length)}
              tone="default"
            />
            <MetricChip
              label="Supplier"
              value={formatNumber(options.suppliers.length)}
              tone="success"
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <form ref={formRef} action={formAction} className="space-y-6">
          <SectionCard
            eyebrow="Identitas Kontrak"
            title="Informasi dasar pasokan"
            description="Isi identitas utama agar kontrak mudah dikenali pada dashboard, tabel monitoring, dan proses tindak lanjut operasional."
            icon={ClipboardList}
          >
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-12">
              <SupplyOrderFormSelect
                id="gardenName"
                name="gardenName"
                label="Nama Kebun"
                placeholder="Pilih kebun"
                description="Lokasi kebun tujuan pasokan pupuk."
                defaultValue={initialData?.gardenName}
                options={options.gardens}
                error={getFieldError(state.errors, "gardenName")}
                className="xl:col-span-4"
              />

              <SupplyOrderFormSelect
                id="fertilizerTypeName"
                name="fertilizerTypeName"
                label="Jenis Pupuk"
                placeholder="Pilih jenis pupuk"
                description="Jenis pupuk yang tercantum pada kontrak."
                defaultValue={initialData?.fertilizerTypeName}
                options={options.fertilizerTypes}
                error={getFieldError(state.errors, "fertilizerTypeName")}
                className="xl:col-span-4"
              />

              <SupplyOrderFormSelect
                id="supplierName"
                name="supplierName"
                label="Pemasok"
                placeholder="Pilih pemasok"
                description="Vendor atau pemasok untuk kontrak ini."
                defaultValue={initialData?.supplierName}
                options={options.suppliers}
                error={getFieldError(state.errors, "supplierName")}
                className="xl:col-span-4"
              />

              <TextField
                id="sp2bjNumber"
                name="sp2bjNumber"
                label="No SP2BJ"
                placeholder="Contoh: SP2BJ-2026-001"
                description="Nomor referensi kontrak pasokan pupuk."
                defaultValue={initialData?.sp2bjNumber}
                error={getFieldError(state.errors, "sp2bjNumber")}
                className="xl:col-span-6"
              />
            </div>
          </SectionCard>

          <SectionCard
            eyebrow="Periode & Volume"
            title="Pengaturan kontrak pasokan"
            description="Tentukan rentang waktu, total volume, dan kategori anggaran agar monitoring progres kontrak lebih akurat."
            icon={CalendarRange}
          >
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-12">
              <TextField
                id="contractStartDate"
                name="contractStartDate"
                label="Tanggal Awal Kontrak"
                type="date"
                description="Tanggal mulai berlakunya kontrak."
                defaultValue={initialData?.contractStartDate}
                error={getFieldError(state.errors, "contractStartDate")}
                className="xl:col-span-3"
              />

              <TextField
                id="contractEndDate"
                name="contractEndDate"
                label="Tanggal Selesai Kontrak"
                type="date"
                description="Tanggal berakhirnya kontrak pasokan."
                defaultValue={initialData?.contractEndDate}
                error={getFieldError(state.errors, "contractEndDate")}
                className="xl:col-span-3"
              />

              <TextField
                id="quantityOrdered"
                name="quantityOrdered"
                label="Volume Pupuk (kg)"
                type="number"
                min={1}
                step="1"
                placeholder="Masukkan total volume"
                description="Total volume pupuk sesuai kontrak."
                defaultValue={initialData?.quantityOrdered}
                error={getFieldError(state.errors, "quantityOrdered")}
                onChange={(event) =>
                  setQuantityOrdered(Number(event.target.value || 0))
                }
                className="xl:col-span-3"
              />

              <SupplyOrderFormSelect
                id="budgetType"
                name="budgetType"
                label="Anggaran"
                placeholder="Pilih anggaran"
                description="Kategori pembiayaan untuk pasokan."
                defaultValue={initialData?.budgetType}
                options={[
                  { value: "EKSPLOITASI", label: "Eksploitasi" },
                  { value: "INVESTASI", label: "Investasi" },
                ]}
                error={getFieldError(state.errors, "budgetType")}
                className="xl:col-span-3"
              />
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <MetricChip
                label="Volume Input"
                value={`${formatNumber(quantityOrdered)} kg`}
                tone="info"
              />
              <MetricChip
                label="Status Form"
                value={isEditMode ? "Sedang edit" : "Baru"}
                tone="default"
              />
              <MetricChip
                label="Kategori"
                value={initialData?.budgetType ?? "Belum dipilih"}
                tone="success"
              />
            </div>
          </SectionCard>

          <SectionCard
            eyebrow="Biaya"
            title="Rincian biaya pasokan"
            description="Masukkan komponen biaya utama. Total biaya, PPN 11%, dan total akhir dihitung otomatis berdasarkan nilai yang diinput."
            icon={CircleDollarSign}
          >
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-12">
              <TextField
                id="unitPrice"
                name="unitPrice"
                label="Harga Satuan"
                type="number"
                min={0}
                step="0.01"
                placeholder="Masukkan harga satuan"
                description="Biaya per unit pupuk."
                defaultValue={initialData?.unitPrice}
                error={getFieldError(state.errors, "unitPrice")}
                onChange={(event) =>
                  setUnitPrice(Number(event.target.value || 0))
                }
                className="xl:col-span-6"
              />

              <TextField
                id="freightCost"
                name="freightCost"
                label="Ongkos Angkut"
                type="number"
                min={0}
                step="0.01"
                placeholder="Masukkan ongkos angkut"
                description="Biaya pengangkutan pasokan pupuk."
                defaultValue={initialData?.freightCost}
                error={getFieldError(state.errors, "freightCost")}
                onChange={(event) =>
                  setFreightCost(Number(event.target.value || 0))
                }
                className="xl:col-span-6"
              />
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <MetricChip
                label="Total Biaya"
                value={formatCurrency(calculated.totalCost)}
                tone="default"
              />
              <MetricChip
                label="PPN 11%"
                value={formatCurrency(calculated.ppnAmount)}
                tone="info"
              />
              <MetricChip
                label="Grand Total"
                value={formatCurrency(calculated.grandTotal)}
                tone="success"
              />
            </div>

            <div className="mt-5 rounded-[1.7rem] border border-emerald-200/80 bg-emerald-500/[0.07] p-4 md:p-5">
              <SupplyOrderFormSummary calculated={calculated} />
            </div>
          </SectionCard>

          <section className="glass-surface rounded-[2rem] p-4 md:p-5">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
              <div className="space-y-3 xl:max-w-3xl">
                <div className="flex items-start gap-3">
                  <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/70 bg-white/72 text-emerald-700">
                    <Truck className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-slate-900">
                      Simpan data pasokan
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Pastikan identitas kontrak, periode, volume, dan komponen
                      biaya sudah benar sebelum disimpan ke sistem.
                    </p>
                  </div>
                </div>

                <FormMessage message={state.message} success={state.success} />
              </div>

              <div className="flex w-full flex-col gap-3 xl:w-auto xl:items-end">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={pending}
                  className="w-full min-w-[240px] xl:w-auto"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {pending
                    ? "Menyimpan..."
                    : isEditMode
                      ? "Simpan Perubahan"
                      : "Simpan Pasokan"}
                </Button>
              </div>
            </div>
          </section>
        </form>
      </CardContent>
    </Card>
  );
}