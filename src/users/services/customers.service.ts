import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../../users/entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}

  create(payload: CreateCustomerDto) {
    const customer = this.customerRepo.create(payload);
    const newCustomer = this.customerRepo
      .save(customer)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException(`${err.message || 'Unexpected Error'}`);
      });
    return newCustomer;
  }

  findAll() {
    return this.customerRepo.find({ relations: ['user'] });
  }

  async findOne(id: number) {
    const customer = await this.customerRepo.findOne(id);
    if (!customer) {
      throw new NotFoundException(`customer with id ${id} not exist`);
    }
    return customer;
  }

  async update(id: number, payload: UpdateCustomerDto) {
    const customer = await this.findOne(id);
    this.customerRepo.merge(customer, payload);
    const updatedCustomer = this.customerRepo
      .save(customer)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException(`${err.message || 'Unexpected Error'}`);
      });

    return updatedCustomer;
  }

  async delete(id: number) {
    await this.findOne(id);
    this.customerRepo.delete(id);
    return { message: `customer with id ${id} deleted` };
  }
}
