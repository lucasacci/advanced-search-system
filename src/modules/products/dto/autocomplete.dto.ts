import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, MinLength } from 'class-validator';

export class AutocompleteDto {
  @ApiProperty({
    description: 'Search term for autocomplete suggestions',
    example: 'iphone',
  })
  @IsString()
  @MinLength(2)
  searchTerm: string;

  @ApiProperty({
    description: 'Category to filter suggestions (optional)',
    example: 'Electronics',
    required: false,
  })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({
    description: 'Maximum number of suggestions to return',
    example: 5,
    required: false,
    default: 5,
  })
  @IsOptional()
  limit?: number = 5;
} 