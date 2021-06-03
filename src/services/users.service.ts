import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsersDto, UpdateUsersDto } from 'src/dtos/users.dto';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UsersService {
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
}
