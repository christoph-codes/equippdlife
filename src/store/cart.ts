"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types/store";

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productVariantId: string) => void;
  updateQuantity: (productVariantId: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item: CartItem) => {
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.productVariantId === item.productVariantId
          );

          if (existingItem) {
            // Update quantity if item already exists
            return {
              items: state.items.map((i) =>
                i.productVariantId === item.productVariantId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }

          // Add new item
          return { items: [...state.items, item] };
        });
      },

      removeItem: (productVariantId: string) => {
        set((state) => ({
          items: state.items.filter(
            (item) => item.productVariantId !== productVariantId
          ),
        }));
      },

      updateQuantity: (productVariantId: string, quantity: number) => {
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter(
                (item) => item.productVariantId !== productVariantId
              ),
            };
          }

          return {
            items: state.items.map((item) =>
              item.productVariantId === productVariantId
                ? { ...item, quantity }
                : item
            ),
          };
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getSubtotal: () => {
        const { items } = get();
        return items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getItemCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: "equippd-cart", // localStorage key
    }
  )
);
