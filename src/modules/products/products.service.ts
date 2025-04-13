import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SearchProductsDto } from './dto/search-products.dto';
import { AutocompleteDto } from './dto/autocomplete.dto';
import {
  QueryFilter,
  buildWhere,
  buildOrderBy,
  buildPagination,
} from '../../utils/query.interface';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  async findAll(filter: QueryFilter<any> = {}) {
    const where = buildWhere(filter);
    const orderBy = buildOrderBy(filter.sort);
    const { skip, take } = buildPagination(filter.pagination);

    const [data, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        orderBy,
        skip,
        take,
      }),
      this.prisma.product.count({ where }),
    ]);

    const limit = Number(filter.pagination?.limit) || 10;
    const totalPages = Math.ceil(total / limit);
    const requestedPage = Number(filter.pagination?.page) || 1;
    
    // Ajustar la página si está fuera de rango
    const page = requestedPage > totalPages ? totalPages : requestedPage;

    return {
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  }

  async findOne(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: string) {
    return this.prisma.product.delete({
      where: { id },
    });
  }

  async search(searchDto: SearchProductsDto) {
    const filter: QueryFilter<any> = {
      searchTerm: searchDto.searchTerm,
      filters: {
        category: searchDto.category,
        location: searchDto.location,
        tags: searchDto.tags,
        price: {
          gte: searchDto.minPrice,
          lte: searchDto.maxPrice,
        },
      },
      pagination: {
        page: Number(searchDto.page),
        limit: Number(searchDto.limit),
      },
    };

    return this.findAll(filter);
  }

 
}
