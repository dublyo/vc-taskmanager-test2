import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Rocket, Zap, Shield, Database, CreditCard, Mail } from 'lucide-react'

/** Feature items displayed in the grid on the homepage */
const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Built on Next.js with React Server Components for optimal performance.',
  },
  {
    icon: Shield,
    title: 'Authentication',
    description: 'Email/password auth with NextAuth.js — ready to extend with OAuth providers.',
  },
  {
    icon: Database,
    title: 'Database Ready',
    description: 'Prisma ORM with PostgreSQL — type-safe queries and easy migrations.',
  },
  {
    icon: CreditCard,
    title: 'Payments',
    description: 'Stripe integration pre-wired — subscriptions, one-time payments, webhooks.',
  },
  {
    icon: Mail,
    title: 'Email',
    description: 'Resend for transactional emails — welcome, password reset, notifications.',
  },
  {
    icon: Rocket,
    title: 'Deploy Anywhere',
    description: 'Docker-ready with GitHub Actions CI/CD — push to main and ship.',
  },
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Build your next{' '}
              <span className="text-primary-600 dark:text-primary-400">web app</span>{' '}
              in minutes
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
              A production-ready full-stack starter with authentication, database,
              payments, email, and file uploads — all pre-configured and ready to go.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link
                href="/register"
                className="rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                Get started
              </Link>
              <Link
                href="/login"
                className="rounded-lg px-6 py-3 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50 dark:text-gray-100 dark:ring-gray-700 dark:hover:bg-gray-900"
              >
                Sign in
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Everything you need
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                All the essentials for building a modern web application.
              </p>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 dark:bg-primary-950">
                    <feature.icon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl rounded-2xl bg-primary-600 px-8 py-16 text-center dark:bg-primary-700">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Ready to start building?
            </h2>
            <p className="mt-4 text-lg text-primary-100">
              Create your account and start shipping features today.
            </p>
            <Link
              href="/register"
              className="mt-8 inline-block rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary-600 shadow-sm hover:bg-primary-50"
            >
              Get started for free
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
