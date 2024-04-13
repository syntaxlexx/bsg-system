import { SystemLog } from "@prisma/client";
import { User } from "next-auth";

export enum AUTH_ERROR {
  MISSING_CREDENTIALS = "MISSING_CREDENTIALS",
  USER_NOT_FOUND = "USER_NOT_FOUND",
  PASSWORD_ERROR = "PASSWORD_ERROR",
  ACCOUNT_DEACTIVATED = "ACCOUNT_DEACTIVATED",
  OAuthNotLinked = "OAuthNotLinked",
}

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export type PaginatedData<T> = {
  data: T[];
  meta: PaginationMeta;
};

export type PaginationMeta = {
  total: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
  from?: number;
  to?: number;
  path?: string;
};

export enum SystemLogLevel {
  INFO = "INFO",
  WARNING = "WARNING",
  ERROR = "ERROR",
  CRITICAL = "CRITICAL",
}

export type SystemLogContent = {
  message: string;
  data?: {
    action?: string;
    entity?: string;
    entityId?: string | number | BigInt;
    name?: string | null;
    // other attributes here
    [key: string]: any;
  };
};

export type ParsedSystemLog = SystemLogContent &
  Omit<SystemLog, "content"> & {
    level: SystemLogLevel | string | null;
    user?: Pick<User, "id" | "name">;
  };
