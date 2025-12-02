import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import type { PrintfulWebhookEvent } from "@/types/store";
import type { OrderStatus } from "@/generated/prisma";

// Map Printful status to our internal status
function mapPrintfulStatus(printfulStatus: string): OrderStatus | null {
  const statusMap: Record<string, OrderStatus> = {
    pending: "submitted_to_printful",
    failed: "submitted_to_printful", // Keep as submitted, needs manual review
    canceled: "canceled",
    inprocess: "in_production",
    onhold: "in_production",
    partial: "shipped", // Partially shipped
    fulfilled: "shipped",
  };
  return statusMap[printfulStatus] || null;
}

export async function POST(request: NextRequest) {
  try {
    const body: PrintfulWebhookEvent = await request.json();

    console.log(`Received Printful webhook: ${body.type}`);

    const printfulOrderId = body.data.order.id.toString();

    // Find the order by Printful ID
    const order = await prisma.order.findFirst({
      where: { printfulOrderId },
    });

    if (!order) {
      console.log(`Order not found for Printful ID: ${printfulOrderId}`);
      return NextResponse.json({ received: true });
    }

    // Handle different event types
    switch (body.type) {
      case "order_created":
      case "order_updated": {
        const newStatus = mapPrintfulStatus(body.data.order.status);
        if (newStatus && newStatus !== order.status) {
          await prisma.order.update({
            where: { id: order.id },
            data: { status: newStatus },
          });
          console.log(`Order ${order.id} status updated to ${newStatus}`);
        }
        break;
      }

      case "package_shipped": {
        // Extract tracking info from the first shipment
        const shipment = body.data.order.shipments?.[0];
        
        await prisma.order.update({
          where: { id: order.id },
          data: {
            status: "shipped",
            trackingNumber: shipment?.tracking_number || null,
            trackingCarrier: shipment?.carrier || null,
            trackingUrl: shipment?.tracking_url || null,
          },
        });

        console.log(
          `Order ${order.id} marked as shipped, tracking: ${shipment?.tracking_number || "N/A"}`
        );
        break;
      }

      default:
        console.log(`Unhandled Printful event type: ${body.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Printful webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
