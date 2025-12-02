import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Header } from "@/components/Header";
import { Button } from "@/components/Button";
import { ORDER_STATUS_LABELS } from "@/types/store";
import { ClearCartOnSuccess } from "./ClearCartOnSuccess";

export const metadata: Metadata = {
  title: "Order Confirmed | Equippd Store",
  description: "Thank you for your order!",
};

type Props = {
  searchParams: Promise<{ session_id?: string }>;
};

async function getOrderBySessionId(sessionId: string) {
  const order = await prisma.order.findFirst({
    where: { stripeCheckoutSessionId: sessionId },
    include: {
      items: {
        include: {
          product: true,
          productVariant: true,
        },
      },
    },
  });
  return order;
}

export default async function OrderSuccessPage({ searchParams }: Props) {
  const { session_id } = await searchParams;

  if (!session_id) {
    notFound();
  }

  const order = await getOrderBySessionId(session_id);

  if (!order) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-primary">
      <Header />
      <ClearCartOnSuccess />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">ORDER CONFIRMED!</h1>
            <p className="text-white/70">Thank you for your purchase</p>
          </div>

          {/* Order details */}
          <div className="bg-primary-dark rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">ORDER DETAILS</h2>
              <span className="text-sm text-white/60">#{order.id.slice(-8).toUpperCase()}</span>
            </div>

            <div className="space-y-4">
              {/* Status */}
              <div className="flex justify-between">
                <span className="text-white/70">Status</span>
                <span className="text-desert font-semibold">
                  {ORDER_STATUS_LABELS[order.status]}
                </span>
              </div>

              {/* Items */}
              <div className="border-t border-white/10 pt-4">
                <h3 className="text-white font-bold mb-3">Items</h3>
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between py-2">
                    <div>
                      <span className="text-white">{item.product.name}</span>
                      <span className="text-white/60 text-sm ml-2">
                        {[item.productVariant.size, item.productVariant.color]
                          .filter(Boolean)
                          .join(" / ")}
                      </span>
                      <span className="text-white/60 text-sm ml-2">x{item.quantity}</span>
                    </div>
                    <span className="text-white">
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="border-t border-white/10 pt-4 flex justify-between">
                <span className="text-white font-bold">Total</span>
                <span className="text-desert font-bold text-xl">
                  ${order.totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Shipping info */}
          <div className="bg-primary-dark rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-white mb-4">SHIPPING TO</h2>
            <div className="text-white/70 space-y-1">
              <p className="text-white font-semibold">{order.shippingName}</p>
              <p>{order.shippingAddress}</p>
              <p>
                {order.shippingCity}, {order.shippingState} {order.shippingZip}
              </p>
              <p>{order.shippingCountry}</p>
            </div>
          </div>

          {/* What's next */}
          <div className="bg-primary-dark rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-white mb-4">WHAT&#39;S NEXT?</h2>
            <ul className="text-white/70 space-y-2">
              <li>• A confirmation email has been sent to {order.email}</li>
              <li>• Your order will be produced within 3-5 business days</li>
              <li>• You&#39;ll receive tracking info once your order ships</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/orders/${order.id}`}>
              <Button variant="secondary">View Order Status</Button>
            </Link>
            <Button href="/store">Continue Shopping</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
