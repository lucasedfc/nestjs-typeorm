import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBrandsDto, UpdateBrandsDto } from 'src/products/dtos/brands.dto';
import { Brand } from 'src/products/entities/brand.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  constructor(@InjectRepository(Brand) private brandRepo: Repository<Brand>) {}

  findAll() {
    return this.brandRepo.find();
  }

  async findOne(id: number) {
    const brand = await this.brandRepo.findOne(id, {
      relations: ['products'],
    });
    if (!brand) {
      throw new NotFoundException(`Brand with id ${id} not found`);
    }
    return brand;
  }

  create(payload: CreateBrandsDto) {
    const newBrand = this.brandRepo.create(payload);
    const brand = this.brandRepo
      .save(newBrand)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException(`${err.message || 'Unexpected Error'}`);
      });
    return brand;
  }

  async update(id: number, payload: UpdateBrandsDto) {
    const brand = await this.findOne(id);
    this.brandRepo.merge(brand, payload);
    const updatedBrand = this.brandRepo
      .save(brand)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException(`${err.message || 'Unexpected Error'}`);
      });
    return updatedBrand;
  }

  async delete(id: number) {
    await this.findOne(id);
    this.brandRepo.delete(id);
    return {
      message: `Brand with id ${id} deleted`,
    };
  }
}
