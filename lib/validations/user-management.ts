import { z } from "zod";

export const userRoleSchema = z.enum(
  ["ADMIN", "KRANI_TANAMAN", "KRANI_KEBUN"],
  {
    message: "Role wajib dipilih",
  },
);

export const userStatusSchema = z.enum(["AKTIF", "TIDAK_AKTIF"], {
  message: "Status wajib dipilih",
});

const baseUserSchema = z.object({
  name: z.string().min(2, "Nama pengguna wajib diisi"),
  email: z.string().email("Email tidak valid"),
  password: z.string().optional(),
  status: userStatusSchema,
  role: userRoleSchema,
  assignedGardenId: z.string().optional(),
});

function validatePasswordAndGarden(
  data: {
    id?: string;
    password?: string;
    role: "ADMIN" | "KRANI_TANAMAN" | "KRANI_KEBUN";
    assignedGardenId?: string;
  },
  ctx: z.RefinementCtx,
) {
  const password = (data.password ?? "").trim();
  const assignedGardenId = (data.assignedGardenId ?? "").trim();

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

  if (data.role !== "ADMIN" && !assignedGardenId) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["assignedGardenId"],
      message: "Kebun wajib dipilih untuk user krani.",
    });
  }
}

export const saveUserSchema = baseUserSchema
  .extend({
    id: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    validatePasswordAndGarden(data, ctx);
  });