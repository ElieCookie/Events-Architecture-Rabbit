import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CartModule } from './cart.module';

@Module({
  imports: [CartModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
