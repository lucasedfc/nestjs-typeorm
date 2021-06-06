import { Module, Global } from '@nestjs/common';
import config from '../config';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

const API_KEY = '123456';
const API_KEY_PROD = '123456897456';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { dbName, user, password, host, port } = configService.postgres;
        return {
          type: 'postgres',
          host,
          port,
          username: user,
          password,
          database: dbName,
          synchronize: true,
          autoLoadEntities: true,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    // {
    //   provide: 'PG',
    //   useFactory: (configService: ConfigType<typeof config>) => {
    //     const { dbName, user, password, host, port } = configService.postgres;
    //     const client = new Client({
    //       user: user,
    //       password: password,
    //       host: host,
    //       database: dbName,
    //       port: port,
    //     });

    //     client.connect();
    //     return client;
    //   },
    //   inject: [config.KEY],
    // },
  ],
  exports: ['API_KEY', TypeOrmModule],
})
export class DatabaseModule {}
