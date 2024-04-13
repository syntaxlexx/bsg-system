export enum AUTH_ERROR {
  MISSING_CREDENTIALS = "MISSING_CREDENTIALS",
  USER_NOT_FOUND = "USER_NOT_FOUND",
  PASSWORD_ERROR = "PASSWORD_ERROR",
  ACCOUNT_DEACTIVATED = "ACCOUNT_DEACTIVATED",
  OAuthNotLinked = "OAuthNotLinked",
}

export enum Role {
  ADMIN,
  USER,
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
