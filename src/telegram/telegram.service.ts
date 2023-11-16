// src/telegram/telegram.service.ts

import { Injectable } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { SubscriptionService } from 'src/subscription/subscription.service';
import { WeatherService } from 'src/weather/weather.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TelegramService {
  private bot: TelegramBot;
  private readonly token = '6948112867:AAHH70ni_LKOBnL3T1xHFFCYGW8tStbnE_I';

  constructor(
    private weatherService: WeatherService,
    private subscriptionService: SubscriptionService
  ) {
    this.bot = new TelegramBot(this.token, { polling: true });
    this.setupBot();
  }

  private setupBot(): void {
    this.bot.on('message', (msg) => {
      const chatId = msg.chat.id;
      const text = msg.text;

      if (text.startsWith('/subscribe ')) {
        const city = text.split('/subscribe ')[1];
        this.subscriptionService.addSubscription({ userId: chatId, city });
        this.bot.sendMessage(chatId, `Subscribed to daily weather updates for ${city}`);
      } else if (text === '/unsubscribe') {
        this.subscriptionService.removeSubscription(chatId);
        this.bot.sendMessage(chatId, 'Unsubscribed from daily weather updates');
      } else {
        // Handle other messages
        this.bot.sendMessage(chatId, 'Received your message type "/subscribe city" and to /unsubscribe to stop');
      }
    });
  }

  @Cron('* * * * *') // or any other suitable time
  async handleCron() {
    const subscriptions = this.subscriptionService.getAllSubscriptions();
    for (const sub of subscriptions) {
      try {
        const weather = await this.weatherService.getDailyWeather(sub.city);
        console.log(weather);
        const message = `Daily weather update for ${sub.city}: ${weather.description}, Temp: ${weather.temperature}°C`;
        this.bot.sendMessage(sub.userId, message);
        console.log(message);
      } catch (error) {
        console.error(`Failed to send weather update for ${sub.city} to user ${sub.userId}:`, error);
      }
    }
  }

}