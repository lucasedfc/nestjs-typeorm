import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
import { Category } from '../entities/categories.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  create(payload: CreateCategoryDto) {
    const newCategory = this.categoryRepo.create(payload);
    const category = this.categoryRepo
      .save(newCategory)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException(`${err.message || 'Unexpected Error'}`);
      });

    return category;
  }

  findAll() {
    return this.categoryRepo.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOne(id, {
      relations: ['products'],
    });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not exist`);
    }
    return category;
  }

  async update(id: number, payload: UpdateCategoryDto) {
    const category = await this.findOne(id);

    this.categoryRepo.merge(category, payload);
    const updatedCategory = await this.categoryRepo
      .save(category)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException(`${err.message} || Unexpected Error`);
      });

    return { message: 'Category Updated', ...updatedCategory };
  }

  async delete(id: number) {
    await this.findOne(id);
    this.categoryRepo.delete(id);
    return { message: `Category with id ${id} deleted` };
  }
}
