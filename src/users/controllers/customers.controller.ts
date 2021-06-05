import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';
import { CustomersService } from '../services/customers.service';
@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}
  @Get(':customerId')
  getOne(@Param('customerId', ParseIntPipe) customerId: number) {
    return this.customerService.findOne(customerId);
  }

  @Get()
  getAll() {
    return this.customerService.findAll();
  }

  @Post()
  create(@Body() payload: CreateCustomerDto) {
    return this.customerService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCustomerDto,
  ) {
    return this.customerService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.delete(id);
  }
}
