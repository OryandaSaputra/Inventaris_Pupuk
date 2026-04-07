"use client";

import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ClipboardCheck,
  PackageCheck,
  Save,
  Sparkles,
  Warehouse,
} from "lucide-react";
import { createDeliveryReceiptAction } from "@/lib/actions/krani";
import { useActionFeedback } from "@/hooks/use-action-feedback";
import { initialActionState } from "@/lib/actions/shared";
import { DeliveryFormSelect } from "@/components/krani/delivery-form-select";
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
import { formatNumber } from "@/lib/utils";

export type DeliveryOption = {
  id: string;
  gardenId: string;
  gardenName: string;
  fertilizerTypeId: string;
  fertilizerTypeName: string;
  supplierName: string;
  sp2bjNumber: string;
  remainingQuantity: number;
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
      className={`rounded-2xl border px-4 py-3 shadow-[0_18px_30px_-28px_rgba(15,56,45,0.22)] ${toneClassName}`}
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
  placeholder,
  min,
  max,
  required = true,
  error,
  readOnly = false,
  value,
  onInput,
  description,
}: {
  id: string;
  name?: string;
  label: string;
  type?: "text" | "date" | "number";
  placeholder?: string;
  min?: number;
  max?: number;
  required?: boolean;
  error?: string;
  readOnly?: boolean;
  value?: string;
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
  description?: string;
}) {
  return (
    <div className="field-stack">
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
        placeholder={placeholder}
        min={min}
        max={max}
        required={required}
        aria-invalid={Boolean(error)}
        readOnly={readOnly}
        value={value}
        onInput={onInput}
        className={
          error
            ? "border-rose-300/60 focus-visible:border-rose-400/60 focus-visible:ring-rose-400/12"
            : readOnly
              ? "bg-white/82"
              : ""
        }
      />

      <FieldError message={error} />
    </div>
  );
}

