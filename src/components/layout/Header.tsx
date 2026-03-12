'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Rocket, LogOut, LayoutDashboard } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

export function Header() {
  const { data: session } = useSession()

  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold">
          <Rocket className="h-6 w-6 text-primary-600 dark:text-primary-400" />
          <span>VibeCoder</span>
        </Link>

        <nav className="flex items-center gap-4">
          <ThemeToggle />
          {session ? (
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
              >
                Get started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
