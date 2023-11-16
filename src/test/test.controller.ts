// src/test/test.controller.ts

import { Controller, Get } from '@nestjs/common';
import { TelegramService } from '../telegram/telegram.service';

@Controller('test')
export class TestController {
  constructor(private telegramService: TelegramService) {}

  @Get('sendWeatherUpdates')
  async sendWeatherUpdates() {
    await this.telegramService.handleCron(); // Call the method that sends weather updates
    return { message: 'Weather updates sent' };
  }
}
