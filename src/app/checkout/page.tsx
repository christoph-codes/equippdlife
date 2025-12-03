"use client";

import { useState, useSyncExternalStore, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useCartStore } from "@/store/cart";
import Image from "next/image";
import type { CartItem, CheckoutResponse, ShippingInfo } from "@/types/store";

// Hook to check if we're on the client
function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

// Component that uses useSearchParams
function CanceledCheckoutBanner() {
  const searchParams = useSearchParams();
  const wasCanceled = searchParams.get("canceled") === "1";
  
  if (!wasCanceled) return null;
  
  return (
    <div className="bg-yellow-500/20 text-yellow-500 px-4 py-3 rounded-md mb-6">
      Your checkout was canceled. You can try again below.
    </div>
  );
}

function CheckoutContent() {
  const mounted = useHydrated();
  const items = useCartStore((state) => state.items);
  const getSubtotal = useCartStore((state) => state.getSubtotal);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [shipping, setShipping] = useState<ShippingInfo>({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShipping((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShipping((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const validateForm = (): boolean => {
    if (!shipping.name.trim()) {
      setError("Name is required");
      return false;
    }
    if (!shipping.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shipping.email)) {
      setError("Valid email is required");
      return false;
    }
    if (!shipping.address.trim()) {
      setError("Address is required");
      return false;
    }
    if (!shipping.city.trim()) {
      setError("City is required");
      return false;
    }
    if (!shipping.state.trim()) {
      setError("State is required");
      return false;
    }
    if (!shipping.zip.trim()) {
      setError("ZIP code is required");
      return false;
    }
    if (!shipping.country.trim()) {
      setError("Country is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (items.length === 0) {
      setError("Your cart is empty");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart: items, shipping }),
      });

      const data: CheckoutResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Checkout failed");
      }

      if (data.sessionUrl) {
        // Redirect to Stripe Checkout
        window.location.href = data.sessionUrl;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setIsSubmitting(false);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-primary">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-white mb-8">CHECKOUT</h1>
          <p className="text-white/70">Loading...</p>
        </main>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-primary">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-white mb-8">CHECKOUT</h1>
          <div className="text-center py-16">
            <p className="text-white/70 text-xl mb-4">Your cart is empty</p>
            <Button href="/store" variant="secondary">
              Continue Shopping
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">CHECKOUT</h1>

        <Suspense fallback={null}>
          <CanceledCheckoutBanner />
        </Suspense>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Shipping form */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white">SHIPPING INFORMATION</h2>

              <div className="space-y-4">
                <Input
                  label="Full Name"
                  name="name"
                  value={shipping.name}
                  onChange={handleInputChange}
                  required
                  placeholder="John Doe"
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={shipping.email}
                  onChange={handleInputChange}
                  required
                  placeholder="john@example.com"
                />
                <Input
                  label="Street Address"
                  name="address"
                  value={shipping.address}
                  onChange={handleInputChange}
                  required
                  placeholder="123 Main St"
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="City"
                    name="city"
                    value={shipping.city}
                    onChange={handleInputChange}
                    required
                    placeholder="New York"
                  />
                  <Input
                    label="State"
                    name="state"
                    value={shipping.state}
                    onChange={handleInputChange}
                    required
                    placeholder="NY"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="ZIP Code"
                    name="zip"
                    value={shipping.zip}
                    onChange={handleInputChange}
                    required
                    placeholder="10001"
                  />
                  <div>
                    <label className="block text-white font-bold mb-2">Country</label>
                    <select
                      name="country"
                      value={shipping.country}
                      onChange={handleSelectChange}
                      className="w-full px-4 py-2 bg-white/10 text-white rounded-md border border-white/20 focus:border-desert focus:ring-1 focus:ring-desert outline-none"
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="GB">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div>
              <div className="bg-primary-dark rounded-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold text-white mb-4">ORDER SUMMARY</h2>

                {/* Cart items preview */}
                <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                  {items.map((item: CartItem) => (
                    <div key={item.productVariantId} className="flex gap-3">
                      <div className="w-12 h-12 relative flex-shrink-0 bg-black/20 rounded-md overflow-hidden">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/50 text-xs">
                            N/A
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm truncate">{item.name}</p>
                        <p className="text-white/60 text-xs">{item.variantLabel}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white text-sm">x{item.quantity}</p>
                        <p className="text-desert text-sm">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/20 pt-4 space-y-2">
                  <div className="flex justify-between text-white/70">
                    <span>Subtotal</span>
                    <span>${getSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Shipping</span>
                    <span>Calculated at payment</span>
                  </div>
                </div>

                <div className="border-t border-white/20 pt-4 mt-4 mb-6">
                  <div className="flex justify-between text-white font-bold text-lg">
                    <span>Total</span>
                    <span>${getSubtotal().toFixed(2)}</span>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-500/20 text-red-500 px-4 py-2 rounded-md mb-4 text-sm">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  variant="secondary"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Place Order"}
                </Button>

                <p className="text-white/50 text-xs text-center mt-4">
                  You will be redirected to Stripe for secure payment
                </p>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

export default function CheckoutPage() {
  return <CheckoutContent />;
}
