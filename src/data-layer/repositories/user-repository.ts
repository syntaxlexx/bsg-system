import { PAGE_LIMITS } from "@/lib/constants";
import { db } from "@/lib/db";
import {
  generateMeta,
  generateTakeAndSkip,
  hashPassword,
} from "@/lib/server-utils";
import { PaginatedData, Role } from "@/types";
import { User } from "@prisma/client";
import SystemLogRepository from "./system-logs-repository";

export default class UserRepository {
  constructor() {
    //
  }

  /**
   * find user by id
   */
  static async getById(id: string): Promise<User | null> {
    return await db.user.findUnique({
      where: {
        id,
      },
    });
  }

  /**
   * find user by email
   */
  static async getByEmail(email: string): Promise<User | null> {
    return await db.user.findUnique({
      where: {
        email,
      },
    });
  }

  /**
   * find a user
   */
  static async find(id: string, includes = {}): Promise<User> {
    const data = await db.user.findUniqueOrThrow({
      where: {
        id,
      },
      include: includes,
    });

    return data;
  }

  /**
   * find a user by email or create
   */
  static async findByEmailOrCreate(
    email: string,
    includes = {}
  ): Promise<User> {
    let user = await db.user.findUnique({
      where: {
        email,
      },
      include: includes,
    });

    if (user) return user;

    email = email.toLowerCase();

    const name = email.split("@")[0] ?? email;

    const password = await hashPassword(name);

    user = await db.user.create({
      data: {
        email,
        name,
        fname: name,
        password,
        role: Role.USER,
      },
    });

    return user;
  }

  /**
   * search users
   */
  static async search({
    search,
    page = 1,
    limit = PAGE_LIMITS.users,
    noPagination = false,
  }: {
    search?: string;
    page?: number | string;
    limit?: number | string;
    noPagination?: boolean;
  }): Promise<PaginatedData<User>> {
    const { skip, take } = await generateTakeAndSkip({ limit, page });

    const data = await db.user.findMany({
      where: {
        ...(search
          ? {
              OR: [
                { name: { contains: search } },
                { email: { contains: search } },
                { fname: { contains: search } },
                { lname: { contains: search } },
              ],
            }
          : {}),
      },
      orderBy: {
        createdAt: "desc",
      },
      ...(!noPagination ? { take } : {}),
      ...(!noPagination ? { skip } : {}),
    });

    const total = await db.user.count({
      where: {
        ...(search
          ? {
              OR: [
                { name: { contains: search } },
                { email: { contains: search } },
                { fname: { contains: search } },
                { lname: { contains: search } },
              ],
            }
          : {}),
      },
    });

    const meta = await generateMeta({
      total,
      perPage: take,
      page: Number(page),
    });

    return {
      data,
      meta,
    };
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
    await db.user.update({
      where: {
        id: id,
      },
      data: {
        lastLoginAt: new Date(),
        lastLoginIp: ip,
      },
    });

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
