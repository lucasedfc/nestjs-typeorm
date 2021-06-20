import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateOrderItemDto, UpdateOrderItemDto } from '../dtos/order-item.dto';
import { OrderItems } from '../entities/order-item.entity';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(OrderItems) private itemRepo: Repository<OrderItems>,
  ) {}

  async create(payload: CreateOrderItemDto) {
    const order = await this.orderRepo.findOne(payload.orderId);
    const product = await this.productRepo.findOne(payload.productId);
    const item = new OrderItems();
    item.order = order;
    item.product = product;
    item.quantity = payload.quantity;

    return this.itemRepo.save(item);
  }

  findAll() {
    return this.itemRepo.find({
      relations: ['order', 'order.customer'],
    });
  }

  findOne(id: number) {
    return this.itemRepo.findOne(id, {
      relations: ['order', 'product'],
    });
  }

  async update(id: number, payload: UpdateOrderItemDto) {
    const orderItem = await this.itemRepo.findOne(id);
    if (payload.orderId) {
      const order = await this.orderRepo.findOne(payload.orderId);
      orderItem.order = order;
    }
    if (payload.productId) {
      const product = await this.productRepo.findOne(payload.productId);
      orderItem.product = product;
    }
    if (payload.quantity) {
      orderItem.quantity = payload.quantity;
    }
    return this.itemRepo.save(orderItem);
  }

  delete(id: number) {
    return this.itemRepo.delete(id);
  }
}
