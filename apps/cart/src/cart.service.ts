import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { OrderDto } from './dto/order.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CartService {
  constructor(@Inject('CART_SERVICE') private rabbitClient: ClientProxy) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<any> {
    const orderDetails = generateOrder(
      createOrderDto.orderId,
      createOrderDto.itemsAmount,
    );

    this.rabbitClient.emit('order_created', orderDetails);
    console.log(
      'Order created and event published:',
      JSON.stringify(orderDetails),
    );

    return { message: `Order ${orderDetails.orderId} is placed!` };
  }
}

export function generateOrder(orderId: string, itemsAmount: number): OrderDto {
  // optional statuses
  const statuses = ['pending', 'new', 'completed'];

  // optional currencies
  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF'];

  const order: OrderDto = {
    orderId,
    customerId: uuidv4(),
    orderDate: new Date().toISOString(),
    items: Array.from({ length: itemsAmount }, () => ({
      itemId: uuidv4(),
      quantity: Math.floor(Math.random() * 10) + 1,
      price: parseFloat((Math.random() * 100).toFixed(2)),
    })),
    totalAmount: 0,
    currency: currencies[Math.floor(Math.random() * currencies.length)],
    status: 'new',
  };

  order.totalAmount = order.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0,
  );

  return order;
}
