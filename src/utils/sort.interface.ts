export type SortDirection = 'asc' | 'desc';

export interface SortOptions {
  field: string;
  direction: SortDirection;
}

export interface ProductSortOptions extends SortOptions {
  field: 'name' | 'price' | 'createdAt' | 'updatedAt';
}

export function buildOrderBy(sort?: SortOptions): any {
  if (!sort) {
    return { createdAt: 'desc' };
  }

  return {
    [sort.field]: sort.direction,
  };
}
