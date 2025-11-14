'use client';

import { useState } from 'react';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { ShoppingCart, ChevronsUp } from 'lucide-react';
import CartSheetContent from './cart-sheet';
import Image from 'next/image';
import { Badge } from '../ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CartItemPopover from './cart-item-popover';

export default function Cart() {
  const { cart, totalItems, totalPrice } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="bottom" className="h-[90vh] flex flex-col bg-background/95 backdrop-blur-sm">
          <CartSheetContent onClose={() => setIsOpen(false)} />
        </SheetContent>
      </Sheet>

      <footer className="sticky bottom-0 z-40 w-full bg-card/80 backdrop-blur-sm border-t">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-grow min-w-0">
               <ShoppingCart className="h-6 w-6 text-primary" />
               {cart.length > 0 ? (
                 <div className="w-full max-w-xs md:max-w-sm lg:max-w-md">
                    <Carousel opts={{
                        align: "start",
                        dragFree: true,
                    }}
                    className="w-full"
                    >
                        <CarouselContent className="-ml-2">
                            {cart.map((item) => (
                                <CarouselItem key={item.id} className="pl-2 basis-1/4 sm:basis-1/5 md:basis-1/6">
                                     <CartItemPopover item={item}>
                                        <div className="relative cursor-pointer group">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                width={56}
                                                height={56}
                                                className="rounded-full object-cover aspect-square border-2 border-secondary group-hover:border-primary transition-colors"
                                            />
                                            {item.quantity > 1 && (
                                                <Badge
                                                    variant="destructive"
                                                    className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center rounded-full text-xs"
                                                >
                                                    {item.quantity}
                                                </Badge>
                                            )}
                                        </div>
                                     </CartItemPopover>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        {cart.length > 5 && <CarouselPrevious className="absolute left-0 -translate-x-1/2"/> }
                        {cart.length > 5 && <CarouselNext className="absolute right-0 translate-x-1/2" /> }
                    </Carousel>
                 </div>
               ) : (
                <p className="text-muted-foreground">Your cart is empty</p>
               )}
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-bold text-lg text-primary">INR {totalPrice.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">{totalItems} items</p>
              </div>
              <Button onClick={() => setIsOpen(true)} disabled={cart.length === 0} size="lg">
                  <ChevronsUp className="mr-2 h-5 w-5" /> View Cart
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
