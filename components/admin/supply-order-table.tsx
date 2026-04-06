import {
  CalendarClock,
  PackageCheck,
  PackageX,
  ReceiptText,
  Truck,
} from "lucide-react";
import type { SupplyBudgetType } from "@/src/generated/prisma";
import type { NotificationStatus } from "@/lib/notifications";
import {
  getSupplyOrderProgressPercentage,
  SupplyOrderProgress,
} from "@/components/admin/supply-order-progress";
import { SupplyOrderRowActions } from "@/components/admin/supply-order-row-actions";
import { SupplyOrderStatusBadge } from "@/components/admin/supply-order-status-badge";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getBudgetTypeLabel } from "@/lib/supply-order";
import { formatCurrency, formatDate, formatNumber } from "@/lib/utils";

export type SupplyOrderTableRow = {
  id: string;
  gardenName: string;
  fertilizerTypeName: string;
  sp2bjNumber: string;
  contractStartDate: Date;
  contractEndDate: Date;
  quantityOrdered: number;
  budgetType: SupplyBudgetType;
  supplierName: string;
  unitPrice: number;
  freightCost: number;
  totalCost: number;
  ppnAmount: number;
  grandTotal: number;
  totalDelivered: number;
  remainingQuantity: number;
  remainingContractDays: number;
  notificationStatus: NotificationStatus;
  notificationLabel: string;
};

type SupplyOrderTableProps = {
  rows: SupplyOrderTableRow[];
  mode?: "home" | "management";
  title?: string;
  description?: string;
  maxRows?: number;
};

