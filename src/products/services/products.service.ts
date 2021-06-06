import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
import { Product } from '../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  findAll() {
    return this.productRepo.find();
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  create(payload: CreateProductDto) {
    const newProduct = this.productRepo.create(payload);
    const product = this.productRepo
      .save(newProduct)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException(`${err.message || 'Unexpected Error'}`);
      });

    return product;
  }

  async update(id: number, payload: UpdateProductDto) {
    const product = await this.findOne(id);
    this.productRepo.merge(product, payload);
    return this.productRepo.save(product);
  }

  async delete(id: number) {
    await this.findOne(id);
    this.productRepo.delete(id);
    return {
      message: `Product with id ${id} deleted`,
    };
  }
}
