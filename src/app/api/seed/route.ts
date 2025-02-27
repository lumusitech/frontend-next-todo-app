import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  // Delete all todos - pristine state
  await prisma.todo.deleteMany({})

  // Seed todos
  await prisma.todo.createMany({
    data: [
      {
        description: 'Learn Next.js',
        completed: false,
      },
      {
        description: 'Learn Prisma',
        completed: false,
      },
      {
        description: 'Learn TailwindCSS',
        completed: true,
      },
    ],
  })

  return NextResponse.json({ message: 'Seed executed' })
}
