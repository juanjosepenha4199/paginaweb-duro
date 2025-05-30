'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
}

interface CartItem extends Product {
  quantity: number;
  size: string;
  color: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, size: string, color: string) => void;
  removeFromCart: (productId: number, size: string, color: string) => void;
  updateQuantity: (productId: number, size: string, color: string, quantity: number) => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const addToCart = (product: Product, size: string, color: string) => {
    if (!isClient) return;
    
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === product.id && item.size === size && item.color === color);
      
      if (existingItem) {
        return currentItems.map(item =>
          item.id === product.id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, { ...product, quantity: 1, size, color }];
    });
  };

  const removeFromCart = (productId: number, size: string, color: string) => {
    if (!isClient) return;
    setItems(currentItems => currentItems.filter(item => !(item.id === productId && item.size === size && item.color === color)));
  };

  const updateQuantity = (productId: number, size: string, color: string, quantity: number) => {
    if (!isClient || quantity < 1) return;
    
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === productId && item.size === size && item.color === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 