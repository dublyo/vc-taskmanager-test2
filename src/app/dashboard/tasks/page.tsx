import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { StatsCards } from './components/StatsCards'
import { TaskCard } from './components/TaskCard'
import { TaskFilters } from './components/TaskFilters'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { TaskForm } from './components/TaskForm'

export default async function TasksPage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }

  const [tasks, categories, stats] = await Promise.all([
    fetch(`${process.env.APP_URL}/api/tasks`, {
      cache: 'no-store',
    }).then((res) => res.json()),
    fetch(`${process.env.APP_URL}/api/categories`, {
      cache: 'no-store',
    }).then((res) => res.json()),
    fetch(`${process.env.APP_URL}/api/stats`, {
      cache: 'no-store',
    }).then((res) => res.json()),
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>New Task</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>
            <TaskForm categories={categories} />
          </DialogContent>
        </Dialog>
      </div>

      <StatsCards stats={stats} />
      <TaskFilters categories={categories} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <p className="text-muted-foreground">No tasks found</p>
        )}
      </div>
    </div>
  )
}