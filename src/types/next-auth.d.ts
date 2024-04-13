import { Role, Status, User } from "@prisma/client";
import type { Session, DefaultSession } from "next-auth";
import type { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT extends User {
    // other properties
  }
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User & {
      id: string;
    } & DefaultSession["user"];
  }
}
