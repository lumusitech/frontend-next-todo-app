import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

interface Segments {
  params: {
    id: string
  }
}

export async function GET(request: Request, { params }: Segments) {
  const { id } = params

  const todo = await prisma.todo.findUnique({ where: { id } })

  if (!todo) {
    return NextResponse.json({ message: `Todo with id ${id} is not exists`, status: 404 })
  }

  return NextResponse.json({ todo })
}
