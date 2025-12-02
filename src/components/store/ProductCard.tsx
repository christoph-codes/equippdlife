import Image from "next/image";
import Link from "next/link";
import type { ProductWithVariantsAndImages } from "@/types/store";

type ProductCardProps = {
  product: ProductWithVariantsAndImages;
};

export function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.images.find((img) => img.position === 0) || product.images[0];
  const minPrice = Math.min(
    product.basePrice,
    ...product.variants.filter((v) => v.price != null).map((v) => v.price as number)
  );

  return (
    <Link
      href={`/store/${product.slug}`}
      className="group block bg-primary-dark rounded-lg overflow-hidden hover:ring-2 hover:ring-desert transition-all"
    >
      <div className="aspect-square relative bg-black/20">
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt || product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/50">
            No Image
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-white font-bold text-lg group-hover:text-desert transition-colors">
          {product.name}
        </h3>
        <p className="text-desert text-lg mt-1">
          ${minPrice.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}
