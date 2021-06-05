import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @Inject('TASKS') private tasks: any[],
  ) {}
  getHello(): string {
    // console.log('tasks', this.tasks);
    // console.log('database', this.configService.get<string>('DATABASE_NAME'));
    console.log('database', this.configService.database.name);
    return `Hello World!`;
  }
}
