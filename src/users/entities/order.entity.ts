import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/products/entities/product.entity';
import { User } from './user.entity';

export class Order {
  @ApiProperty()
  date: Date;
  user: User;
  products: Product[];
}
