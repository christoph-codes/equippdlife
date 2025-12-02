/**
 * Printful API client
 * Documentation: https://developers.printful.com/docs/
 */

const PRINTFUL_API_URL = "https://api.printful.com";

export type PrintfulRecipient = {
  name: string;
  address1: string;
  city: string;
  state_code: string;
  country_code: string;
  zip: string;
  email: string;
};

export type PrintfulOrderItem = {
  variant_id: number; // Printful variant ID
  quantity: number;
  files?: Array<{
    type: string;
    url: string;
  }>;
};

export type PrintfulOrderPayload = {
  recipient: PrintfulRecipient;
  items: PrintfulOrderItem[];
  confirm?: boolean;
};

export type PrintfulOrderResponse = {
  code: number;
  result: {
    id: number;
    external_id: string | null;
    status: string;
    shipping: string;
    created: number;
    updated: number;
    recipient: PrintfulRecipient;
    items: Array<{
      id: number;
      external_id: string | null;
      variant_id: number;
      quantity: number;
      name: string;
      price: string;
    }>;
    retail_costs: {
      currency: string;
      subtotal: string;
      discount: string;
      shipping: string;
      tax: string;
      total: string;
    };
  };
  extra?: unknown[];
};

export type PrintfulError = {
  code: number;
  result: string;
  error?: {
    reason: string;
    message: string;
  };
};

class PrintfulClient {
  private apiKey: string;

  constructor() {
    const apiKey = process.env.PRINTFUL_API_KEY;
    if (!apiKey) {
      throw new Error("Missing PRINTFUL_API_KEY environment variable");
    }
    this.apiKey = apiKey;
  }

  private async fetch<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${PRINTFUL_API_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      const error = data as PrintfulError;
      throw new Error(
        `Printful API error: ${error.error?.message || error.result || "Unknown error"}`
      );
    }

    return data as T;
  }

  /**
   * Create an order with Printful
   * @param order - The order payload
   * @returns The created order response
   */
  async createOrder(
    order: PrintfulOrderPayload
  ): Promise<PrintfulOrderResponse> {
    return this.fetch<PrintfulOrderResponse>("/orders", {
      method: "POST",
      body: JSON.stringify(order),
    });
  }

  /**
   * Get an order by ID
   * @param orderId - The Printful order ID
   * @returns The order details
   */
  async getOrder(orderId: string | number): Promise<PrintfulOrderResponse> {
    return this.fetch<PrintfulOrderResponse>(`/orders/${orderId}`);
  }

  /**
   * Cancel an order
   * @param orderId - The Printful order ID
   * @returns The canceled order response
   */
  async cancelOrder(orderId: string | number): Promise<PrintfulOrderResponse> {
    return this.fetch<PrintfulOrderResponse>(`/orders/${orderId}`, {
      method: "DELETE",
    });
  }

  /**
   * Confirm a draft order (submit for fulfillment)
   * @param orderId - The Printful order ID
   * @returns The confirmed order response
   */
  async confirmOrder(orderId: string | number): Promise<PrintfulOrderResponse> {
    return this.fetch<PrintfulOrderResponse>(`/orders/${orderId}/confirm`, {
      method: "POST",
    });
  }
}

// Singleton instance
let printfulClient: PrintfulClient | null = null;

export function getPrintfulClient(): PrintfulClient {
  if (!printfulClient) {
    printfulClient = new PrintfulClient();
  }
  return printfulClient;
}

/**
 * Create a Printful order from our database order
 */
export async function createPrintfulOrder(orderData: {
  email: string;
  shippingName: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  shippingCountry: string;
  items: Array<{
    printfulVariantId: string;
    quantity: number;
  }>;
}): Promise<{ printfulOrderId: number; status: string }> {
  const client = getPrintfulClient();

  const payload: PrintfulOrderPayload = {
    recipient: {
      name: orderData.shippingName,
      address1: orderData.shippingAddress,
      city: orderData.shippingCity,
      state_code: orderData.shippingState,
      country_code: orderData.shippingCountry,
      zip: orderData.shippingZip,
      email: orderData.email,
    },
    items: orderData.items.map((item) => ({
      variant_id: parseInt(item.printfulVariantId, 10),
      quantity: item.quantity,
    })),
    confirm: true, // Auto-confirm the order for fulfillment
  };

  const response = await client.createOrder(payload);

  return {
    printfulOrderId: response.result.id,
    status: response.result.status,
  };
}

/**
 * Get Printful order details
 */
export async function getPrintfulOrder(printfulOrderId: string | number) {
  const client = getPrintfulClient();
  return client.getOrder(printfulOrderId);
}
