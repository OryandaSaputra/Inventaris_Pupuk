import { z } from "zod";

export const supplyOrderSchema = z
  .object({
    gardenName: z.string().min(2, "Nama kebun wajib diisi"),
    fertilizerTypeName: z.string().min(2, "Jenis pupuk wajib diisi"),
    supplierName: z.string().min(2, "Pemasok wajib diisi"),
    sp2bjNumber: z.string().min(3, "No SP2BJ wajib diisi"),
    contractStartDate: z.string().min(1, "Tanggal awal kontrak wajib diisi"),
    contractEndDate: z.string().min(1, "Tanggal selesai kontrak wajib diisi"),
    quantityOrdered: z.coerce
      .number()
      .int()
      .positive("Volume pupuk harus bilangan bulat positif"),
    budgetType: z.enum(["EKSPLOITASI", "INVESTASI"], {
      message: "Anggaran wajib dipilih",
    }),
    unitPrice: z.coerce.number().min(0, "Harga satuan tidak boleh negatif"),
    freightCost: z.coerce.number().min(0, "Ongkos angkut tidak boleh negatif"),
  })
  .refine(
    (data) =>
      new Date(data.contractEndDate) >= new Date(data.contractStartDate),
    {
      message:
        "Tanggal selesai kontrak harus sama atau setelah tanggal awal kontrak",
      path: ["contractEndDate"],
    },
  );

export const userRoleSchema = z.enum(
  ["ADMIN", "KRANI_TANAMAN", "KRANI_KEBUN"],
  {
    message: "Role wajib dipilih",
  },
);

export const userStatusSchema = z.enum(["AKTIF", "TIDAK_AKTIF"], {
  message: "Status wajib dipilih",
});

export const saveUserSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().min(2, "Nama pengguna wajib diisi"),
    email: z.string().email("Email tidak valid"),
    password: z.string().optional(),
    status: userStatusSchema,
    role: userRoleSchema,
  })
  .superRefine((data, ctx) => {
    const password = (data.password ?? "").trim();

    if (!data.id && password.length < 6) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message: "Password minimal 6 karakter",
      });
    }

    if (data.id && password.length > 0 && password.length < 6) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message: "Password minimal 6 karakter",
      });
    }
  });

const activeStatusSchema = z.enum(["AKTIF", "TIDAK_AKTIF"], {
  message: "Status wajib dipilih",
});

export const gardenMasterSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Nama kebun wajib diisi"),
  code: z.string().min(2, "Kode kebun wajib diisi"),
  address: z.string().optional(),
  status: activeStatusSchema,
});

export const fertilizerMasterSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Nama pupuk wajib diisi"),
  status: activeStatusSchema,
});

export const supplierMasterSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Nama pemasok wajib diisi"),
  address: z.string().min(5, "Alamat pemasok wajib diisi"),
  phone: z.string().min(8, "Nomor telepon wajib diisi"),
  email: z.string().email("Email supplier tidak valid"),
  status: activeStatusSchema,
});