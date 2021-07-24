import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';
import { ApiKeyGuard } from './auth/guards/api-key.guard';

@Controller()
@UseGuards(ApiKeyGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): { [key: string]: string } {
    return this.appService.getHello();
  }

  @Get('test')
  @Public()
  test() {
    return {
      message: 'Test',
    };
  }

  // @Get('tasks')
  // tasks() {
  //   return this.appService.getTasks();
  // }
}
