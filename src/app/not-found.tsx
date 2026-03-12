import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F1F5FB] px-4 dark:bg-gray-950">
      <h1 className="text-8xl font-bold text-primary-600 dark:text-primary-400">404</h1>
      <p className="mt-4 text-xl font-semibold text-gray-900 dark:text-gray-100">Page not found</p>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-700"
      >
        Go home
      </Link>
    </div>
  )
}
