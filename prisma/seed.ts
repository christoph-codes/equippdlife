import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();

  // Create sample products
  const hoodie = await prisma.product.create({
    data: {
      slug: "equippd-hoodie",
      name: "Equippd Hoodie",
      description:
        "Premium heavyweight hoodie with embroidered Equippd logo. Soft, warm, and built to last.",
      basePrice: 65.0,
      active: true,
      images: {
        create: [
          {
            url: "/products/hoodie-front.jpg",
            alt: "Equippd Hoodie - Front",
            position: 0,
          },
          {
            url: "/products/hoodie-back.jpg",
            alt: "Equippd Hoodie - Back",
            position: 1,
          },
        ],
      },
      variants: {
        create: [
          { size: "S", color: "Black", sku: "HOODIE-BLK-S", printfulVariantId: "1001" },
          { size: "M", color: "Black", sku: "HOODIE-BLK-M", printfulVariantId: "1002" },
          { size: "L", color: "Black", sku: "HOODIE-BLK-L", printfulVariantId: "1003" },
          { size: "XL", color: "Black", sku: "HOODIE-BLK-XL", printfulVariantId: "1004" },
          { size: "2XL", color: "Black", sku: "HOODIE-BLK-2XL", printfulVariantId: "1005" },
          { size: "S", color: "Desert", sku: "HOODIE-DST-S", printfulVariantId: "1011" },
          { size: "M", color: "Desert", sku: "HOODIE-DST-M", printfulVariantId: "1012" },
          { size: "L", color: "Desert", sku: "HOODIE-DST-L", printfulVariantId: "1013" },
          { size: "XL", color: "Desert", sku: "HOODIE-DST-XL", printfulVariantId: "1014" },
          { size: "2XL", color: "Desert", sku: "HOODIE-DST-2XL", printfulVariantId: "1015" },
        ],
      },
    },
  });

  const tee = await prisma.product.create({
    data: {
      slug: "equippd-tee",
      name: "Equippd Tee",
      description:
        "Classic fit tee with screen-printed Equippd design. 100% cotton, pre-shrunk.",
      basePrice: 35.0,
      active: true,
      images: {
        create: [
          {
            url: "/products/tee-front.jpg",
            alt: "Equippd Tee - Front",
            position: 0,
          },
        ],
      },
      variants: {
        create: [
          { size: "S", color: "Black", sku: "TEE-BLK-S", printfulVariantId: "2001" },
          { size: "M", color: "Black", sku: "TEE-BLK-M", printfulVariantId: "2002" },
          { size: "L", color: "Black", sku: "TEE-BLK-L", printfulVariantId: "2003" },
          { size: "XL", color: "Black", sku: "TEE-BLK-XL", printfulVariantId: "2004" },
          { size: "2XL", color: "Black", sku: "TEE-BLK-2XL", printfulVariantId: "2005" },
          { size: "S", color: "White", sku: "TEE-WHT-S", printfulVariantId: "2011" },
          { size: "M", color: "White", sku: "TEE-WHT-M", printfulVariantId: "2012" },
          { size: "L", color: "White", sku: "TEE-WHT-L", printfulVariantId: "2013" },
          { size: "XL", color: "White", sku: "TEE-WHT-XL", printfulVariantId: "2014" },
          { size: "2XL", color: "White", sku: "TEE-WHT-2XL", printfulVariantId: "2015" },
        ],
      },
    },
  });

  const hat = await prisma.product.create({
    data: {
      slug: "equippd-dad-hat",
      name: "Equippd Dad Hat",
      description:
        "Relaxed fit dad hat with embroidered Equippd logo. Adjustable strap.",
      basePrice: 28.0,
      active: true,
      images: {
        create: [
          {
            url: "/products/hat-front.jpg",
            alt: "Equippd Dad Hat - Front",
            position: 0,
          },
        ],
      },
      variants: {
        create: [
          { color: "Black", sku: "HAT-BLK", printfulVariantId: "3001" },
          { color: "Desert", sku: "HAT-DST", printfulVariantId: "3002" },
          { color: "White", sku: "HAT-WHT", printfulVariantId: "3003" },
        ],
      },
    },
  });

  console.log("Created products:");
  console.log(`  - ${hoodie.name} (${hoodie.slug})`);
  console.log(`  - ${tee.name} (${tee.slug})`);
  console.log(`  - ${hat.name} (${hat.slug})`);

  console.log("\nDatabase seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
