"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Button } from "@/components/Button";
import { useCartStore } from "@/store/cart";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import type { CartItem } from "@/types/store";

// Hook to check if we're on the client
function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const getSubtotal = useCartStore((state) => state.getSubtotal);

  // Hydration fix
  const mounted = useHydrated();

  if (!mounted) {
    return (
      <div className="min-h-screen bg-primary">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-white mb-8">YOUR CART</h1>
          <p className="text-white/70">Loading cart...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">YOUR CART</h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-white/70 text-xl mb-4">Your cart is empty</p>
            <Button href="/store" variant="secondary">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item: CartItem) => (
                <div
                  key={item.productVariantId}
                  className="flex gap-4 bg-primary-dark rounded-lg p-4"
                >
                  {/* Image */}
                  <div className="w-24 h-24 relative flex-shrink-0 bg-black/20 rounded-md overflow-hidden">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/50 text-sm">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold truncate">{item.name}</h3>
                    <p className="text-white/60 text-sm">{item.variantLabel}</p>
                    <p className="text-desert font-bold mt-1">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeItem(item.productVariantId)}
                      className="text-white/50 hover:text-red-500 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <FaTrash size={14} />
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.productVariantId, item.quantity - 1)
                        }
                        className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-md hover:bg-white/20 text-white transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <FaMinus size={12} />
                      </button>
                      <span className="text-white font-bold w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.productVariantId, item.quantity + 1)
                        }
                        className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-md hover:bg-white/20 text-white transition-colors"
                        aria-label="Increase quantity"
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-primary-dark rounded-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold text-white mb-4">ORDER SUMMARY</h2>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-white/70">
                    <span>Subtotal</span>
                    <span>${getSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>
                <div className="border-t border-white/20 pt-4 mb-6">
                  <div className="flex justify-between text-white font-bold text-lg">
                    <span>Total</span>
                    <span>${getSubtotal().toFixed(2)}</span>
                  </div>
                </div>
                <Button href="/checkout" variant="secondary" className="w-full">
                  Proceed to Checkout
                </Button>
                <Link
                  href="/store"
                  className="block text-center text-desert mt-4 hover:underline"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
