import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { TaskForm } from '../components/TaskForm'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default async function TaskDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }

  const [task, categories] = await Promise.all([
    fetch(`${process.env.APP_URL}/api/tasks/${params.id}`, {
      cache: 'no-store',
    }).then((res) => res.json()),
    fetch(`${process.env.APP_URL}/api/categories`, {
      cache: 'no-store',
    }).then((res) => res.json()),
  ])

  if (!task) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-bold">Task not found</h1>
        <Button asChild>
          <Link href="/dashboard/tasks">Back to Tasks</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/tasks">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Edit Task</h1>
      </div>

      <TaskForm
        defaultValues={{
          ...task,
          dueDate: task.dueDate ? new Date(task.dueDate).toISOString() : undefined,
        }}
        categories={categories}
        onSuccess={() => redirect('/dashboard/tasks')}
      />
    </div>
  )
}