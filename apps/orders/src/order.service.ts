import { Injectable, NotFoundException } from '@nestjs/common';
import { LRUCache } from 'lru-cache';
import { ordersCacheOptions } from './config/cache.config';
import { OrderResponseDto } from './order-response.dto';
import { EventPattern } from '@nestjs/microservices';
import { OrderDto } from './order.dto';

type orderId = string;

@Injectable()
export class OrderService {
  orders: LRUCache<orderId, OrderResponseDto>;

  constructor() {
    this.orders = new LRUCache<orderId, OrderResponseDto>(ordersCacheOptions);
  }

  async handleOrderCreatedEvent(orderDetails: OrderDto) {
    const shippingCost = this.calculateShippingCost(orderDetails.totalAmount);
    const orderWithShipping: OrderResponseDto = { orderDetails, shippingCost };

    this.orders.set(orderDetails.orderId, orderWithShipping);

    console.log('Order processed and stored in cache:', orderWithShipping);
  }

  async getOrder(orderId: string): Promise<OrderResponseDto> {
    const order = this.orders.get(orderId);
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found.`);
    }
    return order;
  }

  private calculateShippingCost(totalAmount: number): number {
    return totalAmount * 0.02; // 2% of the total amount
  }
}
