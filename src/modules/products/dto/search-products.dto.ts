import { IsString, IsOptional, IsNumber, Min, IsArray, IsIn } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class SearchProductsDto {
  @ApiPropertyOptional({ description: 'Término de búsqueda' })
  @IsString()
  @IsOptional()
  searchTerm?: string;

  @ApiPropertyOptional({ description: 'Categoría del producto' })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({ description: 'Ubicación del producto' })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiPropertyOptional({ description: 'Etiquetas del producto' })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @ApiPropertyOptional({ description: 'Precio mínimo' })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @IsOptional()
  minPrice?: number;

  @ApiPropertyOptional({ description: 'Precio máximo' })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @IsOptional()
  maxPrice?: number;

  @ApiPropertyOptional({ description: 'Página actual', default: 1 })
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Elementos por página', default: 10 })
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  limit?: number = 10;

  @ApiPropertyOptional({ description: 'Campo por el cual ordenar', enum: ['name', 'price', 'createdAt', 'updatedAt'] })
  @IsString()
  @IsIn(['name', 'price', 'createdAt', 'updatedAt'])
  @IsOptional()
  sortBy?: string;

  @ApiPropertyOptional({ description: 'Dirección del ordenamiento', enum: ['asc', 'desc'], default: 'asc' })
  @IsString()
  @IsIn(['asc', 'desc'])
  @IsOptional()
  sortDirection?: 'asc' | 'desc' = 'asc';
}
