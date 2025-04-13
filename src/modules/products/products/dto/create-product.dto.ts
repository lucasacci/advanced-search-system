import {
  IsString,
  IsNumber,
  IsOptional,
  Min,
  IsNotEmpty,
  IsArray,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Nombre del producto' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ description: 'Descripción del producto' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Categoría del producto' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ description: 'Ubicación del producto' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ description: 'Precio del producto' })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ description: 'Stock disponible', default: 0 })
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiPropertyOptional({ description: 'Etiquetas del producto', type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}
