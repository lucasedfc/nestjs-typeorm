import { Inject } from '@nestjs/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsService } from 'src/products/services/products.service';
import { CreateUsersDto, UpdateUsersDto } from 'src/users/dtos/users.dto';
import { User } from 'src/users/entities/user.entity';
import { Order } from '../entities/order.entity';

@Injectable()
export class UsersService {
  constructor(
    private productService: ProductsService,
    @Inject('API_KEY') private apiKey: string,
  ) {}
  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      name: 'lucasedfc',
      lastName: 'heim',
    },
  ];

  create(payload: CreateUsersDto) {
    this.counterId++;
    const newUser = {
      id: this.counterId,
      ...payload,
    };
    this.users.push(newUser);
    return newUser;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((item) => item.id === id);

    if (!user) {
      throw new NotFoundException(`user with id ${id} not exist`);
    }
    return user;
  }

  update(id: number, payload: UpdateUsersDto) {
    const user = this.findOne(id);
    if (user) {
      const index = this.users.findIndex((item) => item.id === id);
      this.users[index] = {
        ...user,
        ...payload,
      };

      return this.users[index];
    }
  }

  delete(id: number) {
    const user = this.findOne(id);
    if (user) {
      const index = this.users.findIndex((item) => item.id === id);
      this.users.splice(index, 1);
      return { message: `user with id ${id} deleted` };
    }
  }

  getOrdersByUser(id: number): Order {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user: user,
      products: this.productService.findAll(),
    };
  }
}
