'use client';
import { useCart } from '@/context/cart-context';
import CheckoutForm from '@/components/checkout/checkout-form';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function CheckoutPage() {
  const { cart, totalPrice, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">Add some delicious food to your cart to proceed to checkout.</p>
        <Button asChild>
          <Link href="/">Back to Menu</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <div className="md:col-span-1">
           <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="rounded-md object-cover"
                    />
                    <div className="flex-grow">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.quantity} x INR {item.price.toFixed(2)}
                      </p>
                    </div>
                    <p className="font-semibold">INR {(item.quantity * item.price).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>INR {totalPrice.toFixed(2)}</span>
              </div>
            </CardContent>
             <CardFooter>
                 <Button variant="outline" asChild className="w-full">
                    <Link href="/">Continue Shopping</Link>
                 </Button>
            </CardFooter>
          </Card>
        </div>
        <div className="md:col-span-1">
          <CheckoutForm />
        </div>
      </div>
    </div>
  );
}
