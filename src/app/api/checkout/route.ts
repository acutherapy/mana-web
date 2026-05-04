import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// NOTE: Please configure STRIPE_SECRET_KEY in your .env.local
const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder_key_you_need_to_change_this';

// For typing purposes if using older or specific stripe version, we cast the apiVersion.
const stripe = new Stripe(stripeKey, {
  apiVersion: '2023-10-16' as any,
});

const PRICES = {
  unwind: { amount: 32000, name: 'The Unwind (60 Min)' },
  balance: { amount: 46000, name: 'The Balance (90 Min)' },
  awakening: { amount: 60000, name: 'The Awakening (120 Min)' },
  custom: { amount: 150000, name: 'VIP Custom Retreat (Deposit)' },
  test: { amount: 100, name: 'System Test ($1)' },
};

export async function POST(req: Request) {
  try {
    const { package: pkgName, email, name, location, notes } = await req.json();

    const selectedPkg = PRICES[pkgName as keyof typeof PRICES];
    if (!selectedPkg) {
      return NextResponse.json({ error: 'Invalid package' }, { status: 400 });
    }

    // Here you would typically insert a "pending" booking record into your Supabase/Postgres DB
    // e.g., const booking = await db.insert(bookingData)

    // Create a Stripe Checkout Session
    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: selectedPkg.name,
              description: `Mana Reset in-room private booking for ${name || 'client'}`,
              images: ['https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'], // A nice massage/healing image
            },
            unit_amount: selectedPkg.amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/en/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/en/booking`,
      customer_email: email || undefined,
      metadata: {
        name,
        location,
        notes,
        package: pkgName
      }
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe Checkout Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
