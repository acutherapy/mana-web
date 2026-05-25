import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder_key_you_need_to_change_this';

// For typing purposes if using older or specific stripe version, we cast the apiVersion.
const stripe = new Stripe(stripeKey, {
  apiVersion: '2023-10-16' as any,
});

export async function POST(req: Request) {
  try {
    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    const { lang } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'DNA Helix Digital Energy Talisman',
              description: 'Premium visually-anchored digital meditation talisman. Saved directly to your Apple Wallet.',
            },
            unit_amount: 2999, // $29.99
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/${lang || 'en'}/pass-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/${lang || 'en'}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe Checkout Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
