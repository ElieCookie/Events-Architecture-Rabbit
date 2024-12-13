import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      // urls: ['amqp://user:password@localhost:5672'],
      urls: ['amqp://rabbitmq:5672'],
      queue: 'orderQueue',
    },
  });

  await app.startAllMicroservices();
  await app.listen(3002);
  console.log('orders service is running on port 3002');
}

bootstrap();
