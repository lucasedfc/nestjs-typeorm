import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { OrdersController } from './controllers/orders.controller';
import { CustomersController } from './controllers/customers.controller';
import { CategoriesController } from './controllers/categories.controller';
import { BrandsController } from './controllers/brands.controller';
import { ProductsService } from './services/products.service';
import { OrdersService } from './services/orders.service';
import { CustomersService } from './services/customers.service';
import { CategoriesService } from './services/categories.service';
import { BrandsService } from './services/brands.service';
@Module({
  controllers: [
    ProductsController,
    OrdersController,
    CustomersController,
    CategoriesController,
    BrandsController,
  ],
  providers: [
    ProductsService,
    OrdersService,
    CustomersService,
    CategoriesService,
    BrandsService,
  ],
})
export class ProductsModule {}
