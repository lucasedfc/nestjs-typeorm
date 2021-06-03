import { Module } from '@nestjs/common';
import { CustomersController } from './controllers/customers.controller';
import { OrdersController } from './controllers/orders.controller';
import { UsersController } from './controllers/users.controller';
import { CustomersService } from './services/customers.service';
import { OrdersService } from './services/orders.service';
import { UsersService } from './services/users.service';

@Module({
  controllers: [UsersController, CustomersController, OrdersController],
  providers: [UsersService, CustomersService, OrdersService],
})
export class UsersModule {}
