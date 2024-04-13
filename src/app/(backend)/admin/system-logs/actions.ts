"use server";

import SystemLogRepository from "@/data-layer/repositories/system-logs-repository";
import { PAGE_LIMITS } from "@/lib/constants";

export async function getSystemLogs({
  search,
  userId,
  page = 1,
  limit = PAGE_LIMITS.systemLogs,
}: {
  search?: string;
  userId?: string;
  page?: string | number;
  limit?: string | number;
}) {
  const data = await SystemLogRepository.search({
    search,
    userId,
    page,
    limit,
  });
  return data;
}
