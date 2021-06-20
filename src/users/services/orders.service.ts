import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { Customer } from '../entities/customer.entity';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
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
