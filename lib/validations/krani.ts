import { z } from "zod";

export const deliveryReceiptSchema = z.object({
  supplyOrderId: z.string().min(1, "SP2BJ wajib dipilih"),
  licensePlate: z.string().min(5, "No polisi wajib diisi"),
  receivedDate: z.string().min(1, "Tanggal penerimaan wajib diisi"),
  quantityDelivered: z.coerce.number().int().positive("Jumlah pengiriman harus bilangan bulat positif"),
  sackCount: z.coerce.number().int().positive("Jumlah sak harus bilangan bulat positif"),
});
