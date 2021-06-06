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
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateUsersDto, UpdateUsersDto } from 'src/users/dtos/users.dto';
import { UsersService } from '../services/users.service';
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('tasks')
  getTask() {
    return this.userService.getTasks();
  }

  @Get(':userId')
  getOne(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.findOne(userId);
  }

  @Get(':userId/orders')
  getOrders(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.getOrdersByUser(userId);
  }

  @Get()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  getAll() {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() payload: CreateUsersDto) {
    return this.userService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUsersDto,
  ) {
    return this.userService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
