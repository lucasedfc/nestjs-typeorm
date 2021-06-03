import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true /* Avoid field not declared in DTO*/,
      forbidNonWhitelisted:
        true /* Throw error with fields not declared in DTO */,
    }),
  );
  await app.listen(3000);
}
bootstrap();
