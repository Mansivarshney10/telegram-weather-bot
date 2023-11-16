// subscription.service.ts
import { Injectable } from '@nestjs/common';

interface Subscription {
    userId: number;
    city: string;
}

@Injectable()
export class SubscriptionService {
  private subscriptions: Subscription[] = [];

  addSubscription(subscription: Subscription): void {
    const existingSubscription = this.subscriptions.find(sub => sub.userId === subscription.userId);
    if (existingSubscription) {
      existingSubscription.city = subscription.city; // Update the city if already subscribed
    } else {
      this.subscriptions.push(subscription); // Add new subscription
    }
  }

  removeSubscription(userId: number): void {
    this.subscriptions = this.subscriptions.filter(sub => sub.userId !== userId);
  }

  getSubscriptionsForUser(userId: number): Subscription[] {
    return this.subscriptions.filter(sub => sub.userId === userId);
  }

  getAllSubscriptions(): Subscription[] {
    return this.subscriptions;
  }
}
