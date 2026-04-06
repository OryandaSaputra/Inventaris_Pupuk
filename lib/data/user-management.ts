import { prisma } from "@/lib/prisma";

export async function getUserManagementData() {
  const [users, gardens] = await Promise.all([
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        assignedGardenId: true,
        assignedGarden: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
    }),
    prisma.garden.findMany({
      where: {
        isActive: true,
      },
      orderBy: [{ code: "asc" }, { name: "asc" }],
      select: {
        id: true,
        name: true,
        code: true,
      },
    }),
  ]);

  return {
    rows: users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      assignedGardenId: user.assignedGardenId,
      assignedGardenName: user.assignedGarden?.name ?? null,
      assignedGardenCode: user.assignedGarden?.code ?? null,
    })),
    gardenOptions: gardens.map((garden) => ({
      value: garden.id,
      label: `${garden.code} · ${garden.name}`,
    })),
  };
}