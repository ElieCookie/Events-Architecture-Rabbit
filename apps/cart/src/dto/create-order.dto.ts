import { IsInt, IsString, Min } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  orderId: string;
  @IsInt()
  @Min(1, { message: 'items amount must be at least 1' })
  itemsAmount: number;
}
