"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { ProductWithVariantsAndImages, ProductVariant } from "@/types/store";
import { VariantSelector } from "@/components/store/VariantSelector";
import { AddToCartButton } from "@/components/store/AddToCartButton";

type ProductDetailProps = {
  product: ProductWithVariantsAndImages;
};

export function ProductDetail({ product }: ProductDetailProps) {
  // Initialize with first variant if available
  const initialVariant = useMemo(() => {
    return product.variants.length > 0 ? product.variants[0] : null;
  }, [product.variants]);

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(initialVariant);

  const currentPrice = selectedVariant?.price ?? product.basePrice;

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-white/60">
        <Link href="/store" className="hover:text-desert transition-colors">
          Store
        </Link>
        <span className="mx-2">/</span>
        <span className="text-white">{product.name}</span>
      </nav>

      {/* Product name */}
      <h1 className="text-3xl md:text-4xl font-bold text-white">{product.name}</h1>

      {/* Price */}
      <p className="text-2xl text-desert font-bold">${currentPrice.toFixed(2)}</p>

      {/* Description */}
      {product.description && (
        <p className="text-white/80 text-lg">{product.description}</p>
      )}

      {/* Variant selector */}
      {product.variants.length > 0 && (
        <VariantSelector
          variants={product.variants}
          selectedVariant={selectedVariant || undefined}
          onVariantSelect={setSelectedVariant}
        />
      )}

      {/* Add to cart */}
      <AddToCartButton product={product} selectedVariant={selectedVariant} />

      {/* Additional info */}
      <div className="border-t border-white/20 pt-6 space-y-4">
        <div className="text-white/70">
          <h3 className="font-bold text-white mb-2">Shipping</h3>
          <p>Free shipping on orders over $75</p>
          <p>Produced on-demand and ships within 5-7 business days</p>
        </div>
        <div className="text-white/70">
          <h3 className="font-bold text-white mb-2">Quality</h3>
          <p>Premium materials and high-quality printing</p>
        </div>
      </div>
    </div>
  );
}
