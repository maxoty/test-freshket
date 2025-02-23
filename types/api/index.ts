export type IOrderBy = Record<string, "asc" | "desc">;

export type IPagination = {
  cursor?: number;
  limit?: number;
};

export type IResponses<T> = {
  data: T;
};
