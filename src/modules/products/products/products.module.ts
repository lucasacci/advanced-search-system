import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { ProductQueryService } from './services/product-query.service';

@Module({
  imports: [PrismaModule],
  controllers: [ProductsController],
  providers: [ProductsService, ProductQueryService],
  exports: [ProductsService],
})
export class ProductsModule {}
