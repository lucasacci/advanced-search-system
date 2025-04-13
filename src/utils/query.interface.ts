import { Prisma } from '@prisma/client';

export interface PaginationOptions {
  page?: number;
  limit?: number;
}

export interface PaginationResult<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}

export interface QueryFilter<T> {
  searchTerm?: string;
  filters?: Record<string, any>;
  sort?: SortOptions;
  pagination?: PaginationOptions;
}

export interface QueryBuilder<T> {
  buildWhere(filter: QueryFilter<T>): T;
  buildOrderBy(sort?: SortOptions): any;
  buildPagination(options?: PaginationOptions): { skip: number; take: number };
}

export function buildWhere<T>(filter: QueryFilter<T>): any {
  const where: any = {};

  if (filter.searchTerm) {
    where.OR = [
      { name: { contains: filter.searchTerm, mode: 'insensitive' } },
      { description: { contains: filter.searchTerm, mode: 'insensitive' } },
    ];
  }

  if (filter.filters) {
    Object.entries(filter.filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          where[key] = { hasSome: value };
        } else if (typeof value === 'string') {
          where[key] = { contains: value, mode: 'insensitive' };
        } else if (typeof value === 'object') {
          where[key] = value;
        } else {
          where[key] = value;
        }
      }
    });
  }

  return where;
}

export function buildOrderBy(sort?: SortOptions): any {
  if (!sort) {
    return { createdAt: 'desc' };
  }

  return {
    [sort.field]: sort.direction,
  };
}

export function buildPagination(
  options?: PaginationOptions,
): {
  skip: number;
  take: number;
} {
  const page = Number(options?.page) || 1;
  const limit = Number(options?.limit) || 10;
  const skip = (page - 1) * limit;

  return {
    skip,
    take: limit,
  };
}

export async function executeQuery<T>(
  prisma: any,
  model: string,
  filter: QueryFilter<T>,
): Promise<{ data: T[]; total: number }> {
  const where = buildWhere(filter);
  const orderBy = buildOrderBy(filter.sort);
  const { skip, take } = buildPagination(filter.pagination);

  const [data, total] = await Promise.all([
    prisma[model].findMany({
      where,
      orderBy,
      skip,
      take,
    }),
    prisma[model].count({ where }),
  ]);

  return { data, total };
} 