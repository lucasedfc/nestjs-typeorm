import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
  //ParseIntPipe,
} from '@nestjs/common';
import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from './../dtos/products.dto';
import { ProductsService } from '../services/products.service';
import { ParseIntPipe } from '../../shared/parse-int.pipe';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles';
import { RolesGuard } from 'src/auth/guards/roles.guard';
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}
  @Public()
  @Get('')
  @ApiOperation({ summary: 'List All Products' })
  getProducts(@Query() params: FilterProductsDto) {
    return this.productService.findAll(params);
  }

  @Public()
  @Get(':productId')
  @ApiOperation({ summary: 'Get One Product' })
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId', ParseIntPipe) productId: number) {
    return this.productService.findOne(productId);
  }

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productService.update(id, payload);
  }

  @Put(':id/category/:categoryId')
  updateCategoryByProduct(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productService.addCategoryByProduct(id, categoryId);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productService.delete(id);
  }

  @Delete(':id/category/:categoryId')
  deleteCategoryByProduct(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productService.removeCategoryByProduct(id, categoryId);
  }
}
