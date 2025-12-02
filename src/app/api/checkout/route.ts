import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import type { CartItem, CheckoutPayload, CheckoutResponse } from "@/types/store";

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutPayload = await request.json();
    const { cart, shipping } = body;

    // Validate cart has items
    if (!cart || cart.length === 0) {
      return NextResponse.json<CheckoutResponse>(
        { success: false, error: "Cart is empty" },
        { status: 400 }
      );
    }

    // Validate shipping info
    if (!shipping.name || !shipping.email || !shipping.address || 
        !shipping.city || !shipping.state || !shipping.zip || !shipping.country) {
      return NextResponse.json<CheckoutResponse>(
        { success: false, error: "Missing shipping information" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shipping.email)) {
      return NextResponse.json<CheckoutResponse>(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Validate cart items against database (server-side price validation)
    const variantIds = cart.map((item: CartItem) => item.productVariantId);
    const variants = await prisma.productVariant.findMany({
      where: { id: { in: variantIds } },
      include: { product: true },
    });

    // Check all variants exist and are active
    const variantMap = new Map(variants.map((v) => [v.id, v]));
    const validatedItems: Array<{
      cartItem: CartItem;
      variant: typeof variants[0];
      unitPrice: number;
    }> = [];

    for (const item of cart) {
      const variant = variantMap.get(item.productVariantId);
      if (!variant) {
        return NextResponse.json<CheckoutResponse>(
          { success: false, error: `Product variant not found: ${item.name}` },
          { status: 400 }
        );
      }
      if (!variant.product.active) {
        return NextResponse.json<CheckoutResponse>(
          { success: false, error: `Product is no longer available: ${item.name}` },
          { status: 400 }
        );
      }
      // Use server-side price (ignore client-provided price)
      const unitPrice = variant.price ?? variant.product.basePrice;
      validatedItems.push({ cartItem: item, variant, unitPrice });
    }

    // Calculate total server-side
    const totalAmount = validatedItems.reduce(
      (sum, { cartItem, unitPrice }) => sum + unitPrice * cartItem.quantity,
      0
    );

    // Create order in database with pending_payment status
    const order = await prisma.order.create({
      data: {
        email: shipping.email,
        status: "pending_payment",
        shippingName: shipping.name,
        shippingAddress: shipping.address,
        shippingCity: shipping.city,
        shippingState: shipping.state,
        shippingZip: shipping.zip,
        shippingCountry: shipping.country,
        totalAmount,
        items: {
          create: validatedItems.map(({ cartItem, variant, unitPrice }) => ({
            productId: variant.productId,
            productVariantId: variant.id,
            quantity: cartItem.quantity,
            unitPrice,
            printfulVariantId: variant.printfulVariantId,
          })),
        },
      },
    });

    // Create Stripe Checkout Session
    const siteUrl = process.env.NEXT_PUBLIC_SITEURL || "http://localhost:3000";
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: shipping.email,
      line_items: validatedItems.map(({ cartItem, variant, unitPrice }) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: variant.product.name,
            description: [variant.size, variant.color].filter(Boolean).join(" / ") || undefined,
          },
          unit_amount: Math.round(unitPrice * 100), // Stripe expects cents
        },
        quantity: cartItem.quantity,
      })),
      success_url: `${siteUrl}/store/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout?canceled=1`,
      metadata: {
        orderId: order.id,
      },
    });

    // Update order with Stripe session ID
    await prisma.order.update({
      where: { id: order.id },
      data: { stripeCheckoutSessionId: session.id },
    });

    return NextResponse.json<CheckoutResponse>({
      success: true,
      sessionUrl: session.url ?? undefined,
      orderId: order.id,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json<CheckoutResponse>(
      { success: false, error: "An error occurred during checkout" },
      { status: 500 }
    );
  }
}
