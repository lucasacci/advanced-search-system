import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../modules/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SearchProductsDto } from './dto/search-products.dto';
import { AutocompleteDto } from './dto/autocomplete.dto';
import {
  QueryFilter,
  buildWhere,
  buildOrderBy,
  buildPagination,
} from '../../../utils/query.interface';

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

  async autocomplete(autocompleteDto: AutocompleteDto) {
    const { searchTerm, category, limit = 5 } = autocompleteDto;

    const where: any = {};
    if (searchTerm) {
      where.OR = [
        { name: { contains: searchTerm, mode: 'insensitive' } },
        { description: { contains: searchTerm, mode: 'insensitive' } },
      ];
    }

    if (category) {
      where.category = { contains: category, mode: 'insensitive' };
    }

    const products = await this.prisma.product.findMany({
      where,
      take: Number(limit),
      select: {
        id: true,
        name: true,
        category: true,
        location: true,
      },
    });

    const categories = await this.prisma.product.findMany({
      where: {
        category: { contains: searchTerm, mode: 'insensitive' },
      },
      select: {
        category: true,
      },
      distinct: ['category'],
      take: Number(limit),
    });

    const locations = await this.prisma.product.findMany({
      where: {
        location: { contains: searchTerm, mode: 'insensitive' },
      },
      select: {
        location: true,
      },
      distinct: ['location'],
      take: Number(limit),
    });

    return {
      products,
      suggestions: {
        categories: categories.map((p) => p.category),
        locations: locations.map((p) => p.location),
      },
    };
  }
} 