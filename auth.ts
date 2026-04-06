import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validations/auth";

type AppRole = "ADMIN" | "KRANI_TANAMAN" | "KRANI_KEBUN";

type AuthUserPayload = {
  id: string;
  name: string;
  email: string;
  role: AppRole;
  isActive: boolean;
  assignedGardenId: string | null;
  assignedGardenName: string | null;
};

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
    maxAge: 60 * 60 * 8,
    updateAge: 60 * 30,
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
          select: {
            id: true,
            name: true,
            email: true,
            passwordHash: true,
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
        } satisfies AuthUserPayload;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (!user) {
        return token;
      }

      const authUser = user as AuthUserPayload;

      token.sub = authUser.id;
      token.name = authUser.name;
      token.email = authUser.email;
      token.role = authUser.role;
      token.isActive = authUser.isActive;
      token.assignedGardenId = authUser.assignedGardenId;
      token.assignedGardenName = authUser.assignedGardenName;

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