export function DeliveryForm({
  options,
  gardenName,
}: {
  options: DeliveryOption[];
  gardenName: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const [fertilizerTypeId, setFertilizerTypeId] = useState("");
  const [supplyOrderId, setSupplyOrderId] = useState("");

  const [state, formAction, pending] = useActionState(
    createDeliveryReceiptAction,
    initialActionState,
  );

  useActionFeedback({
    pending,
    state,
    loadingMessage: "Menyimpan data penerimaan...",
    loadingDescription:
      "Mohon tunggu sebentar, sistem sedang memperbarui histori penerimaan pupuk.",
    successTitle: "Penerimaan disimpan",
    errorTitle: "Gagal menyimpan penerimaan",
  });

  useEffect(() => {
    if (!state.success) {
      return;
    }

    formRef.current?.reset();
    setFertilizerTypeId("");
    setSupplyOrderId("");
    router.refresh();
  }, [router, state.success]);

  const fertilizers = useMemo(() => {
    const map = new Map<string, string>();

    for (const item of options) {
      map.set(item.fertilizerTypeId, item.fertilizerTypeName);
    }

    return Array.from(map, ([id, name]) => ({ value: id, label: name }));
  }, [options]);

  const supplyOrders = useMemo(() => {
    return options
      .filter((item) => item.fertilizerTypeId === fertilizerTypeId)
      .map((item) => ({
        value: item.id,
        label: `${item.sp2bjNumber} · Sisa ${formatNumber(
          item.remainingQuantity,
        )}`,
      }));
  }, [fertilizerTypeId, options]);

  const selectedOrder = useMemo(() => {
    return options.find((item) => item.id === supplyOrderId);
  }, [options, supplyOrderId]);

  const availableOrderCount = useMemo(() => {
    return options.filter((item) => item.remainingQuantity > 0).length;
  }, [options]);

  return (
    <Card className="glass-surface-strong w-full overflow-hidden rounded-[2rem]">
      <CardHeader className="border-b border-white/55 pb-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-800">
              <Sparkles className="h-3.5 w-3.5" />
              Form Input Penerimaan
            </div>

            <CardTitle className="mt-4 text-xl text-slate-900 md:text-2xl">
              Input Penerimaan Pupuk
            </CardTitle>

            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
              Form ini hanya menampilkan kontrak pasokan yang sesuai dengan kebun
              user. Alurnya dibuat lebih rapi agar pemilihan pupuk, SP2BJ,
              supplier, dan volume penerimaan terasa lebih cepat.
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-3 xl:min-w-[390px]">
            <MetricChip label="Kebun" value={gardenName} tone="info" />
            <MetricChip
              label="Jenis Pupuk"
              value={formatNumber(fertilizers.length)}
              tone="default"
            />
            <MetricChip
              label="SP2BJ Aktif"
              value={formatNumber(availableOrderCount)}
              tone="success"
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <form ref={formRef} action={formAction} className="space-y-6">
          <SectionCard
            eyebrow="Identitas Penerimaan"
            title="Pilih kontrak yang akan diterima"
            description="Pilih jenis pupuk terlebih dahulu, lalu pilih SP2BJ yang masih memiliki sisa kuantitas agar data penerimaan langsung terhubung ke kontrak yang benar."
            icon={ClipboardCheck}
          >
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-12">
              <div className="xl:col-span-4">
                <TextField
                  id="gardenReadonly"
                  label="Kebun"
                  value={gardenName}
                  placeholder="Kebun user"
                  readOnly
                  required={false}
                  description="Kebun aktif berdasarkan user yang sedang login."
                />
              </div>

              <div className="xl:col-span-4">
                <DeliveryFormSelect
                  id="fertilizerTypeId"
                  label="Jenis Pupuk"
                  value={fertilizerTypeId}
                  placeholder="Pilih pupuk"
                  options={fertilizers}
                  disabled={options.length === 0}
                  description="Hanya menampilkan pupuk yang tersedia untuk kebun ini."
                  onChange={(event) => {
                    setFertilizerTypeId(event.target.value);
                    setSupplyOrderId("");
                  }}
                />
              </div>

              <div className="xl:col-span-4">
                <DeliveryFormSelect
                  id="supplyOrderId"
                  name="supplyOrderId"
                  label="No SP2BJ"
                  value={supplyOrderId}
                  placeholder="Pilih SP2BJ"
                  options={supplyOrders}
                  disabled={!fertilizerTypeId}
                  required
                  error={getFieldError(state.errors, "supplyOrderId")}
                  description="Daftar SP2BJ akan muncul setelah jenis pupuk dipilih."
                  onChange={(event) => setSupplyOrderId(event.target.value)}
                />
              </div>

              <div className="xl:col-span-6">
                <TextField
                  id="supplierNameReadonly"
                  label="Pemasok"
                  value={selectedOrder?.supplierName ?? ""}
                  placeholder="Akan otomatis terisi"
                  readOnly
                  required={false}
                  description="Nama pemasok mengikuti SP2BJ yang dipilih."
                />
              </div>

              <div className="xl:col-span-6">
                <div className="rounded-[1.6rem] border border-white/70 bg-white/68 p-4 shadow-[0_18px_30px_-26px_rgba(15,56,45,0.2)]">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                    Ringkasan kontrak terpilih
                  </p>

                  {selectedOrder ? (
                    <div className="mt-3 grid gap-3 sm:grid-cols-3">
                      <MetricChip
                        label="SP2BJ"
                        value={selectedOrder.sp2bjNumber}
                        tone="default"
                      />
                      <MetricChip
                        label="Sisa Kuantitas"
                        value={formatNumber(selectedOrder.remainingQuantity)}
                        tone="success"
                      />
                      <MetricChip
                        label="Supplier"
                        value={selectedOrder.supplierName}
                        tone="info"
                      />
                    </div>
                  ) : (
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      Pilih jenis pupuk dan SP2BJ untuk melihat ringkasan kontrak
                      yang akan dipakai saat input penerimaan.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard
            eyebrow="Detail Penerimaan"
            title="Lengkapi transaksi penerimaan"
            description="Isi data kendaraan, tanggal diterima, volume kiriman, dan jumlah sak dengan teliti agar stok dan histori penerimaan tetap akurat."
            icon={Warehouse}
          >
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-12">
              <div className="xl:col-span-3">
                <TextField
                  id="licensePlate"
                  name="licensePlate"
                  label="No Polisi"
                  placeholder="BK1234AA"
                  description="Plat kendaraan pengangkut pupuk."
                  error={getFieldError(state.errors, "licensePlate")}
                  onInput={(event) => {
                    const target = event.currentTarget;
                    target.value = target.value.toUpperCase();
                  }}
                />
              </div>

              <div className="xl:col-span-3">
                <TextField
                  id="receivedDate"
                  name="receivedDate"
                  label="Tanggal Penerimaan"
                  type="date"
                  description="Tanggal pupuk benar-benar diterima."
                  error={getFieldError(state.errors, "receivedDate")}
                />
              </div>

              <div className="xl:col-span-3">
                <div className="field-stack">
                  <div className="space-y-1.5">
                    <Label htmlFor="quantityDelivered">Jumlah Pengiriman</Label>
                    <p className="text-xs leading-5 text-slate-500">
                      Volume yang diterima pada transaksi ini.
                    </p>
                  </div>

                  <Input
                    id="quantityDelivered"
                    name="quantityDelivered"
                    type="number"
                    min={1}
                    max={selectedOrder?.remainingQuantity}
                    required
                    aria-invalid={Boolean(
                      getFieldError(state.errors, "quantityDelivered"),
                    )}
                    className={
                      getFieldError(state.errors, "quantityDelivered")
                        ? "border-rose-300/60 focus-visible:border-rose-400/60 focus-visible:ring-rose-400/12"
                        : ""
                    }
                  />

                  {selectedOrder ? (
                    <p className="text-xs text-slate-500">
                      Sisa kuantitas pada kontrak ini:{" "}
                      <strong className="text-slate-900">
                        {formatNumber(selectedOrder.remainingQuantity)}
                      </strong>
                    </p>
                  ) : null}

                  <FieldError
                    message={getFieldError(state.errors, "quantityDelivered")}
                  />
                </div>
              </div>

              <div className="xl:col-span-3">
                <TextField
                  id="sackCount"
                  name="sackCount"
                  label="Jumlah Sak"
                  type="number"
                  min={1}
                  description="Jumlah karung/sak yang diterima."
                  error={getFieldError(state.errors, "sackCount")}
                />
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <MetricChip
                label="Mode Input"
                value="Penerimaan"
                tone="info"
              />
              <MetricChip
                label="Kontrak Dipilih"
                value={selectedOrder ? "Ya" : "Belum"}
                tone="default"
              />
              <MetricChip
                label="Status Form"
                value={pending ? "Menyimpan..." : "Siap"}
                tone="success"
              />
            </div>
          </SectionCard>

          <section className="glass-surface rounded-[2rem] p-4 md:p-5">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
              <div className="space-y-3 xl:max-w-3xl">
                <div className="flex items-start gap-3">
                  <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/70 bg-white/72 text-emerald-700">
                    <PackageCheck className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-slate-900">
                      Simpan data penerimaan
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Pastikan SP2BJ yang dipilih benar dan volume kiriman sesuai
                      dengan barang yang diterima sebelum data disimpan.
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
                  {pending ? "Menyimpan..." : "Simpan Penerimaan"}
                </Button>
              </div>
            </div>
          </section>
        </form>
      </CardContent>
    </Card>
  );
}