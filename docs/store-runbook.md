# Equippd Store Runbook

## Overview

This document provides operational guidance for managing the Equippd Store.

## Table of Contents

1. [Order Management](#order-management)
2. [Troubleshooting](#troubleshooting)
3. [Manual Interventions](#manual-interventions)
4. [Contacts](#contacts)

---

## Order Management

### Looking Up Orders

**Via Database (Prisma Studio):**
```bash
npx prisma studio
```

Navigate to the `Order` table to view all orders.

**Via API (future):**
A future admin dashboard will provide order lookup functionality.

### Order Statuses

| Status               | Meaning                                   |
| -------------------- | ----------------------------------------- |
| `pending_payment`    | Order created, waiting for Stripe payment |
| `paid`               | Payment confirmed by Stripe               |
| `submitted_to_printful` | Order sent to Printful for production  |
| `in_production`      | Printful is producing the order           |
| `shipped`            | Order has shipped with tracking           |
| `delivered`          | Order delivered (may be manual update)    |
| `canceled`           | Order was canceled                        |

---

## Troubleshooting

### Stripe Webhook Issues

**Symptoms:**
- Orders stuck in `pending_payment` status
- No Printful orders created

**Diagnosis:**
1. Check Stripe Dashboard → Webhooks → Events
2. Look for failed `checkout.session.completed` events
3. Check application logs for webhook errors

**Resolution:**
1. Verify `STRIPE_WEBHOOK_SECRET` is correct
2. Ensure webhook endpoint is accessible: `POST /api/webhooks/stripe`
3. Retry failed events from Stripe Dashboard

### Printful Webhook Issues

**Symptoms:**
- Orders stuck in `submitted_to_printful`
- No tracking info despite shipment

**Diagnosis:**
1. Check Printful Dashboard → Store Settings → Webhooks
2. Verify webhook URL is configured: `POST /api/webhooks/printful`

**Resolution:**
1. Verify Printful webhook is configured
2. Check order status directly in Printful Dashboard

### Payment Received but No Printful Order

**Symptoms:**
- Order status is `paid` but not `submitted_to_printful`
- `printfulOrderId` is null

**Resolution:**
Use the re-trigger fulfillment process below.

---

## Manual Interventions

### Re-trigger Printful Fulfillment

If a paid order was not submitted to Printful:

```typescript
// Manual script to re-trigger fulfillment
import { prisma } from "@/lib/db";
import { createPrintfulOrder } from "@/lib/printful";

const orderId = "YOUR_ORDER_ID";

const order = await prisma.order.findUnique({
  where: { id: orderId },
  include: {
    items: {
      include: { productVariant: true },
    },
  },
});

if (order && order.status === "paid" && !order.printfulOrderId) {
  const itemsWithPrintful = order.items.filter((i) => i.printfulVariantId);
  
  const result = await createPrintfulOrder({
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

  await prisma.order.update({
    where: { id: orderId },
    data: {
      status: "submitted_to_printful",
      printfulOrderId: String(result.printfulOrderId),
    },
  });
}
```

### Cancel an Order

1. If order is `pending_payment` or `paid`: Update status to `canceled` in database
2. If order is `submitted_to_printful` or later: Cancel in Printful Dashboard first
3. Issue refund via Stripe Dashboard if payment was received

### Update Tracking Manually

```sql
UPDATE "Order"
SET
  status = 'shipped',
  "trackingNumber" = 'TRACKING_NUMBER',
  "trackingCarrier" = 'USPS',
  "trackingUrl" = 'https://tools.usps.com/go/TrackConfirmAction?qtc_tLabels1=TRACKING_NUMBER'
WHERE id = 'ORDER_ID';
```

---

## Adding New Products

### Via Seed Script

1. Edit `prisma/seed.ts`
2. Add new product with variants
3. Run: `npx ts-node prisma/seed.ts`

### Linking Printful Products

1. Find the Printful variant IDs in Printful Dashboard → Products → Variants
2. Update `printfulVariantId` in the database for each variant
3. Ensure SKUs match between your database and Printful

---

## Environment Variables

| Variable              | Where to Update                |
| --------------------- | ------------------------------ |
| `DATABASE_URL`        | Vercel → Environment Variables |
| `PRINTFUL_API_KEY`    | Vercel → Environment Variables |
| `STRIPE_SECRET_KEY`   | Vercel → Environment Variables |
| `STRIPE_WEBHOOK_SECRET` | Vercel → Environment Variables |
| `NEXT_PUBLIC_SITEURL` | Vercel → Environment Variables |

---

## Contacts

- **Developer/Technical Issues:** [Internal contact]
- **Stripe Support:** https://support.stripe.com/
- **Printful Support:** https://www.printful.com/support

---

## Monitoring Checklist

Daily/Weekly checks:
- [ ] Review Stripe Dashboard for failed payments
- [ ] Check for orders stuck in `paid` status
- [ ] Verify Printful orders are being created
- [ ] Check for webhook failures in both Stripe and Printful

---

## Emergency Procedures

### Store Down

1. Check Vercel deployment status
2. Check database connectivity
3. Check Stripe status page: https://status.stripe.com/
4. Check Printful status page: https://status.printful.com/

### Disable Store Temporarily

Set `visible: false` for the store link in `src/lib/navLinks.ts` and redeploy.
