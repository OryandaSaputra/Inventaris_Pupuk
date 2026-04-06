"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SortableTableHead } from "@/components/ui/sortable-table-head";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getNextSortState,
  sortRows,
  type SortState,
} from "@/lib/table-sort";
import { formatDate, formatNumber } from "@/lib/utils";

export type DeliveryTableRow = {
  id: string;
  licensePlate: string;
  receivedDate: Date;
  quantityDelivered: number;
  sackCount: number;
  supplyOrder: {
    sp2bjNumber: string;
    garden: { name: string };
    fertilizerType: { name: string };
    supplier: { name: string };
  };
  createdBy: { name: string };
};

type DeliverySortKey =
  | "garden"
  | "fertilizer"
  | "sp2bj"
  | "supplier"
  | "licensePlate"
  | "receivedDate"
  | "quantityDelivered"
  | "sackCount"
  | "createdBy";

function MobileDeliveryCard({ row }: { row: DeliveryTableRow }) {
  return (
    <div className="rounded-[28px] border border-white/65 bg-white/60 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700/90">
            {row.supplyOrder.sp2bjNumber}
          </p>
          <h3 className="mt-1 text-base font-semibold text-slate-900">
            {row.supplyOrder.garden.name}
          </h3>
          <p className="text-sm text-slate-600">
            {row.supplyOrder.fertilizerType.name}
          </p>
        </div>

        <span className="rounded-full border border-sky-200/80 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-800">
          {formatDate(row.receivedDate)}
        </span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/65 bg-white/72 p-3">
          <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500">
            Supplier
          </p>
          <p className="mt-2 font-medium text-slate-900">
            {row.supplyOrder.supplier.name}
          </p>
        </div>

        <div className="rounded-2xl border border-white/65 bg-white/72 p-3">
          <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500">
            No Polisi
          </p>
          <p className="mt-2 font-medium text-slate-900">{row.licensePlate}</p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-emerald-200/80 bg-emerald-500/[0.08] p-3">
          <p className="text-[11px] uppercase tracking-[0.14em] text-slate-600">
            Pengiriman
          </p>
          <p className="mt-2 font-semibold text-slate-900">
            {formatNumber(row.quantityDelivered)}
          </p>
        </div>

        <div className="rounded-2xl border border-amber-200/80 bg-amber-500/[0.08] p-3">
          <p className="text-[11px] uppercase tracking-[0.14em] text-slate-600">
            Jumlah Sak
          </p>
          <p className="mt-2 font-semibold text-slate-900">
            {formatNumber(row.sackCount)}
          </p>
        </div>

        <div className="rounded-2xl border border-white/65 bg-white/72 p-3">
          <p className="text-[11px] uppercase tracking-[0.14em] text-slate-600">
            Input Oleh
          </p>
          <p className="mt-2 font-semibold text-slate-900">{row.createdBy.name}</p>
        </div>
      </div>
    </div>
  );
}

