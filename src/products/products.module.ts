import { Module } from '@nestjs/common';

import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { Product } from './entities/product.entity';

import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';

import { BrandsController } from './controllers/brands.controller';
import { BrandsService } from './services/brands.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/categories.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])],
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [ProductsService, CategoriesService, BrandsService],
  exports: [ProductsService],
})
export class ProductsModule {}
