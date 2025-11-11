'use client';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/cart-context';
import type { MenuItem } from '@/lib/types';
import { PlusCircle, Flame } from 'lucide-react';

interface MenuItemCardProps {
  item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(item);
  };

  const getSpiceColor = (level: string) => {
    switch (level) {
      case 'medium': return 'text-orange-500';
      case 'spicy': return 'text-red-500';
      default: return 'text-gray-400';
    }
  }

  return (
    <Card className="flex flex-col overflow-hidden h-full group transition-shadow duration-300 hover:shadow-xl">
      <div className="overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          width={600}
          height={400}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          data-ai-hint={item.imageHint}
        />
      </div>
      <CardHeader>
        <CardTitle className="font-headline">{item.name}</CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2 mb-4">
          {item.dietary.map(tag => (
            <Badge key={tag} variant="outline" className="capitalize">{tag}</Badge>
          ))}
          <Badge variant="secondary" className="capitalize flex items-center gap-1">
             <Flame className={`h-3 w-3 ${getSpiceColor(item.spiceLevel)}`} /> {item.spiceLevel}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center mt-auto pt-4">
        <p className="text-xl font-bold text-primary">${item.price.toFixed(2)}</p>
        <Button onClick={handleAddToCart} size="sm">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
