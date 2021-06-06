import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductsService } from 'src/products/services/products.service';
import { CreateUsersDto, UpdateUsersDto } from 'src/users/dtos/users.dto';
import { User } from 'src/users/entities/user.entity';
import { Order } from '../entities/order.entity';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';

@Injectable()
export class UsersService {
  constructor(
    private productService: ProductsService,
    private configService: ConfigService,
    @Inject('PG') private pgClient: Client,
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
    const apiKey = this.configService.get('API_KEY');
    const database = this.configService.get('DATABASE_NAME');
    console.log('data', apiKey, database);

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

  getTasks() {
    return new Promise((resolve, reject) => {
      this.pgClient.query(
        'SELECT * FROM public.tasks ORDER BY id ASC',
        (err, res) => {
          if (err) reject(err);
          resolve(res.rows);
        },
      );
    });
  }
}
