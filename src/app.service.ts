import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: any[],
    private configService: ConfigService,
  ) {}
  getHello(): string {
    // console.log('tasks', this.tasks);
    console.log('database', this.configService.get('DATABASE_NAME'));
    return `Hello World! ${this.apiKey}`;
  }
}
