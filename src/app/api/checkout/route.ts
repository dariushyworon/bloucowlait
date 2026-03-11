import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

function generateOrderNumber(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const random = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `BCL-${random}`;
}

export async function POST(req: NextRequest) {
  const { items } = await req.json();

  if (!items || items.length === 0) {
    return NextResponse.json({ error: 'No items' }, { status: 400 });
  }

  const orderNumber = generateOrderNumber();

  const lineItems = items.map((item: { name: string; price: number; quantity: number; emoji: string }) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: `${item.emoji} ${item.name}`,
        description: 'Handmade by Bea & Louisa with love 💛',
      },
      unit_amount: item.price,
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?order=${orderNumber}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
    customer_creation: 'always',
    metadata: {
      order_number: orderNumber,
      shop: 'bloucowlait',
    },
    payment_intent_data: {
      metadata: {
        order_number: orderNumber,
        shop: 'bloucowlait',
      },
    },
    shipping_address_collection: {
      allowed_countries: [
        'US', 'CA', 'GB', 'AU', 'FR', 'IL', 'ZA', 'DE', 'NL', 'BE',
        'IT', 'ES', 'PT', 'CH', 'AT', 'SE', 'NO', 'DK', 'FI', 'NZ',
        'SG', 'JP', 'HK', 'BR', 'MX', 'AR', 'CL', 'IN', 'IE', 'PL',
        'CZ', 'HU', 'RO', 'GR', 'TR', 'AE', 'SA', 'KE', 'NG', 'GH',
      ],
    },
    custom_text: {
      submit: {
        message: 'Made with love by Bea & Louisa 🐄',
      },
    },
  });

  return NextResponse.json({ url: session.url });
}