function formatCompactCurrency(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function getCompletionPercentage(row: SupplyOrderTableRow) {
  return getSupplyOrderProgressPercentage(row.quantityOrdered, row.totalDelivered);
}

function getNotificationStatusLabel(status: NotificationStatus) {
  switch (status) {
    case "HIJAU":
      return "Hijau";
    case "KUNING":
      return "Kuning";
    case "MERAH":
      return "Merah";
    default:
      return "Normal";
  }
}

function TableSummary({
  rows,
  displayedRows,
  isHomeMode,
}: {
  rows: SupplyOrderTableRow[];
  displayedRows: SupplyOrderTableRow[];
  isHomeMode: boolean;
}) {
  const urgentCount = rows.filter(
    (row) => row.notificationStatus === "MERAH" || row.notificationStatus === "KUNING",
  ).length;
  const completedCount = rows.filter((row) => row.remainingQuantity <= 0).length;

  return (
    <div className="flex flex-wrap gap-2 text-xs text-slate-600">
      <span className="inline-flex rounded-full border border-white/65 bg-white/70 px-3 py-1.5">
        Total kontrak:
        <strong className="ml-1 text-slate-900">{formatNumber(rows.length)}</strong>
      </span>

      {isHomeMode ? (
        <span className="inline-flex rounded-full border border-white/65 bg-white/70 px-3 py-1.5">
          Ditampilkan:
          <strong className="ml-1 text-slate-900">
            {formatNumber(displayedRows.length)}
          </strong>
        </span>
      ) : (
        <>
          <span className="inline-flex rounded-full border border-amber-200/80 bg-amber-500/10 px-3 py-1.5 text-amber-800">
            Perlu perhatian:
            <strong className="ml-1 text-slate-900">{formatNumber(urgentCount)}</strong>
          </span>
          <span className="inline-flex rounded-full border border-emerald-200/80 bg-emerald-500/10 px-3 py-1.5 text-emerald-800">
            Selesai:
            <strong className="ml-1 text-slate-900">{formatNumber(completedCount)}</strong>
          </span>
        </>
      )}
    </div>
  );
}

function HomeTableHeader() {
  return (
    <TableRow>
      <TableHead className="sticky top-0 z-10 bg-white/85 backdrop-blur">
        SP2BJ &amp; Kontrak
      </TableHead>
      <TableHead className="sticky top-0 z-10 bg-white/85 backdrop-blur">
        Kebun
      </TableHead>
      <TableHead className="sticky top-0 z-10 bg-white/85 backdrop-blur">
        Jenis Pupuk
      </TableHead>
      <TableHead className="sticky top-0 z-10 bg-white/85 backdrop-blur">
        Pemasok
      </TableHead>
      <TableHead className="sticky top-0 z-10 bg-white/85 backdrop-blur">
        Progress Pasokan
      </TableHead>
      <TableHead className="sticky top-0 z-10 bg-white/85 backdrop-blur text-right">
        Sisa Volume
      </TableHead>
      <TableHead className="sticky top-0 z-10 bg-white/85 backdrop-blur text-right">
        Sisa Kontrak
      </TableHead>
      <TableHead className="sticky top-0 z-10 bg-white/85 backdrop-blur">
        Status
      </TableHead>
    </TableRow>
  );
}

function ManagementTableHeader() {
  return (
    <TableRow>
      <TableHead className="sticky top-0 z-10 bg-white/85 backdrop-blur">
        Kontrak
      </TableHead>
      <TableHead className="sticky top-0 z-10 bg-white/85 backdrop-blur">
        Kebun &amp; Pupuk
      </TableHead>
      <TableHead className="sticky top-0 z-10 bg-white/85 backdrop-blur">
        Supplier &amp; Anggaran
      </TableHead>
      <TableHead className="sticky top-0 z-10 bg-white/85 backdrop-blur text-right">
        Nilai Kontrak
      </TableHead>
      <TableHead className="sticky top-0 z-10 bg-white/85 backdrop-blur">
        Progress
      </TableHead>
      <TableHead className="sticky top-0 z-10 bg-white/85 backdrop-blur text-right">
        Sisa Volume
      </TableHead>
      <TableHead className="sticky top-0 z-10 bg-white/85 backdrop-blur">
        Masa Kontrak
      </TableHead>
      <TableHead className="sticky top-0 z-10 bg-white/85 backdrop-blur">
        Notifikasi
      </TableHead>
      <TableHead className="sticky top-0 z-10 w-[160px] min-w-[160px] bg-white/85 text-right backdrop-blur">
        Aksi
      </TableHead>
    </TableRow>
  );
}

function HomeTableRow({ row }: { row: SupplyOrderTableRow }) {
  return (
    <TableRow className="hover:bg-white/45">
      <TableCell className="align-top">
        <div className="min-w-[210px] space-y-1.5 whitespace-normal">
          <p className="font-semibold text-slate-900">{row.sp2bjNumber}</p>
          <p className="text-xs leading-5 text-slate-500">
            {formatDate(row.contractStartDate)} - {formatDate(row.contractEndDate)}
          </p>
        </div>
      </TableCell>

      <TableCell className="align-top">
        <span className="font-medium text-slate-900">{row.gardenName}</span>
      </TableCell>

      <TableCell className="align-top">
        <div className="min-w-[150px] whitespace-normal text-slate-700">
          {row.fertilizerTypeName}
        </div>
      </TableCell>

      <TableCell className="align-top">
        <div className="min-w-[160px] whitespace-normal text-slate-700">
          {row.supplierName}
        </div>
      </TableCell>

      <TableCell className="align-top">
        <SupplyOrderProgress
          quantityOrdered={row.quantityOrdered}
          totalDelivered={row.totalDelivered}
        />
      </TableCell>

      <TableCell className="text-right align-top font-medium text-slate-900">
        {formatNumber(row.remainingQuantity)}
      </TableCell>

      <TableCell className="text-right align-top font-medium text-slate-900">
        {row.remainingContractDays} hari
      </TableCell>

      <TableCell className="align-top">
        <SupplyOrderStatusBadge
          status={row.notificationStatus}
          label={row.notificationLabel}
        />
      </TableCell>
    </TableRow>
  );
}

function HomeMobileCard({ row }: { row: SupplyOrderTableRow }) {
  return (
    <div className="rounded-[28px] border border-white/65 bg-white/60 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700/90">
            {row.sp2bjNumber}
          </p>
          <h3 className="text-base font-semibold text-slate-900">{row.gardenName}</h3>
          <p className="text-sm text-slate-600">{row.fertilizerTypeName}</p>
        </div>

        <SupplyOrderStatusBadge
          status={row.notificationStatus}
          label={getNotificationStatusLabel(row.notificationStatus)}
          className="max-w-[220px]"
        />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/65 bg-white/72 p-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-slate-500">
            <Truck className="h-3.5 w-3.5" />
            Supplier
          </div>
          <p className="mt-2 font-medium text-slate-900">{row.supplierName}</p>
          <p className="mt-1 text-xs text-slate-500">
            {formatDate(row.contractStartDate)} - {formatDate(row.contractEndDate)}
          </p>
        </div>

        <div className="rounded-2xl border border-white/65 bg-white/72 p-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-slate-500">
            <PackageX className="h-3.5 w-3.5" />
            Sisa volume
          </div>
          <p className="mt-2 font-semibold text-slate-900">
            {formatNumber(row.remainingQuantity)} kg
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {row.remainingContractDays} hari kontrak tersisa
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-white/65 bg-white/72 p-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-slate-500">
            <PackageCheck className="h-3.5 w-3.5" />
            Progress pasokan
          </div>
          <span className="text-xs text-slate-600">
            {formatNumber(row.totalDelivered)} / {formatNumber(row.quantityOrdered)} kg
          </span>
        </div>

        <SupplyOrderProgress
          quantityOrdered={row.quantityOrdered}
          totalDelivered={row.totalDelivered}
          className="mt-3 min-w-0"
        />
      </div>
    </div>
  );
}

function ManagementTableRow({ row }: { row: SupplyOrderTableRow }) {
  const completion = getCompletionPercentage(row);
  const remainingPercentage =
    row.quantityOrdered <= 0
      ? 0
      : Math.max(
          0,
          Math.round((Math.max(0, row.remainingQuantity) / row.quantityOrdered) * 100),
        );

  return (
    <TableRow className="hover:bg-white/45">
      <TableCell className="align-top">
        <div className="min-w-[190px] space-y-2 whitespace-normal">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl border border-white/65 bg-white/70 p-2 text-slate-700">
              <ReceiptText className="h-4 w-4" />
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-slate-900">{row.sp2bjNumber}</p>
              <p className="text-xs leading-5 text-slate-500">
                {formatDate(row.contractStartDate)} - {formatDate(row.contractEndDate)}
              </p>
            </div>
          </div>
        </div>
      </TableCell>

      <TableCell className="align-top">
        <div className="min-w-[190px] space-y-2 whitespace-normal">
          <p className="font-medium text-slate-900">{row.gardenName}</p>
          <div className="inline-flex max-w-full rounded-full border border-white/65 bg-white/72 px-3 py-1 text-xs text-slate-700">
            <span className="truncate">{row.fertilizerTypeName}</span>
          </div>
        </div>
      </TableCell>

      <TableCell className="align-top">
        <div className="min-w-[180px] space-y-2 whitespace-normal">
          <div className="flex items-center gap-2 text-slate-900">
            <Truck className="h-4 w-4 text-slate-500" />
            <span className="font-medium">{row.supplierName}</span>
          </div>
          <Badge
            variant="ghost"
            className="border-white/65 bg-white/72 px-3 py-1 text-slate-700"
          >
            {getBudgetTypeLabel(row.budgetType)}
          </Badge>
        </div>
      </TableCell>

      <TableCell className="min-w-[210px] text-right align-top">
        <div className="space-y-1.5">
          <p className="text-base font-semibold text-slate-900">
            {formatCurrency(row.grandTotal)}
          </p>
          <div className="space-y-1 text-xs text-slate-500">
            <p>Harga satuan: {formatCurrency(row.unitPrice)}</p>
            <p>Ongkos angkut: {formatCurrency(row.freightCost)}</p>
            <p>PPN 11%: {formatCurrency(row.ppnAmount)}</p>
          </div>
        </div>
      </TableCell>

      <TableCell className="align-top">
        <div className="min-w-[220px] space-y-2">
          <SupplyOrderProgress
            quantityOrdered={row.quantityOrdered}
            totalDelivered={row.totalDelivered}
            className="min-w-0"
          />
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Terkirim {formatNumber(row.totalDelivered)} kg</span>
            <span>{completion}% tercapai</span>
          </div>
        </div>
      </TableCell>

      <TableCell className="min-w-[160px] text-right align-top">
        <div className="space-y-1.5">
          <p className="text-base font-semibold text-slate-900">
            {formatNumber(row.remainingQuantity)} kg
          </p>
          <p className="text-xs text-slate-500">{remainingPercentage}% dari kontrak</p>
        </div>
      </TableCell>

      <TableCell className="align-top">
        <div className="min-w-[190px] space-y-2 whitespace-normal">
          <div className="flex items-center gap-2 text-slate-900">
            <CalendarClock className="h-4 w-4 text-slate-500" />
            <span className="font-medium">
              {row.remainingContractDays >= 0
                ? `${formatNumber(row.remainingContractDays)} hari lagi`
                : `${formatNumber(Math.abs(row.remainingContractDays))} hari lewat`}
            </span>
          </div>
          <p className="text-xs text-slate-500">
            {formatDate(row.contractStartDate)} - {formatDate(row.contractEndDate)}
          </p>
        </div>
      </TableCell>

      <TableCell className="align-top">
        <SupplyOrderStatusBadge
          status={row.notificationStatus}
          label={getNotificationStatusLabel(row.notificationStatus)}
          className="justify-start text-left"
        />
      </TableCell>

      <TableCell className="w-[160px] min-w-[160px] whitespace-nowrap text-right align-top">
        <SupplyOrderRowActions id={row.id} />
      </TableCell>
    </TableRow>
  );
}

function ManagementMobileCard({ row }: { row: SupplyOrderTableRow }) {
  return (
    <div className="rounded-[28px] border border-white/65 bg-white/60 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700/90">
            {row.sp2bjNumber}
          </p>
          <h3 className="text-base font-semibold text-slate-900">{row.gardenName}</h3>
          <p className="text-sm text-slate-600">{row.fertilizerTypeName}</p>
        </div>

        <SupplyOrderStatusBadge
          status={row.notificationStatus}
          label={getNotificationStatusLabel(row.notificationStatus)}
          className="max-w-[220px]"
        />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/65 bg-white/72 p-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-slate-500">
            <Truck className="h-3.5 w-3.5" />
            Supplier
          </div>
          <p className="mt-2 font-medium text-slate-900">{row.supplierName}</p>
          <p className="mt-1 text-xs text-slate-500">
            {getBudgetTypeLabel(row.budgetType)}
          </p>
        </div>

        <div className="rounded-2xl border border-white/65 bg-white/72 p-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-slate-500">
            <ReceiptText className="h-3.5 w-3.5" />
            Nilai kontrak
          </div>
          <p className="mt-2 font-semibold text-slate-900">
            {formatCompactCurrency(row.grandTotal)}
          </p>
          <p className="mt-1 text-xs text-slate-500">Total akhir termasuk PPN</p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-white/65 bg-white/72 p-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-slate-500">
            <PackageCheck className="h-3.5 w-3.5" />
            Progress pasokan
          </div>
          <span className="text-xs text-slate-600">
            {formatNumber(row.totalDelivered)} / {formatNumber(row.quantityOrdered)} kg
          </span>
        </div>

        <SupplyOrderProgress
          quantityOrdered={row.quantityOrdered}
          totalDelivered={row.totalDelivered}
          className="mt-3 min-w-0"
        />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/65 bg-white/72 p-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-slate-500">
            <PackageX className="h-3.5 w-3.5" />
            Sisa volume
          </div>
          <p className="mt-2 font-semibold text-slate-900">
            {formatNumber(row.remainingQuantity)} kg
          </p>
        </div>

        <div className="rounded-2xl border border-white/65 bg-white/72 p-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-slate-500">
            <CalendarClock className="h-3.5 w-3.5" />
            Masa kontrak
          </div>
          <p className="mt-2 font-semibold text-slate-900">
            {row.remainingContractDays >= 0
              ? `${formatNumber(row.remainingContractDays)} hari lagi`
              : `${formatNumber(Math.abs(row.remainingContractDays))} hari lewat`}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {formatDate(row.contractStartDate)} - {formatDate(row.contractEndDate)}
          </p>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <SupplyOrderRowActions id={row.id} />
      </div>
    </div>
  );
}

export function SupplyOrderTable({
  rows,
  mode = "management",
  title,
  description,
  maxRows,
}: SupplyOrderTableProps) {
  const displayedRows =
    typeof maxRows === "number" ? rows.slice(0, maxRows) : rows;

  const isHomeMode = mode === "home";

  return (
    <Card>
      <CardHeader className="gap-3 md:flex md:flex-row md:items-start md:justify-between">
        <div>
          <CardTitle>
            {title ??
              (isHomeMode
                ? "Tabel Monitoring Pasokan"
                : "Daftar Pasokan Pupuk")}
          </CardTitle>
          <CardDescription>
            {description ??
              (isHomeMode
                ? "Fokuskan perhatian pada progres realisasi, sisa volume, masa kontrak, dan status notifikasi setiap SP2BJ."
                : "Tampilan pengelolaan kontrak diringkas agar progres, nilai, risiko, dan aksi utama lebih cepat dipindai tanpa kehilangan detail penting.")}
          </CardDescription>
        </div>

        <TableSummary
          rows={rows}
          displayedRows={displayedRows}
          isHomeMode={isHomeMode}
        />
      </CardHeader>

      <CardContent>
        {displayedRows.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-white/65 bg-white/55 px-6 py-12 text-center">
            <p className="text-base font-medium text-slate-900">
              Belum ada data pasokan pupuk.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Tambahkan kontrak baru agar daftar pasokan mulai terisi dan dapat dimonitor.
            </p>
          </div>
        ) : isHomeMode ? (
          <>
            <div className="grid gap-4 xl:hidden">
              {displayedRows.map((row) => (
                <HomeMobileCard key={row.id} row={row} />
              ))}
            </div>

            <div className="hidden overflow-x-auto xl:block">
              <Table>
                <TableHeader className="[&_tr]:border-white/45">
                  <HomeTableHeader />
                </TableHeader>
                <TableBody>
                  {displayedRows.map((row) => (
                    <HomeTableRow key={row.id} row={row} />
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        ) : (
          <>
            <div className="grid gap-4 xl:hidden">
              {displayedRows.map((row) => (
                <ManagementMobileCard key={row.id} row={row} />
              ))}
            </div>

            <div className="hidden overflow-x-auto xl:block">
              <Table>
                <TableHeader className="[&_tr]:border-white/45">
                  <ManagementTableHeader />
                </TableHeader>
                <TableBody>
                  {displayedRows.map((row) => (
                    <ManagementTableRow key={row.id} row={row} />
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