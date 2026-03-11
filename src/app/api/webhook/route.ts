import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  if (!sig) return NextResponse.json({ error: 'No signature' }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: 'Webhook signature failed' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const session = event.data.object as any;

    const customerEmail = session.customer_details?.email ?? '';
    const customerName = session.customer_details?.name ?? 'Friend';
    const amountTotal = ((session.amount_total ?? 0) / 100).toFixed(2);
    const shippingAddr = session.shipping_details?.address ?? session.shipping?.address;
    const address = shippingAddr
      ? `${shippingAddr.line1}, ${shippingAddr.city}, ${shippingAddr.country}`
      : 'Not provided';

    const sellerEmail = process.env.SELLER_EMAIL ?? 'darius@bloucowlait.com';
    const fromEmail = process.env.FROM_EMAIL ?? 'orders@bloucowlait.com';

    // ---- Email to customer ----
    if (customerEmail) {
      await resend.emails.send({
        from: `Bloucowlait 🐄 <${fromEmail}>`,
        to: customerEmail,
        subject: '🐄 Your Bloucowlait order is confirmed!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; background: linear-gradient(135deg, #bae6fd, #dbeafe); padding: 30px; border-radius: 20px; margin-bottom: 24px;">
              <h1 style="color: #0c4a6e; font-size: 32px; margin: 0;">Thank you, ${customerName}! 🎉</h1>
              <p style="color: #0369a1; font-size: 18px; margin-top: 8px;">Your order is confirmed!</p>
            </div>
            <p style="color: #374151; font-size: 16px;">Hi ${customerName},</p>
            <p style="color: #374151; font-size: 16px;">We are SO excited to make your order! Bea &amp; Louisa will get started right away. 🐄💛</p>
            <div style="background: #f0f9ff; border-radius: 12px; padding: 20px; margin: 20px 0;">
              <h2 style="color: #0c4a6e; margin-top: 0;">Order summary</h2>
              <p style="color: #374151;"><strong>Total:</strong> US$${amountTotal}</p>
              <p style="color: #374151;"><strong>Shipping to:</strong> ${address}</p>
            </div>
            <p style="color: #374151; font-size: 16px;">We&apos;ll be in touch when your order is on its way! Each item comes with a personal note from us 💌</p>
            <div style="text-align: center; margin-top: 32px;">
              <p style="color: #0ea5e9; font-weight: bold; font-size: 18px;">🐄 Made with love by Bea &amp; Louisa 🥛</p>
              <p style="color: #9ca3af; font-size: 12px;">Bloucowlait · bloucowlait.com</p>
            </div>
          </div>
        `,
      });
    }

    // ---- Email to seller ----
    await resend.emails.send({
      from: `Bloucowlait 🐄 <${fromEmail}>`,
      to: sellerEmail,
      subject: `🎉 New Bloucowlait order from ${customerName} — US$${amountTotal}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #bae6fd, #dbeafe); padding: 24px; border-radius: 16px; margin-bottom: 20px;">
            <h1 style="color: #0c4a6e; margin: 0;">New order! 🎉</h1>
          </div>
          <p style="color: #374151; font-size: 16px;"><strong>Customer:</strong> ${customerName}</p>
          <p style="color: #374151; font-size: 16px;"><strong>Email:</strong> ${customerEmail}</p>
          <p style="color: #374151; font-size: 16px;"><strong>Total:</strong> US$${amountTotal}</p>
          <p style="color: #374151; font-size: 16px;"><strong>Ship to:</strong> ${address}</p>
          <p style="color: #374151; font-size: 16px; margin-top: 20px;">Log into <a href="https://dashboard.stripe.com" style="color: #0ea5e9;">Stripe</a> to see full order details.</p>
        </div>
      `,
    });
  }

  return NextResponse.json({ received: true });
}
