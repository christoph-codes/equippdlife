"use client";

import { useState } from "react";
import type { ProductVariant } from "@/types/store";

type VariantSelectorProps = {
  variants: ProductVariant[];
  onVariantSelect: (variant: ProductVariant) => void;
  selectedVariant?: ProductVariant;
};

export function VariantSelector({
  variants,
  onVariantSelect,
  selectedVariant,
}: VariantSelectorProps) {
  // Extract unique sizes and colors
  const sizes = [...new Set(variants.map((v) => v.size).filter(Boolean))] as string[];
  const colors = [...new Set(variants.map((v) => v.color).filter(Boolean))] as string[];

  const [selectedSize, setSelectedSize] = useState<string | null>(
    selectedVariant?.size || sizes[0] || null
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(
    selectedVariant?.color || colors[0] || null
  );

  // Find variant matching current selection
  const findVariant = (size: string | null, color: string | null) => {
    return variants.find((v) => {
      if (sizes.length > 0 && v.size !== size) return false;
      if (colors.length > 0 && v.color !== color) return false;
      return true;
    });
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    const variant = findVariant(size, selectedColor);
    if (variant) onVariantSelect(variant);
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    const variant = findVariant(selectedSize, color);
    if (variant) onVariantSelect(variant);
  };

  return (
    <div className="space-y-4">
      {/* Size selector */}
      {sizes.length > 0 && (
        <div>
          <label className="block text-white font-bold mb-2">Size</label>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => handleSizeSelect(size)}
                className={`px-4 py-2 rounded-md font-semibold transition-colors ${
                  selectedSize === size
                    ? "bg-desert text-primary"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Color selector */}
      {colors.length > 0 && (
        <div>
          <label className="block text-white font-bold mb-2">Color</label>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => handleColorSelect(color)}
                className={`px-4 py-2 rounded-md font-semibold transition-colors ${
                  selectedColor === color
                    ? "bg-desert text-primary"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
