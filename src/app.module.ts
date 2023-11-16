import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TelegramService } from './telegram/telegram.service';
import { WeatherService } from './weather/weather.service';
import { WeatherController } from './weather/weather.controller';
import { HttpModule } from '@nestjs/axios';
import { SubscriptionService } from './subscription/subscription.service';
import { TestController } from './test/test.controller';

@Module({
  imports: [HttpModule, ScheduleModule.forRoot()],
  providers: [TelegramService, WeatherService, SubscriptionService],
  controllers: [WeatherController, TestController],
})
// export class TelegramModule {}
export class AppModule {}