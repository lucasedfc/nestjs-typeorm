import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from 'src/dtos/orders.dto';
import { Order } from 'src/entities/order.entity';
import { nanoid } from 'nanoid';

@Injectable()
export class OrdersService {
  private counterId = 1;
  private orders: Order[] = [
    {
      id: nanoid(),
      productId: 1,
      price: 312,
    },
  ];

  create(payload: CreateOrderDto) {
    const newOrder = {
      id: nanoid(),
      ...payload,
    };
    this.orders.push(newOrder);
    return newOrder;
  }

  findAll() {
    return this.orders;
  }

  findOne(id: string) {
    const order = this.orders.find((item) => item.id === id);

    if (!order) {
      throw new NotFoundException(`order with id ${id} not exist`);
    }
    return order;
  }

  update(id: string, payload: UpdateOrderDto) {
    const order = this.findOne(id);
    if (order) {
      const index = this.orders.findIndex((item) => item.id === id);
      this.orders[index] = {
        ...order,
        ...payload,
      };

      return this.orders[index];
    }
  }

  delete(id: string) {
    const order = this.findOne(id);
    if (order) {
      const index = this.orders.findIndex((item) => item.id === id);
      this.orders.splice(index, 1);
      return { message: `order with id ${id} deleted` };
    }
  }
}
