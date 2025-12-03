import { Metadata } from "next";
import { prisma } from "@/lib/db";
import { ProductCard } from "@/components/store/ProductCard";
import { Header } from "@/components/Header";

// Force dynamic rendering (no prerendering at build time)
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Store | Equippd",
  description: "Shop Equippd apparel - hoodies, tees, hats, and more. Faith-inspired lifestyle wear.",
  openGraph: {
    title: "Store | Equippd",
    description: "Shop Equippd apparel - hoodies, tees, hats, and more. Faith-inspired lifestyle wear.",
    type: "website",
  },
};

async function getActiveProducts() {
  const products = await prisma.product.findMany({
    where: { active: true },
    include: {
      variants: true,
      images: {
        orderBy: { position: "asc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  return products;
}

export default async function StorePage() {
  const products = await getActiveProducts();

  return (
    <div className="min-h-screen bg-primary">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-2">EQUIPPD STORE</h1>
        <p className="text-desert mb-8">Faith-inspired lifestyle apparel</p>

        {products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-white/70 text-xl">No products available yet.</p>
            <p className="text-white/50 mt-2">Check back soon for new arrivals!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
