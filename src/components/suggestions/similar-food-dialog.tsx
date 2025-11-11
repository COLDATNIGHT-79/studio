'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/context/cart-context';
import { suggestSimilarFood, type SuggestSimilarFoodOutput } from '@/ai/flows/suggest-similar-food';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Sparkles, PlusCircle } from 'lucide-react';
import { menuItems } from '@/lib/menu-data';

export default function SimilarFoodDialog() {
  const { suggestionItem, setSuggestionItem, addToCart: addSuggestedToCart } = useCart();
  const [suggestions, setSuggestions] = useState<SuggestSimilarFoodOutput>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (suggestionItem) {
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
    }
  }, [suggestionItem]);

  const handleAddToCart = (suggestionName: string) => {
    const itemToAdd = menuItems.find(item => item.name === suggestionName);
    if (itemToAdd) {
        addSuggestedToCart(itemToAdd);
    }
    setSuggestionItem(null);
  };

  return (
    <Dialog open={!!suggestionItem} onOpenChange={(open) => !open && setSuggestionItem(null)}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="h-6 w-6 text-primary" />
            You might also like...
          </DialogTitle>
          <DialogDescription>
            Since you added {suggestionItem?.name}, here are some similar dishes we think you'll love.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoading &&
              Array.from({ length: 3 }).map((_, i) => (
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
            {!isLoading && suggestions.map(suggestion => (
              <Card key={suggestion.name} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{suggestion.name}</CardTitle>
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
                <p className="col-span-full text-center text-muted-foreground">No suggestions available at the moment.</p>
             )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
