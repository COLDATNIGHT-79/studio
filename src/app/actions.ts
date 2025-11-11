'use server';

import { z } from 'zod';

const orderSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  address: z.string().min(10, 'Address must be at least 10 characters'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  paymentMethod: z.enum(['cod', 'upi']),
  total: z.number(),
});

export async function handleOrder(data: unknown) {
  const validation = orderSchema.safeParse(data);

  if (!validation.success) {
    return {
      success: false,
      message: 'Invalid data. Please check your inputs.',
      errors: validation.error.flatten().fieldErrors,
    };
  }

  // In a real application, you would save this to a database.
  console.log('Order Received:', validation.data);
  
  return {
    success: true,
    message: 'Order placed successfully!',
  };
}
