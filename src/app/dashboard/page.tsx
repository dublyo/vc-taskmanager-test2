import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { User, Calendar, Shield } from 'lucide-react'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  // Redirect to login if not authenticated
  if (!session) {
    redirect('/login')
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-8">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Welcome back, {session.user.name || session.user.email}
            </p>

            {/* User Info Cards */}
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 dark:bg-primary-950">
                    <User className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                    <p className="font-medium">{session.user.name || 'Not set'}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 dark:bg-green-950">
                    <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="font-medium">{session.user.email}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-950">
                    <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Role</p>
                    <p className="font-medium capitalize">{session.user.role}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Start Guide */}
            <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <h2 className="text-lg font-semibold">Quick Start</h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                This is your dashboard. Start building by editing the source code.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500" />
                  Edit pages in <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs dark:bg-gray-800">src/app/</code>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500" />
                  Add API routes in <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs dark:bg-gray-800">src/app/api/</code>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500" />
                  Modify the database schema in <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs dark:bg-gray-800">prisma/schema.prisma</code>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
