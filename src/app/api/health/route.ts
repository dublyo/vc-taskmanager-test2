import { NextResponse } from 'next/server'

/**
 * Health check endpoint — returns 200 if the app is running.
 * Used by Docker healthchecks, load balancers, and monitoring.
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  })
}
