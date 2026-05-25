import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';

// NOTE: Configure these in your .env.local
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16' as any,
});
const resend = new Resend(process.env.RESEND_API_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  const payload = await req.text();
  const signature = req.headers.get('stripe-signature') as string;

  let event;

  try {
    // Verify the request came from Stripe
    event = stripe.webhooks.constructEvent(payload, signature, endpointSecret!);
  } catch (err: any) {
    console.error(`Webhook signature verification failed.`, err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  // Handle successful payment
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // Get customer info passed from /api/checkout metadata
    const customerEmail = session.customer_email || session.customer_details?.email;
    const { name, location, package: pkgName, notes, date, timeSlot } = session.metadata || {};

    if (customerEmail) {
      try {
        // Send beautiful confirmation email to customer
        await resend.emails.send({
          from: 'Mana Reset <booking@manareset.com>', // Update to your verified domain
          to: customerEmail,
          bcc: process.env.ADMIN_EMAIL || 'admin@yourdomain.com', // Sends a secret copy to you!
          subject: `Booking Confirmed: Your Mana Reset Session`,
          html: `
            <div style="font-family: sans-serif; color: #001B3F; padding: 20px; max-width: 600px; margin: 0 auto; line-height: 1.6;">
              <h2 style="color: #001B3F; font-size: 24px; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">
                Aloha ${name || 'Beautiful Soul'},
              </h2>
              <p style="font-size: 16px;">Your journey begins now. We have successfully received your booking for the <strong>${pkgName}</strong> package.</p>
              
              <div style="background-color: #f7f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 5px 0;"><strong>Package:</strong> ${pkgName}</p>
                <p style="margin: 5px 0;"><strong>Location:</strong> ${location}</p>
                ${date ? `<p style="margin: 5px 0;"><strong>Requested Date:</strong> ${date}</p>` : ''}
                ${timeSlot ? `<p style="margin: 5px 0;"><strong>Requested Time:</strong> ${timeSlot}</p>` : ''}
                ${notes ? `<p style="margin: 5px 0;"><strong>Your Notes:</strong> ${notes}</p>` : ''}
              </div>

              <p style="font-size: 16px;">Our practitioner will reach out to you shortly to finalize the exact timing of your session.</p>
              <br/>
              <p style="font-size: 16px; font-style: italic;">Take a deep breath. We look forward to seeing you.</p>
              <p style="font-size: 16px;">Warmly,<br/><strong>The Mana Reset Team</strong></p>
            </div>
          `,
        });

        console.log(`Confirmation email sent to ${customerEmail}`);
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
      }
    }
  }

  return NextResponse.json({ received: true });
}
