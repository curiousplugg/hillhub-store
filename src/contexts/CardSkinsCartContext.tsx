'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product } from '@/types';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  itemCount: number;
  total: number;
  shipping: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' };

const initialState: CartState = {
  items: [],
  itemCount: 0,
  total: 0,
  shipping: 0,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(item => item.product.id === product.id);
      
      let newItems: CartItem[];
      if (existingItem) {
        newItems = state.items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...state.items, { product, quantity }];
      }
      
      const newItemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const newTotal = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      
      // Card skins shipping: $4.99 flat rate regardless of quantity
      const newShipping = newItemCount > 0 ? 4.99 : 0;
      
      return {
        ...state,
        items: newItems,
        itemCount: newItemCount,
        total: newTotal,
        shipping: newShipping,
      };
    }
    
    case 'REMOVE_ITEM': {
      const { productId } = action.payload;
      const newItems = state.items.filter(item => item.product.id !== productId);
      const newItemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const newTotal = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      const newShipping = newItemCount > 0 ? 4.99 : 0;
      
      return {
        ...state,
        items: newItems,
        itemCount: newItemCount,
        total: newTotal,
        shipping: newShipping,
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      const newItems = state.items.map(item =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      ).filter(item => item.quantity > 0);
      
      const newItemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const newTotal = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      const newShipping = newItemCount > 0 ? 4.99 : 0;
      
      return {
        ...state,
        items: newItems,
        itemCount: newItemCount,
        total: newTotal,
        shipping: newShipping,
      };
    }
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        itemCount: 0,
        total: 0,
        shipping: 0,
      };
    
    default:
      return state;
  }
}

interface CardSkinsCartContextType {
  state: CartState;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CardSkinsCartContext = createContext<CardSkinsCartContextType | undefined>(undefined);

export function CardSkinsCartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (product: Product, quantity: number = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CardSkinsCartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CardSkinsCartContext.Provider>
  );
}

export function useCardSkinsCart() {
  const context = useContext(CardSkinsCartContext);
  if (context === undefined) {
    throw new Error('useCardSkinsCart must be used within a CardSkinsCartProvider');
  }
  return context;
} 