
'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/context/cart-context';
import { suggestSimilarFood, type SuggestSimilarFoodOutput } from '@/ai/flows/suggest-similar-food';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Sparkles, PlusCircle } from 'lucide-react';
import { menuItems } from '@/lib/menu-data';

export default function SimilarFoodFAB() {
  const { suggestionItem, setSuggestionItem, addToCart: addSuggestedToCart } = useCart();
  const [suggestions, setSuggestions] = useState<SuggestSimilarFoodOutput>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let fadeOutTimer: NodeJS.Timeout;
    if (suggestionItem) {
      setIsVisible(true);
      setIsOpen(true); // Open the popover when an item is set
      const fetchSuggestions = async () => {
        setIsLoading(true);
        setSuggestions([]);
        try {
          const result = await suggestSimilarFood({
            foodName: suggestionItem.name,
            ingredients: suggestionItem.ingredients,
            dietaryInfo: suggestionItem.dietary,
          });
          setSuggestions(result);
        } catch (error) {
          console.error('Failed to fetch suggestions:', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchSuggestions();

      fadeOutTimer = setTimeout(() => {
        if (isOpen) { // Check if user hasn't manually kept it open
            setIsOpen(false);
            setIsVisible(false);
        }
      }, 5000); 
    } else {
       setIsVisible(false);
       setIsOpen(false);
    }

    return () => {
      clearTimeout(fadeOutTimer);
    };
  }, [suggestionItem]);

  const handleAddToCart = (suggestionName: string) => {
    const itemToAdd = menuItems.find(item => item.name === suggestionName);
    if (itemToAdd) {
        addSuggestedToCart(itemToAdd);
    }
    setIsOpen(false);
    setSuggestionItem(null);
  };
  
  const onOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
        // Allow re-triggering even if closed manually
        setTimeout(() => setSuggestionItem(null), 300);
    }
  }

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-1/2 translate-y-1/2 right-4 z-50">
        <Popover open={isOpen} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>
            <Button 
            variant="default" 
            size="icon" 
            className="rounded-full h-14 w-14 shadow-lg animate-pulse ring-2 ring-primary-foreground ring-offset-2"
            onClick={() => onOpenChange(!isOpen)}
            >
            <Sparkles className="h-7 w-7" />
            </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-[80vw] sm:w-[50vw] lg:w-[400px] mb-2">
            <div className="space-y-2">
            <h4 className="font-medium leading-none flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                You might also like...
            </h4>
            <p className="text-sm text-muted-foreground">
                Since you added {suggestionItem?.name}, try these!
            </p>
            </div>
            <div className="py-4">
            <div className="grid grid-cols-1 gap-4">
                {isLoading &&
                Array.from({ length: 2 }).map((_, i) => (
                    <Card key={i}>
                    <CardHeader>
                        <Skeleton className="h-5 w-3/4" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-2/3" />
                    </CardContent>
                    <CardFooter>
                        <Skeleton className="h-8 w-24" />
                    </CardFooter>
                    </Card>
                ))}
                {!isLoading && suggestions.slice(0, 2).map(suggestion => (
                <Card key={suggestion.name} className="flex flex-col">
                    <CardHeader>
                    <CardTitle className="text-base">{suggestion.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-1">
                        {suggestion.dietaryInfo.map(tag => (
                        <Badge key={tag} variant="outline" className="capitalize">{tag}</Badge>
                        ))}
                    </div>
                    </CardContent>
                    <CardFooter>
                    <Button size="sm" className="w-full" onClick={() => handleAddToCart(suggestion.name)}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add to Cart
                    </Button>
                    </CardFooter>
                </Card>
                ))}
                {!isLoading && suggestions.length === 0 && (
                    <p className="col-span-full text-center text-muted-foreground">No suggestions available.</p>
                )}
            </div>
            </div>
        </PopoverContent>
        </Popover>
    </div>
  );
}
