'use client';

import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { SheetHeader, SheetTitle, SheetFooter, SheetClose } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import CartItem from './cart-item';
import { ShoppingBag } from 'lucide-react';

interface CartSheetContentProps {
  onClose: () => void;
}

export default function CartSheetContent({ onClose }: CartSheetContentProps) {
  const { cart, totalPrice, totalItems } = useCart();

  return (
    <>
      <SheetHeader className="px-6 pt-6 pb-4">
        <SheetTitle className="text-2xl">Your Cart ({totalItems} items)</SheetTitle>
      </SheetHeader>
      
      <div className="flex-grow overflow-hidden px-6">
        {cart.length > 0 ? (
          <ScrollArea className="h-full pr-4 -mr-4">
            <div className="space-y-4">
              {cart.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
             <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold">Your cart is empty</h3>
            <p className="text-muted-foreground">Add some items from the menu to get started.</p>
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <SheetFooter className="px-6 py-4 border-t bg-background">
          <div className="w-full space-y-4">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Subtotal</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
             <SheetClose asChild>
                <Button asChild size="lg" className="w-full" onClick={onClose}>
                    <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
            </SheetClose>
          </div>
        </SheetFooter>
      )}
    </>
  );
}
