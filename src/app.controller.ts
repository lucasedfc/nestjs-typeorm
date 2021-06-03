import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'Hi there!';
  }

  @Get('new')
  newEndpoint(): string {
    return 'New endpoint!';
  }

  @Get('/route/')
  hello() {
    return 'Route with /slash/';
  }
}
