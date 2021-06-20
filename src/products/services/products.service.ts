import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
import { Product } from '../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/categories.entity';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
  ) {}

  findAll() {
    return this.productRepo.find({
      relations: ['brand'],
    });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne(id, {
      relations: ['brand', 'categories'],
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async create(payload: CreateProductDto) {
    const newProduct = this.productRepo.create(payload);
    if (payload.brandId) {
      const brand = await this.brandRepo.findOne(payload.brandId);
      newProduct.brand = brand;
    }

    if (payload.categoriesId) {
      const categories = await this.categoryRepo.findByIds(
        payload.categoriesId,
      );
      newProduct.categories = categories;
    }
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
    if (payload.brandId) {
      const brand = await this.brandRepo.findOne(payload.brandId);
      product.brand = brand;
    }
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
