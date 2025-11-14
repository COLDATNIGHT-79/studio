'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { restaurantChat, type RestaurantChatOutput } from '@/ai/flows/restaurant-chat';
import { menuItems } from '@/lib/menu-data';
import { useCart } from '@/context/cart-context';
import type { MenuItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, PlusCircle, Send, User, BadgePercent } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import Image from 'next/image';
import { Badge } from '../ui/badge';

const formSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty.'),
});

type Message = {
  role: 'user' | 'model';
  content: string;
  suggestions?: MenuItem[];
};

export default function ChatInterface() {
  const { addToCart } = useCart();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: "Welcome to Curios Foods! What can I help you find today? You can ask for recommendations, search for items, or tell me what you're craving.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { message: '' },
  });

  const menuJson = JSON.stringify(menuItems);
  
  // Effect to scroll to the bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages, isLoading]);


  async function onSubmit(values: z.infer<typeof formSchema>) {
    const userMessage: Message = { role: 'user', content: values.message };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    form.reset();

    try {
        const conversationHistory = messages.map(msg => ({
            role: msg.role,
            content: msg.content
        }));

      const result: RestaurantChatOutput = await restaurantChat({
        userQuery: values.message,
        menuJson,
        conversationHistory,
      });

      const suggestedItems = result.suggestedItemIds
        ? menuItems.filter(item => result.suggestedItemIds!.includes(item.id))
        : [];
      
      const botMessage: Message = {
        role: 'model',
        content: result.responseText,
        suggestions: suggestedItems.length > 0 ? suggestedItems : undefined,
      };

      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        role: 'model',
        content: "I'm sorry, I seem to be having some trouble right now. Please try again in a moment.",
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto flex-grow flex flex-col shadow-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Bot />
            <span>AI Food Assistant</span>
        </CardTitle>
      </CardHeader>

      <ScrollArea className="flex-grow" ref={scrollAreaRef}>
        <CardContent className="space-y-6 px-6 py-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
              {message.role === 'model' && (
                <Avatar className="h-8 w-8 border">
                  <AvatarFallback><Bot size={18} /></AvatarFallback>
                </Avatar>
              )}
              <div className={`flex flex-col gap-2 max-w-[80%]`}>
                 <div className={`rounded-lg p-3 text-sm ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-muted text-muted-foreground rounded-bl-none'
                  }`}>
                    <p>{message.content}</p>
                 </div>
                 {message.suggestions && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {message.suggestions.map(item => (
                            <div key={item.id} className="bg-card border rounded-lg overflow-hidden p-2 flex flex-col gap-2">
                                <Image src={item.image} alt={item.name} width={200} height={120} className="rounded-md w-full h-24 object-cover" />
                                <h4 className="font-semibold text-sm">{item.name}</h4>
                                <p className="text-xs text-muted-foreground">from {item.restaurant}</p>
                                 {item.discount && (
                                    <Badge variant="destructive" className="flex items-center gap-1 w-fit">
                                      <BadgePercent className="h-3 w-3" />
                                      {item.discount.percentage}% off for {item.discount.occasion}
                                    </Badge>
                                  )}
                                <div className="flex justify-between items-center mt-auto">
                                    <p className="text-sm font-bold">INR {item.price.toFixed(2)}</p>
                                    <Button size="sm" variant="outline" onClick={() => addToCart(item)}>
                                        <PlusCircle className="mr-2 h-4 w-4" /> Add
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                 )}
              </div>
              {message.role === 'user' && (
                <Avatar className="h-8 w-8 border">
                  <AvatarFallback><User size={18} /></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
           {isLoading && (
             <div className="flex items-start gap-3">
               <Avatar className="h-8 w-8 border">
                 <AvatarFallback><Bot size={18} /></AvatarFallback>
               </Avatar>
               <div className="rounded-lg p-3 bg-muted w-1/2">
                 <Skeleton className="h-4 w-10/12" />
                 <Skeleton className="h-4 w-full mt-2" />
               </div>
             </div>
           )}
        </CardContent>
      </ScrollArea>
      
      <CardFooter className="pt-4 border-t">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full items-center gap-2">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormControl>
                    <Input placeholder="Ask for a dish or a recommendation..." {...field} disabled={isLoading} autoComplete="off"/>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </Form>
      </CardFooter>
    </Card>
  );
}
