/**
 * Store-related type definitions
 */

import type {
  Product,
  ProductVariant,
  ProductImage,
  Order,
  OrderItem,
  OrderStatus,
} from "@/generated/prisma";

// Re-export Prisma types for convenience
export type { Product, ProductVariant, ProductImage, Order, OrderItem };
export { OrderStatus };

// Extended types with relations
export type ProductWithVariantsAndImages = Product & {
  variants: ProductVariant[];
  images: ProductImage[];
};

export type OrderWithItems = Order & {
  items: (OrderItem & {
    product: Product;
    productVariant: ProductVariant;
  })[];
};

// Cart types
export type CartItem = {
  productId: string;
  productVariantId: string;
  name: string;
  variantLabel: string; // e.g., "L / Black"
  price: number;
  quantity: number;
  image?: string;
};

export type Cart = {
  items: CartItem[];
  subtotal: number;
};

// Checkout types
export type ShippingInfo = {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

export type CheckoutPayload = {
  cart: CartItem[];
  shipping: ShippingInfo;
};

// API Response types
export type CheckoutResponse = {
  success: boolean;
  sessionUrl?: string;
  orderId?: string;
  error?: string;
};

// Printful webhook event types
export type PrintfulWebhookEvent = {
  type: string;
  created: number;
  retries: number;
  store: number;
  data: {
    order: {
      id: number;
      external_id: string | null;
      status: string;
      shipping: string;
      created: number;
      updated: number;
      shipments?: Array<{
        id: number;
        carrier: string;
        service: string;
        tracking_number: string;
        tracking_url: string;
        created: number;
        ship_date: string;
        shipped_at: number;
        reshipment: boolean;
      }>;
    };
  };
};

// Order status display helpers
export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending_payment: "Pending Payment",
  paid: "Payment Received",
  submitted_to_printful: "Order Submitted",
  in_production: "In Production",
  shipped: "Shipped",
  delivered: "Delivered",
  canceled: "Canceled",
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  pending_payment: "text-yellow-500",
  paid: "text-blue-500",
  submitted_to_printful: "text-blue-500",
  in_production: "text-purple-500",
  shipped: "text-green-500",
  delivered: "text-green-600",
  canceled: "text-red-500",
};
