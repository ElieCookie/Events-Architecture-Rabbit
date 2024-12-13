import { Body, Controller, Get, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('/create-order')
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<void> {
    const response = await this.cartService.createOrder(createOrderDto);
    return response;
  }
}
