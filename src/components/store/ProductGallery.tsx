"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductImage } from "@/types/store";

type ProductGalleryProps = {
  images: ProductImage[];
  productName: string;
};

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const sortedImages = [...images].sort((a, b) => a.position - b.position);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = sortedImages[selectedIndex];

  if (sortedImages.length === 0) {
    return (
      <div className="aspect-square bg-black/20 rounded-lg flex items-center justify-center text-white/50">
        No Image Available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="aspect-square relative bg-black/20 rounded-lg overflow-hidden">
        <Image
          src={selectedImage.url}
          alt={selectedImage.alt || productName}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Thumbnail strip */}
      {sortedImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {sortedImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedIndex(index)}
              className={`flex-shrink-0 w-16 h-16 relative rounded-md overflow-hidden ${
                index === selectedIndex
                  ? "ring-2 ring-desert"
                  : "ring-1 ring-white/20 hover:ring-white/50"
              }`}
            >
              <Image
                src={image.url}
                alt={image.alt || `${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
