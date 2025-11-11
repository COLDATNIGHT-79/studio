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

export default function SimilarFoodPopover() {
  const { suggestionItem, setSuggestionItem, addToCart: addSuggestedToCart } = useCart();
  const [suggestions, setSuggestions] = useState<SuggestSimilarFoodOutput>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isManuallyOpened, setIsManuallyOpened] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (suggestionItem) {
      const fetchSuggestions = async () => {
        setIsOpen(true);
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

      timer = setTimeout(() => {
        if (!isManuallyOpened) {
          setIsOpen(false);
          setSuggestionItem(null);
        }
      }, 3000); // Increased to 3 seconds for better UX
    }

    return () => {
      clearTimeout(timer);
    };
  }, [suggestionItem, setSuggestionItem, isManuallyOpened]);

  const handleAddToCart = (suggestionName: string) => {
    const itemToAdd = menuItems.find(item => item.name === suggestionName);
    if (itemToAdd) {
        addSuggestedToCart(itemToAdd);
    }
    setIsOpen(false);
    setSuggestionItem(null);
    setIsManuallyOpened(false);
  };
  
  const onOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
        setIsManuallyOpened(true);
    } else {
        setSuggestionItem(null);
        setIsManuallyOpened(false);
    }
  }

  const handleTriggerClick = () => {
    if (isOpen) {
        onOpenChange(false);
    } else {
        onOpenChange(true);
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className={suggestionItem ? 'animate-pulse ring-2 ring-primary ring-offset-2' : ''} 
          disabled={!suggestionItem && suggestions.length === 0}
          onClick={handleTriggerClick}
        >
          <Sparkles className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[80vw] sm:w-[50vw] lg:w-[400px] mr-4">
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
  );
}
