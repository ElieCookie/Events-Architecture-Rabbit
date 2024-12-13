import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResponseDto } from './order-response.dto';
import { EventPattern, Payload } from '@nestjs/microservices';
import { OrderDto } from './order.dto';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @EventPattern('order_created')
  async handleOrderCreatedEvent(@Payload() orderDetails: OrderDto) {
    if (orderDetails.status !== 'new') {
      return;
    }

    await this.orderService.handleOrderCreatedEvent(orderDetails);
  }

  @Get('/order-details/:orderId')
  async getOrder(@Param('orderId') orderId: string): Promise<OrderResponseDto> {
    try {
      const order = await this.orderService.getOrder(orderId);
      return order;
    } catch (e) {
      if (e instanceof NotFoundException)
        throw new NotFoundException(e.message);
      throw e;
    }
  }
}
