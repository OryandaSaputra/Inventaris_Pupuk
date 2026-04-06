"use client";

import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SortableTableHead } from "@/components/ui/sortable-table-head";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { SupplierPerformanceRow } from "@/components/charts/supplier-performance-chart";
import {
  getNextSortState,
  sortRows,
  type SortState,
} from "@/lib/table-sort";
import { formatNumber } from "@/lib/utils";

type SupplierInfoSortKey =
  | "supplierName"
  | "totalContractQuantity"
  | "totalDeliveredQuantity"
  | "outstandingQuantity"
  | "fillRate"
  | "activeContracts"
  | "completedContracts"
  | "status";

function FillRateBar({ value }: { value: number }) {
  return (
    <div className="min-w-[160px] space-y-2">
      <div className="flex items-center justify-between gap-3 text-xs text-slate-600">
        <span>Fill rate</span>
        <span className="font-medium text-slate-900">{value}%</span>
      </div>

      <div className="h-2 rounded-full bg-slate-900/8">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-sky-400/90 via-emerald-400/80 to-lime-300/80"
          style={{ width: `${Math.max(value, value > 0 ? 6 : 0)}%` }}
        />
      </div>
    </div>
  );
}

function SupplierStatusBadge({ row }: { row: SupplierPerformanceRow }) {
  const isCompleted = row.outstandingQuantity <= 0;

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${
        isCompleted
          ? "border-emerald-200/80 bg-emerald-500/10 text-emerald-800"
          : "border-amber-200/80 bg-amber-500/10 text-amber-800"
      }`}
    >
      {isCompleted ? "Tuntas" : "Perlu follow-up"}
    </span>
  );
}

function SupplierMobileCard({ row }: { row: SupplierPerformanceRow }) {
  return (
    <div className="rounded-3xl border border-white/65 bg-white/72 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            {row.supplierName}
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            {formatNumber(row.activeContracts)} kontrak aktif • {formatNumber(row.completedContracts)} selesai
          </p>
        </div>

        <SupplierStatusBadge row={row} />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/55 bg-white/70 px-3 py-2">
          <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
            Kontrak
          </p>
          <p className="mt-1 font-semibold text-slate-900">
            {formatNumber(row.totalContractQuantity)}
          </p>
        </div>
        <div className="rounded-2xl border border-white/55 bg-white/70 px-3 py-2">
          <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
            Terkirim
          </p>
          <p className="mt-1 font-semibold text-slate-900">
            {formatNumber(row.totalDeliveredQuantity)}
          </p>
        </div>
        <div className="rounded-2xl border border-white/55 bg-white/70 px-3 py-2">
          <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
            Outstanding
          </p>
          <p className="mt-1 font-semibold text-slate-900">
            {formatNumber(row.outstandingQuantity)}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <FillRateBar value={row.fillRate} />
      </div>
    </div>
  );
}

export function SupplierInformationTable({
  rows,
}: {
  rows: SupplierPerformanceRow[];
}) {
  const [sortState, setSortState] = useState<SortState<SupplierInfoSortKey>>(null);

  const sortedRows = useMemo(
    () =>
      sortRows(rows, sortState, {
        supplierName: (row) => row.supplierName,
        totalContractQuantity: (row) => row.totalContractQuantity,
        totalDeliveredQuantity: (row) => row.totalDeliveredQuantity,
        outstandingQuantity: (row) => row.outstandingQuantity,
        fillRate: (row) => row.fillRate,
        activeContracts: (row) => row.activeContracts,
        completedContracts: (row) => row.completedContracts,
        status: (row) => row.outstandingQuantity <= 0,
      }),
    [rows, sortState],
  );

  function toggleSort(key: SupplierInfoSortKey) {
    setSortState((current) => getNextSortState(current, key));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rekap Supplier</CardTitle>
        <CardDescription>
          Gunakan tabel ini untuk membandingkan volume kontrak, realisasi,
          outstanding, dan status setiap pemasok. Klik judul kolom untuk sort.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {sortedRows.length === 0 ? (
          <div className="flex min-h-[220px] items-center justify-center rounded-3xl border border-dashed border-white/65 bg-white/70 px-6 py-10 text-center">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Belum ada data supplier
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Rekap pemasok akan muncul setelah data kontrak tersedia.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid gap-3 lg:hidden">
              {sortedRows.map((row) => (
                <SupplierMobileCard key={row.supplierName} row={row} />
              ))}
            </div>

            <div className="hidden overflow-x-auto lg:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <SortableTableHead
                      label="Supplier"
                      isActive={sortState?.key === "supplierName"}
                      direction={sortState?.key === "supplierName" ? sortState.direction : undefined}
                      onClick={() => toggleSort("supplierName")}
                    />
                    <SortableTableHead
                      label="Total Kontrak"
                      align="right"
                      isActive={sortState?.key === "totalContractQuantity"}
                      direction={sortState?.key === "totalContractQuantity" ? sortState.direction : undefined}
                      onClick={() => toggleSort("totalContractQuantity")}
                    />
                    <SortableTableHead
                      label="Terkirim"
                      align="right"
                      isActive={sortState?.key === "totalDeliveredQuantity"}
                      direction={sortState?.key === "totalDeliveredQuantity" ? sortState.direction : undefined}
                      onClick={() => toggleSort("totalDeliveredQuantity")}
                    />
                    <SortableTableHead
                      label="Outstanding"
                      align="right"
                      isActive={sortState?.key === "outstandingQuantity"}
                      direction={sortState?.key === "outstandingQuantity" ? sortState.direction : undefined}
                      onClick={() => toggleSort("outstandingQuantity")}
                    />
                    <SortableTableHead
                      label="Fill Rate"
                      isActive={sortState?.key === "fillRate"}
                      direction={sortState?.key === "fillRate" ? sortState.direction : undefined}
                      onClick={() => toggleSort("fillRate")}
                    />
                    <SortableTableHead
                      label="Kontrak Aktif"
                      align="right"
                      isActive={sortState?.key === "activeContracts"}
                      direction={sortState?.key === "activeContracts" ? sortState.direction : undefined}
                      onClick={() => toggleSort("activeContracts")}
                    />
                    <SortableTableHead
                      label="Selesai"
                      align="right"
                      isActive={sortState?.key === "completedContracts"}
                      direction={sortState?.key === "completedContracts" ? sortState.direction : undefined}
                      onClick={() => toggleSort("completedContracts")}
                    />
                    <SortableTableHead
                      label="Status"
                      isActive={sortState?.key === "status"}
                      direction={sortState?.key === "status" ? sortState.direction : undefined}
                      onClick={() => toggleSort("status")}
                    />
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {sortedRows.map((row) => (
                    <TableRow key={row.supplierName}>
                      <TableCell className="align-top">
                        <div className="min-w-[200px]">
                          <p className="font-medium text-slate-900">
                            {row.supplierName}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            Outstanding {formatNumber(row.outstandingQuantity)}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(row.totalContractQuantity)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(row.totalDeliveredQuantity)}
                      </TableCell>
                      <TableCell className="text-right font-medium text-slate-900">
                        {formatNumber(row.outstandingQuantity)}
                      </TableCell>
                      <TableCell>
                        <FillRateBar value={row.fillRate} />
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(row.activeContracts)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(row.completedContracts)}
                      </TableCell>
                      <TableCell>
                        <SupplierStatusBadge row={row} />
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