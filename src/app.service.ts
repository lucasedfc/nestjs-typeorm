import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @Inject('TASKS') private tasks: any[],
    @Inject('PG') private pgClient: Client,
  ) {}
  getHello(): { [key: string]: string } {
    // console.log('tasks', this.tasks);
    // console.log('database', this.configService.get<string>('DATABASE_NAME'));
    return {
      message: `Ready To Receive Request On ${this.configService.configuration} Configuration`,
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
