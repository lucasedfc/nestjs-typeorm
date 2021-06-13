import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductsService } from 'src/products/services/products.service';
import { CreateUsersDto, UpdateUsersDto } from 'src/users/dtos/users.dto';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private productService: ProductsService,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  create(payload: CreateUsersDto) {
    const user = this.userRepo.create(payload);
    const newUser = this.userRepo
      .save(user)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException(`${err.message || 'Unexpected Error'}`);
      });

    return newUser;
  }

  findAll() {
    return this.userRepo.find();
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne(id);
    if (!user) {
      throw new NotFoundException(`user with id ${id} not exist`);
    }
    return user;
  }

  async update(id: number, payload: UpdateUsersDto) {
    const user = await this.findOne(id);
    this.userRepo.merge(user, payload);
    const updatedUser = this.userRepo
      .save(user)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException(`${err.message || 'Unexpected Error'}`);
      });

    return updatedUser;
  }

  async delete(id: number) {
    await this.findOne(id);
    this.userRepo.delete(id);
    return { message: `user with id ${id} deleted` };
  }

  async getOrdersByUser(id: number) {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user: user,
      products: await this.productService.findAll(),
    };
  }
}
