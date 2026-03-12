import { Task } from '@prisma/client'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

interface TaskCardProps {
  task: Task & {
    category?: {
      name: string
      color: string
    }
  }
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <h3 className="font-medium">{task.title}</h3>
        <div className="flex gap-2">
          <Badge
            variant={task.status === 'DONE' ? 'success' : 'secondary'}
            className="capitalize"
          >
            {task.status.toLowerCase().replace('_', ' ')}
          </Badge>
          <Badge
            variant={
              task.priority === 'URGENT'
                ? 'destructive'
                : task.priority === 'HIGH'
                ? 'warning'
                : 'secondary'
            }
            className="capitalize"
          >
            {task.priority.toLowerCase()}
          </Badge>
        </div>
      </div>

      {task.description && (
        <p className="mt-2 text-sm text-muted-foreground">
          {task.description}
        </p>
      )}

      <div className="mt-4 flex items-center justify-between">
        {task.category && (
          <Badge
            className="text-xs"
            style={{ backgroundColor: task.category.color }}
          >
            {task.category.name}
          </Badge>
        )}

        {task.dueDate && (
          <span
            className={cn(
              'text-xs',
              new Date(task.dueDate) < new Date() && task.status !== 'DONE'
                ? 'text-destructive'
                : 'text-muted-foreground'
            )}
          >
            Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
          </span>
        )}
      </div>
    </div>
  )
}