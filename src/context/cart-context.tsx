'use client';

import React, { createContext, useContext, useState, useMemo, ReactNode, useCallback } from 'react';
import type { CartItem, MenuItem } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  getCartSubtotal: () => number;
  getCartTotal: () => number;
  getDiscountedPrice: (item: MenuItem) => { finalPrice: number; originalPrice: number; discountPercentage: number | null };
  suggestionItem: MenuItem | null;
  setSuggestionItem: (item: MenuItem | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const todaysEvents = (() => {
    const today = new Date();
    const todaysDate = format(today, 'yyyy-MM-dd');
    let events: string[] = [];
    if (todaysDate.endsWith('-10-29')) events.push('Diwali');
    if (todaysDate.endsWith('-03-25')) events.push('Holi');
    if (todaysDate.endsWith('-02-14')) events.push("Valentine's Day");
    if (todaysDate.endsWith('-11-14')) events.push("Children's Day");
    return events;
})();

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [suggestionItem, setSuggestionItem] = useState<MenuItem | null>(null);
  const { toast } = useToast();

  const getDiscountedPrice = useCallback((item: MenuItem) => {
    const originalPrice = item.price;
    let finalPrice = item.price;
    let discountPercentage = null;

    if (item.discount && todaysEvents.includes(item.discount.occasion)) {
        discountPercentage = item.discount.percentage;
        finalPrice = originalPrice * (1 - discountPercentage / 100);
    }
    
    return { finalPrice, originalPrice, discountPercentage };
  }, []);

  const addToCart = (item: MenuItem) => {
    let itemAdded = false;
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      itemAdded = true;
      return [...prevCart, { ...item, quantity: 1 }];
    });
    
    if (itemAdded) {
        toast({
            title: `${item.name} added to cart!`,
            description: "We're finding some similar items for you.",
        });
        setSuggestionItem(item);
    } else {
        toast({
            title: `Another ${item.name} added!`,
            description: `Quantity is now ${cart.find(i => i.id === item.id)!.quantity + 1}.`,
        });
    }
  };

  const removeFromCart = (itemId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(itemId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const getCartSubtotal = useCallback(() => {
    return cart.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);
  }, [cart]);

  const getCartTotal = useCallback(() => {
    return cart.reduce((total, item) => {
      const { finalPrice } = getDiscountedPrice(item);
      return total + finalPrice * item.quantity;
    }, 0);
  }, [cart, getDiscountedPrice]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        getCartSubtotal,
        getCartTotal,
        getDiscountedPrice,
        suggestionItem,
        setSuggestionItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
