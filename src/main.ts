import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true /* Avoid field not declared in DTO*/,
      forbidNonWhitelisted:
        true /* Throw error with fields not declared in DTO */,
    }),
  );

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'My API Docs',
  };

  const config = new DocumentBuilder()
    .setTitle('Nest Doc example')
    .setDescription('The NestJS API Description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, customOptions);

  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
