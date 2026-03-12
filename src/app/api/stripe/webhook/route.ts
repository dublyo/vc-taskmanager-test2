import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

/**
 * Stripe webhook handler.
 * Only active when STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET are set.
 */
export async function POST(request: Request) {
  if (!stripe) {
    return NextResponse.json(
      { error: 'Stripe is not configured' },
      { status: 501 }
    )
  }

  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: 'Missing signature or webhook secret' },
      { status: 400 }
    )
  }

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )

    // Handle specific event types
    switch (event.type) {
      case 'checkout.session.completed':
        // Handle successful checkout
        break
      case 'customer.subscription.updated':
        // Handle subscription update
        break
      case 'customer.subscription.deleted':
        // Handle subscription cancellation
        break
      default:
        // Unhandled event type
        break
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Stripe webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook verification failed' },
      { status: 400 }
    )
  }
}
