import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { createPrintfulOrder } from "@/lib/printful";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    console.error("Missing Stripe signature");
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("Missing STRIPE_WEBHOOK_SECRET");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Stripe webhook signature verification failed:", message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  console.log(`Received Stripe event: ${event.type}`);

  // Handle checkout.session.completed
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const orderId = session.metadata?.orderId;
    if (!orderId) {
      console.error("No orderId in session metadata");
      return NextResponse.json({ received: true });
    }

    // Find the order
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

    if (!order) {
      console.error(`Order not found: ${orderId}`);
      return NextResponse.json({ received: true });
    }

    // Idempotency check: don't reprocess if already paid
    if (order.status !== "pending_payment") {
      console.log(`Order ${orderId} already processed, status: ${order.status}`);
      return NextResponse.json({ received: true });
    }

    // Update order status to paid
    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: "paid",
        stripePaymentIntentId: session.payment_intent as string,
      },
    });

    console.log(`Order ${orderId} marked as paid`);

    // Check if all items have Printful variant IDs
    const itemsWithPrintful = order.items.filter(
      (item) => item.printfulVariantId
    );

    if (itemsWithPrintful.length === 0) {
      console.log(`Order ${orderId}: No Printful variants, skipping fulfillment`);
      return NextResponse.json({ received: true });
    }

    // Create Printful order
    try {
      const printfulResult = await createPrintfulOrder({
        email: order.email,
        shippingName: order.shippingName,
        shippingAddress: order.shippingAddress,
        shippingCity: order.shippingCity,
        shippingState: order.shippingState,
        shippingZip: order.shippingZip,
        shippingCountry: order.shippingCountry,
        items: itemsWithPrintful.map((item) => ({
          printfulVariantId: item.printfulVariantId!,
          quantity: item.quantity,
        })),
      });

      // Update order with Printful info
      await prisma.order.update({
        where: { id: orderId },
        data: {
          status: "submitted_to_printful",
          printfulOrderId: String(printfulResult.printfulOrderId),
        },
      });

      console.log(
        `Order ${orderId} submitted to Printful, ID: ${printfulResult.printfulOrderId}`
      );
    } catch (printfulError) {
      // Log error but don't fail the webhook
      // The order is still marked as paid, fulfillment can be retried manually
      console.error(`Failed to create Printful order for ${orderId}:`, printfulError);
    }
  }

  return NextResponse.json({ received: true });
}
