"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireFeatureAccess } from "@/lib/auth-guards";
import { normalizeName } from "@/lib/utils";
import { saveUserSchema } from "@/lib/validations/user-management";
import type { ActionState } from "@/lib/actions/shared";
import { ADMIN_ROUTES } from "@/lib/routes";

const USER_REVALIDATE_PATHS = [ADMIN_ROUTES.users] as const;

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

function revalidateMany(paths: readonly string[]) {
  for (const path of paths) {
    revalidatePath(path);
  }
}

function toStatusBoolean(status: "AKTIF" | "TIDAK_AKTIF") {
  return status === "AKTIF";
}

export async function saveUserAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const { user: currentUser } = await requireFeatureAccess(
    "canAccessUserManagement",
    "Tidak memiliki akses mengelola user.",
  );

  const parsed = saveUserSchema.safeParse({
    id: formData.get("id") || undefined,
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password")?.toString() ?? "",
    status: formData.get("status"),
    role: formData.get("role"),
    assignedGardenId: formData.get("assignedGardenId")?.toString() || undefined,
  });

  if (!parsed.success) {
    return buildErrorState(
      "Validasi data pengguna gagal.",
      parsed.error.flatten().fieldErrors,
    );
  }

  const data = parsed.data;
  const email = data.email.toLowerCase().trim();
  const password = (data.password ?? "").trim();
  const isActive = toStatusBoolean(data.status);
  const assignedGardenId =
    data.role === "ADMIN" ? null : (data.assignedGardenId ?? "").trim();

  try {
    if (assignedGardenId) {
      const garden = await prisma.garden.findUnique({
        where: { id: assignedGardenId },
        select: {
          id: true,
          isActive: true,
        },
      });

      if (!garden) {
        return buildErrorState("Kebun yang dipilih tidak ditemukan.");
      }

      if (!garden.isActive) {
        return buildErrorState("Kebun yang dipilih sedang tidak aktif.");
      }
    }

    if (data.id) {
      const existingUser = await prisma.user.findUnique({
        where: { id: data.id },
        select: {
          id: true,
        },
      });

      if (!existingUser) {
        return buildErrorState("Data pengguna tidak ditemukan.");
      }

      if (currentUser.id === data.id && data.status === "TIDAK_AKTIF") {
        return buildErrorState("Akun Anda sendiri tidak bisa dinonaktifkan.");
      }

      if (currentUser.id === data.id && data.role !== "ADMIN") {
        return buildErrorState(
          "Akun Anda sendiri tidak bisa diubah dari role Admin.",
        );
      }

      const duplicateEmail = await prisma.user.findFirst({
        where: {
          email,
          NOT: {
            id: data.id,
          },
        },
        select: {
          id: true,
        },
      });

      if (duplicateEmail) {
        return buildErrorState("Email sudah digunakan.");
      }

      await prisma.user.update({
        where: { id: data.id },
        data: {
          name: normalizeName(data.name),
          email,
          role: data.role,
          isActive,
          assignedGardenId,
          ...(password.length > 0
            ? {
                passwordHash: await bcrypt.hash(password, 10),
              }
            : {}),
        },
      });

      revalidateMany(USER_REVALIDATE_PATHS);
      return buildSuccessState("Data pengguna berhasil diperbarui.");
    }

    const existingEmail = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
      },
    });

    if (existingEmail) {
      return buildErrorState("Email sudah digunakan.");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name: normalizeName(data.name),
        email,
        passwordHash,
        role: data.role,
        isActive,
        assignedGardenId,
      },
    });

    revalidateMany(USER_REVALIDATE_PATHS);
    return buildSuccessState("Pengguna berhasil ditambahkan.");
  } catch (error) {
    return buildErrorState(
      error instanceof Error ? error.message : "Gagal menyimpan data pengguna.",
    );
  }
}

export async function deleteUserAction(id: string): Promise<ActionState> {
  const { user: currentUser } = await requireFeatureAccess(
    "canAccessUserManagement",
    "Tidak memiliki akses menghapus user.",
  );

  if (currentUser.id === id) {
    return buildErrorState("Akun Anda sendiri tidak bisa dihapus.");
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existingUser) {
      return buildErrorState("Data pengguna tidak ditemukan.");
    }

    await prisma.user.delete({
      where: { id },
    });

    revalidateMany(USER_REVALIDATE_PATHS);
    return buildSuccessState("Pengguna berhasil dihapus.");
  } catch (error) {
    return buildErrorState(
      error instanceof Error ? error.message : "Gagal menghapus pengguna.",
    );
  }
}