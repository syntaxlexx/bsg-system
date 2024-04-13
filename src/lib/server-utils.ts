"use server";

import { PaginationMeta } from "@/types";
import { ZodError } from "zod";
import bcrypt from "bcryptjs";

export async function serverActionResponse<T>({
  ok = true,
  message,
  isValidationError = false,
  data,
}: {
  ok?: boolean;
  message?: any;
  isValidationError?: boolean;
  data?: T;
}) {
  return {
    ok,
    isValidationError,
    message: message ? message : ok ? "Action successful" : "An error occurred",
    data,
  };
}

export async function getZodErrors(error: ZodError): Promise<string[]> {
  return error.errors.reduce<string[]>((acc, val) => {
    acc.push(`${val.message}`);
    return acc;
  }, []);
}

export const comparePasswords = async (password: string, password2: string) => {
  return !!(await bcrypt.compare(password, password2));
};

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export async function generateMeta({
  total,
  page,
  perPage,
}: {
  total: number;
  page: number;
  perPage: number;
}): Promise<PaginationMeta> {
  let lastPage = 1;

  if (total > perPage) {
    lastPage = Math.ceil(total / perPage);
  }

  return {
    currentPage: page,
    lastPage,
    total,
    perPage: perPage,
    // from: perPage * page,
    // to: perPage * page + (lastPage ? : perPage),
  };
}

/**
 * get the 'take' and 'skip' for use with Prisma
 * Needs to be async since the file is marked at 'use server'
 */
export async function generateTakeAndSkip({
  limit = 12,
  page = 0,
}: {
  limit?: string | number;
  page?: string | number;
}) {
  const skip = Math.max(0, Number(page) - 1) * Number(limit);
  const take = Number(limit);

  return {
    take,
    skip,
  };
}

export async function isEmpty(value: any) {
  return (
    value == null || (typeof value === "string" && value.trim().length === 0)
  );
}

export async function filterEmptiesForDb(value: any) {
  return (await isEmpty(value)) ? undefined : value;
}
