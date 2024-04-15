import db from "@/lib/db";
import { userSchema } from "../models/schema";
import { eq } from "drizzle-orm";
import SystemLogRepository from "./system-logs-repository";

export default class UserRepository {
  constructor() {
    //
  }

  /**
   * log successful user login
   */
  static async recordUserLogin({
    id,
    email,
    name,
    ip,
  }: {
    id: string;
    email: string | null | undefined;
    name: string | null | undefined;
    ip?: string;
  }) {
    await db
      .update(userSchema)
      .set({
        lastLoginAt: new Date(),
        lastLoginIp: ip,
      })
      .where(eq(userSchema.id, id));

    // system logs
    await SystemLogRepository.record({
      content: {
        message: `${name} (${email}) signed in`,
        data: {
          action: "login",
          entity: "user",
          entityId: id,
          userName: name,
          userEmail: email,
        },
      },
      userId: id,
    });
  }
}
