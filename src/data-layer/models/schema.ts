import { relations, sql } from "drizzle-orm";
import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import type { AdapterAccount } from "next-auth/adapters";

export const userSchema = sqliteTable("user", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull().unique(),
  password: text("password").notNull(),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  role: text("role").notNull(),
  fname: text("fname"),
  lname: text("lname"),
  phone: text("phone"),
  phoneVerifiedAt: integer("phone_verified_at", { mode: "timestamp" }),
  lastLoginAt: integer("last_login_at", { mode: "timestamp" }),
  lastLoginIp: text("last_login_ip"),
  verifiedAt: integer("verified_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(strftime('%s', 'now'))`
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`(strftime('%s', 'now'))`
  ),
});

export type InsertUser = typeof userSchema.$inferInsert;
export type SelectUser = typeof userSchema.$inferSelect;

export const accountSchema = sqliteTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => userSchema.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessionSchema = sqliteTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => userSchema.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
});

export const verificationTokenSchema = sqliteTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

export const systemLogSchema = sqliteTable("system_log", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => userSchema.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  content: text("content").notNull(),
  level: text("level").default("info").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(strftime('%s', 'now'))`
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`(strftime('%s', 'now'))`
  ),
});

export const systemLogRelationsSchema = relations(
  systemLogSchema,
  ({ one }) => ({
    user: one(userSchema, {
      fields: [systemLogSchema.userId],
      references: [userSchema.id],
    }),
  })
);

export type InsertSystemLog = typeof systemLogSchema.$inferInsert;
export type SelectSystemLog = typeof systemLogSchema.$inferSelect;
