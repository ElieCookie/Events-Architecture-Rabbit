import { OrderDto } from './order.dto';

export class OrderResponseDto {
  orderDetails: OrderDto;
  shippingCost: number;
}
