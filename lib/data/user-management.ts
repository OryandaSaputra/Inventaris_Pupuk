import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import { CACHE_TAGS } from "@/lib/cache-tags";

const getCachedUserManagementData = unstable_cache(
  async () => {
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
  },
  ["user-management:data"],
  {
    revalidate: 300,
    tags: [CACHE_TAGS.users, CACHE_TAGS.masterData],
  },
);

export async function getUserManagementData() {
  return getCachedUserManagementData();
}