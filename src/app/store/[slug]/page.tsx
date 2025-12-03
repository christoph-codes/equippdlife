import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { Header } from "@/components/Header";
import { ProductGallery } from "@/components/store/ProductGallery";
import { ProductDetail } from "./ProductDetail";

// Force dynamic rendering (no prerendering at build time)
export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

async function getProduct(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug, active: true },
    include: {
      variants: true,
      images: {
        orderBy: { position: "asc" },
      },
    },
  });
  return product;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: "Product Not Found | Equippd",
    };
  }

  return {
    title: `${product.name} | Equippd Store`,
    description: product.description || `Shop ${product.name} from Equippd`,
    openGraph: {
      title: `${product.name} | Equippd Store`,
      description: product.description || `Shop ${product.name} from Equippd`,
      images: product.images.length > 0 ? [product.images[0].url] : undefined,
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-primary">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Image gallery */}
          <ProductGallery images={product.images} productName={product.name} />

          {/* Right: Product details */}
          <ProductDetail product={product} />
        </div>
      </main>
    </div>
  );
}
