import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SearchProductsDto } from './dto/search-products.dto';
import { AutocompleteDto } from './dto/autocomplete.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PaginatedResponseDecorator } from 'src/decorators';


@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @PaginatedResponseDecorator('Product')
  findAll(@Query() searchDto: SearchProductsDto) {
    return this.productsService.findAll(searchDto);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search products with filters' })
  @ApiResponse({
    status: 200,
    description: 'Returns the filtered products with pagination and suggestions.',
  })
  search(@Query() searchDto: SearchProductsDto) {
    return this.productsService.search(searchDto);
  }

  @Get('autocomplete')
  @ApiOperation({ summary: 'Get product suggestions' })
  @ApiResponse({
    status: 200,
    description: 'Returns product suggestions based on search term.',
  })
  autocomplete(@Query() autocompleteDto: AutocompleteDto) {
    return this.productsService.autocomplete(autocompleteDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by id' })
  @ApiResponse({
    status: 200,
    description: 'Returns the product.',
  })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
