import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';
import config from '../config';
import { ConfigType } from '@nestjs/config';

const API_KEY = '123456';
const API_KEY_PROD = '123456897456';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const { dbName, user, password, host, port } = configService.postgres;
        const client = new Client({
          user: user,
          password: password,
          host: host,
          database: dbName,
          port: port,
        });

        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'PG'],
})
export class DatabaseModule {}
