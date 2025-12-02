"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart";
import type { ProductVariant, ProductWithVariantsAndImages } from "@/types/store";
import { Button } from "@/components/Button";

type AddToCartButtonProps = {
  product: ProductWithVariantsAndImages;
  selectedVariant: ProductVariant | null;
};

export function AddToCartButton({ product, selectedVariant }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    setIsAdding(true);

    const price = selectedVariant.price ?? product.basePrice;
    const variantLabel = [selectedVariant.size, selectedVariant.color]
      .filter(Boolean)
      .join(" / ");
    const primaryImage = product.images.find((img) => img.position === 0) || product.images[0];

    addItem({
      productId: product.id,
      productVariantId: selectedVariant.id,
      name: product.name,
      variantLabel: variantLabel || "Default",
      price,
      quantity: 1,
      image: primaryImage?.url,
    });

    setIsAdding(false);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!selectedVariant) {
    return (
      <Button disabled className="w-full opacity-50 cursor-not-allowed">
        Select options
      </Button>
    );
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`w-full ${added ? "bg-green-600 hover:bg-green-600" : ""}`}
      variant="secondary"
    >
      {added ? "Added to Cart!" : isAdding ? "Adding..." : "Add to Cart"}
    </Button>
  );
}
