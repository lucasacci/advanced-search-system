import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Advanced Search System API')
  .setDescription('API para sistema de búsqueda avanzada de productos')
  .setVersion('1.0')
  .addTag('products', 'Endpoints relacionados con productos')
  .addTag('search', 'Endpoints de búsqueda y autocompletado')
  .build(); 