import { QueryFilter, buildWhere } from './filter.interface';
import { SortOptions, buildOrderBy } from './sort.interface';
import {
  PaginationOptions,
  buildPagination,
  PaginationResult,
} from './pagination.interface';

export {
  QueryFilter,
  buildWhere,
  SortOptions,
  buildOrderBy,
  PaginationOptions,
  PaginationResult,
  buildPagination,
};

export interface QueryBuilder<T> {
  buildWhere(filter: QueryFilter<T>): T;
  buildOrderBy(sort?: SortOptions): any;
  buildPagination(options?: PaginationOptions): { skip: number; take: number };
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
