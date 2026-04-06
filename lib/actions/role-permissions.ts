"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import type { UserRole } from "@/src/generated/prisma";
import { prisma } from "@/lib/prisma";
import { requireFeatureAccess } from "@/lib/auth-guards";
import type { ActionState } from "@/lib/actions/shared";
import { ADMIN_ROUTES, KRANI_ROUTES } from "@/lib/routes";
import {
  getDefaultRolePermission,
  ROLE_PERMISSION_FEATURES,
} from "@/lib/permissions";

const roleSchema = z.enum(["ADMIN", "KRANI_TANAMAN", "KRANI_KEBUN"]);
const scopeSchema = z.enum(["NONE", "ASSIGNED", "ALL"]);

const permissionSchema = z.object({
  role: roleSchema,
  gardenViewScope: scopeSchema,
  gardenEditScope: scopeSchema,
  gardenDeleteScope: scopeSchema,
  canAccessAdminHome: z.boolean(),
  canAccessSupplyInput: z.boolean(),
  canAccessSupplyList: z.boolean(),
  canAccessMasterGardens: z.boolean(),
  canAccessMasterFertilizers: z.boolean(),
  canAccessMasterSuppliers: z.boolean(),
  canAccessSupplierInformation: z.boolean(),
  canAccessUserManagement: z.boolean(),
  canAccessKraniHome: z.boolean(),
  canAccessDeliveryWorkspace: z.boolean(),
});

function buildErrorState(message: string, errors?: Record<string, string[]>) {
  return {
    success: false,
    message,
    errors,
  } satisfies ActionState;
}

function buildSuccessState(message: string) {
  return {
    success: true,
    message,
  } satisfies ActionState;
}

function parsePermissionForm(role: UserRole, formData: FormData) {
  return permissionSchema.safeParse({
    role,
    gardenViewScope: formData.get("gardenViewScope"),
    gardenEditScope: formData.get("gardenEditScope"),
    gardenDeleteScope: formData.get("gardenDeleteScope"),
    canAccessAdminHome: formData.get("canAccessAdminHome") === "on",
    canAccessSupplyInput: formData.get("canAccessSupplyInput") === "on",
    canAccessSupplyList: formData.get("canAccessSupplyList") === "on",
    canAccessMasterGardens: formData.get("canAccessMasterGardens") === "on",
    canAccessMasterFertilizers:
      formData.get("canAccessMasterFertilizers") === "on",
    canAccessMasterSuppliers: formData.get("canAccessMasterSuppliers") === "on",
    canAccessSupplierInformation:
      formData.get("canAccessSupplierInformation") === "on",
    canAccessUserManagement: formData.get("canAccessUserManagement") === "on",
    canAccessKraniHome: formData.get("canAccessKraniHome") === "on",
    canAccessDeliveryWorkspace:
      formData.get("canAccessDeliveryWorkspace") === "on",
  });
}

function sanitizePermissionByRole(
  role: UserRole,
  input: z.infer<typeof permissionSchema>,
) {
  if (role === "ADMIN") {
    return {
      ...input,
      canAccessAdminHome: true,
      canAccessUserManagement: true,
      canAccessKraniHome: false,
      canAccessDeliveryWorkspace: false,
    };
  }

  if (role === "KRANI_TANAMAN") {
    return {
      ...input,
      canAccessAdminHome: false,
      canAccessSupplyInput: false,
      canAccessSupplyList: false,
      canAccessMasterGardens: false,
      canAccessMasterFertilizers: false,
      canAccessMasterSuppliers: false,
      canAccessSupplierInformation: false,
      canAccessUserManagement: false,
    };
  }

  return {
    ...input,
    canAccessAdminHome: false,
    canAccessSupplyInput: false,
    canAccessSupplyList: false,
    canAccessMasterGardens: false,
    canAccessMasterFertilizers: false,
    canAccessMasterSuppliers: false,
    canAccessSupplierInformation: false,
    canAccessUserManagement: false,
    canAccessKraniHome: false,
  };
}

function validateMinimumAccess(role: UserRole, input: ReturnType<typeof sanitizePermissionByRole>) {
  if (role === "ADMIN" && !input.canAccessUserManagement) {
    return "Role admin harus tetap memiliki akses ke halaman Hak Akses User.";
  }

  if (
    role === "KRANI_TANAMAN" &&
    !input.canAccessKraniHome &&
    !input.canAccessDeliveryWorkspace
  ) {
    return "Krani Tanaman harus memiliki minimal satu fitur aktif: Home Krani atau Penerimaan Pupuk.";
  }

  if (role === "KRANI_KEBUN" && !input.canAccessDeliveryWorkspace) {
    return "Krani Kebun minimal harus memiliki fitur Penerimaan Pupuk.";
  }

  return null;
}

function revalidatePermissionPages() {
  revalidatePath(ADMIN_ROUTES.users);
  revalidatePath(ADMIN_ROUTES.home);
  revalidatePath(KRANI_ROUTES.home);
  revalidatePath(KRANI_ROUTES.delivery);
}

export async function saveRolePermissionAction(
  role: UserRole,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireFeatureAccess(
    "canAccessUserManagement",
    "Tidak memiliki akses mengatur hak akses role.",
  );

  const parsed = parsePermissionForm(role, formData);

  if (!parsed.success) {
    return buildErrorState(
      "Validasi hak akses role gagal.",
      parsed.error.flatten().fieldErrors,
    );
  }

  const data = sanitizePermissionByRole(role, parsed.data);
  const validationError = validateMinimumAccess(role, data);

  if (validationError) {
    return buildErrorState(validationError);
  }

  try {
    await prisma.rolePermission.upsert({
      where: { role },
      update: {
        gardenViewScope: data.gardenViewScope,
        gardenEditScope: data.gardenEditScope,
        gardenDeleteScope: data.gardenDeleteScope,
        canAccessAdminHome: data.canAccessAdminHome,
        canAccessSupplyInput: data.canAccessSupplyInput,
        canAccessSupplyList: data.canAccessSupplyList,
        canAccessMasterGardens: data.canAccessMasterGardens,
        canAccessMasterFertilizers: data.canAccessMasterFertilizers,
        canAccessMasterSuppliers: data.canAccessMasterSuppliers,
        canAccessSupplierInformation: data.canAccessSupplierInformation,
        canAccessUserManagement: data.canAccessUserManagement,
        canAccessKraniHome: data.canAccessKraniHome,
        canAccessDeliveryWorkspace: data.canAccessDeliveryWorkspace,
      },
      create: {
        ...getDefaultRolePermission(role),
        ...data,
      },
    });

    revalidatePermissionPages();

    return buildSuccessState("Hak akses role berhasil diperbarui.");
  } catch (error) {
    return buildErrorState(
      error instanceof Error
        ? error.message
        : "Gagal memperbarui hak akses role.",
    );
  }
}