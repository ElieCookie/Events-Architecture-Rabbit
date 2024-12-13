export class OrderItemDto {
  itemId: string; // Unique identifier for the item
  quantity: number; // Quantity of the item (must be greater than 0)
  price: number; // Price of a single unit of the item
}

export class OrderDto {
  orderId: string; // Unique identifier for the order
  customerId: string; // Unique identifier for the customer
  orderDate: string; // Timestamp in ISO 8601 format
  items: OrderItemDto[]; // Array of order items
  totalAmount: number; // Total cost of the order
  currency: string; // Currency code (e.g., USD, EUR)
  status: string; // Status of the order (e.g., 'pending', 'confirmed')
}
