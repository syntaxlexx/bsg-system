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

export default class SystemLogRepository {
  constructor() {
    //
  }

  static async get() {
    const data = await db.systemLog.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return data;
  }

  static async find(id: string, include: {}) {
    const item = await db.systemLog.findUnique({
      where: {
        id,
      },
      include: include,
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

    const data = await db.systemLog.findMany({
      where: {
        ...(search ? { content: { contains: search } } : {}),
        ...(userId ? { userId } : {}),
        ...(onlyForToday
          ? {
              createdAt: {
                gte: dayjs().startOf("day").toDate(),
              },
            }
          : {}),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take,
      skip,
    });

    const total = await db.systemLog.count({
      where: {
        ...(search ? { content: { contains: search } } : {}),
        ...(userId ? { userId } : {}),
      },
    });

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
    const data = await db.systemLog.create({
      data: {
        userId,
        content: JSON.stringify(content),
        level,
      },
    });

    return data;
  }
}
