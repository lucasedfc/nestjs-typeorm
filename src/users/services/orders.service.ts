import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { Customer } from '../entities/customer.entity';
import { Order } from '../entities/order.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}

  findAll() {
    return this.orderRepo.find();
  }

  async findOne(id: number) {
    const customer = await this.orderRepo.findOne(id, {
      relations: ['items', 'items.product'],
    });
    if (!customer) {
      throw new NotFoundException(`order with id ${id} not exist`);
    }
    return customer;
  }

  async ordersByCustomer(userId: number) {
    const user: User = await this.userRepo.findOne(userId, {
      relations: ['customer'],
    });
    if (user) {
      return this.orderRepo.find({
        where: {
          customer: user.customer.id,
        },
        relations: ['items', 'items.product'],
      });
    } else {
      throw new NotFoundException(`Invalid User`);
    }
  }

  async create(payload: CreateOrderDto) {
    const order = new Order();
    if (payload.customerId) {
      const customer = await this.customerRepo.findOne(payload.customerId);
      order.customer = customer;
    }
    return this.orderRepo.save(order);
  }

  async update(id: number, payload: UpdateOrderDto) {
    const order = await this.orderRepo.findOne(id);
    if (payload.customerId) {
      const customer = await this.customerRepo.findOne(payload.customerId);
      order.customer = customer;
    }
    this.orderRepo.save(order);
  }

  async delete(id: number) {
    await this.findOne(id);
    this.orderRepo.delete(id);
    return { message: `order with id ${id} deleted` };
  }
}
