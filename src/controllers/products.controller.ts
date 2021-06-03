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
  //ParseIntPipe,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/products.dto';
import { ProductsService } from '../services/products.service';
import { ParseIntPipe } from '../shared/parse-int.pipe';
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}
  @Get('')
  // eslint-disable-next-line prettier/prettier
  getProducts /*  @Query('limit') limit = 100, */() /*  @Query('offset') offset = 0, */
  /*  @Query('brand') brand: string, */
  {
    // return {
    //   message: `products: limit => ${limit} offset => ${offset} brand => ${brand}`,
    // };
    return this.productService.findAll();
  }

  @Get('filter')
  getProductFilter() {
    return {
      message: `i'm a filter`,
    };
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId', ParseIntPipe) productId: number) {
    // Express Way
    // response.status(200).send({
    //   message: `product with id ${productId}`,
    // });
    // return {
    //   message: `product with id ${productId}`,
    // };
    return this.productService.findOne(productId);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    // return {
    //   message: 'Create action',
    //   payload,
    // };
    return this.productService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateProductDto) {
    return this.productService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productService.delete(id);
  }
}
