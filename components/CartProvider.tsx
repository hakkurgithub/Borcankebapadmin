// components/CartProvider.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  // ✅ Yeni eklenen fonksiyon
  sendOrderToWhatsApp: (address?: string, phone?: string, notes?: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const existingItem = prev.find(item => item.id === newItem.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  // ✅ WhatsApp sipariş gönderme fonksiyonu eklendi
  const sendOrderToWhatsApp = (address?: string, phone?: string, notes?: string) => {
    const orderItemsText = items.map(item => 
      `${item.name} x${item.quantity} - ${(item.price * item.quantity).toFixed(0)}₺`
    ).join('\n');
    
    const totalPriceText = `\n\nToplam: ${getTotalPrice().toFixed(0)}₺`;
    
    let message = `Merhaba! Borcan Kebap'tan sipariş vermek istiyorum:\n\n${orderItemsText}${totalPriceText}`;
    
    if (address) message += `\n\nAdres: ${address}`;
    if (phone) message += `\nTelefon: ${phone}`;
    if (notes) message += `\nNot: ${notes}`;
    
    const phoneNumber = '905455093462'; // Kendi telefon numaranız
    const encodedMessage = encodeURIComponent(message);
    
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, '_blank');
  };

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
    sendOrderToWhatsApp // ✅ Fonksiyonu bağlama
  };

  return (
    <CartContext.Provider value={value}>
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