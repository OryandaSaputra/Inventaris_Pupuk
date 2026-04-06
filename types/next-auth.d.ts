import { DefaultSession } from "next-auth";

type AppRole = "ADMIN" | "KRANI_TANAMAN" | "KRANI_KEBUN";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      role: AppRole;
      isActive: boolean;
      assignedGardenId: string | null;
      assignedGardenName: string | null;
    };
  }

  interface User {
    role: AppRole;
    isActive: boolean;
    assignedGardenId: string | null;
    assignedGardenName: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: AppRole;
    isActive?: boolean;
    assignedGardenId?: string | null;
    assignedGardenName?: string | null;
  }
}