import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Header } from "@/components/Header";
import { Button } from "@/components/Button";
import { ORDER_STATUS_LABELS } from "@/types/store";
import type { OrderStatus } from "@/generated/prisma";

type Props = {
  params: Promise<{ orderId: string }>;
};

async function getOrder(orderId: string) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { orderId } = await params;
  return {
    title: `Order ${orderId.slice(-8).toUpperCase()} | Equippd Store`,
    description: "View your order status and tracking information",
  };
}

// Timeline steps
const TIMELINE_STEPS: OrderStatus[] = [
  "pending_payment",
  "paid",
  "submitted_to_printful",
  "in_production",
  "shipped",
  "delivered",
];

export default async function OrderStatusPage({ params }: Props) {
  const { orderId } = await params;
  const order = await getOrder(orderId);

  if (!order) {
    notFound();
  }

  const currentStepIndex = TIMELINE_STEPS.indexOf(order.status);
  const isCanceled = order.status === "canceled";

  return (
    <div className="min-h-screen bg-primary">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/store"
              className="text-desert hover:underline text-sm mb-4 inline-block"
            >
              ← Back to Store
            </Link>
            <h1 className="text-3xl font-bold text-white">
              ORDER #{orderId.slice(-8).toUpperCase()}
            </h1>
            <p className="text-white/60 mt-1">
              Placed on{" "}
              {new Date(order.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Status timeline */}
          <div className="bg-primary-dark rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-white mb-6">ORDER STATUS</h2>

            {isCanceled ? (
              <div className="text-center py-4">
                <span className="text-red-500 text-xl font-bold">
                  Order Canceled
                </span>
              </div>
            ) : (
              <div className="relative">
                {/* Progress line */}
                <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-white/20" />
                <div
                  className="absolute left-4 top-4 w-0.5 bg-desert transition-all duration-500"
                  style={{
                    height: `${(currentStepIndex / (TIMELINE_STEPS.length - 1)) * 100}%`,
                  }}
                />

                {/* Steps */}
                <div className="space-y-6">
                  {TIMELINE_STEPS.map((step, index) => {
                    const isCompleted = index <= currentStepIndex;
                    const isCurrent = index === currentStepIndex;

                    return (
                      <div key={step} className="flex items-start gap-4">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 ${
                            isCompleted
                              ? "bg-desert text-primary"
                              : "bg-white/20 text-white/50"
                          }`}
                        >
                          {isCompleted ? (
                            <svg
                              className="w-4 h-4"
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
                          ) : (
                            <span className="text-sm">{index + 1}</span>
                          )}
                        </div>
                        <div className="flex-1 pt-1">
                          <p
                            className={`font-bold ${
                              isCompleted ? "text-white" : "text-white/50"
                            }`}
                          >
                            {ORDER_STATUS_LABELS[step]}
                          </p>
                          {isCurrent && step === "shipped" && order.trackingUrl && (
                            <a
                              href={order.trackingUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-desert hover:underline text-sm mt-1 inline-block"
                            >
                              Track Package →
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Tracking info */}
          {order.trackingNumber && (
            <div className="bg-primary-dark rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-white mb-4">TRACKING</h2>
              <div className="space-y-2">
                {order.trackingCarrier && (
                  <p className="text-white/70">
                    Carrier: <span className="text-white">{order.trackingCarrier}</span>
                  </p>
                )}
                <p className="text-white/70">
                  Tracking Number:{" "}
                  <span className="text-white font-mono">{order.trackingNumber}</span>
                </p>
                {order.trackingUrl && (
                  <a
                    href={order.trackingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2"
                  >
                    <Button variant="secondary">Track Package</Button>
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Order items */}
          <div className="bg-primary-dark rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-white mb-4">ORDER ITEMS</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between py-2 border-b border-white/10 last:border-0"
                >
                  <div>
                    <p className="text-white font-semibold">{item.product.name}</p>
                    <p className="text-white/60 text-sm">
                      {[item.productVariant.size, item.productVariant.color]
                        .filter(Boolean)
                        .join(" / ")}
                    </p>
                    <p className="text-white/60 text-sm">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-desert font-semibold">
                    ${(item.unitPrice * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
              <div className="flex justify-between pt-4 border-t border-white/20">
                <span className="text-white font-bold">Total</span>
                <span className="text-desert font-bold text-xl">
                  ${order.totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Shipping info */}
          <div className="bg-primary-dark rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-white mb-4">SHIPPING ADDRESS</h2>
            <div className="text-white/70 space-y-1">
              <p className="text-white font-semibold">{order.shippingName}</p>
              <p>{order.shippingAddress}</p>
              <p>
                {order.shippingCity}, {order.shippingState} {order.shippingZip}
              </p>
              <p>{order.shippingCountry}</p>
            </div>
          </div>

          {/* Help */}
          <div className="text-center text-white/60 text-sm">
            <p>
              Questions about your order? Contact us at{" "}
              <a href="mailto:support@equippdlife.com" className="text-desert hover:underline">
                support@equippdlife.com
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
