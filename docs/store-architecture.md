# Equippd Store Architecture

## Overview

The Equippd Store is a print-on-demand apparel store built with:

- **Next.js** - React framework with App Router
- **TypeScript** - Type-safe development
- **Prisma** - Database ORM
- **SQLite/PostgreSQL** - Database (SQLite for development, PostgreSQL for production)
- **Stripe** - Payment processing
- **Printful** - Print-on-demand fulfillment
- **Zustand** - Client-side state management (cart)

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                           Frontend                                   │
├──────────────────┬──────────────────┬────────────────────────────────┤
│  /store          │  /store/[slug]   │  /cart, /checkout              │
│  Product Listing │  Product Detail  │  Cart & Checkout Flow          │
├──────────────────┴──────────────────┴────────────────────────────────┤
│                      Zustand Cart Store                              │
│                    (Client-side, localStorage)                       │
└──────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌──────────────────────────────────────────────────────────────────────┐
│                         API Routes                                    │
├─────────────────┬────────────────────┬───────────────────────────────┤
│ /api/checkout   │ /api/webhooks/     │ /api/webhooks/printful        │
│ Create Stripe   │ stripe             │ Order status updates          │
│ Session & Order │ Payment confirmed  │ Tracking info                 │
└─────────────────┴────────────────────┴───────────────────────────────┘
                                │
                                ▼
┌──────────────────────────────────────────────────────────────────────┐
│                        Database (Prisma)                              │
├──────────────────┬──────────────────┬────────────────────────────────┤
│     Product      │  ProductVariant  │     Order / OrderItem          │
│  - name, slug    │  - size, color   │   - status, shipping           │
│  - price, images │  - sku, price    │   - stripe/printful IDs        │
└──────────────────┴──────────────────┴────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────┬────────────────────────────────────┐
│           Stripe                │            Printful                 │
│   - Checkout Sessions           │   - Order creation                  │
│   - Payment processing          │   - Fulfillment                     │
│   - Webhooks                    │   - Shipping updates                │
└─────────────────────────────────┴────────────────────────────────────┘
```

## Directory Structure

```
src/
├── app/
│   ├── api/
│   │   ├── checkout/
│   │   │   └── route.ts          # Checkout API endpoint
│   │   └── webhooks/
│   │       ├── stripe/
│   │       │   └── route.ts      # Stripe webhook handler
│   │       └── printful/
│   │           └── route.ts      # Printful webhook handler
│   ├── store/
│   │   ├── page.tsx              # Product listing
│   │   ├── [slug]/
│   │   │   └── page.tsx          # Product detail
│   │   └── order/
│   │       └── success/
│   │           └── page.tsx      # Order confirmation
│   ├── cart/
│   │   └── page.tsx              # Cart page
│   ├── checkout/
│   │   └── page.tsx              # Checkout page
│   └── orders/
│       └── [orderId]/
│           └── page.tsx          # Order status page
├── components/
│   └── store/
│       ├── ProductCard.tsx       # Product grid card
│       ├── ProductGallery.tsx    # Product image gallery
│       ├── VariantSelector.tsx   # Size/color selector
│       ├── AddToCartButton.tsx   # Add to cart button
│       ├── CartDrawer.tsx        # Cart slide-out drawer
│       └── CartIcon.tsx          # Header cart icon
├── lib/
│   ├── db.ts                     # Prisma client
│   ├── stripe.ts                 # Stripe client
│   └── printful.ts               # Printful API wrapper
├── store/
│   └── cart.ts                   # Zustand cart store
└── types/
    └── store.ts                  # Store-related types

prisma/
├── schema.prisma                 # Database schema
├── migrations/                   # Database migrations
└── seed.ts                       # Database seed script
```

## Data Models

### Product

| Field             | Type    | Description                    |
| ----------------- | ------- | ------------------------------ |
| id                | String  | Unique identifier (CUID)       |
| slug              | String  | URL-friendly identifier        |
| name              | String  | Product display name           |
| description       | String? | Product description            |
| basePrice         | Float   | Base price in USD              |
| active            | Boolean | Whether product is visible     |
| printfulProductId | String? | Printful product ID (optional) |

### ProductVariant

| Field             | Type    | Description                  |
| ----------------- | ------- | ---------------------------- |
| id                | String  | Unique identifier (CUID)     |
| productId         | String  | Reference to parent product  |
| size              | String? | Size (S, M, L, XL, etc.)     |
| color             | String? | Color name                   |
| sku               | String  | Stock keeping unit (unique)  |
| price             | Float?  | Price override (if any)      |
| printfulVariantId | String? | Printful variant ID          |

### Order

| Field                   | Type        | Description                       |
| ----------------------- | ----------- | --------------------------------- |
| id                      | String      | Unique identifier (CUID)          |
| userId                  | String?     | User ID (nullable for guests)     |
| email                   | String      | Customer email                    |
| status                  | OrderStatus | Current order status              |
| stripeCheckoutSessionId | String?     | Stripe checkout session ID        |
| printfulOrderId         | String?     | Printful order ID                 |
| shippingName            | String      | Recipient name                    |
| shippingAddress         | String      | Street address                    |
| shippingCity            | String      | City                              |
| shippingState           | String      | State/Province                    |
| shippingZip             | String      | ZIP/Postal code                   |
| shippingCountry         | String      | Country code                      |
| trackingNumber          | String?     | Shipping tracking number          |
| trackingCarrier         | String?     | Shipping carrier                  |
| trackingUrl             | String?     | Tracking URL                      |
| totalAmount             | Float       | Order total in USD                |

### OrderStatus Enum

- `pending_payment` - Order created, awaiting payment
- `paid` - Payment confirmed via Stripe
- `submitted_to_printful` - Order sent to Printful
- `in_production` - Printful is producing the order
- `shipped` - Order has shipped
- `delivered` - Order delivered
- `canceled` - Order canceled

## Order Flow

1. **Customer browses store** → Products fetched from DB
2. **Customer adds items to cart** → Cart stored in Zustand + localStorage
3. **Customer proceeds to checkout** → Enters shipping info
4. **Checkout submitted** → `POST /api/checkout`:
   - Validate cart items against DB
   - Create Order with `pending_payment` status
   - Create Stripe Checkout Session
   - Return Stripe URL
5. **Customer completes payment** → Redirected to Stripe Checkout
6. **Payment confirmed** → Stripe webhook `checkout.session.completed`:
   - Update Order status to `paid`
   - Create Printful order
   - Update Order status to `submitted_to_printful`
   - Save Printful order ID
7. **Printful produces order** → Printful webhook:
   - Update Order status to `in_production`
8. **Order ships** → Printful webhook:
   - Update Order status to `shipped`
   - Save tracking information

## Environment Variables

| Variable              | Description                         |
| --------------------- | ----------------------------------- |
| DATABASE_URL          | Prisma database connection string   |
| PRINTFUL_API_KEY      | Printful API key                    |
| STRIPE_SECRET_KEY     | Stripe secret key                   |
| STRIPE_WEBHOOK_SECRET | Stripe webhook signing secret       |
| NEXT_PUBLIC_SITEURL   | Public site URL for redirect URLs   |

## Security Considerations

- All prices are validated server-side (ignore client totals)
- Stripe webhooks are verified using signing secret
- Printful webhooks are validated via shared secret
- Database operations use Prisma's parameterized queries
- Cart validation prevents ordering inactive products

## Scaling Considerations

- Replace SQLite with PostgreSQL for production
- Add Sentry for error monitoring
- Consider adding Redis for cart persistence across devices
- Add rate limiting for API routes
