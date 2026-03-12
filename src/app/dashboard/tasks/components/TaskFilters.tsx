'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TaskPriority, TaskStatus } from '@prisma/client'

export function TaskFilters({
  categories,
}: {
  categories: { id: string; name: string }[]
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const status = searchParams.get('status') || ''
  const priority = searchParams.get('priority') || ''
  const categoryId = searchParams.get('categoryId') || ''

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Select
        value={status}
        onValueChange={(value) => handleFilterChange('status', value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Statuses</SelectItem>
          {Object.values(TaskStatus).map((status) => (
            <SelectItem key={status} value={status}>
              {status.replace('_', ' ')}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={priority}
        onValueChange={(value) => handleFilterChange('priority', value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Priorities</SelectItem>
          {Object.values(TaskPriority).map((priority) => (
            <SelectItem key={priority} value={priority}>
              {priority}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={categoryId}
        onValueChange={(value) => handleFilterChange('categoryId', value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        onClick={() => router.push('/dashboard/tasks')}
      >
        Clear Filters
      </Button>
    </div>
  )
}