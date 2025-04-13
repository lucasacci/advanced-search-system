import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Advanced Search System API')
  .setDescription('API for advanced search system')
  .setVersion('1.0')
  .addTag('products', 'Endpoints related to products')
  .addTag('search', 'Search and autocomplete endpoints')
  .build();
