import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate, formatNumber } from "@/lib/utils";

type RecentDeliveryItem = {
  id: string;
  quantityDelivered: number;
  receivedDate: Date;
  supplyOrder: {
    sp2bjNumber: string;
    garden: { name: string };
    fertilizerType: { name: string };
    supplier: { name: string };
  };
};

export function RecentDeliveriesList({
  deliveries,
}: {
  deliveries: RecentDeliveryItem[];
}) {
  return (
    <Card>
      <CardHeader className="gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
            Aktivitas terbaru
          </p>
          <CardTitle className="mt-2">Ringkasan Penerimaan</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 text-sm leading-6 text-slate-700">
        <div className="rounded-3xl border border-emerald-200/80 bg-emerald-500/[0.08] p-4">
          <p>
            Krani mencatat penerimaan berdasarkan data kontrak pasokan yang sudah
            diinput admin.
          </p>
          <p className="mt-2">
            Form penerimaan tersedia pada menu <strong>Tabel Informasi</strong>.
          </p>
        </div>

        <div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            5 penerimaan terbaru
          </p>

          <div className="space-y-3">
            {deliveries.length === 0 ? (
              <div className="rounded-3xl border border-white/65 bg-white/58 px-4 py-4 text-slate-600">
                Belum ada data penerimaan terbaru.
              </div>
            ) : null}

            {deliveries.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-white/65 bg-white/58 p-4 shadow-[0_18px_32px_-28px_rgba(15,56,45,0.22)]"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-1">
                    <p className="font-semibold text-slate-900">
                      {item.supplyOrder.fertilizerType.name}
                    </p>
                    <p className="text-sm text-slate-600">
                      {item.supplyOrder.garden.name} • {item.supplyOrder.supplier.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      Kontrak: {item.supplyOrder.sp2bjNumber}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-emerald-200/80 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-800">
                      {formatNumber(item.quantityDelivered)}
                    </span>
                    <span className="rounded-full border border-sky-200/80 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-800">
                      {formatDate(item.receivedDate)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}