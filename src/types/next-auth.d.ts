import { SelectUser } from "@/data-layer/models/schema";
import type { Session, DefaultSession } from "next-auth";
import type { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT extends User {
    // other properties
  }
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: SelectUser & {
      id: string;
    } & DefaultSession["user"];
  }
}
