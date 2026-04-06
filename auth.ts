import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validations/auth";

type AppRole = "ADMIN" | "KRANI_TANAMAN" | "KRANI_KEBUN";

function toNullableString(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function toRole(value: unknown): AppRole {
  if (
    value === "ADMIN" ||
    value === "KRANI_TANAMAN" ||
    value === "KRANI_KEBUN"
  ) {
    return value;
  }

  return "KRANI_TANAMAN";
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const parsed = loginSchema.safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        const email = parsed.data.email.toLowerCase().trim();

        const user = await prisma.user.findUnique({
          where: { email },
          include: {
            assignedGarden: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        });

        if (!user || !user.isActive) {
          return null;
        }

        const validPassword = await bcrypt.compare(
          parsed.data.password,
          user.passwordHash,
        );

        if (!validPassword) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          isActive: user.isActive,
          assignedGardenId: user.assignedGardenId,
          assignedGardenName: user.assignedGarden?.name ?? null,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      const userId =
        typeof user?.id === "string" && user.id.length > 0
          ? user.id
          : token.sub;

      if (!userId) {
        return token;
      }

      const dbUser = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          isActive: true,
          assignedGardenId: true,
          assignedGarden: {
            select: {
              name: true,
            },
          },
        },
      });

      if (!dbUser) {
        token.isActive = false;
        token.assignedGardenId = null;
        token.assignedGardenName = null;
        return token;
      }

      token.name = dbUser.name;
      token.email = dbUser.email;
      token.role = dbUser.role as AppRole;
      token.isActive = dbUser.isActive;
      token.assignedGardenId = dbUser.assignedGardenId;
      token.assignedGardenName = dbUser.assignedGarden?.name ?? null;

      return token;
    },

    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = typeof token.sub === "string" ? token.sub : "";
        session.user.role = toRole(token.role);
        session.user.isActive = token.isActive === true;
        session.user.assignedGardenId = toNullableString(
          token.assignedGardenId,
        );
        session.user.assignedGardenName = toNullableString(
          token.assignedGardenName,
        );

        if (typeof token.name === "string") {
          session.user.name = token.name;
        }

        if (typeof token.email === "string") {
          session.user.email = token.email;
        }
      }

      return session;
    },
  },
});