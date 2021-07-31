import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/models/roles';
import { PayloadToken } from 'src/auth/models/token';
import { OrdersService } from '../services/orders.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private orderService: OrdersService) {}

  @Roles(Role.CUSTOMER, Role.ADMIN)
  @Get('my-orders')
  getOrders(@Req() request: any) {
    const user = request.user as PayloadToken;
    return this.orderService.ordersByCustomer(user.sub);
  }
}
