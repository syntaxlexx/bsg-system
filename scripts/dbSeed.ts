/* eslint-disable no-console */
import { Role } from "@/types";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import bcrypt from "bcryptjs";
import { InsertUser, userSchema } from "@/data-layer/models/schema";
import { eq } from "drizzle-orm";
import { cuid } from "@/lib/utils";

type DrizzleDbType = ReturnType<typeof drizzle>;

async function main() {
  console.log("Seeding started");

  const client = createClient({
    url: process.env.TURSO_CONNECTION_URL ?? "",
    authToken: process.env.TURSO_AUTH_TOKEN ?? "",
  });

  const db = drizzle(client);

  await seedSudo(db);

  console.log("Seeding completed");

  process.exit(0);
}

main().catch((error) => {
  console.error("Seeding failed");
  console.log(error);
  process.exit(1);
});

async function seedSudo(db: DrizzleDbType) {
  console.log("Started: seedSudo");

  const defaultUsers: Omit<InsertUser, "id" | "created_at" | "updated_at">[] = [
    {
      name: "acelords",
      email: "acelords.space@gmail.com",
      role: Role.ADMIN,
      password: "acelords",
    },
    {
      name: "jack",
      email: "arifkuppa@gmail.com",
      role: Role.ADMIN,
      password: "jack",
    },
  ];

  for (const k of defaultUsers) {
    const results = await db
      .select()
      .from(userSchema)
      .where(eq(userSchema.email, k.email));

    if (results.length > 0) continue;

    await db.insert(userSchema).values({
      ...k,
      id: cuid(),
      password: await bcrypt.hash(k.password, 10),
    });
  }

  console.log("Success: seedSudo");
}
