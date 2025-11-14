'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { handleOrder } from '@/app/actions';
import { useCart } from '@/context/cart-context';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ShieldCheck } from 'lucide-react';
import { Separator } from '../ui/separator';
import QRCode from "react-qr-code";

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  address: z.string().min(10, { message: 'Address must be at least 10 characters.' }),
  phone: z.string().regex(/^\d{10}$/, { message: 'Please enter a valid 10-digit phone number.' }),
  paymentMethod: z.enum(['cod', 'upi'], { required_error: 'You need to select a payment method.' }),
});

export default function CheckoutForm() {
  const { toast } = useToast();
  const { getCartTotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalPrice = getCartTotal();

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
  const paytmId = '7877780406@ptsbi';
  const upiUrl = `upi://pay?pa=${paytmId}&am=${totalPrice.toFixed(2)}&cu=INR&tn=OrderPayment`;


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
        <Card className="text-center py-12 bg-card border-none">
            <CardHeader>
                <CardTitle className="text-3xl text-primary">Thank You!</CardTitle>
                <CardDescription className="text-lg text-foreground/80">Your order is confirmed and on its way.</CardDescription>
            </CardHeader>
        </Card>
    );
  }

  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardHeader>
        <CardTitle className="text-2xl">Shipping & Payment</CardTitle>
        <CardDescription>Please fill out your details to complete the order.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

            <Separator />
            
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
                      className="grid grid-cols-2 gap-4"
                    >
                      <FormItem>
                         <RadioGroupItem value="cod" id="cod" className="peer sr-only" />
                         <FormLabel htmlFor="cod" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                            Cash on Delivery
                         </FormLabel>
                      </FormItem>
                      <FormItem>
                         <RadioGroupItem value="upi" id="upi" className="peer sr-only" />
                         <FormLabel htmlFor="upi" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                            UPI
                         </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {paymentMethod === 'upi' && (
              <Card className="bg-secondary/50">
                <CardContent className="p-4 flex flex-col items-center gap-4">
                  <p className="text-sm text-center">Scan to pay <span className="font-bold text-primary">INR {totalPrice.toFixed(2)}</span> to <span className="font-mono">{paytmId}</span></p>
                  <div className="bg-white p-2 rounded-md">
                     <QRCode value={upiUrl} size={128} />
                  </div>
                  <p className="text-xs text-muted-foreground text-center">After payment, click "Place Secure Order" to confirm.</p>
                </CardContent>
              </Card>
            )}
            
            <Separator />

            <Button type="submit" size="lg" className="w-full h-14 text-lg font-bold bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="mr-2 h-6 w-6 animate-spin" /> 
              ) : (
                <ShieldCheck className="mr-3 h-5 w-5" />
              )}
              Place Secure Order
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
