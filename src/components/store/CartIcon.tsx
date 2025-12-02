"use client";

import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { useCartStore } from "@/store/cart";
import { useSyncExternalStore } from "react";

// Hook to check if we're on the client
function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export function CartIcon() {
  const hydrated = useHydrated();
  const itemCount = useCartStore((state) => state.getItemCount());

  // Only show count after hydration
  const displayCount = hydrated ? itemCount : 0;

  return (
    <Link
      href="/cart"
      className="relative p-2 text-white hover:text-desert transition-colors"
      aria-label={`Cart with ${displayCount} items`}
    >
      <FaShoppingCart size={20} />
      {displayCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-desert text-primary text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {displayCount > 99 ? "99+" : displayCount}
        </span>
      )}
    </Link>
  );
}
