import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { QueryBuilder, QueryFilter, SortOptions, PaginationOptions } from '../../../../utils/query.interface';

@Injectable()
export class ProductQueryService implements QueryBuilder<Prisma.ProductWhereInput> {
  buildWhere(filter: QueryFilter<Prisma.ProductWhereInput>): Prisma.ProductWhereInput {
    const where: Prisma.ProductWhereInput = {};

    if (filter.searchTerm) {
      where.OR = [
        { name: { contains: filter.searchTerm, mode: 'insensitive' } },
        { description: { contains: filter.searchTerm, mode: 'insensitive' } },
      ];
    }

    if (filter.filters) {
      const { category, location, tags, minPrice, maxPrice } = filter.filters;

      if (category) {
        where.category = { equals: category, mode: 'insensitive' };
      }

      if (location) {
        where.location = { equals: location, mode: 'insensitive' };
      }

      if (tags?.length) {
        where.tags = { hasSome: tags };
      }

      if (minPrice !== undefined || maxPrice !== undefined) {
        where.price = {
          ...(minPrice !== undefined && { gte: minPrice }),
          ...(maxPrice !== undefined && { lte: maxPrice }),
        };
      }
    }

    return where;
  }

  buildOrderBy(sort?: SortOptions): Prisma.ProductOrderByWithRelationInput {
    if (!sort) {
      return { createdAt: 'desc' };
    }

    return { [sort.field]: sort.direction };
  }

  buildPagination(options?: PaginationOptions): { skip: number; take: number } {
    const { page = 1, limit = 10 } = options || {};
    const skip = (page - 1) * limit;
    const take = limit;

    return { skip, take };
  }
} 