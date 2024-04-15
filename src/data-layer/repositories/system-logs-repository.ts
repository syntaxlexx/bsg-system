import { PAGE_LIMITS } from "@/lib/constants";
import { db } from "@/lib/db";
import { generateMeta, generateTakeAndSkip } from "@/lib/server-utils";
import {
  PaginatedData,
  ParsedSystemLog,
  SystemLogContent,
  SystemLogLevel,
} from "@/types";
import dayjs from "dayjs";
import { systemLogSchema } from "../models/schema";
import { SQL, count, desc, eq, gte, ilike, like } from "drizzle-orm";
import { cuid } from "@/lib/utils";

export default class SystemLogRepository {
  constructor() {
    //
  }

  static async get() {
    const data = await db
      .select()
      .from(systemLogSchema)
      .orderBy(desc(systemLogSchema.createdAt));

    return data;
  }

  static async find(id: string, include: {}) {
    const item = await db.query.systemLogSchema.findFirst({
      where: eq(systemLogSchema.id, id),
      orderBy: desc(systemLogSchema.createdAt),
      with: include,
    });

    if (!item) return null;

    return Object.entries(item).map(([key, value]) => {
      if (key === "content")
        return {
          key: JSON.parse(String(value)),
        };

      return {
        key: value,
      };
    });
  }

  /**
   * search all
   */
  static async search({
    userId,
    search,
    page = 1,
    limit = PAGE_LIMITS.systemLogs,
    onlyForToday = false,
  }: {
    userId?: string;
    search?: string;
    page?: number | string;
    limit?: number | string;
    onlyForToday?: boolean;
  }): Promise<PaginatedData<ParsedSystemLog>> {
    const { skip, take } = await generateTakeAndSkip({ limit, page });

    const data = await db.query.systemLogSchema.findMany({
      where: (systemLogSchema, { eq, and }) => {
        const args: SQL[] = [];
        if (search) args.push(like(systemLogSchema.content, `%${search}%`));
        if (userId) args.push(eq(systemLogSchema.userId, userId));
        if (onlyForToday)
          args.push(
            gte(systemLogSchema.createdAt, dayjs().startOf("day").toDate())
          );
        return and(...args);
      },
      with: {
        user: {
          columns: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: desc(systemLogSchema.createdAt),
      limit: take,
      offset: skip,
    });

    const total = await db
      .select({ count: count() })
      .from(systemLogSchema)
      .where(search ? ilike(systemLogSchema.content, search) : undefined)
      .where(userId ? eq(systemLogSchema.userId, userId) : undefined);

    const meta = await generateMeta({
      total,
      perPage: take,
      page: Number(page),
    });

    const mapped = data.map((log) => {
      const { content, ...rest } = log;
      const item = JSON.parse(content) as SystemLogContent;

      const parsed: ParsedSystemLog = {
        ...rest,
        ...item,
      };

      return parsed;
    });

    return {
      data: mapped,
      meta,
    };
  }

  static async record({
    content,
    userId,
    level = SystemLogLevel.INFO,
  }: {
    content: SystemLogContent;
    userId?: string | null;
    level?: SystemLogLevel;
  }) {
    const data = await db.insert(systemLogSchema).values({
      id: cuid(),
      userId,
      content: JSON.stringify(content),
      level,
    });

    return data;
  }
}
