import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, quantity) => set((state) => {
        const existingItem = state.items.find(item => item.product.id === product.id);
        
        if (existingItem) {
          return {
            items: state.items.map(item => 
              item.product.id === product.id 
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          };
        }
        
        return {
          items: [...state.items, { product, quantity }]
        };
      }),
      
      updateQuantity: (productId, quantity) => set((state) => ({
        items: state.items.map(item => 
          item.product.id === productId 
            ? { ...item, quantity: quantity }
            : item
        )
      })),
      
      removeItem: (productId) => set((state) => ({
        items: state.items.filter(item => item.product.id !== productId)
      })),
      
      clearCart: () => set({ items: [] }),
      
      getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        const { items } = get();
        return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      }
    }),
    { name: 'cart-storage' }
  )
); 