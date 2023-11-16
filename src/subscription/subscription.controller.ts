// src/subscription/subscription.controller.ts
import { Controller, Post, Body, Param } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post('/subscribe/:userId/:city')
  subscribe(@Param('userId') userId: number, @Param('city') city: string) {
    this.subscriptionService.addSubscription({ userId, city });
    return { message: `User ${userId} subscribed to ${city}` };
  }

  @Post('/unsubscribe/:userId')
  unsubscribe(@Param('userId') userId: number) {
    this.subscriptionService.removeSubscription(userId);
    return { message: `User ${userId} unsubscribed` };
  }
}
