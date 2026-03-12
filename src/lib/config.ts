/**
 * Centralized configuration — all env vars accessed through this file.
 * This prevents scattered process.env calls and provides type safety.
 */

function getEnv(key: string, fallback = ''): string {
  return process.env[key] ?? fallback
}

function getEnvRequired(key: string): string {
  const value = process.env[key]
  if (!value && process.env.NODE_ENV === 'production') {
    throw new Error(`Missing required environment variable: ${key}`)
  }
  return value ?? ''
}

export const config = {
  /** Application */
  appUrl: getEnv('APP_URL', 'http://localhost:3000'),
  nodeEnv: getEnv('NODE_ENV', 'development'),
  isProduction: process.env.NODE_ENV === 'production',

  /** Database */
  databaseUrl: getEnvRequired('DATABASE_URL'),

  /** Redis */
  redisUrl: getEnv('REDIS_URL', 'redis://localhost:6379'),

  /** Auth */
  authSecret: getEnvRequired('AUTH_SECRET'),

  /** Stripe (optional) */
  stripe: {
    secretKey: getEnv('STRIPE_SECRET_KEY'),
    webhookSecret: getEnv('STRIPE_WEBHOOK_SECRET'),
    publishableKey: getEnv('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY'),
    get isConfigured() {
      return !!this.secretKey
    },
  },

  /** Resend (optional) */
  resend: {
    apiKey: getEnv('RESEND_API_KEY'),
    get isConfigured() {
      return !!this.apiKey
    },
  },

  /** UploadThing (optional) */
  uploadthing: {
    token: getEnv('UPLOADTHING_TOKEN'),
    get isConfigured() {
      return !!this.token
    },
  },
} as const
