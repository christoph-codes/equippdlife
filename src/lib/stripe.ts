import Stripe from "stripe";

// Only initialize Stripe if the key is available (not during build)
const stripeKey = process.env.STRIPE_SECRET_KEY;

// Create a lazy-loaded Stripe instance
let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeKey) {
    throw new Error("Missing STRIPE_SECRET_KEY environment variable");
  }
  if (!stripeInstance) {
    stripeInstance = new Stripe(stripeKey, {
      typescript: true,
    });
  }
  return stripeInstance;
}

// For backward compatibility
export const stripe = stripeKey
  ? new Stripe(stripeKey, { typescript: true })
  : (null as unknown as Stripe);
