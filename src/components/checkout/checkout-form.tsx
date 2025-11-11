'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { handleOrder } from '@/app/actions';
import { useCart } from '@/context/cart-context';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  address: z.string().min(10, { message: 'Address must be at least 10 characters.' }),
  phone: z.string().regex(/^\d{10}$/, { message: 'Please enter a valid 10-digit phone number.' }),
  paymentMethod: z.enum(['cod', 'upi'], { required_error: 'You need to select a payment method.' }),
});

export default function CheckoutForm() {
  const { toast } = useToast();
  const { totalPrice, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      address: '',
      phone: '',
      paymentMethod: 'cod',
    },
  });

  const paymentMethod = form.watch('paymentMethod');

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const orderData = { ...values, total: totalPrice };
    const result = await handleOrder(orderData);
    
    if (result.success) {
      toast({
        title: 'Order Placed!',
        description: 'Thank you for your order. We will process it shortly.',
      });
      setIsSubmitted(true);
      clearCart();
    } else {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: result.message,
      });
    }
    setIsSubmitting(false);
  }

  if (isSubmitted) {
    return (
        <Card className="text-center">
            <CardHeader>
                <CardTitle className="text-2xl text-primary">Thank You for Your Order!</CardTitle>
                <CardDescription>Your food is on its way. We appreciate your business!</CardDescription>
            </CardHeader>
        </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping & Payment</CardTitle>
        <CardDescription>Please fill out your details to complete the order.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                        <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Delivery Address</FormLabel>
                    <FormControl>
                        <Input placeholder="123 Main St, Anytown, USA" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                        <Input placeholder="9876543210" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Payment Method</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="cod" />
                        </FormControl>
                        <FormLabel className="font-normal">Cash on Delivery (COD)</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="upi" />
                        </FormControl>
                        <FormLabel className="font-normal">UPI</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {paymentMethod === 'upi' && (
              <Card className="bg-secondary/50">
                <CardHeader>
                  <CardTitle className="text-lg">UPI Payment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm">Please pay <span className="font-bold text-primary">${totalPrice.toFixed(2)}</span> to complete your order.</p>
                  <p className="text-sm">Scan the QR code or pay to the UPI ID:</p>
                  <p className="font-mono bg-background p-2 rounded-md text-center">your-restaurant@paytm</p>
                  <p className="text-xs text-muted-foreground">After payment, please click "Place Order" to confirm.</p>
                </CardContent>
              </Card>
            )}
            
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Place Order
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