export function DeliveryTable({ rows }: { rows: DeliveryTableRow[] }) {
  const [sortState, setSortState] = useState<SortState<DeliverySortKey>>(null);

  const sortedRows = useMemo(
    () =>
      sortRows(rows, sortState, {
        garden: (row) => row.supplyOrder.garden.name,
        fertilizer: (row) => row.supplyOrder.fertilizerType.name,
        sp2bj: (row) => row.supplyOrder.sp2bjNumber,
        supplier: (row) => row.supplyOrder.supplier.name,
        licensePlate: (row) => row.licensePlate,
        receivedDate: (row) => row.receivedDate,
        quantityDelivered: (row) => row.quantityDelivered,
        sackCount: (row) => row.sackCount,
        createdBy: (row) => row.createdBy.name,
      }),
    [rows, sortState],
  );

  function toggleSort(key: DeliverySortKey) {
    setSortState((current) => getNextSortState(current, key));
  }

  return (
    <Card>
      <CardHeader className="gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
            Data penerimaan
          </p>
          <CardTitle className="mt-2">Tabel Informasi Penerimaan</CardTitle>
        </div>
      </CardHeader>

      <CardContent>
        {sortedRows.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-white/65 bg-white/55 px-6 py-12 text-center">
            <p className="text-base font-medium text-slate-900">
              Belum ada data penerimaan pupuk.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Data penerimaan akan muncul setelah krani menyimpan transaksi pertama.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-slate-600">
              Klik judul kolom untuk mengurutkan data penerimaan berdasarkan kebun,
              supplier, tanggal, atau volume.
            </div>

            <div className="grid gap-4 xl:hidden">
              {sortedRows.map((row) => (
                <MobileDeliveryCard key={row.id} row={row} />
              ))}
            </div>

            <div className="hidden xl:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <SortableTableHead
                      label="Kebun"
                      isActive={sortState?.key === "garden"}
                      direction={sortState?.key === "garden" ? sortState.direction : undefined}
                      onClick={() => toggleSort("garden")}
                    />
                    <SortableTableHead
                      label="Jenis Pupuk"
                      isActive={sortState?.key === "fertilizer"}
                      direction={sortState?.key === "fertilizer" ? sortState.direction : undefined}
                      onClick={() => toggleSort("fertilizer")}
                    />
                    <SortableTableHead
                      label="No SP2BJ"
                      isActive={sortState?.key === "sp2bj"}
                      direction={sortState?.key === "sp2bj" ? sortState.direction : undefined}
                      onClick={() => toggleSort("sp2bj")}
                    />
                    <SortableTableHead
                      label="Pemasok"
                      isActive={sortState?.key === "supplier"}
                      direction={sortState?.key === "supplier" ? sortState.direction : undefined}
                      onClick={() => toggleSort("supplier")}
                    />
                    <SortableTableHead
                      label="No Polisi"
                      isActive={sortState?.key === "licensePlate"}
                      direction={sortState?.key === "licensePlate" ? sortState.direction : undefined}
                      onClick={() => toggleSort("licensePlate")}
                    />
                    <SortableTableHead
                      label="Tgl Penerimaan"
                      isActive={sortState?.key === "receivedDate"}
                      direction={sortState?.key === "receivedDate" ? sortState.direction : undefined}
                      onClick={() => toggleSort("receivedDate")}
                    />
                    <SortableTableHead
                      label="Jumlah Pengiriman"
                      align="right"
                      isActive={sortState?.key === "quantityDelivered"}
                      direction={sortState?.key === "quantityDelivered" ? sortState.direction : undefined}
                      onClick={() => toggleSort("quantityDelivered")}
                    />
                    <SortableTableHead
                      label="Jumlah Sak"
                      align="right"
                      isActive={sortState?.key === "sackCount"}
                      direction={sortState?.key === "sackCount" ? sortState.direction : undefined}
                      onClick={() => toggleSort("sackCount")}
                    />
                    <SortableTableHead
                      label="Input Oleh"
                      isActive={sortState?.key === "createdBy"}
                      direction={sortState?.key === "createdBy" ? sortState.direction : undefined}
                      onClick={() => toggleSort("createdBy")}
                    />
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {sortedRows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="font-medium text-slate-900">
                        {row.supplyOrder.garden.name}
                      </TableCell>
                      <TableCell>{row.supplyOrder.fertilizerType.name}</TableCell>
                      <TableCell>{row.supplyOrder.sp2bjNumber}</TableCell>
                      <TableCell>{row.supplyOrder.supplier.name}</TableCell>
                      <TableCell>{row.licensePlate}</TableCell>
                      <TableCell>{formatDate(row.receivedDate)}</TableCell>
                      <TableCell className="text-right">
                        {formatNumber(row.quantityDelivered)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(row.sackCount)}
                      </TableCell>
                      <TableCell>{row.createdBy.name}</TableCell>
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