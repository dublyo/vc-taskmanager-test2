import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
    const now = new Date()

    const [totalTasks, byStatus, byPriority, overdue] = await Promise.all([
      prisma.task.count({ where: { userId } }),
      prisma.task.groupBy({
        by: ['status'],
        where: { userId },
        _count: { _all: true },
      }),
      prisma.task.groupBy({
        by: ['priority'],
        where: { userId },
        _count: { _all: true },
      }),
      prisma.task.count({
        where: {
          userId,
          dueDate: { lt: now },
          status: { not: 'DONE' },
        },
      }),
    ])

    return NextResponse.json({
      totalTasks,
      byStatus: byStatus.reduce((acc, curr) => {
        acc[curr.status] = curr._count._all
        return acc
      }, {} as Record<string, number>),
      byPriority: byPriority.reduce((acc, curr) => {
        acc[curr.priority] = curr._count._all
        return acc
      }, {} as Record<string, number>),
      overdue,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}