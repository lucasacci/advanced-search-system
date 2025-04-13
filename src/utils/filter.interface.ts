import { PaginationOptions } from './pagination.interface';
import { SortOptions } from './sort.interface';

export interface QueryFilter<T> {
  searchTerm?: string;
  filters?: Record<string, any>;
  sort?: SortOptions;
  pagination?: PaginationOptions;
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
