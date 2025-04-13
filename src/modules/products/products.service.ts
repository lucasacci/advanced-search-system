import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SearchProductsDto } from './dto/search-products.dto';
import {
  QueryFilter,
  buildWhere,
  buildOrderBy,
  buildPagination,
} from '../../utils/query.interface';
import { Prisma } from '@prisma/client';

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
    const {
      searchTerm,
      category,
      location,
      tags,
      minPrice,
      maxPrice,
      page: pageStr = '1',
      limit: limitStr = '10',
      sortBy,
      sortDirection,
    } = searchDto;

    // If searchTerm is empty, use findAll with filters
    if (!searchTerm?.trim()) {
      return this.findAll({
        pagination: { page: Number(pageStr), limit: Number(limitStr) },
        sort: sortBy
          ? { field: sortBy, direction: sortDirection || 'desc' }
          : { field: 'createdAt', direction: 'desc' },
        filters: {
          ...(category && { category }),
          ...(location && { location }),
          ...(tags?.length && { tags }),
          ...(minPrice !== undefined && { minPrice: Number(minPrice) }),
          ...(maxPrice !== undefined && { maxPrice: Number(maxPrice) }),
        },
      });
    }

    const page = Number(pageStr);
    const limit = Number(limitStr);

    const searchWords = searchTerm.toLowerCase().split(/\s+/).filter(Boolean);

    const where: Prisma.ProductWhereInput = {
      AND: [
        searchTerm
          ? {
              OR: searchWords.map((word) => ({
                OR: [
                  {
                    name: {
                      contains: word,
                      mode: Prisma.QueryMode.insensitive,
                    },
                  },
                  {
                    description: {
                      contains: word,
                      mode: Prisma.QueryMode.insensitive,
                    },
                  },
                ],
              })),
            }
          : {},
        category
          ? {
              category: {
                equals: category,
                mode: Prisma.QueryMode.insensitive,
              },
            }
          : {},
        location
          ? {
              location: {
                equals: location,
                mode: Prisma.QueryMode.insensitive,
              },
            }
          : {},
        tags ? { tags: { hasSome: tags } } : {},
        minPrice !== undefined || maxPrice !== undefined
          ? {
              price: {
                ...(minPrice !== undefined && { gte: Number(minPrice) }),
                ...(maxPrice !== undefined && { lte: Number(maxPrice) }),
              },
            }
          : {},
      ],
    };

    const orderBy: Prisma.ProductOrderByWithRelationInput[] = [];

    if (searchTerm) {
      orderBy.push({ name: sortDirection || 'asc' });
    } else if (sortBy) {
      orderBy.push({ [sortBy]: sortDirection || 'desc' });
    }

    orderBy.push({ createdAt: 'desc' });

    const [data, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: Number(limit),
      }),
      this.prisma.product.count({ where }),
    ]);

    if (searchTerm) {
      data.sort((a, b) => {
        // Function to calculate relevance score
        const getRelevanceScore = (text: string): number => {
          let score = 0;
          const textLower = text.toLowerCase();
          const textWords = textLower.split(/\s+/);
          const searchTermLower = searchTerm.toLowerCase();

          // Exact match with the entire phrase
          if (textLower === searchTermLower) {
            score += 2000;
          } else if (textLower.includes(searchTermLower)) {
            score += 1500; // Complete phrase contained in the text
          }

          // Count of matching words and their positions
          const matchedWords = new Map<string, number>();
          const exactMatches = new Set<string>();
          const partialMatches = new Set<string>();

          for (const searchWord of searchWords) {
            // Find the best match for each search word
            let bestMatchScore = 0;
            let bestMatchIndex = -1;

            textWords.forEach((textWord, index) => {
              // Exact match
              if (textWord === searchWord) {
                bestMatchScore = 250;
                bestMatchIndex = index;
                exactMatches.add(searchWord);
              }
 
              // Match at the beginning (incomplete word)
              else if (textWord.startsWith(searchWord) && bestMatchScore < 200) {
                bestMatchScore = 200;
                bestMatchIndex = index;
                partialMatches.add(searchWord);
              }
              // Word contained in another
              else if (textWord.includes(searchWord) && bestMatchScore < 150) {
                bestMatchScore = 150;
                bestMatchIndex = index;
                partialMatches.add(searchWord);
              }
              // Similar word (with one letter difference)
              else if (
                searchWord.length > 2 && 
                (textWord.includes(searchWord.substring(0, searchWord.length - 1)) || 
                searchWord.includes(textWord)) && 
                bestMatchScore < 100
              ) {
                bestMatchScore = 100;
                bestMatchIndex = index;
                partialMatches.add(searchWord);
              }
            });
            
            if (bestMatchScore > 0) {
              score += bestMatchScore;
              matchedWords.set(searchWord, bestMatchIndex);
            }
          }
          
          // ===== RELEVANCE BONUSES =====
          
          // 1. Bonus for finding ALL search words
          if (matchedWords.size === searchWords.length) {
            score += 800;
            
            // 1.1 Extra if all are exact matches
            if (exactMatches.size === searchWords.length) {
              score += 300;
            }
            
            // 1.2 Bonus for correct order
            const positions = Array.from(matchedWords.values());
            const isInCorrectOrder = positions.every((pos, i) => 
              i === 0 || pos > positions[i - 1]
            );
            
            if (isInCorrectOrder) {
              score += 500;
            }
            
            // 1.3 Bonus for consecutive positions
            const isConsecutive = positions.every((pos, i) => 
              i === 0 || pos === positions[i - 1] + 1
            );
            
            if (isConsecutive) {
              score += 300;
            }
            
            // 1.4 Bonus for words at the beginning
            if (positions[0] === 0) {
              score += 200;
            }
            
            // 1.5 Bonus for fewer extra words
            const extraWords = textWords.length - searchWords.length;
            score -= Math.max(0, extraWords) * 15;
          } 
          // 2. Partial bonus for partial matches
          else {
            // 2.1 Percentage of words found
            const matchPercentage = matchedWords.size / searchWords.length;
            score += matchPercentage * 300;
            
            // 2.2 Penalty for missing words
            const missingWords = searchWords.length - matchedWords.size;
            score -= missingWords * 100;
            
            // 2.3 Bonus if found words are in order
            if (matchedWords.size > 1) {
              const positions = Array.from(matchedWords.values());
              const isPartiallyOrdered = positions.every((pos, i) => 
                i === 0 || pos > positions[i - 1]
              );
              
              if (isPartiallyOrdered) {
                score += 150;
              }
            }
          }
                    
          return score;
        };

        // Compare first by name
        const aNameScore = getRelevanceScore(a.name);
        const bNameScore = getRelevanceScore(b.name);
        
        // If there is a significant difference, use only name comparison
        if (Math.abs(aNameScore - bNameScore) > 200) {
          return bNameScore - aNameScore;
        }
        
        // For close results, also consider the description
        const aDescScore = a.description ? getRelevanceScore(a.description) * 0.5 : 0;
        const bDescScore = b.description ? getRelevanceScore(b.description) * 0.5 : 0;
        return (bNameScore + bDescScore) - (aNameScore + aDescScore);
      });
    }

    return {
      data,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
