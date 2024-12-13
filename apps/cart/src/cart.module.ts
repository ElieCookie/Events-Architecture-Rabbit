import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CART_SERVICE',
        transport: Transport.RMQ,
        options: {
          // urls: ['amqp://user:password@localhost:5672'],
          urls: ['amqp://rabbitmq:5672'],
          queue: 'orderQueue',
        },
      },
    ]),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
